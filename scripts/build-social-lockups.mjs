// Generate social-media-ready square versions of every BFTA main lockup.
//
// Each source lockup is full-bleed (the type touches the edges of the
// canvas), which is correct for the website hero but cramped on social
// platforms — Instagram/X/LinkedIn crop the corners and the type bumps the
// safe area. This script puts the same artwork on a larger square canvas
// with breathing room around the type.
//
// Output:
//   public/social/<name>-2160.png   2160x2160 — high-res, works everywhere
//   public/social/<name>-1080.png   1080x1080 — IG profile/post native
//
// Each output's padding fills with the source's own background color so
// the result looks like a single piece of artwork (not a logo dropped on
// a different background).
//
// Run:
//   node scripts/build-social-lockups.mjs

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const outDir = path.join(publicDir, 'social');

// Brand palette
const CREAM = { r: 255, g: 250, b: 240 }; // #FFFAF0
const BLACK = { r: 0, g: 0, b: 0 };       // #000000
const ORANGE = { r: 255, g: 79, b: 20 };  // #FF4F14
const LIME = { r: 179, g: 255, b: 72 };   // #B3FF48

// Each entry pairs a source lockup with the background color the social
// canvas should fill with around it.
//
// NOTE: cream-orange-2 has a BLACK 'BITCOIN/FOR/THE' with an ORANGE 'Arts'
// script. cream-orange-1 has the inverse: ORANGE 'BITCOIN/FOR/THE' with a
// BLACK 'Arts' script. We expose them as 'cream-orange' (v2, the main one
// used in the website chrome) and 'cream-orange-alt' (v1) so file names
// stay descriptive.
const variants = [
  {
    label: 'cream-orange',
    input: 'BFTA-main-lockup-cream-orange-2.png',
    background: CREAM,
  },
  {
    label: 'cream-orange-alt',
    input: 'BFTA-main-lockup-cream-orange-1.png',
    background: CREAM,
  },
  {
    label: 'cream-black',
    input: 'BFTA-main-lockup-cream-black.png',
    background: CREAM,
  },
  {
    label: 'black-cream',
    input: 'BFTA-main-lockup-black-cream.png',
    background: BLACK,
  },
  {
    label: 'black-orange',
    input: 'BFTA-main-lockup-black-orange.png',
    background: BLACK,
  },
  {
    // Alt colorway: cream BITCOIN/FOR/THE + orange Arts on black.
    label: 'black-orange-alt',
    input: 'BFTA-main-lockup-black-orange-2.png',
    background: BLACK,
  },
  {
    label: 'orange',
    input: 'BFTA-main-lockup-orange.png',
    background: ORANGE,
  },
  {
    label: 'green',
    input: 'BFTA-main-lockup-green.png',
    background: LIME,
  },
  {
    // Alt colorway: black BITCOIN/FOR/THE + orange Arts on lime.
    label: 'green-alt',
    input: 'BFTA-main-lockup-green-2.png',
    background: LIME,
  },
];

// "post" lockups fill ~70% of the canvas — strong presence as a 1:1 feed
// post, still safe inside platform caption-gradient overlays.
//
// "profile" lockups fill ~55% of the canvas — small enough that the type
// stays comfortably inside the *circular* crop every platform applies to
// profile avatars (IG, X, FB, LinkedIn).
const FRACTIONS = {
  post: 0.7,
  profile: 0.55,
};

const SIZES = [2160, 1080];

// Profile variants: square images where the lockup is scaled down to ~55%
// of the canvas so the type stays comfortably inside the circular avatar
// crop every platform applies. Use these as profile pictures on
// IG / X / FB / LinkedIn.
//
// "main" = the full BITCOIN / FOR / THE / Arts wrap.
// "inline" = the BFTA inline lockup (much more legible at avatar size).
// Profile variants for the MAIN lockup only (full BITCOIN/FOR/THE/Arts
// wrap). Inline-bug profiles are generated separately via the dedicated
// inlineBugVariants set below so they all share consistent filename
// namespacing (`-inline-` family prefix).
const profileVariants = [
  { label: 'green-main', input: 'BFTA-main-lockup-green.png', background: LIME },
  { label: 'green-alt-main', input: 'BFTA-main-lockup-green-2.png', background: LIME },
  { label: 'orange-main', input: 'BFTA-main-lockup-orange.png', background: ORANGE },
  { label: 'black-orange-main', input: 'BFTA-main-lockup-black-orange.png', background: BLACK },
  { label: 'black-orange-alt-main', input: 'BFTA-main-lockup-black-orange-2.png', background: BLACK },
  { label: 'black-cream-main', input: 'BFTA-main-lockup-black-cream.png', background: BLACK },
  { label: 'cream-orange-alt-main', input: 'BFTA-main-lockup-cream-orange-1.png', background: CREAM },
];

