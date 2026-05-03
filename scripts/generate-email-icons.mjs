import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT_DIR = path.join(process.cwd(), 'public', 'email-icons');

const PURPLE = '#7e57c2'; // matches --primary in app/globals.css
const SIZE = 36; // good for email signatures (renders crisp at ~18px)

function svgIcon(pathD) {
  // Use a consistent viewBox so icons align.
  return Buffer.from(
    `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 24 24">
  <path fill="${PURPLE}" d="${pathD}"/>
</svg>`,
  );
}

async function writePng(name, input) {
  const outPath = path.join(OUT_DIR, `${name}.png`);
  const buf = await sharp(input, { density: 256 })
    .resize(SIZE, SIZE, { fit: 'contain' })
    .png()
    .toBuffer();
  await fs.writeFile(outPath, buf);
}

async function writeNostrFromOstrich() {
  // Convert the uploaded ostrich (white on black) to a purple icon on transparent background.
  // Approach: use the image luminance as alpha (white = opaque, black = transparent).
  const srcPath = path.join(process.cwd(), 'public', 'nostr.PNG');

  const alpha = await sharp(srcPath)
    .resize(SIZE, SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .greyscale()
    .extractChannel(0)
    .raw()
    .toBuffer();

  const base = sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 3,
      background: { r: 126, g: 87, b: 194 },
    },
  });

  const outPath = path.join(OUT_DIR, 'nostr.png');
  const buf = await base
    .joinChannel(alpha, { raw: { width: SIZE, height: SIZE, channels: 1 } })
    .png()
    .toBuffer();

  await fs.writeFile(outPath, buf);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  // Paths copied from components/SocialIconLinks.tsx
  await writePng(
    'x',
    svgIcon(
      'M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.6L6 22H2.9l7.3-8.4L1 2h6.3l4.4 6.1L18.9 2Zm-1.1 18h1.7L6.1 3.9H4.3L17.8 20Z',
    ),
  );

  await writePng(
    'tiktok',
    svgIcon(
      'M16.7 3c.4 2.2 1.7 3.9 3.7 4.9V11c-1.9.1-3.6-.5-5.1-1.6v6.8c0 3.7-3 6.8-6.8 6.8S1.7 19.9 1.7 16.2c0-3.7 3-6.8 6.8-6.8.4 0 .8 0 1.2.1v3.4c-.4-.1-.8-.2-1.2-.2-1.8 0-3.2 1.5-3.2 3.2 0 1.8 1.5 3.2 3.2 3.2 1.9 0 3.3-1.6 3.3-3.6V3h3.7Z',
    ),
  );

  await writePng(
    'facebook',
    svgIcon(
      'M13.5 22v-8h2.7l.5-3h-3.2V9.1c0-.9.3-1.6 1.7-1.6h1.6V4.9c-.8-.1-1.8-.2-3-.2-2.9 0-4.8 1.8-4.8 5v1.3H6v3h2.4v8h5.1Z',
    ),
  );

  await writePng(
    'linkedin',
    svgIcon(
      'M6.5 7.3A1.8 1.8 0 1 1 6.5 3.7a1.8 1.8 0 0 1 0 3.6ZM4.8 20.3h3.4V9H4.8v11.3ZM9.9 9h3.3v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 5.9v5.7h-3.4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.1H9.9V9Z',
    ),
  );

  await writePng(
    'instagram',
    svgIcon(
      'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM18 6.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z',
    ),
  );

  await writeNostrFromOstrich();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

