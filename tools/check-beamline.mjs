#!/usr/bin/env node
// Independent headless acceptance. No browser profile, app session, or scene mocks.
// Optional isolated devtest setup (no repository/runtime dependencies added):
// npm install --prefix /tmp/beamline-devtest playwright
// node /tmp/beamline-devtest/node_modules/playwright/cli.js install chromium
// PLAYWRIGHT_ROOT=/tmp/beamline-devtest/node_modules/playwright node tools/check-beamline.mjs
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import {
  featuredSlugs,
  readGalleryData,
} from "./build-gallery-featured.mjs";
const require = createRequire(import.meta.url);
const candidates = process.env.PLAYWRIGHT_ROOT
  ? [process.env.PLAYWRIGHT_ROOT]
  : [
      "playwright",
      join(
        homedir(),
        ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
      ),
    ];
const playwrightRoot = candidates.find((candidate) => {
  try {
    require.resolve(candidate);
    return true;
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") return false;
    throw error;
  }
});
if (!playwrightRoot)
  throw new Error(
    "Playwright is unavailable. Install it in a separate devtest directory and set PLAYWRIGHT_ROOT; see the commands at the top of this file.",
  );
const { chromium } = require(playwrightRoot);
const { expect: baseExpect } = require(join(playwrightRoot, "test"));
const expect = baseExpect.configure({ timeout: 6000 });
const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const base =
  process.env.BEAMLINE_URL || "http://127.0.0.1:4174/teardowns/index.html";
const shard = (process.env.BEAMLINE_SHARD || "1/1").split("/").map(Number);
assert.ok(
  shard.length === 2 &&
    shard.every(Number.isInteger) &&
    shard[0] >= 1 &&
    shard[0] <= shard[1],
  "BEAMLINE_SHARD must be index/count, e.g. 1/3",
);
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const artifacts = resolve(
  process.env.BEAMLINE_ARTIFACT_DIR ||
    join(repo, "artifacts", `beamline-controller-${stamp}`),
);
assert.ok(
  artifacts.startsWith(join(repo, "artifacts") + "/"),
  "Evidence must be written under artifacts/",
);
await mkdir(artifacts, { recursive: true });
let launchSource = process.env.CHROME_PATH || "Playwright bundled Chromium";
let browser;
try {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH }
      : {}),
  });
} catch (error) {
  const macChrome =
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  if (
    process.env.CHROME_PATH ||
    !error.message.includes("Executable doesn't exist") ||
    !existsSync(macChrome)
  )
    throw error;
  launchSource = macChrome;
  browser = await chromium.launch({
    headless: true,
    executablePath: macChrome,
  });
}
const probe = await browser.newPage();
const gpu = await probe.evaluate(() => {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  if (!gl) return null;
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  return {
    renderer: gl.getParameter(
      info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER,
    ),
    vendor: gl.getParameter(info ? info.UNMASKED_VENDOR_WEBGL : gl.VENDOR),
  };
});
await probe.close();
console.log("WebGL backend:", JSON.stringify(gpu));
// Only actual driver identity can disable latency certification. Unknown/masked
// renderers still enforce the original gates; slowness is not a capability probe.
const softwareRenderer =
  /swiftshader|llvmpipe|softpipe|software rasterizer/i.test(
    gpu?.renderer || "",
  );
const timingGate = softwareRenderer
  ? "unavailable-software-renderer"
  : "enforced";
console.log(
  "Timing gate:",
  timingGate,
  softwareRenderer
    ? "Functional acceptance only; GPU latency and minimum intermediate-frame count are not verified. Timing measurements remain diagnostic."
    : "Original timing and intermediate-frame thresholds are enforced.",
);
const names = ["capture", "measure", "reconstruct", "verify", "archive"];
const report = {
  startedAt: new Date().toISOString(),
  url: base,
  browser: browser.version(),
  launchSource,
  headless: true,
  gpu,
  timingGate,
  shard: { index: shard[0], count: shard[1] },
  sourceHashes: {},
  tests: [],
};
for (const path of [
  "tools/check-beamline.mjs",
  "index.html",
  "teardowns/index.html",
  "teardowns/_gallery/beamline.js",
  "teardowns/_gallery/beamline.css",
  "teardowns/_gallery/beamline-3d.js",
  "teardowns/_gallery/catalogue.js",
]) {
  report.sourceHashes[path] = createHash("sha256")
    .update(await readFile(join(repo, path)))
    .digest("hex");
}
// Expectations derive from the repository-owned catalogue so adding a study
// updates them here too; the fixed featured order stays asserted explicitly.
const canonicalStudies = (
  await readGalleryData("teardowns/_gallery/catalogue.js", repo)
).DESIGN_TEARDOWNS;
const featuredRank = new Map(featuredSlugs.map((slug, index) => [slug, index]));
// Mirrors the controller's curated comparator: featured first in their fixed
// order, everything else stable in catalogue order.
function curatedTitles(category = "all", limit = 6) {
  return canonicalStudies
    .filter((item) => category === "all" || item.category === category)
    .map((item, index) => ({ item, index }))
    .sort(
      (a, b) =>
        (featuredRank.get(a.item.slug) ?? featuredSlugs.length) -
          (featuredRank.get(b.item.slug) ?? featuredSlugs.length) ||
        a.index - b.index,
    )
    .slice(0, limit)
    .map(({ item }) => item.title);
}
const expectedCuratedFirstPage = featuredSlugs.map((slug) => {
  const item = canonicalStudies.find((record) => record.slug === slug);
  assert.ok(item, `Featured slug is missing from catalogue: ${slug}`);
  return item.title;
});
assert.deepEqual(curatedTitles(), expectedCuratedFirstPage);