// Circle-safe variants: same as profile mode (lockup at ~55% of canvas)
// but the square corners are masked out to full transparency so the file
// itself is already a circle. Drop these into any platform that lets you
// upload a transparent PNG and the avatar will look identical to the
// circular crop preview — no rectangle bleed-through behind the brand
// color, no surprises.
//
// We render circle-safe versions for every main lockup color so you can
// pick whichever color matches the campaign or post.
const circleSafeMainVariants = [
  { label: 'cream-orange', input: 'BFTA-main-lockup-cream-orange-2.png', background: CREAM },
  { label: 'cream-orange-alt', input: 'BFTA-main-lockup-cream-orange-1.png', background: CREAM },
  { label: 'cream-black', input: 'BFTA-main-lockup-cream-black.png', background: CREAM },
  { label: 'black-cream', input: 'BFTA-main-lockup-black-cream.png', background: BLACK },
  { label: 'black-orange', input: 'BFTA-main-lockup-black-orange.png', background: BLACK },
  { label: 'black-orange-alt', input: 'BFTA-main-lockup-black-orange-2.png', background: BLACK },
  { label: 'orange', input: 'BFTA-main-lockup-orange.png', background: ORANGE },
  { label: 'green', input: 'BFTA-main-lockup-green.png', background: LIME },
  { label: 'green-alt', input: 'BFTA-main-lockup-green-2.png', background: LIME },
];

// Square BFTA "bug" lockups (the 'BTA / FA' stacked square mark used as the
// header/footer logo) sized down for social. The bugs are full-bleed in
// the source files, so the same scale-down + canvas-fill trick gives them
// breathing room for use as profile pics or 1:1 posts. Each variant
// generates a profile (square with margin) and a circle-safe (pre-cropped
// circular PNG) output.
// Inline BFTA "bug" lockups (the wide, single-row 'BFTA + script A' mark).
// These are the most legible avatar option at small sizes — recommended
// as primary social profile pictures. Every brand-color file in the kit
// gets routed through profile (square w/ margin) + circle-safe (pre-
// cropped circular PNG) outputs. Family prefix 'inline' keeps these in
// their own filename namespace.
//
// Two-numbered colorways are inverted Arts-script color roles, exposed
// as '-alt' under the same color label for honest filenames:
//
//   cream-orange (v1): orange BFT + black 'A' script
//   cream-orange (v2): black  BFT + orange 'A' script
//   green        (v1): orange BFT + black 'A' script
//   green        (v2): black  BFT + orange 'A' script
const inlineBugVariants = [
  { label: 'cream-orange', input: 'BFTA-bug-inline-cream-orange-1.png', background: CREAM },
  { label: 'cream-orange-alt', input: 'BFTA-bug-inline-cream-orange-2.png', background: CREAM },
  { label: 'cream-white', input: 'BFTA-bug-inline-cream-white.png', background: CREAM },
  { label: 'black-cream', input: 'BFTA-bug-inline-black-cream (1).png', background: BLACK },
  { label: 'black-orange', input: 'BFTA-bug-inline-black-orange.png', background: BLACK },
  // Alt: cream BFT + orange A on black (inverse of black-orange v1).
  { label: 'black-orange-alt', input: 'BFTA-bug-inline-black-orange-2.png', background: BLACK },
  { label: 'orange', input: 'BFTA-bug-inline-orange (1).png', background: ORANGE },
  { label: 'green', input: 'BFTA-bug-inline-green-1.png', background: LIME },
  { label: 'green-alt', input: 'BFTA-bug-inline-green-2.png', background: LIME },
];

