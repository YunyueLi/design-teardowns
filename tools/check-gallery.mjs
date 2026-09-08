#!/usr/bin/env node
// Static data and local-resource checks only; no browser, network or npm packages.
import { readFile, stat, realpath } from 'node:fs/promises';
import { dirname, extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { Script } from 'node:vm';
import { featuredSlugs, readGalleryData, renderEntryCount, renderFeatured, root } from './build-gallery-featured.mjs';

const errors = [];
const files = new Set();
const loaded = new Map();
const gallery = 'teardowns/_gallery/';
const entry = 'teardowns/index.html';
const external = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;
const check = (condition, message) => { if (!condition) errors.push(message); };
const text = path => readFile(resolve(root, path), 'utf8');
const insideRoot = path => {
  const rel = relative(root, path);
  return rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
};

async function resource(ref, from, { localOnly = false, allowDirectory = false } = {}) {
  if (!ref || ref.startsWith('#')) return null;
  if (external.test(ref)) {
    check(!localOnly || ref.startsWith('data:'), `${from}: runtime resource must be local: ${ref}`);
    return null;
  }
  try {
    const path = decodeURIComponent(ref.split(/[?#]/, 1)[0]);
    // The site is published beneath a repository prefix, so /absolute URLs fail there.
    if (isAbsolute(path) || path.includes('\\')) throw new Error('use a relative URL');
    const target = resolve(dirname(resolve(root, from)), path);
    if (!insideRoot(target) || !insideRoot(await realpath(target))) throw new Error('path leaves the repository');
    const info = await stat(target);
    if (!(info.isFile() && info.size > 0) && !(allowDirectory && info.isDirectory())) {
      throw new Error('not a nonempty file');
    }
    files.add(relative(root, target));
    return relative(root, target);
  } catch (error) {
    errors.push(`${from}: ${ref}: ${error.message}`);
    return null;
  }
}

async function htmlResources(source, from, allowDirectory = false) {
  const clean = source.replace(/<!--[\s\S]*?-->/g, '');
  const scripts = [];
  for (const tag of clean.matchAll(/<([a-z][\w:-]*)\b[^>]*>/gi)) {
    const name = tag[1].toLowerCase();
    for (const attr of tag[0].matchAll(/\b(src|href|poster)\s*=\s*["']([^"']+)["']/gi)) {
      const loading = attr[1].toLowerCase() !== 'href' || name === 'link';
      const path = await resource(attr[2], from, { localOnly: loading, allowDirectory });
      if (path && name === 'script' && attr[1].toLowerCase() === 'src') scripts.push(path);
      if (path && name === 'link' && extname(path) === '.css') loaded.set(path, await text(path));
    }
    if (name === 'meta' && /\bproperty=["']og:image["']/i.test(tag[0])) {
      const ref = tag[0].match(/\bcontent=["']([^"']+)["']/i)?.[1];
      if (ref) await resource(ref, from, { localOnly: true });
    }
  }
  return scripts;
}

async function main() {
  if (process.argv.length > 2) throw new Error('Usage: node tools/check-gallery.mjs');
  const canonical = await readGalleryData(gallery + 'catalogue.js');
  const seed = await readGalleryData(gallery + 'featured.js');
  const catalogue = canonical.DESIGN_TEARDOWNS;
  const featured = seed.DESIGN_TEARDOWNS_FEATURED;
  check(Array.isArray(catalogue), 'Canonical catalogue must be an array.');
  check(Array.isArray(featured), 'Featured data must be an array.');
  if (!Array.isArray(catalogue) || !Array.isArray(featured)) return;
  check(catalogue.length >= featuredSlugs.length, `Canonical catalogue must contain at least ${featuredSlugs.length} studies.`);
  check(seed.DESIGN_TEARDOWNS_TOTAL === catalogue.length, 'Featured total differs from catalogue length.');
  check(isDeepStrictEqual(featured.map(item => item?.slug), featuredSlugs), 'Featured order must be: ' + featuredSlugs.join(', '));
  const seen = new Set();
  for (const item of catalogue) {
    if (!item || typeof item !== 'object') { errors.push('Catalogue contains an invalid record.'); continue; }
    for (const key of ['slug', 'title', 'subtitle', 'category', 'kind', 'cover', 'href']) {
      check(typeof item[key] === 'string' && item[key].trim().length > 0, `${item.slug ?? 'record'}: invalid ${key}`);
    }
    const validSlug = typeof item.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug);
    check(validSlug, `Invalid slug: ${item.slug}`);
    check(!seen.has(item.slug), `Duplicate slug: ${item.slug}`); seen.add(item.slug);
    check(['reference', 'product', 'agent', 'independent'].includes(item.category), `${item.slug}: unknown category`);
    check(item.titleZh === undefined || (typeof item.titleZh === 'string' && item.titleZh.trim()), `${item.slug}: invalid titleZh`);
    check(Array.isArray(item.accent) && item.accent.length === 3 && item.accent.every(color => /^#[\da-f]{6}$/i.test(color)), `${item.slug}: expected three hexadecimal accent colors`);
    check(item.href === `${item.slug}/teardown.html`, `${item.slug}: unexpected study URL`);
    check(item.cover === `_gallery/covers/${item.slug}.jpg`, `${item.slug}: unexpected cover URL`);
    for (const key of ['cover', 'href']) {
      if (typeof item[key] === 'string') await resource(item[key], entry, { localOnly: true });
    }
    if (validSlug) {
      for (const doc of ['出处与方法.md', '事实核查.md']) await resource(`${item.slug}/${doc}`, entry);
    }
  }
  for (const item of featured) {
    check(isDeepStrictEqual(item, catalogue.find(record => record?.slug === item?.slug)), `${item?.slug}: featured metadata differs from canonical catalogue`);
  }
  try {
    check(await text(gallery + 'featured.js') === renderFeatured(catalogue), 'featured.js is stale; run node tools/build-gallery-featured.mjs.');
  } catch (error) { errors.push(error.message); }

  const html = await text(entry);
  const scripts = await htmlResources(html, entry);
  const expectedScripts = ['featured.js', 'vendor/three.min.js', 'beamline-3d.js', 'beamline.js'].map(file => gallery + file);
  check(isDeepStrictEqual(scripts, expectedScripts), 'Homepage script order must be featured, local Three.js, scene, controller; catalogue must stay lazy.');
  try {
    check(renderEntryCount(html, catalogue.length) === html, 'HTML collection count differs from canonical catalogue.');
  } catch (error) { errors.push(error.message); }
  const categorySelect = html.match(/<select\b[^>]*id=["']archive-category["'][^>]*>([\s\S]*?)<\/select>/)?.[1] || '';
  const categories = [...categorySelect.matchAll(/value=["']([^"']+)["']/g)].map(match => match[1]);
  check(categories.includes('all') && catalogue.every(item => categories.includes(item?.category)), 'Archive filters do not cover catalogue categories.');
  for (const file of scripts) {
    const source = await text(file);
    new Script(source, { filename: file }); // Parse only; never initialize the browser/controller.
    if (file.includes('/vendor/')) continue;
    for (const match of source.matchAll(/\.(?:src|href)\s*=\s*["']([^"']+)["']/g)) {
      await resource(match[1], entry, { localOnly: true });
    }
  }
  for (const [file, css] of loaded) {
    for (const match of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) {
      await resource(match[1], file, { localOnly: true });
    }
  }
  // The vendored UMD library can expose its revision without constructing WebGL.
  const context = {};
  new Script(await text(gallery + 'vendor/three.min.js')).runInNewContext(context, { timeout: 2000 });
  check(context.THREE?.REVISION === '160', 'Expected the local Three.js runtime to be revision 160.');
  for (const [file, marker] of [
    ['vendor/THREE-LICENSE.txt', 'MIT License'],
    ['fonts/Oswald-OFL.txt', 'SIL OPEN FONT LICENSE'],
    ['fonts/IBMPlexMono-OFL.txt', 'SIL OPEN FONT LICENSE'],
    ['fonts/NotoSerifSC-OFL.txt', 'SIL OPEN FONT LICENSE'],
  ]) {
    if (await resource('_gallery/' + file, entry)) {
      check((await text(gallery + file)).includes(marker), `${file}: missing expected license text`);
    }
  }
  for (const file of ['README.md', 'PRODUCT.md', 'DESIGN.md', 'NOTICE']) {
    if (!await resource(file, 'README.md')) continue;
    const content = (await text(file)).replace(/```[\s\S]*?```/g, '');
    await htmlResources(content, file, true);
    for (const match of content.matchAll(/!?\[[^\]\n]*\]\(<?([^\s)>]+)>?\)/g)) {
      await resource(match[1], file, { allowDirectory: true });
    }
  }
  if (!errors.length) {
    console.log(`PASS ${catalogue.length} canonical studies; 6 featured records match all metadata fields and fixed order.`);
    console.log(`PASS ${files.size} local files/paths; entry resources, study links, provenance, fonts, Three.js r160 and licenses.`);
  }
}

main().catch(error => errors.push(error.message)).finally(() => {
  if (errors.length) {
    for (const error of errors) console.error(`FAIL ${error}`);
    process.exitCode = 1;
  }
  console.log('Scope: static checks only. Browser behavior, visual fidelity, remote links, merge and deployment are not verified.');
});
