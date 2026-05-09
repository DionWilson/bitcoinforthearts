#!/usr/bin/env node
/**
 * build-badge-genesis-2026.mjs
 *
 * Builds the BFTA "2026 Genesis" Nostr badge image (NIP-58) from the
 * existing brand-kit asset `square-bugs/square-orange.png`.
 *
 * Output: `public/brand-kit/badges/genesis-2026.png` — 1024×1024 PNG,
 * circular crop with transparent corners and a thin black ring for
 * definition against any Nostr client background.
 *
 * After this runs, the public URL becomes:
 *   https://www.bitcoinforthearts.org/brand-kit/badges/genesis-2026.png
 * which is what gets pasted into BadgeBox's "Image URL" field.
 *
 * Run: node scripts/build-badge-genesis-2026.mjs
 */

import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const sourcePath = path.join(
  root,
  'public',
  'brand-kit',
  'square-bugs',
  'square-orange.png',
);
const outDir = path.join(root, 'public', 'brand-kit', 'badges');
const outPath = path.join(outDir, 'genesis-2026.png');

const SIZE = 1024;

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  // The source is 4000×4565 (taller than wide) and the BFTA mark fills
  // most of the frame. To keep the entire bug visible inside the
  // circular crop, we pad it onto a square canvas with extra orange
  // background — that way nothing gets clipped at the corners.
  const meta = await sharp(sourcePath).metadata();
  const longestEdge = Math.max(meta.width ?? 0, meta.height ?? 0);
  // Half-diagonal of the bug rectangle = sqrt((w/2)^2 + (h/2)^2). We
  // want the canvas to be large enough that a circle inscribed in it
  // (radius = canvas/2) entirely contains the bug's half-diagonal.
  // A canvas side of 1.45 × longestEdge gives plenty of margin for any
  // aspect ratio of the source bug.
  const canvasSize = Math.round(longestEdge * 1.45);

  // Orange brand color from public/brand-kit guidelines.
  const BFTA_ORANGE = { r: 255, g: 79, b: 20, alpha: 1 };

  // Step 1: pad the bug onto a square orange canvas, centered.
  const paddedBuffer = await sharp(sourcePath)
    .resize({
      width: canvasSize,
      height: canvasSize,
      fit: 'contain',
      background: BFTA_ORANGE,
    })
    .png()
    .toBuffer();

  // Step 2: downsample to the final 1024×1024.
  const downsampled = await sharp(paddedBuffer)
    .resize(SIZE, SIZE, { fit: 'fill', kernel: 'lanczos3' })
    .png()
    .toBuffer();

  // Step 3: build a circular mask SVG. White inside the circle (visible),
  // transparent outside. Combined with `dest-in` blend mode, this clips
  // the badge to a circle with transparent corners.
  const maskSvg = `
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2 - 6}" fill="white"/>
    </svg>
  `;

  // Step 4: thin black ring overlay for definition against any background.
  const ringSvg = `
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2 - 8}"
              fill="none" stroke="#000000" stroke-width="6"/>
    </svg>
  `;

  // Step 5: composite mask + ring onto the downsampled image.
  const finalBuffer = await sharp(downsampled)
    .composite([
      { input: Buffer.from(maskSvg), blend: 'dest-in' },
      { input: Buffer.from(ringSvg), blend: 'over' },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  await fs.writeFile(outPath, finalBuffer);

  const finalMeta = await sharp(finalBuffer).metadata();
  console.log(`✔ Wrote ${path.relative(root, outPath)}`);
  console.log(`  Dimensions: ${finalMeta.width}×${finalMeta.height}`);
  console.log(`  Bytes:      ${finalBuffer.length}`);
  console.log(`  Public URL after deploy: https://www.bitcoinforthearts.org/${path.relative(path.join(root, 'public'), outPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
