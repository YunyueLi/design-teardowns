#!/usr/bin/env node
// The catalogue is repository-owned data. The VM avoids requiring a browser;
// it is not a sandbox for running untrusted third-party JavaScript.
import { readFile, realpath, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const featuredSlugs = Object.freeze([
  'shopify-editions', 'pear', 'shopify-editions-spring26', 'moonshot', 'comet', 'latrix',
]);
const expectedCountNodes = 1; // One panel is moved between the page and dialog.

export async function readGalleryData(relativePath, repoRoot = root) {
  const source = await readFile(resolve(repoRoot, relativePath), 'utf8');
  const context = { window: {} };
  new Script(source, { filename: relativePath }).runInNewContext(context, { timeout: 1000 });
  // Normalize cross-realm objects into plain data, keeping all metadata fields.
  return JSON.parse(JSON.stringify(context.window));
}

export function renderFeatured(catalogue) {
  if (!Array.isArray(catalogue) || catalogue.length < featuredSlugs.length) {
    throw new Error(`Canonical catalogue must contain at least ${featuredSlugs.length} studies.`);
  }
  const bySlug = new Map(catalogue.map(item => [item.slug, item]));
  if (bySlug.size !== catalogue.length) throw new Error('Canonical catalogue contains duplicate slugs.');
  const items = featuredSlugs.map(slug => {
    if (!bySlug.has(slug)) throw new Error(`Featured slug is missing from catalogue: ${slug}`);
    return bySlug.get(slug);
  });
  return '// Generated from catalogue.js by tools/build-gallery-featured.mjs. Do not edit metadata here.\n'
    + `window.DESIGN_TEARDOWNS_TOTAL = ${catalogue.length};\n`
    + `window.DESIGN_TEARDOWNS_FEATURED = Object.freeze(${JSON.stringify(items, null, 2)});\n`;
}

export function renderEntryCount(source, total) {
  if (!Number.isSafeInteger(total) || total < featuredSlugs.length) throw new Error('Invalid canonical total.');
  // Mask comments and raw script/style text without shifting source offsets.
  // This is a narrow count-text edit, not an HTML parser/serializer.
  const markup = source.replace(/<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,
    match => ' '.repeat(match.length));
  const nodes = [];
  const tags = /<([a-z][\w:-]*)(\s(?:[^"'<>]|"[^"]*"|'[^']*')*)?>/gi;
  const attributes = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const tag of markup.matchAll(tags)) {
    const classes = [...(tag[2] || '').matchAll(attributes)]
      .filter(attribute => attribute[1].toLowerCase() === 'class')
      .map(attribute => attribute[2] ?? attribute[3] ?? attribute[4] ?? '');
    if (!classes.some(value => value.split(/\s+/).includes('collection-count'))) continue;
    if (classes.length !== 1 || tag[1].toLowerCase() !== 'b') {
      throw new Error('Expected collection-count on a <b> element with one class attribute.');
    }
    const contentStart = tag.index + tag[0].length;
    const content = source.slice(contentStart).match(/^(\s*)(\d+)(\s*<\/b\s*>)/i);
    if (!content) throw new Error('collection-count must contain only a decimal number.');
    nodes.push({ start: contentStart + content[1].length, length: content[2].length });
  }
  if (nodes.length !== expectedCountNodes) {
    throw new Error(`Expected exactly ${expectedCountNodes} collection-count node; found ${nodes.length}. No files written.`);
  }
  const { start, length } = nodes[0];
  return source.slice(0, start) + total + source.slice(start + length);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args.length === 1 && args[0] !== '--check')) {
    throw new Error('Usage: node tools/build-gallery-featured.mjs [--check]');
  }
  const data = await readGalleryData('teardowns/_gallery/catalogue.js');
  const expected = renderFeatured(data.DESIGN_TEARDOWNS);
  const target = resolve(root, 'teardowns/_gallery/featured.js');
  const entry = resolve(root, 'teardowns/index.html');
  const entryBytes = await readFile(entry);
  const entrySource = entryBytes.toString('utf8');
  if (!Buffer.from(entrySource, 'utf8').equals(entryBytes)) throw new Error('Homepage must be valid UTF-8; refusing to rewrite its bytes.');
  // Validate the complete edit before writing either output.
  const expectedEntry = renderEntryCount(entrySource, data.DESIGN_TEARDOWNS.length);
  const previous = await readFile(target, 'utf8').catch(error => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  if (args[0] === '--check') {
    const stale = [];
    if (previous !== expected) stale.push('featured.js');
    if (entrySource !== expectedEntry) stale.push('index.html collection-count');
    if (stale.length) {
      throw new Error(`${stale.join(' and ')} is stale. Run node tools/build-gallery-featured.mjs. No files written.`);
    }
    console.log(`PASS ${featuredSlugs.length} featured studies and ${expectedCountNodes} homepage count match ${data.DESIGN_TEARDOWNS.length} canonical studies. No files written.`);
  } else {
    if (previous !== expected) await writeFile(target, expected);
    if (entrySource !== expectedEntry) await writeFile(entry, expectedEntry);
    console.log(`${previous === expected ? 'Unchanged' : 'Generated'} featured.js: ${featuredSlugs.length} featured studies, ${data.DESIGN_TEARDOWNS.length} total.`);
    console.log(`${entrySource === expectedEntry ? 'Unchanged' : 'Updated'} index.html: ${expectedCountNodes} collection-count text; all other bytes preserved.`);
  }
}

const invokedPath = process.argv[1] && await realpath(resolve(process.argv[1])).catch(() => null);
if (invokedPath === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(`FAIL ${error.message}`); process.exitCode = 1; });
}