// Two cream-orange and two green bug variants exist with inverted color
// roles for the BTA wordmark vs the 'Arts' script. We expose them as the
// numbered v1/v2 pair under the same color label so the file naming stays
// honest.
//
//   cream-orange (v1): orange BTA + black 'Arts' on cream
//   cream-orange (v2): black  BTA + orange 'Arts' on cream
//   green        (v1): orange BTA + black 'Arts' on lime
//   green        (v2): black  BTA + orange 'Arts' on lime
const squareBugVariants = [
  { label: 'cream-orange', input: 'BFTA-bug-square-cream-orange-1.png', background: CREAM },
  { label: 'cream-orange-alt', input: 'BFTA-bug-square-cream-orange-2.png', background: CREAM },
  { label: 'cream-black', input: 'BFTA-bug-square-cream-black.png', background: CREAM },
  { label: 'black-cream', input: 'BFTA-bug-square-black-cream.png', background: BLACK },
  { label: 'black-orange', input: 'BFTA-bug-square-black-orange.png', background: BLACK },
  { label: 'orange', input: 'BFTA-bug-square-orange.png', background: ORANGE },
  { label: 'green', input: 'BFTA-bug-square-green-1.png', background: LIME },
  { label: 'green-alt', input: 'BFTA-bug-square-green-2.png', background: LIME },
];

// Banner variants: wide cover photos with the inline lockup centered and a
// lot of horizontal breathing room. Sized for native platform specs so
// you can drop them in without cropping.
//
// LinkedIn personal:  1584 x 396  (4:1)
// X (Twitter) header: 1500 x 500  (3:1)
// Facebook cover:     1640 x 624  (~21:8 — Facebook's recommended export)
const bannerSizes = [
  { name: 'linkedin', width: 1584, height: 396 },
  { name: 'x',        width: 1500, height: 500 },
  { name: 'facebook', width: 1640, height: 624 },
];

const bannerVariants = [
  { label: 'green', input: 'BFTA-bug-inline-green-1.png', background: LIME },
  // Alt: same lime field, inverse Arts-script color role (uses green-2 inline).
  { label: 'green-alt', input: 'BFTA-bug-inline-green-2.png', background: LIME },
  { label: 'black-orange', input: 'BFTA-bug-inline-black-orange.png', background: BLACK },
  // Alt: cream BFT + orange A on black (uses black-orange-2 inline).
  { label: 'black-orange-alt', input: 'BFTA-bug-inline-black-orange-2.png', background: BLACK },
  { label: 'black-cream', input: 'BFTA-bug-inline-black-cream (1).png', background: BLACK },
  // Alt: black BFT + orange A on cream (uses cream-orange-2 inline).
  { label: 'cream-orange-alt', input: 'BFTA-bug-inline-cream-orange-2.png', background: CREAM },
  { label: 'cream-orange', input: 'BFTA-bug-inline-cream-orange-1.png', background: CREAM },
];

// How wide the inline lockup should be inside a banner, as a fraction of
// the banner *height* (not width). 1.7x the banner height tends to leave
// breathing room on left+right while keeping the type readable on mobile.
const BANNER_LOCKUP_HEIGHT_FRACTION = 0.55;