const cases = [];
function test(name, fn, options = {}) {
  cases.push({ name, fn, options });
}
function url(station = "capture") {
  const u = new URL(base);
  u.hash = station;
  return u.href;
}
async function settled(page, p) {
  await page.waitForFunction(
    (expected) =>
      Math.abs(
        parseFloat(document.querySelector("#track-progress").style.width) /
          100 -
          expected,
      ) < 0.000002 && !document.body.hasAttribute("data-moving"),
    p,
  );
}
async function state(page) {
  return page.evaluate(() => ({
    p: parseFloat(document.querySelector("#track-progress").style.width) / 100,
    station: document.body.dataset.station,
    moving: document.body.hasAttribute("data-moving"),
    scroll: scrollY,
    range: document.querySelector("#experience").offsetHeight - innerHeight,
    hash: location.hash,
    focus:
      document.activeElement.id ||
      document.activeElement.outerHTML.slice(0, 180),
    diagnostics: window.BEAMLINE.inspect(),
  }));
}
async function start(page, station = "capture") {
  await page.goto(url(station));
  const expected = names.indexOf(station) / 4;
  await settled(page, expected);
  await page.waitForFunction(
    () => window.BEAMLINE.inspect().scene?.sampleReady,
  );
  // Texture readiness precedes its first paint. Keep shader compilation outside
  // motion timing, using real animation frames and the rendered scene progress.
  await page.waitForFunction(async (expected) => {
    const before = window.BEAMLINE.inspect().scene;
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
    const after = window.BEAMLINE.inspect().scene;
    return (
      before?.sampleReady &&
      before.ready &&
      !before.lost &&
      before.calls > 0 &&
      after?.sampleReady &&
      after.ready &&
      !after.lost &&
      after.calls > 0 &&
      Math.abs(before.progress - expected) < 1e-7 &&
      Math.abs(after.progress - expected) < 1e-7 &&
      !document.body.hasAttribute("data-moving")
    );
  }, expected);
}
async function nativeScroll(page, p) {
  await page.evaluate((p) => {
    const top =
      (document.querySelector("#experience").offsetHeight - innerHeight) * p;
    const run = window.__motionObservation;
    if (run && !run.done && run.event === "scroll") {
      // An ongoing navigation may emit its own scroll before this protocol call
      // arrives. Anchor the observation to this actual native input invocation.
      window.removeEventListener(run.event, run.listener, true);
      run.triggeredAt = performance.now();
      run.record();
    }
    scrollTo({ top, behavior: "instant" });
  }, p);
}
async function docked(page, index) {
  await settled(page, index / 4);
  await expect(page.locator("body")).toHaveAttribute(
    "data-station",
    names[index],
  );
  await expect(page.locator("#readout-word")).toHaveText(
    new RegExp(`^${names[index]}$`, "i"),
  );
  await expect(
    page.locator('[data-station][aria-current="step"]'),
  ).toHaveAttribute("href", "#" + names[index]);
  await page.waitForFunction(
    (p) =>
      Math.abs(
        scrollY -
          (document.querySelector("#experience").offsetHeight - innerHeight) *
            p,
      ) < 2,
    index / 4,
  );
  const s = await state(page);
  assert.equal(s.diagnostics.navigating, false);
  assert.equal(s.diagnostics.velocity, 0);
  return s;
}
// Observe a bounded run of rendered frames to expose stale scrollend callbacks or
// resumed transport, rather than accepting a single transient idle sample.
async function stableFrames(page, expected, count = 30, minDuration = 0) {
  const rows = await page.evaluate(
    ({ count, minDuration }) =>
      new Promise((resolve) => {
        const rows = [];
        const startedAt = performance.now();
        function frame() {
          rows.push({
            p: window.BEAMLINE.inspect().progress,
            moving: document.body.hasAttribute("data-moving"),
            station: document.body.dataset.station,
            t: performance.now(),
            scroll: scrollY,
            navigating: window.BEAMLINE.inspect().navigating,
            velocity: window.BEAMLINE.inspect().velocity,
          });
          if (
            rows.length >= count &&
            performance.now() - startedAt >= minDuration
          )
            resolve(rows);
          else requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      }),
    { count, minDuration },
  );
  for (const row of rows) {
    assert.ok(
      Math.abs(row.p - expected.p) < 0.000002,
      "Unexpected transport after settling / modal suspension",
    );
    assert.equal(row.moving, false);
    assert.equal(row.station, expected.station);
    assert.ok(
      Math.abs(row.scroll - expected.scroll) < 1,
      "Native scroll moved after release",
    );
    assert.equal(row.navigating, false);
    assert.equal(row.velocity, 0);
  }
  return rows;
}
// Capture at the real trusted input, before the controller's bubbling takeover
// listener. Protocol delivery latency must not become pre-input movement error.
async function observeTakeover(page, types) {
  await page.evaluate((types) => {
    window.__takeoverInput = null;
    const capture = (event) => {
      if (!event.isTrusted) return;
      if (event.type === "pointerdown" && event.pointerType !== "touch") return;
      const d = window.BEAMLINE.inspect();
      window.__takeoverInput = {
        type: event.type,
        trusted: event.isTrusted,
        t: performance.now(),
        p: d.progress,
        scroll: scrollY,
        navigating: d.navigating,
        deltaY: event.deltaY,
      };
      for (const type of types) window.removeEventListener(type, capture, true);
    };
    for (const type of types)
      window.addEventListener(type, capture, { capture: true, passive: true });
  }, types);
}
async function sample(page, action, end, event = "scroll") {
  await page.evaluate((event) => {
    const previous = window.__motionObservation;
    if (previous) {
      previous.done = true;
      window.removeEventListener(previous.event, previous.listener, true);
    }
    const run = { rows: [], event, triggeredAt: null, done: false };
    window.__motionObservation = run;
    run.record = () => {
      const d = window.BEAMLINE.inspect();
      run.rows.push({
        t: performance.now(),
        p:
          parseFloat(document.querySelector("#track-progress").style.width) /
          100,
        scroll: scrollY,
        station: document.body.dataset.station,
        readout: document.querySelector("#readout-word").textContent,
        currentLink: document
          .querySelector('[data-station][aria-current="step"]')
          .getAttribute("href"),
        moving: document.body.hasAttribute("data-moving"),
        target: d.targetProgress,
        velocity: d.velocity,
        frameTime: d.frameTime,
        navigating: d.navigating,
      });
    };
    run.listener = () => {
      run.triggeredAt = performance.now();
      run.record();
    };
    window.addEventListener(event, run.listener, { capture: true, once: true });
    function frame() {
      if (run.done) return;
      run.record();
      requestAnimationFrame(frame);
    }
    run.record();
    requestAnimationFrame(frame);
  }, event);
  await action();
  await settled(page, end);
  return page.evaluate(() => {
    const run = window.__motionObservation;
    run.done = true;
    run.record();
    window.removeEventListener(run.event, run.listener, true);
    return { triggeredAt: run.triggeredAt, rows: run.rows };
  });
}
function motionMetrics(
  observation,
  end,
  { maxDuration, maxSpeed, minDuration = 0, response = false } = {},
) {
  assert.notEqual(
    observation.triggeredAt,
    null,
    "The actual input event must be observed",
  );
  const rows = observation.rows.filter((s) => s.t >= observation.triggeredAt);
  assert.ok(
    rows.length >= 2,
    "Must observe input and a resulting motion endpoint",
  );
  const first = rows[0],
    distance = end - first.p,
    sign = Math.sign(distance);
  assert.ok(Math.abs(distance) > 0.000003, "Input must produce nonzero motion");
  if (!softwareRenderer)
    assert.ok(
      rows.length >= 5,
      "Motion must contain intermediate rendered samples",
    );
  const speeds = [];
  for (let i = 1; i < rows.length; i++) {
    const step = rows[i].p - rows[i - 1].p,
      dt = (rows[i].frameTime - rows[i - 1].frameTime) / 1000;
    assert.ok(sign * step >= -0.000003, `Rebound at ${rows[i].t}: ${step}`);
    assert.ok(
      rows[i].p >= Math.min(first.p, end) - 0.000003 &&
        rows[i].p <= Math.max(first.p, end) + 0.000003,
      "Overshoot",
    );
    if (dt > 0.004) speeds.push(Math.abs(step / dt));
    assert.equal(rows[i].currentLink, "#" + rows[i].station);
    assert.equal(rows[i].readout.toLowerCase(), rows[i].station);
    if (rows[i].station !== rows[i - 1].station) {
      const reached = names.indexOf(rows[i].station) / 4;
      assert.ok(
        reached >= Math.min(rows[i - 1].p, rows[i].p) - 1e-7 &&
          reached <= Math.max(rows[i - 1].p, rows[i].p) + 1e-7,
        `Label changed without crossing its station: ${rows[i - 1].p} -> ${rows[i].p}, ${rows[i].station}`,
      );
    }
  }
  const last = rows.at(-1),
    durationMs = last.t - observation.triggeredAt;
  const at90 = rows.find(
    (s) => sign * (s.p - first.p) >= Math.abs(distance) * 0.9,
  );
  const response90Ms = at90.t - observation.triggeredAt,
    maxSampledSpeed = speeds.length ? Math.max(...speeds) : null;
  assert.ok(
    Math.abs(last.p - end) < 0.000002 && !last.moving,
    "Must settle exactly, with no scheduled tail",
  );
  if (!softwareRenderer) {
    assert.ok(
      durationMs <= maxDuration,
      `Slow settling: ${durationMs}ms > ${maxDuration}ms`,
    );
    assert.ok(
      durationMs >= minDuration,
      `Navigation too fast: ${durationMs}ms`,
    );
    if (maxSpeed)
      assert.ok(
        maxSampledSpeed !== null && maxSampledSpeed <= maxSpeed,
        `Excessive speed: ${maxSampledSpeed}`,
      );
    if (response)
      assert.ok(
        response90Ms >= 55 && response90Ms <= 210,
        `90% response: ${response90Ms}ms`,
      );
  }
  return {
    timingGate,
    durationMs,
    response90Ms,
    maxSampledSpeed,
    samples: rows.length,
    intermediateSamples: rows.filter(
      (row) => sign * (row.p - first.p) > 0 && sign * (end - row.p) > 0,
    ).length,
    minimumSampleCount: {
      required: 5,
      observed: rows.length,
      met: rows.length >= 5,
      gate: timingGate,
    },
    thresholds: {
      maxDuration,
      minDuration,
      maxSpeed,
      response90Ms: response ? [55, 210] : null,
    },
    nonzeroMotion: true,
    monotonic: true,
    overshoot: false,
  };
}
for (const mode of ["query", "hash"])
  test(`root-redirect-preserves-${mode}-and-revision`, async ({
    page,
    note,
  }) => {
    const root = new URL("../", base);
    root.searchParams.set("revision", "release-final-20260908");
    if (mode === "query") root.searchParams.set("station", "4");
    else root.hash = "archive";
    const galleryRequest = page.waitForRequest(
      (request) =>
        request.isNavigationRequest() &&
        new URL(request.url()).pathname === new URL(base).pathname,
    );
    await page.goto(root.href);
    const redirected = new URL((await galleryRequest).url());
    assert.equal(
      redirected.searchParams.get("revision"),
      "release-final-20260908",
    );
    if (mode === "query")
      assert.equal(redirected.searchParams.get("station"), "4");
    await page.waitForURL(
      (destination) => destination.pathname === new URL(base).pathname,
    );
    const s = await docked(page, 4);
    assert.equal(s.hash, "#archive");
    assert.equal(
      new URL(page.url()).searchParams.get("revision"),
      "release-final-20260908",
    );
    note({
      entry: root.href,
      redirected: redirected.href,
      final: page.url(),
      state: s,
    });
  });
for (const name of names)
  test(`direct-${name}`, async ({ page }) => {
    await start(page, name);
    await expect(
      page.locator('[data-station][aria-current="step"]'),
    ).toHaveAttribute("href", "#" + name);
    await page.waitForFunction(
      (p) =>
        Math.abs(
          scrollY -
            (document.querySelector("#experience").offsetHeight - innerHeight) *
              p,
        ) < 2,
      names.indexOf(name) / 4,
    );
    await page.reload();
    await settled(page, names.indexOf(name) / 4);
    assert.equal(new URL(page.url()).hash, "#" + name);
  });
for (const [name, from, to] of [
  ["native-forward", "capture", 0.25],
  ["native-backward", "archive", 0],
])
  test(name, async ({ page, note }) => {
    await start(page, from);
    const observation = await sample(page, () => nativeScroll(page, to), to);
    note({ observation });
    note({
      ...motionMetrics(observation, to, { maxDuration: 500, response: true }),
    });
  });
for (const [name, from, index] of [
  ["click-single", "capture", 1],
  ["click-full", "capture", 4],
  ["click-full-reverse", "archive", 0],
])
  test(name, async ({ page, note }) => {
    await start(page, from);
    const observation = await sample(
      page,
      () => page.locator(`[data-station="${index}"]`).click(),
      index / 4,
      "click",
    );
    note({ observation });
    note({
      ...motionMetrics(observation, index / 4, {
        minDuration: index === 1 ? 850 : 1500,
        maxDuration: index === 1 ? 1500 : 2400,
        maxSpeed: index === 1 ? 0.4 : 0.78,
      }),
    });
    assert.equal(new URL(page.url()).hash, "#" + names[index]);
  });
// Release between stations, then observe long enough to expose delayed pullback.
// Both scrollend and the reverse wheel input are generated by the browser.
for (const [from, release] of [
  ["capture", 0.11],
  ["capture", 0.39],
  ["archive", 0.64],
  ["archive", 0.89],
])
  test(`release-no-auto-pullback-${release}`, async ({ page, note }) => {
    await start(page, from);
    await page.mouse.move(20, 350);
    await page.mouse.down();
    let expected;
    try {
      await page.evaluate(() => {
        window.__releaseEnds = [];
        window.addEventListener("scrollend", (event) => {
          window.__releaseEnds.push({
            trusted: event.isTrusted,
            scroll: scrollY,
          });
        });
      });
      await nativeScroll(page, release);
      expected = await page.evaluate(
        () =>
          scrollY /
          (document.querySelector("#experience").offsetHeight - innerHeight),
      );
      await page.waitForFunction(() =>
        window.__releaseEnds.some((event) => event.trusted),
      );
      await settled(page, expected);
    } finally {
      await page.mouse.up();
    }
    const released = await state(page);
    assert.ok(Math.abs(released.p - release) <= 1 / released.range);
    assert.equal(released.diagnostics.navigating, false);
    assert.ok(Math.abs(released.p * 4 - Math.round(released.p * 4)) > 0.01);
    note({
      release,
      released,
      stableReleased: await stableFrames(page, released, 30, 1200),
    });
    const direction = from === "capture" ? -1 : 1;
    await page.mouse.wheel(0, direction * 160);
    await page.waitForFunction((before) => scrollY !== before, released.scroll);
    await page.waitForFunction(() => {
      const d = window.BEAMLINE.inspect();
      const native =
        scrollY /
        (document.querySelector("#experience").offsetHeight - innerHeight);
      return (
        !document.body.hasAttribute("data-moving") &&
        !d.navigating &&
        Math.abs(d.progress - native) < 0.000002
      );
    });
    const reversed = await state(page);
    assert.ok(
      direction * (reversed.p - released.p) > 0,
      "Reverse input must move away from the released position",
    );
    assert.ok(
      Math.abs(reversed.p - reversed.scroll / reversed.range) < 0.00001,
    );
    assert.equal(reversed.diagnostics.navigating, false);
    note({
      reversed,
      stableReversed: await stableFrames(page, reversed, 30, 1200),
      events: await page.evaluate(() => window.__releaseEnds),
    });
  });
for (const [from, index] of [
  ["capture", 1],
  ["archive", 3],
])
  test(`stage-label-only-at-arrival-${from}`, async ({ page, note }) => {
    await start(page, from);
    const origin = names.indexOf(from) / 4;
    const intermediate = origin + (index / 4 - origin) * 0.7;
    await nativeScroll(page, intermediate);
    const nativePosition = await page.evaluate(
      () =>
        scrollY /
        (document.querySelector("#experience").offsetHeight - innerHeight),
    );
    await settled(page, nativePosition);
    const held = await state(page);
    const fraction = (held.p - origin) / (index / 4 - origin);
    assert.ok(
      fraction > 0.52 && fraction < 0.95,
      "Native position must stop beyond halfway, before the next station",
    );
    assert.equal(
      held.station,
      from,
      "Stage label advanced before actual arrival",
    );
    await expect(page.locator("#readout-word")).toHaveText(
      new RegExp(`^${from}$`, "i"),
    );
    await expect(
      page.locator('[data-station][aria-current="step"]'),
    ).toHaveAttribute("href", "#" + from);
    note({ intermediate, held, stableHeld: await stableFrames(page, held) });
    await nativeScroll(page, index / 4);
    await docked(page, index);
  });
for (const [from, release, station] of [
  ["capture", 0.14, 1],
  ["archive", 0.86, 3],
])
  test(`reduced-motion-label-scene-consistency-${from}`, async ({
    page,
    note,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await start(page, from);
    await page.waitForFunction(
      () => window.BEAMLINE.inspect().scene?.sampleReady,
    );
    await page.mouse.move(20, 350);
    await page.mouse.down();
    try {
      await nativeScroll(page, release);
      await settled(page, station / 4);
      const s = await state(page);
      assert.equal(
        s.station,
        names[station],
        "Reduced motion must publish the same quantized arrival as the scene",
      );
      await page.waitForFunction((station) => {
        const scene = window.BEAMLINE.inspect().scene;
        return (
          Math.abs(scene.sampleWorldZ - scene.gantryWorldZ[station]) < 1e-7
        );
      }, station);
      note(s);
    } finally {
      await page.mouse.up();
    }
    await settled(page, station / 4);
    const released = await state(page);
    assert.ok(
      Math.abs(released.scroll / released.range - release) <=
        1 / released.range,
      "Reduced motion may quantize the scene, but must not pull native scroll to a station",
    );
    assert.equal(released.diagnostics.navigating, false);
    assert.equal(released.station, names[station]);
    assert.ok(
      Math.abs(released.diagnostics.scene.progress - station / 4) < 1e-7,
    );
    note({
      released,
      stableReleased: await stableFrames(page, released, 30, 1200),
    });
  });
test("click-retarget-no-rebound", async ({ page, note }) => {
  await start(page);
  await page.locator('[data-station="4"]').click();
  await page.waitForFunction(
    () =>
      parseFloat(document.querySelector("#track-progress").style.width) > 15,
  );
  const observation = await sample(
    page,
    () => page.locator('[data-station="0"]').click(),
    0,
    "click",
  );
  note({ observation });
  note({
    ...motionMetrics(observation, 0, { maxDuration: 1800, maxSpeed: 0.6 }),
  });
  assert.equal(new URL(page.url()).hash, "#capture");
});
test("wheel-takes-over-click", async ({ page, note }) => {
  await start(page);
  await page.locator('[data-station="4"]').click();
  await page.waitForFunction(
    () =>
      parseFloat(document.querySelector("#track-progress").style.width) > 15,
  );
  await page.mouse.move(20, 350);
  await observeTakeover(page, ["wheel"]);
  await page.mouse.wheel(0, -240);
  await page.waitForFunction(() => window.__takeoverInput);
  const input = await page.evaluate(() => window.__takeoverInput);
  note({ input });
  assert.equal(input.trusted, true);
  // The compositor can apply the default scroll before passive wheel delivery;
  // readScroll may already have cancelled navigation by the capture observation.
  await page.waitForFunction(() => {
    const d = window.BEAMLINE.inspect();
    return (
      window.__takeoverInput &&
      !d.navigating &&
      !document.body.hasAttribute("data-moving")
    );
  });
  assert.ok(input.deltaY < 0);
  const s = await state(page);
  assert.ok(
    s.p <= input.p + 1 / s.range,
    "Reverse wheel must not advance beyond actual input progress (one native pixel tolerance)",
  );
  assert.equal(s.diagnostics.navigating, false);
  assert.ok(Math.abs(s.p - s.scroll / s.range) < 0.00001);
  assert.notEqual(s.hash, "#archive");
  note(s);
});
test("native-scroll-takes-over-click", async ({ page, note }) => {
  await start(page);
  await page.locator('[data-station="4"]').click();
  await page.waitForFunction(
    () =>
      parseFloat(document.querySelector("#track-progress").style.width) > 15,
  );
  const observation = await sample(page, () => nativeScroll(page, 0), 0);
  note({ observation });
  note({
    ...motionMetrics(observation, 0, { maxDuration: 500, response: true }),
  });
  assert.equal((await state(page)).diagnostics.navigating, false);
  assert.notEqual(new URL(page.url()).hash, "#archive");
});
test(
  "touch-takes-over-click",
  async ({ page, note }) => {
    await start(page);
    await page.locator('[data-station="4"]').click();
    await page.waitForFunction(
      () =>
        parseFloat(document.querySelector("#track-progress").style.width) > 15,
    );
    const cdp = await page.context().newCDPSession(page);
    await observeTakeover(page, ["pointerdown", "touchstart"]);
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: 10, y: 340 }],
    });
    await page.waitForFunction(
      () => window.__takeoverInput && !window.BEAMLINE.inspect().navigating,
    );
    const input = await page.evaluate(() => window.__takeoverInput);
    note({ input });
    assert.equal(input.trusted, true);
    assert.equal(
      input.navigating,
      true,
      "Touch must interrupt active navigation",
    );
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: 10, y: 240 }],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await page.waitForFunction(
      () => !document.body.hasAttribute("data-moving"),
    );
    const s = await state(page);
    assert.equal(s.diagnostics.navigating, false);
    assert.ok(
      s.p > input.p,
      "Upward touch must move forward from actual input progress",
    );
    // Preserve the original 0.6 - 0.15 travel budget, anchored to actual delivery.
    assert.ok(
      s.p < input.p + (0.6 - 0.15),
      "Touch exceeded its bounded travel",
    );
    assert.ok(Math.abs(s.p - s.scroll / s.range) < 0.00001);
    note(s);
    await cdp.detach();
  },
  { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
);
test("keyboard-takes-over-click", async ({ page, note }) => {
  await start(page);
  await page.locator('[data-station="4"]').click();
  await page.waitForFunction(
    () =>
      parseFloat(document.querySelector("#track-progress").style.width) > 15,
  );
  await page.evaluate(() => {
    window.__keyboardMotion = [];
    for (const type of ["keydown", "keyup", "scroll", "scrollend"])
      window.addEventListener(type, (event) => {
        const d = window.BEAMLINE.inspect();
        window.__keyboardMotion.push({
          type,
          key: event.key,
          trusted: event.isTrusted,
          t: performance.now(),
          scroll: scrollY,
          p: d.progress,
          target: d.targetProgress,
        });
      });
  });
  try {
    await page.keyboard.press("Home");
    await settled(page, 0);
    note(await state(page));
  } finally {
    note({
      keyboardMotion: await page.evaluate(() => window.__keyboardMotion),
    });
  }
});
test("resize-preserves-progress-and-destination", async ({ page, note }) => {
  await start(page, "verify");
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    await page.waitForFunction(
      () =>
        Math.abs(
          scrollY -
            (document.querySelector("#experience").offsetHeight - innerHeight) *
              0.75,
        ) < 2,
    );
    await settled(page, 0.75);
    note(await state(page));
  }
  await page.locator('[data-station="0"]').click();
  await page.waitForFunction(
    () =>
      parseFloat(document.querySelector("#track-progress").style.width) < 65,
  );
  await page.setViewportSize({ width: 1024, height: 768 });
  await settled(page, 0);
  assert.equal(new URL(page.url()).hash, "#capture");
  note(await state(page));
});
test("reduced-motion-initial-and-live-change", async ({ page, note }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await start(page, "verify");
  await page.locator('[data-station="0"]').click();
  await settled(page, 0);
  assert.equal((await state(page)).diagnostics.velocity, 0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator('[data-station="4"]').click();
  await page.waitForFunction(
    () => parseFloat(document.querySelector("#track-progress").style.width) > 5,
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await settled(page, 1);
  assert.equal(new URL(page.url()).hash, "#archive");
  await nativeScroll(page, 0.5);
  await settled(page, 0.5);
  note(await state(page));
});
for (const [name, viewport, inlineVisible] of [
  ["portrait-1024", { width: 1024, height: 1366 }, true],
  ["portrait-ratio-1280", { width: 1280, height: 1200 }, true],
  ["short-landscape", { width: 1180, height: 720 }, false],
])
  test(
    `compact-skip-${name}`,
    async ({ page, note }) => {
      await start(page, "verify");
      await expect(page.locator("body")).toHaveClass(/compact/);
      const panel = page.locator("#archive-panel");
      if (inlineVisible) await expect(panel).toBeVisible();
      else await expect(panel).toBeHidden();
      await page.keyboard.press("Tab");
      await expect(page.locator(".skip-link")).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.locator("#archive-search")).toBeVisible();
      await expect(page.locator("#archive-search")).toBeFocused();
      if (!inlineVisible) {
        await expect(page.locator("#archive-dialog")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(page.locator(".skip-link")).toBeFocused();
        await expect(panel).toBeHidden();
      } else await expect(page.locator("#archive-dialog")).toBeHidden();
      note(await state(page));
    },
    { viewport, reducedMotion: "reduce" },
  );
for (const [name, viewport] of [
  ["desktop", { width: 1440, height: 1000 }],
  ["tablet", { width: 768, height: 1024 }],
  ["mobile", { width: 390, height: 844 }],
])
  test(
    `dialogs-and-keyboard-${name}`,
    async ({ page, note }) => {
      await start(page, "verify");
      // Real Tab/Enter entry, including the hidden desktop/mobile skip link.
      await page.keyboard.press("Tab");
      await expect(page.locator(".skip-link")).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.locator("#archive-search")).toBeFocused();
      if (name === "mobile") {
        await expect(page.locator("#archive-dialog")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(page.locator(".skip-link")).toBeFocused();
      }
      for (const id of ["archive", "method", "about"]) {
        const trigger = page.locator(`[data-dialog="${id}-dialog"]`),
          dialog = page.locator(`#${id}-dialog`);
        await trigger.focus();
        await page.keyboard.press("Enter");
        await expect(dialog).toBeVisible();
        if (id === "archive") {
          await page.locator("#archive-search").fill("Notion");
          await expect(
            page.locator("#archive-results .archive-item b"),
          ).toHaveText(["Notion"]);
          await page.keyboard.press("Escape");
          await expect(dialog).toBeHidden();
          await expect(trigger).toBeFocused();
          await page.keyboard.press("Enter");
          await expect(page.locator("#archive-search")).toHaveValue("Notion");
          await page.locator("#archive-search").fill("");
        }
        for (let i = 0; i < 18; i++) {
          await page.keyboard.press("Tab");
          assert.equal(
            await page.evaluate(
              () =>
                !document.hasFocus() ||
                !!document.activeElement.closest("dialog[open]"),
            ),
            true,
          );
        }
        await page.keyboard.press("Escape");
        await expect(dialog).toBeHidden();
        await expect(trigger).toBeFocused();
        await page.keyboard.press("Enter");
        await dialog.locator("[data-close]").click();
        await expect(dialog).toBeHidden();
        await expect(trigger).toBeFocused();
      }
      for (const id of [0, 1, 2, 3, 4]) {
        await page.locator(`[data-station="${id}"]`).focus();
        await page.keyboard.press("Enter");
        await settled(page, id / 4);
      }
      note(await state(page));
    },
    { viewport, reducedMotion: "reduce" },
  );
test("curated-stays-stable-through-load-and-filters", async ({ page }) => {
  await start(page);
  const initial = await page
    .locator("#archive-results .archive-item b")
    .allTextContents();
  assert.deepEqual(initial, expectedCuratedFirstPage);
  await page.locator('[data-dialog="archive-dialog"]').click();
  await expect(page.locator("#archive-results .archive-item b")).toHaveText(
    initial,
  );
  await page.locator("#archive-search").fill("Notion");
  await expect(page.locator("#archive-results .archive-item b")).toHaveText([
    "Notion",
  ]);
  await page.locator("#archive-search").fill("");
  await expect(page.locator("#archive-results .archive-item b")).toHaveText(
    initial,
  );
  await page.locator("#archive-category").selectOption("agent");
  await expect(page.locator("#archive-results .archive-item b")).toHaveText(
    curatedTitles("agent"),
  );
  await page.locator("#archive-category").selectOption("all");
  await page.getByRole("button", { name: "Page 2", exact: true }).click();
  await expect(page.locator("#archive-results .archive-item b")).toHaveText(
    curatedTitles("all", 12).slice(6),
  );
  await page.locator("#archive-sort").selectOption("title");
  await expect(page.locator("#archive-results .archive-item b")).toHaveText([
    "Arknights: Endfield",
    "ChatGPT",
    "Comet",
    "Converge AI",
    "EasyCode",
    "Gemini",
  ]);
  await page.locator("#archive-sort").selectOption("curated");
  await expect(page.locator("#archive-results .archive-item b")).toHaveText(
    initial,
  );
});
test("gallery-filters-pager-empty-and-focus", async ({ page }) => {
  await start(page);
  await page.locator("#archive-search").fill("notion");
  await expect(page.locator("#archive-results .archive-item b")).toHaveText([
    "Notion",
  ]);
  await page.locator("#archive-search").fill("");
  await expect(page.getByRole("status")).toHaveText(
    `${canonicalStudies.length} case studies · showing 1–6.`,
  );
  const page2 = page.getByRole("button", { name: "Page 2", exact: true });
  await page2.focus();
  await page.keyboard.press("Enter");
  await expect(page2).toHaveAttribute("aria-current", "page");
  await expect(page2).toBeFocused();
  await page.locator("#archive-category").selectOption("product");
  await expect(page.locator("#archive-results .archive-item b")).toHaveText([
    "Comet",
    "LoL Esports",
    "Linear",
  ]);
  await page.locator("#archive-search").fill("no-such-beamline-study");
  await expect(page.locator("#archive-results")).toBeHidden();
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect(page.locator("#archive-search")).toBeFocused();
  await expect(page.locator("#archive-results .archive-item")).toHaveCount(6);
});
test("catalogue-network-failure-retry", async ({ page }) => {
  let requests = 0;
  await page.route("**/_gallery/catalogue.js*", async (route) => {
    requests++;
    if (requests === 1) await route.abort("failed");
    else await route.continue();
  });
  await start(page);
  await page.locator("#archive-search").fill("Notion");
  await expect(
    page.getByRole("button", { name: "Retry", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Retry", exact: true }).click();
  await expect(page.locator("#archive-results .archive-item b")).toHaveText([
    "Notion",
  ]);
  await expect(page.locator("#archive-search")).toBeFocused();
  assert.equal(requests, 2);
});
test("scene-image-failure-visible-fallback", async ({ page, note }) => {
  await page.route("**/latrix/screenshots/hero.jpg", (route) =>
    route.abort("failed"),
  );
  // This test intentionally prevents sampleReady; exercise the fallback directly.
  await page.goto(url("verify"));
  await settled(page, 0.75);
  await expect(page.locator("#fallback-specimen")).toBeVisible();
  await expect(page.locator("#beamline-3d")).toBeHidden();
  await page.locator('[data-dialog="archive-dialog"]').click();
  await expect(page.locator("#archive-results .archive-item")).toHaveCount(6);
  await page.keyboard.press("Escape");
  const link = page.locator("#fallback-specimen a");
  const destination = await link.getAttribute("href");
  const response = await Promise.all([
    page.waitForResponse(
      (r) =>
        r.request().isNavigationRequest() &&
        r.url().endsWith("/" + destination),
    ),
    link.click(),
  ]);
  assert.equal(response[0].status(), 200);
  note({ destination, status: response[0].status() });
});
for (const resizeWhileLost of [false, true])
  test(`webgl-real-loss-restore${resizeWhileLost ? "-with-resize" : ""}`, async ({
    page,
    note,
  }) => {
    await start(page, "verify");
    await page.waitForFunction(
      () => window.BEAMLINE.inspect().scene?.sampleReady,
    );
    const canvas = page.locator("#beamline-3d");
    const extension = await page.evaluateHandle(() => {
      const gl = document.querySelector("#beamline-3d").getContext("webgl2");
      const extension = gl?.getExtension("WEBGL_lose_context");
      if (!extension)
        throw new Error(
          "WEBGL_lose_context is unavailable; context loss was not tested.",
        );
      return extension;
    });
    note({ before: await state(page) });
    await extension.evaluate((extension) => extension.loseContext());
    await expect(page.locator("#fallback-specimen")).toBeVisible();
    await expect(canvas).toBeHidden();
    await page.waitForFunction(() =>
      document
        .querySelector("#beamline-3d")
        .getContext("webgl2")
        .isContextLost(),
    );
    const lostSize = await canvas.evaluate((canvas) => ({
      width: canvas.width,
      height: canvas.height,
    }));
    if (resizeWhileLost) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForFunction(
        () =>
          document.body.classList.contains("compact") &&
          Math.abs(
            scrollY -
              (document.querySelector("#experience").offsetHeight -
                innerHeight) *
                0.75,
          ) < 2,
      );
      await expect(canvas).toBeHidden();
      assert.deepEqual(
        await canvas.evaluate((canvas) => ({
          width: canvas.width,
          height: canvas.height,
        })),
        lostSize,
      );
    }
    note({ lost: await state(page), lostSize });
    await extension.evaluate((extension) => extension.restoreContext());
    await expect(canvas).toBeVisible();
    await expect(page.locator("#fallback-specimen")).toBeHidden();
    await page.waitForFunction(() => {
      const canvas = document.querySelector("#beamline-3d"),
        scene = window.BEAMLINE.inspect().scene;
      return (
        !canvas.getContext("webgl2").isContextLost() &&
        scene?.ready &&
        scene.sampleReady &&
        !scene.lost &&
        scene.calls > 0 &&
        canvas.width > 1 &&
        canvas.height > 1
      );
    });
    if (resizeWhileLost)
      await page.waitForFunction(() => {
        const canvas = window.BEAMLINE.inspect().scene.canvas;
        return canvas.width === 390 && canvas.height === 844;
      });
    await canvas.screenshot({
      path: join(
        artifacts,
        `webgl-restored${resizeWhileLost ? "-resized" : ""}.png`,
      ),
    });
    await page.locator('[data-station="1"]').click();
    await settled(page, 0.25);
    note({ restored: await state(page) });
    await extension.dispose();
  });
test("webgl-real-loss-restore-before-image-load", async ({ page, note }) => {
  let releaseImage,
    requests = 0;
  const imageGate = new Promise((resolve) => {
    releaseImage = resolve;
  });
  await page.route("**/latrix/screenshots/hero.jpg", async (route) => {
    requests++;
    await imageGate;
    await route.continue();
  });
  try {
    await page.goto(url("verify"), { waitUntil: "domcontentloaded" });
    await settled(page, 0.75);
    await expect.poll(() => requests).toBe(1);
    assert.equal((await state(page)).diagnostics.scene.sampleReady, false);
    const extension = await page.evaluateHandle(() => {
      const extension = document
        .querySelector("#beamline-3d")
        .getContext("webgl2")
        ?.getExtension("WEBGL_lose_context");
      if (!extension)
        throw new Error(
          "WEBGL_lose_context is unavailable; early loss was not tested.",
        );
      return extension;
    });
    await extension.evaluate((extension) => extension.loseContext());
    await expect(page.locator("#fallback-specimen")).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForFunction(() =>
      document.body.classList.contains("compact"),
    );
    await extension.evaluate((extension) => extension.restoreContext());
    await page.waitForFunction(
      () =>
        !document
          .querySelector("#beamline-3d")
          .getContext("webgl2")
          .isContextLost() && !window.BEAMLINE.inspect().scene.lost,
    );
    await expect(page.locator("#fallback-specimen")).toBeVisible();
    assert.equal((await state(page)).diagnostics.scene.sampleReady, false);
    note({ restoredBeforeImage: await state(page) });
    releaseImage();
    await page.waitForFunction(() => {
      const scene = window.BEAMLINE.inspect().scene;
      return (
        scene.sampleReady &&
        scene.ready &&
        !scene.lost &&
        scene.canvas.width === 390 &&
        scene.canvas.height === 844
      );
    });
    await expect(page.locator("#beamline-3d")).toBeVisible();
    await expect(page.locator("#fallback-specimen")).toBeHidden();
    await page
      .locator("#beamline-3d")
      .screenshot({ path: join(artifacts, "webgl-restored-before-image.png") });
    await page.locator('[data-station="1"]').click();
    await settled(page, 0.25);
    note({ imageThenReady: await state(page) });
    await extension.dispose();
  } finally {
    releaseImage();
  }
});
for (const [label, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["phone", { width: 390, height: 844 }],
])
  test(
    `viewport-boundaries-${label}`,
    async ({ page, note }) => {
      await start(page);
      await page.mouse.move(viewport.width / 2, viewport.height / 2);
      for (const edge of [0, 1]) {
        await nativeScroll(page, edge);
        await settled(page, edge);
        const before = await page.locator(".stage").boundingBox();
        await page.mouse.wheel(0, edge ? 1600 : -1600);
        await page.evaluate(
          () =>
            new Promise((resolve) =>
              requestAnimationFrame(() => requestAnimationFrame(resolve)),
            ),
        );
        const boundary = await page.evaluate(() => {
          const rect = document.querySelector(".stage").getBoundingClientRect();
          return {
            top: rect.top,
            bottom: rect.bottom,
            viewport: innerHeight,
            scroll: scrollY,
            range:
              document.querySelector("#experience").offsetHeight - innerHeight,
            rootOverscroll: getComputedStyle(document.documentElement)
              .overscrollBehaviorY,
            bodyOverscroll: getComputedStyle(document.body).overscrollBehaviorY,
          };
        });
        assert.equal(boundary.top, 0);
        assert.equal(boundary.bottom, boundary.viewport);
        assert.equal(before.y, boundary.top);
        assert.equal(boundary.rootOverscroll, "none");
        assert.equal(boundary.bodyOverscroll, "none");
        assert.ok(Math.abs(boundary.scroll - boundary.range * edge) < 2);
        note(boundary);
      }
      await page.locator('[data-station="2"]').click();
      await settled(page, 0.5);
      assert.equal((await page.locator(".stage").boundingBox()).y, 0);
      await page.locator('[data-dialog="archive-dialog"]').click();
      await expect(page.locator("#archive-dialog")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator("#archive-dialog")).toBeHidden();
      await settled(page, 0.5);
    },
    { viewport },
  );
for (const [label, viewport] of [
  ["desktop", { width: 1586, height: 992 }],
  ["tablet", { width: 768, height: 1024 }],
  ["phone", { width: 390, height: 844 }],
])
  test(
    `gantry-docking-${label}`,
    async ({ page, note }) => {
      await start(page);
      await page.waitForFunction(
        () => window.BEAMLINE.inspect().scene?.sampleReady,
      );
      for (const i of [0, 1, 2, 3, 4, 0]) {
        await page.locator(`[data-station="${i}"]`).click();
        await settled(page, i / 4);
        await page.waitForFunction(
          (i) =>
            Math.abs(window.BEAMLINE.inspect().scene.progress - i / 4) < 1e-7,
          i,
        );
        const scene = await page.evaluate(
          () => window.BEAMLINE.inspect().scene,
        );
        const error = Math.abs(scene.sampleWorldZ - scene.gantryWorldZ[i]);
        assert.ok(
          error < 1e-7,
          `Sample misses gantry ${i + 1} by ${error} world units`,
        );
        assert.equal(scene.gantryWorldZ.length, 5);
        assert.ok(
          scene.sampleWorldZ <= scene.gantryWorldZ[0] + 1e-7 &&
            scene.sampleWorldZ >= scene.gantryWorldZ[4] - 1e-7,
        );
        note({
          station: i + 1,
          sampleWorldZ: scene.sampleWorldZ,
          gantryWorldZ: scene.gantryWorldZ[i],
          error,
        });
        if (i === 0 || i === 4)
          await page.screenshot({
            path: join(artifacts, `docked-${label}-${i + 1}.png`),
          });
      }
      for (const edge of [1, 0]) {
        await nativeScroll(page, edge);
        await settled(page, edge);
        await page.waitForFunction(
          (p) => Math.abs(window.BEAMLINE.inspect().scene.progress - p) < 1e-7,
          edge,
        );
        const scene = await page.evaluate(
          () => window.BEAMLINE.inspect().scene,
        );
        assert.ok(
          Math.abs(scene.sampleWorldZ - scene.gantryWorldZ[edge * 4]) < 1e-7,
        );
      }
    },
    { viewport },
  );
try {
  for (const entry of cases
    .filter(
      (t) =>
        !process.env.BEAMLINE_TEST_FILTER ||
        t.name.includes(process.env.BEAMLINE_TEST_FILTER),
    )
    .filter((_, index) => index % shard[1] === shard[0] - 1)) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      serviceWorkers: "block",
      ...entry.options,
    });
    const page = await context.newPage();
    page.setDefaultTimeout(6000);
    page.setDefaultNavigationTimeout(12000);
    const result = {
      name: entry.name,
      timingGate,
      evidence: [],
      errors: [],
      requestsFailed: [],
    };
    page.on("pageerror", (error) => result.errors.push(error.message));
    page.on("requestfailed", (request) =>
      result.requestsFailed.push({
        url: request.url(),
        error: request.failure()?.errorText,
      }),
    );
    try {
      await entry.fn({ page, note: (value) => result.evidence.push(value) });
      assert.deepEqual(result.errors, []);
      result.status = "PASS";
    } catch (error) {
      result.status = "FAIL";
      result.error = error.stack;
      try {
        result.state = await state(page);
        await page.screenshot({
          path: join(artifacts, entry.name + "-failure.png"),
        });
      } catch (e) {
        result.captureError = e.message;
      }
    } finally {
      await context.close();
    }
    report.tests.push(result);
    console.log(
      result.status,
      entry.name,
      softwareRenderer
        ? "[functional-only; timingGate=unavailable-software-renderer]"
        : "",
      result.error?.split("\n")[0] || "",
    );
    await writeFile(
      join(artifacts, "results.json"),
      JSON.stringify(report, null, 2),
    );
  }
} finally {
  await browser.close();
}
report.finishedAt = new Date().toISOString();
report.sourceChangesDuringRun = [];
for (const [path, initialHash] of Object.entries(report.sourceHashes)) {
  const finalHash = createHash("sha256")
    .update(await readFile(join(repo, path)))
    .digest("hex");
  if (initialHash !== finalHash)
    report.sourceChangesDuringRun.push({ path, initialHash, finalHash });
}
report.summary = {
  timingGate,
  passed: report.tests.filter((t) => t.status === "PASS").length,
  failed: report.tests.filter((t) => t.status === "FAIL").length,
  total: report.tests.length,
};
await writeFile(
  join(artifacts, "results.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify({ artifacts, ...report.summary }));
if (report.sourceChangesDuringRun.length) {
  console.error(
    "Source changed during acceptance; this run cannot certify the final files:",
    report.sourceChangesDuringRun.map(({ path }) => path).join(", "),
  );
}
if (report.summary.failed || report.sourceChangesDuringRun.length)
  process.exitCode = 1;
