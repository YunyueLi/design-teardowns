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
const names = ["capture", "measure", "reconstruct", "verify", "archive"];
const report = {
  startedAt: new Date().toISOString(),
  url: base,
  browser: browser.version(),
  launchSource,
  headless: true,
  sourceHashes: {},
  tests: [],
};
for (const path of [
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
  await settled(page, names.indexOf(station) / 4);
}
async function nativeScroll(page, p) {
  await page.evaluate(
    (p) =>
      scrollTo({
        top:
          (document.querySelector("#experience").offsetHeight - innerHeight) *
          p,
        behavior: "instant",
      }),
    p,
  );
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
  const rows = observation.rows.filter((s) => s.t >= observation.triggeredAt),
    first = rows[0],
    distance = end - first.p,
    sign = Math.sign(distance);
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
  }
  const last = rows.at(-1),
    durationMs = last.t - observation.triggeredAt;
  const at90 = rows.find(
    (s) => sign * (s.p - first.p) >= Math.abs(distance) * 0.9,
  );
  const response90Ms = at90.t - observation.triggeredAt,
    maxSampledSpeed = Math.max(...speeds);
  assert.ok(
    Math.abs(last.p - end) < 0.000002 && !last.moving,
    "Must settle exactly, with no scheduled tail",
  );
  assert.ok(
    durationMs <= maxDuration,
    `Slow settling: ${durationMs}ms > ${maxDuration}ms`,
  );
  assert.ok(durationMs >= minDuration, `Navigation too fast: ${durationMs}ms`);
  if (maxSpeed)
    assert.ok(
      maxSampledSpeed <= maxSpeed,
      `Excessive speed: ${maxSampledSpeed}`,
    );
  if (response)
    assert.ok(
      response90Ms >= 55 && response90Ms <= 210,
      `90% response: ${response90Ms}ms`,
    );
  return {
    durationMs,
    response90Ms,
    maxSampledSpeed,
    samples: rows.length,
    monotonic: true,
    overshoot: false,
  };
}
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
  await page.mouse.wheel(0, -240);
  await page.waitForFunction(() => !document.body.hasAttribute("data-moving"));
  const s = await state(page);
  assert.ok(s.p < 0.4);
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
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: 10, y: 340 }],
    });
    await page.waitForFunction(() => !window.BEAMLINE.inspect().navigating);
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
    assert.ok(s.p < 0.6);
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
  await page.keyboard.press("Home");
  await settled(page, 0);
  note(await state(page));
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
  assert.deepEqual(initial, [
    "Latrix",
    "ChatGPT",
    "EasyCode",
    "Gemini",
    "Notion",
    "Shopify Editions Winter ’26",
  ]);
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
  await expect(page.locator("#archive-results .archive-item b")).toHaveText([
    "ChatGPT",
    "Gemini",
    "Notion",
    "Moonshot AI",
    "tutti",
    "OJO",
  ]);
  await page.locator("#archive-category").selectOption("all");
  await page.getByRole("button", { name: "第 2 页", exact: true }).click();
  await expect(page.locator("#archive-results .archive-item b")).toHaveText([
    "Arknights: Endfield",
    "Comet",
    "Linear",
    "Moonshot AI",
    "JourneyPilot",
    "tutti",
  ]);
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
  await expect(page.getByRole("status")).toHaveText("17 份拆解，第 1–6 项。");
  const page2 = page.getByRole("button", { name: "第 2 页", exact: true });
  await page2.focus();
  await page.keyboard.press("Enter");
  await expect(page2).toHaveAttribute("aria-current", "page");
  await expect(page2).toBeFocused();
  await page.locator("#archive-category").selectOption("product");
  await expect(page.locator("#archive-results .archive-item b")).toHaveText([
    "Comet",
    "Linear",
  ]);
  await page.locator("#archive-search").fill("no-such-beamline-study");
  await expect(page.locator("#archive-results")).toBeHidden();
  await page.getByRole("button", { name: "清除筛选", exact: true }).click();
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
    page.getByRole("button", { name: "重新加载", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "重新加载", exact: true }).click();
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
  await start(page, "verify");
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
try {
  for (const entry of cases.filter(
    (t) =>
      !process.env.BEAMLINE_TEST_FILTER ||
      t.name.includes(process.env.BEAMLINE_TEST_FILTER),
  )) {
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
    console.log(result.status, entry.name, result.error?.split("\n")[0] || "");
    await writeFile(
      join(artifacts, "results.json"),
      JSON.stringify(report, null, 2),
    );
  }
} finally {
  await browser.close();
}
report.finishedAt = new Date().toISOString();
report.summary = {
  passed: report.tests.filter((t) => t.status === "PASS").length,
  failed: report.tests.filter((t) => t.status === "FAIL").length,
  total: report.tests.length,
};
await writeFile(
  join(artifacts, "results.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify({ artifacts, ...report.summary }));
if (report.summary.failed) process.exitCode = 1;
