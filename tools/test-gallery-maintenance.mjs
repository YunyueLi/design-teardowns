#!/usr/bin/env node
// Isolated fixtures only. The actual homepage, data and documents are read-only.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { featuredSlugs, readGalleryData, renderEntryCount, renderFeatured, root } from './build-gallery-featured.mjs';

const fixture = await mkdtemp(join(tmpdir(), 'gallery-maintenance-'));
const entry = 'teardowns/index.html';
const seed = 'teardowns/_gallery/featured.js';
const canonicalPath = 'teardowns/_gallery/catalogue.js';
const builder = 'tools/build-gallery-featured.mjs';
const checker = 'tools/check-gallery.mjs';
const legacy = 'tools/generate_index.py';
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const put = async (path, content) => {
  await mkdir(dirname(join(fixture, path)), { recursive: true });
  await writeFile(join(fixture, path), content);
};
const copy = async path => {
  await mkdir(dirname(join(fixture, path)), { recursive: true });
  await cp(join(root, path), join(fixture, path), { recursive: true });
};
const run = (path, args = []) => {
  const result = spawnSync(path.endsWith('.py') ? 'python3' : process.execPath,
    [join(fixture, path), ...args], { cwd: tmpdir(), encoding: 'utf8' });
  if (result.error) throw result.error;
  return result;
};
const expectRun = (path, args = [], status = 0, message) => {
  const result = run(path, args);
  assert.equal(result.status, status, result.stdout + result.stderr);
  if (message) assert.match(result.stdout + result.stderr, message);
  return result;
};
const snapshot = async () => Promise.all([entry, seed, canonicalPath].map(async path => ({
  path, hash: digest(await readFile(join(fixture, path))), mtime: (await stat(join(fixture, path), { bigint: true })).mtimeNs,
})));
const writeCatalogue = items => put(canonicalPath, `window.DESIGN_TEARDOWNS = Object.freeze(${JSON.stringify(items, null, 2)});\n`);

