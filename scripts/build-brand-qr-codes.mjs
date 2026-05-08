#!/usr/bin/env node
/**
 * build-brand-qr-codes.mjs
 *
 * Generates BFTA-branded QR codes for the most common scan-to URLs and saves
 * them in `public/brand-kit/qr-codes/`. Each QR is rendered at the H error
 * correction level so the center ~22% can be replaced with the BFTA square
 * bug logo without breaking scannability.
 *
 * Each variant is generated at two sizes:
 *   - {name}.png      — 1024×1024 (print master)
 *   - {name}-512.png  — 512×512  (web / social)
 *
 * Color scheme matches the brand kit: cream (#FFFAF0) background, black
 * (#000000) modules. Center bug is the cream-orange-alt square bug so it
 * blends seamlessly on the cream field.
 *
 * Run: node scripts/build-brand-qr-codes.mjs
 */

import QRCode from 'qrcode';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public', 'brand-kit', 'qr-codes');
const bugPath = path.join(
  root,
  'public',
  'brand-kit',
  'square-bugs',
  'square-cream-orange-alt.png',
);

const BFTA_BLACK = '#000000';
const BFTA_CREAM = '#FFFAF0';

const variants = [
  {
    name: 'donate',
    url: 'https://www.bitcoinforthearts.org/donate',
    purpose: 'Sponsor sheet, donor cards, post-event swag, business cards',
  },
  {
    name: 'art-zap-weekend',
    url: 'https://www.bitcoinforthearts.org/art-zap-weekend',
    purpose: 'Sponsor decks, event flyers, in-person handouts at Pubkey DC',
  },
  {
    name: 'home',
    url: 'https://www.bitcoinforthearts.org',
    purpose: 'General-purpose: business cards, signatures, generic flyers',
  },
  {
    name: 'volunteer',
    url: 'https://www.bitcoinforthearts.org/get-involved',
    purpose: 'Recruitment posters, table signage, conference handouts',
  },
  {
    name: 'grants',
    url: 'https://www.bitcoinforthearts.org/grants',
    purpose: 'Artist outreach, grant fairs, residency partnerships',
  },
  {
    name: 'x',
    url: 'https://x.com/Bitcoinfta',
    purpose: 'Follow-on-X CTAs at events, social posts',
  },
  {
    name: 'nostr',
    url: 'https://primal.net/p/npub15rnn220qfdyhpgv9apjt38nadc0dzj8a7zpcrd2q4spq5apvvt2suswnaw',
    purpose: 'Follow-on-Nostr CTAs, Bitcoin-native audience touchpoints',
  },
];

async function generateOne({ name, url }, size) {
  const qrBuffer = await QRCode.toBuffer(url, {
    errorCorrectionLevel: 'H',
    type: 'png',
    margin: 2,
    width: size,
    color: { dark: BFTA_BLACK, light: BFTA_CREAM },
  });

  const logoSize = Math.round(size * 0.22);
  const logoBuffer = await sharp(bugPath)
    .resize(logoSize, logoSize, { fit: 'contain', background: BFTA_CREAM })
    .png()
    .toBuffer();

  // White ring around logo so the QR modules underneath don't bleed visually.
  const ringSize = logoSize + Math.round(size * 0.025);
  const ringBuffer = await sharp({
    create: {
      width: ringSize,
      height: ringSize,
      channels: 4,
      background: BFTA_CREAM,
    },
  })
    .png()
    .toBuffer();

  const composed = await sharp(qrBuffer)
    .composite([
      {
        input: ringBuffer,
        gravity: 'center',
      },
      {
        input: logoBuffer,
        gravity: 'center',
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  return composed;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const summary = [];
  for (const v of variants) {
    for (const size of [1024, 512]) {
      const suffix = size === 1024 ? '' : `-${size}`;
      const filename = `${v.name}${suffix}.png`;
      const filepath = path.join(outDir, filename);
      const buf = await generateOne(v, size);
      await fs.writeFile(filepath, buf);
      summary.push({ filename, size, url: v.url, bytes: buf.length });
      console.log(`  wrote ${filename} (${size}×${size}, ${buf.length} bytes)`);
    }
  }

  console.log(`\nGenerated ${summary.length} files in ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
