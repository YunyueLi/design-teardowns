#!/usr/bin/env node
// Regenerates the README media from the running gallery. Every image is a real
// capture: the loop settles the live scene at exact scroll positions, and the
// study thumbnails are the featured teardown pages themselves.
//
// Needs a hardware WebGL backend (the software profile drops bloom, shadows and
// reflections), the locked browser dependency, and Python 3 with Pillow:
//   npm ci --ignore-scripts --prefix tools/browser
//   node tools/browser/node_modules/playwright/cli.js install chromium
//   python3 -m http.server 4174 --bind 127.0.0.1
//   node tools/readme-media.mjs
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readdir, readFile, rm, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { featuredSlugs, root } from './build-gallery-featured.mjs';

const require = createRequire(import.meta.url);
const playwright = [process.env.PLAYWRIGHT_ROOT, join(root, 'tools/browser/node_modules/playwright'), 'playwright']
  .filter(Boolean).find(candidate => { try { return require.resolve(candidate); } catch { return false; } });
if (!playwright) throw new Error('Playwright is unavailable. Run: npm ci --ignore-scripts --prefix tools/browser');
const { chromium } = require(playwright);

const gallery = new URL(process.env.BEAMLINE_URL || 'http://127.0.0.1:4174/teardowns/index.html');
const still = 'teardowns/_gallery/beamline-readme.jpg'; // Also the gallery's og:image.
const loop = '.github/readme/beamline.webp';
const studies = '.github/readme/studies';
const fps = 24;

// Dwell at each station, travel like an adjacent station click, then rewind
// through the conveyor so the loop restarts where it began.
const ease = t => (t < 0.5 ? 4 * t ** 3 : 1 - (2 - 2 * t) ** 3 / 2);
const plan = [];
const travel = (from, to, seconds) => {
  const steps = Math.round(seconds * fps);
  for (let k = 1; k < steps; k++) plan.push({ progress: from + (to - from) * ease(k / steps), ms: 1000 / fps });
};
for (let station = 0; station < 5; station++) {
  plan.push({ progress: station / 4, ms: 1100 });
  if (station < 4) travel(station / 4, (station + 1) / 4, 1);
}
travel(1, 0, 1.8);

// Settle on the exact position the controller consumed, not a previous one.
async function settle(page, progress) {
  await page.evaluate(p => {
    const experience = document.getElementById('experience');
    const range = Math.max(1, experience.offsetHeight - innerHeight);
    scrollTo({ left: 0, top: experience.offsetTop + range * p, behavior: 'instant' });
  }, progress);
  await page.waitForFunction(() => {
    const experience = document.getElementById('experience');
    const range = Math.max(1, experience.offsetHeight - innerHeight);
    const expected = Math.min(1, Math.max(0, (scrollY - experience.offsetTop) / range));
    const state = window.BEAMLINE.inspect();
    return !state.moving && state.targetProgress === expected && state.progress === expected;
  }, null, { polling: 'raf', timeout: 10000 });
  await page.evaluate(() => new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done))));
}

const encoder = String.raw`
import json, sys
from PIL import Image
for job in json.load(sys.stdin):
    if job['kind'] == 'webp':
        frames = []
        for frame in job['frames']:
            with Image.open(frame['file']) as image:
                frames.append(image.convert('RGB').resize(tuple(job['size']), Image.LANCZOS))
        frames[0].save(job['out'], save_all=True, append_images=frames[1:], loop=0,
                       duration=[round(frame['ms']) for frame in job['frames']],
                       quality=job['quality'], method=6, minimize_size=True)
    else:
        with Image.open(job['src']) as image:
            image.convert('RGB').resize(tuple(job['size']), Image.LANCZOS).save(
                job['out'], quality=job['quality'], optimize=True, progressive=True)
`;

const work = await mkdtemp(join(tmpdir(), 'readme-media-'));
const browser = await chromium.launch({ headless: true, channel: 'chromium',
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
try {
  const context = await browser.newContext({ viewport: { width: 1512, height: 945 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(gallery.href, { waitUntil: 'load' });
  await page.waitForFunction(() => window.BEAMLINE?.inspect().scene?.sampleReady, null, { timeout: 30000 });
  const { renderer } = (await page.evaluate(() => window.BEAMLINE.inspect())).scene;
  if (renderer.software) throw new Error(`README media needs hardware WebGL; got ${renderer.name}`);
  await page.waitForTimeout(1000); // Shadows and the environment map settle after the first frames.
  const frames = [];
  for (const [index, step] of plan.entries()) {
    await settle(page, step.progress);
    const file = join(work, `frame-${String(index).padStart(3, '0')}.png`);
    await page.screenshot({ path: file });
    frames.push({ file, ms: step.ms });
  }
  await context.close();

  const jobs = [
    { kind: 'webp', frames, out: join(root, loop), size: [1280, 800], quality: 70 },
    { kind: 'jpeg', src: frames[0].file, out: join(root, still), size: [1920, 1200], quality: 85 },
  ];
  for (const slug of featuredSlugs) {
    const study = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const tab = await study.newPage();
    await tab.goto(new URL(`${slug}/teardown.html`, gallery).href, { waitUntil: 'load' });
    await tab.evaluate(() => document.fonts.ready);
    await tab.waitForTimeout(3000); // Let entrance motion finish.
    const src = join(work, `${slug}.png`);
    await tab.screenshot({ path: src });
    jobs.push({ kind: 'jpeg', src, out: join(root, studies, `${slug}.jpg`), size: [800, 500], quality: 82 });
    await study.close();
  }

  await mkdir(join(root, studies), { recursive: true });
  for (const file of await readdir(join(root, studies))) {
    if (file.endsWith('.jpg') && !featuredSlugs.includes(file.slice(0, -4))) await rm(join(root, studies, file));
  }
  const encoded = spawnSync('python3', ['-c', encoder], { input: JSON.stringify(jobs), stdio: ['pipe', 'inherit', 'inherit'] });
  if (encoded.error || encoded.status !== 0) throw new Error('Encoding failed; install Pillow with: python3 -m pip install Pillow');

  for (const job of jobs) console.log(`${job.out.slice(root.length + 1)}  ${((await stat(job.out)).size / 1e6).toFixed(2)} MB`);
  console.log(`Captured ${frames.length} frames on ${renderer.name}, Chromium ${browser.version()}.`);
  const readme = await readFile(join(root, 'README.md'), 'utf8');
  const listed = [...readme.matchAll(/\.github\/readme\/studies\/([\w-]+)\.jpg/g)].map(match => match[1]);
  if (listed.join() !== featuredSlugs.join()) console.warn(`README exhibition lists ${listed.join(', ')}; featured order is ${featuredSlugs.join(', ')}.`);
} finally {
  await browser.close();
  await rm(work, { recursive: true, force: true });
}
