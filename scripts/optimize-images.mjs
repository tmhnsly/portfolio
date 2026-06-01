#!/usr/bin/env node
// Convert raster images under public/images to optimised WebP.
//
// Runs automatically on every commit via .githooks/pre-commit (only on the
// images you just staged), or sweep the whole folder on demand with
// `pnpm images:optimize`. Already-WebP files are skipped, so it only does work
// when a new raster image actually needs converting — no manual runs required.
import { readdir, stat, rm } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const IMAGES_DIR = 'public/images';
const MAX_DIM = 2000; // longest side, in px — never upscales
const QUALITY = 80;
const RASTER = /\.(png|jpe?g|tiff?|heic|heif)$/i;
const staged = process.argv.includes('--staged');

const kb = (b) => `${Math.round(b / 1024)} KB`;

async function targets() {
  if (staged) {
    const out = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACM'], { encoding: 'utf8' });
    return out
      .split('\n')
      .filter(Boolean)
      .filter((f) => f.startsWith(`${IMAGES_DIR}/`) && RASTER.test(f));
  }
  let entries;
  try {
    entries = await readdir(IMAGES_DIR, { recursive: true, withFileTypes: true });
  } catch {
    return []; // no images dir yet
  }
  return entries
    .filter((e) => e.isFile() && RASTER.test(e.name))
    .map((e) => path.join(e.parentPath ?? IMAGES_DIR, e.name));
}

async function convert(file) {
  const out = file.replace(RASTER, '.webp');
  const before = (await stat(file)).size;
  await sharp(file)
    .rotate() // bake in EXIF orientation before metadata is dropped
    .resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  const after = (await stat(out)).size;
  if (staged) {
    execFileSync('git', ['rm', '-f', '--quiet', '--', file]); // drop the original (working tree + index)
    execFileSync('git', ['add', '--', out]); // stage the WebP in its place
  } else {
    await rm(file);
  }
  console.log(`  ${path.relative('.', file)}  ${kb(before)} -> ${path.basename(out)} ${kb(after)}`);
  return { before, after };
}

const files = await targets();
if (files.length === 0) process.exit(0);

console.log(`optimize-images: ${files.length} image(s) -> WebP (max ${MAX_DIM}px, q${QUALITY})`);
let totalBefore = 0;
let totalAfter = 0;
for (const f of files) {
  const { before, after } = await convert(f);
  totalBefore += before;
  totalAfter += after;
}
console.log(`optimize-images: ${kb(totalBefore)} -> ${kb(totalAfter)} (${Math.round(100 - (totalAfter / totalBefore) * 100)}% smaller)`);