try {
  const { DESIGN_TEARDOWNS: records } = await readGalleryData(canonicalPath);
  // Keep this regression at 17 -> 18 even as the real catalogue grows later.
  const selected = new Set([...featuredSlugs, ...records.filter(item => !featuredSlugs.includes(item.slug)).slice(0, 11).map(item => item.slug)]);
  const base = records.filter(item => selected.has(item.slug));
  assert.equal(base.length, 17, 'Fixture requires six featured and eleven other archived studies.');
  for (const path of [builder, checker, legacy]) await copy(path);
  for (const path of ['beamline.js', 'beamline-3d.js', 'beamline.css', 'beamline-readme.jpg', 'fonts', 'vendor']) await copy('teardowns/_gallery/' + path);
  for (const item of base) {
    for (const path of [item.cover, item.href, `${item.slug}/出处与方法.md`, `${item.slug}/事实核查.md`]) await copy('teardowns/' + path);
  }
  await copy('teardowns/latrix/screenshots/hero.jpg');
  // Documentation is independently edited by the main agent; keep the fixture
  // focused on data/resources instead of depending on those concurrent edits.
  for (const doc of ['README.md', 'PRODUCT.md', 'DESIGN.md', 'NOTICE']) await put(doc, 'Gallery maintenance fixture.\n');

  const original = await readFile(join(root, entry), 'utf8');
  const markers = [...original.matchAll(/<b class="collection-count">(\d+)<\/b>/g)];
  assert.equal(markers.length, 1, 'The real homepage must contain the expected single count node.');
  const before = Buffer.from(original.replace(markers[0][0], '<b class="collection-count">17</b>'));
  await put(entry, before);
  await put(seed, renderFeatured(base));
  await writeCatalogue(base);
  expectRun(checker);

  const extra = { ...base[0], slug: 'fixture-eighteen', title: 'Fixture eighteen', cover: '_gallery/covers/fixture-eighteen.jpg', href: 'fixture-eighteen/teardown.html' };
  const expanded = [...base, extra];
  await put('teardowns/' + extra.cover, await readFile(join(root, 'teardowns', base[0].cover)));
  for (const file of ['teardown.html', '出处与方法.md', '事实核查.md']) await put('teardowns/fixture-eighteen/' + file, 'Fixture eighteen.\n');
  await writeCatalogue(expanded);
  const stale = await snapshot();
  expectRun(builder, ['--check'], 1, /stale/);
  expectRun(legacy, ['--check'], 1, /stale/);
  expectRun(checker, [], 1, /HTML collection count differs/);
  assert.deepEqual(await snapshot(), stale, 'Failed checks must not write files or change mtimes.');
  console.log('PASS stale 18-item fixture: --check rejects mismatches without writing.');

  expectRun(legacy, [], 0, /18 canonical studies/);
  const after = await readFile(join(fixture, entry));
  const prefix = Buffer.from('<b class="collection-count">');
  const start = before.indexOf(prefix) + prefix.length;
  assert.ok(start >= prefix.length);
  const expected = Buffer.concat([before.subarray(0, start), Buffer.from('18'), before.subarray(start + 2)]);
  assert.deepEqual(after, expected, 'Only the count digits may change in the actual homepage snapshot.');
  const unchangedBefore = Buffer.concat([before.subarray(0, start), before.subarray(start + 2)]);
  const unchangedAfter = Buffer.concat([after.subarray(0, start), after.subarray(start + 2)]);
  assert.equal(digest(unchangedBefore), digest(unchangedAfter));
  const generated = await readGalleryData(seed, fixture);
  assert.equal(generated.DESIGN_TEARDOWNS_TOTAL, 18);
  assert.deepEqual(generated.DESIGN_TEARDOWNS_FEATURED, featuredSlugs.map(slug => expanded.find(item => item.slug === slug)));
  expectRun(builder, ['--check']);
  expectRun(checker);
  const stable = await snapshot();
  expectRun(legacy, ['--check']);
  expectRun(legacy); // A second generate is a no-op, including timestamps.
  assert.deepEqual(await snapshot(), stable);
  console.log('PASS one legacy generate updates featured + homepage to 18; repeat generation and successful --check do not write.');
  console.log(`PASS homepage byte proof: only 17 -> 18; other-byte SHA256 ${digest(unchangedAfter)}`);

  for (const [name, malformed, error] of [
    ['missing node', original.replace(markers[0][0], ''), /exactly 1 collection-count node; found 0/],
    ['duplicate node', original + '\n<b class="collection-count">17</b>', /exactly 1 collection-count node; found 2/],
    ['non-numeric node', original.replace(markers[0][0], '<b class="collection-count">unknown</b>'), /only a decimal number/],
    ['nested content', original.replace(markers[0][0], '<b class="collection-count"><i>17</i></b>'), /only a decimal number/],
  ]) {
    await put(entry, malformed);
    await put(seed, renderFeatured(base)); // Ensure the builder has work to do.
    const unchanged = await snapshot();
    expectRun(builder, [], 1, error);
    assert.deepEqual(await snapshot(), unchanged, 'Malformed homepage must prevent both output writes.');
    console.log('PASS refuses ' + name + ' before writing either output.');
  }
  await put(entry, after);
  await put(seed, renderFeatured(expanded));
  for (const [items, error] of [
    [expanded.map(item => item.slug === extra.slug ? { ...item, category: 'invalid' } : item), /unknown category/],
    [[...expanded, expanded[0]], /Duplicate slug/],
    [base.slice(0, 5), /at least 6 studies/],
  ]) {
    await writeCatalogue(items);
    expectRun(checker, [], 1, error);
  }
  console.log('PASS category validity, unique slugs and minimum catalogue size remain enforced.');

  const variants = [
    '<span><b class=collection-count>17</b></span>',
    '<span><b id="count" class="small collection-count">\r\n 17 \t</b></span>',
    '<!-- <b class="collection-count">999</b> --><script>"<b class=collection-count>999</b>"</script><span><b class=collection-count>17</b></span>',
    '<b data-label="class=collection-count">999</b><b class="collection-count">17</b>',
  ];
  for (const html of variants) assert.equal(renderEntryCount(html, 100), html.replace('17', '100'));
  console.log('PASS quoted/unquoted classes, whitespace, non-node lookalikes and longer count text preserve surrounding markup.');
} finally {
  await rm(fixture, { recursive: true, force: true });
}