async function buildOne({ input, label, background, mode, family = '' }, size) {
  const inputPath = path.join(publicDir, input);
  const fraction = FRACTIONS[mode];
  const familySegment = family ? `${family}-` : '';
  const filename = `BFTA-social-${mode}-${familySegment}${label}-${size}.png`;
  const outputPath = path.join(outDir, filename);

  const targetLockupSize = Math.round(size * fraction);

  // Resize the source lockup so its longer edge equals targetLockupSize.
  // For wide ("inline") lockups this naturally produces a much shorter
  // height, which is the desired effect — extra vertical breathing room
  // around the type.
  const resized = await sharp(inputPath)
    .resize({
      width: targetLockupSize,
      height: targetLockupSize,
      fit: 'inside',
      kernel: 'lanczos3',
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: background.r, g: background.g, b: background.b, alpha: 1 },
    },
  })
    .composite([{ input: resized, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`[social] wrote ${path.relative(projectRoot, outputPath)} (${size}x${size})`);
}

// Build a circular avatar PNG: identical composition to a 'profile' file
// (lockup centered at ~55% of canvas, brand color background) but with the
// square corners masked out to full transparency. Result is a self-circle
// PNG — drop directly into a platform that accepts transparent avatars.
async function buildCircleSafe({ input, label, background, family = '' }, size) {
  const inputPath = path.join(publicDir, input);
  const familySegment = family ? `${family}-` : '';
  const filename = `BFTA-social-circle-${familySegment}${label}-${size}.png`;
  const outputPath = path.join(outDir, filename);

  const lockupSize = Math.round(size * FRACTIONS.profile);

  // Build the square base (brand color + centered lockup).
  const resized = await sharp(inputPath)
    .resize({
      width: lockupSize,
      height: lockupSize,
      fit: 'inside',
      kernel: 'lanczos3',
    })
    .png()
    .toBuffer();

  const square = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: background.r, g: background.g, b: background.b, alpha: 1 },
    },
  })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
    .toBuffer();

  // SVG circle mask the size of the canvas — opaque circle, transparent
  // corners. Composited with `dest-in` keeps only the pixels of `square`
  // that fall inside the circle.
  const circleMask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
       <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/>
     </svg>`,
  );

  await sharp(square)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`[social] wrote ${path.relative(projectRoot, outputPath)} (${size}x${size}, circle)`);
}

async function buildBanner({ input, label, background }, banner) {
  const inputPath = path.join(publicDir, input);
  const { name, width, height } = banner;
  const filename = `BFTA-social-banner-${name}-${label}.png`;
  const outputPath = path.join(outDir, filename);

  const lockupHeight = Math.round(height * BANNER_LOCKUP_HEIGHT_FRACTION);

  const resized = await sharp(inputPath)
    .resize({
      // For wide inline lockups, constrain by *height* so they read
      // correctly inside a short, wide banner.
      height: lockupHeight,
      width: width, // hard ceiling so we never spill past the canvas
      fit: 'inside',
      kernel: 'lanczos3',
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: background.r, g: background.g, b: background.b, alpha: 1 },
    },
  })
    .composite([{ input: resized, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`[social] wrote ${path.relative(projectRoot, outputPath)} (${width}x${height})`);
}

async function main() {
  await mkdir(outDir, { recursive: true });

  // 1:1 feed-post variants for every brand color.
  for (const variant of variants) {
    for (const size of SIZES) {
      await buildOne({ ...variant, mode: 'post' }, size);
    }
  }

  // Profile-avatar variants (extra padding so circle crops don't clip
  // the type).
  for (const variant of profileVariants) {
    for (const size of SIZES) {
      await buildOne({ ...variant, mode: 'profile' }, size);
    }
  }

  // Pre-cropped circular avatars — same composition as 'profile' but the
  // square corners are knocked out, so the PNG itself is already a circle.
  for (const variant of circleSafeMainVariants) {
    for (const size of SIZES) {
      await buildCircleSafe(variant, size);
    }
  }

  // Square BFTA bug → social: profile (square w/ margin) and circle-safe
  // (transparent corners) for every brand color of the bug. Family prefix
  // 'bug' keeps these in their own filename namespace so they don't
  // collide with the main-lockup outputs above.
  for (const variant of squareBugVariants) {
    for (const size of SIZES) {
      await buildOne({ ...variant, mode: 'profile', family: 'bug' }, size);
      await buildCircleSafe({ ...variant, family: 'bug' }, size);
    }
  }

  // Inline BFTA lockups → social: same two outputs (profile + circle-safe)
  // for every color in the brand kit. Family prefix 'inline'. These are
  // the recommended primary social avatars because the wide BFTA wordmark
  // stays readable down to 32x32 in feed/notification rows.
  for (const variant of inlineBugVariants) {
    for (const size of SIZES) {
      await buildOne({ ...variant, mode: 'profile', family: 'inline' }, size);
      await buildCircleSafe({ ...variant, family: 'inline' }, size);
    }
  }

  // Cover banners for LinkedIn / X / Facebook.
  for (const variant of bannerVariants) {
    for (const banner of bannerSizes) {
      await buildBanner(variant, banner);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
