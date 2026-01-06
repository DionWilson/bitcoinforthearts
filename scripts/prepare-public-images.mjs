import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import convert from 'heic-convert';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

// Convert specific known uploads to stable web formats.
// Currently: Dion Bio Pic.heic -> /public/leadership/dion-wilson.jpg
const conversions = [
  {
    input: path.join(publicDir, 'Dion Bio Pic.heic'),
    outputDir: path.join(publicDir, 'leadership'),
    output: path.join(publicDir, 'leadership', 'dion-wilson.jpg'),
  },
];

function shouldConvert(input, output) {
  if (!existsSync(input)) return false;
  if (!existsSync(output)) return true;
  return statSync(input).mtimeMs > statSync(output).mtimeMs;
}

let didWork = false;

for (const job of conversions) {
  if (!existsSync(job.input)) {
    console.log(`[images] Missing input, skipping: ${path.relative(projectRoot, job.input)}`);
    continue;
  }

  mkdirSync(job.outputDir, { recursive: true });

  if (!shouldConvert(job.input, job.output)) {
    console.log(`[images] Up to date: ${path.relative(projectRoot, job.output)}`);
    continue;
  }

  console.log(`[images] Converting HEIC → JPG`);
  console.log(`[images] Input:  ${path.relative(projectRoot, job.input)}`);
  console.log(`[images] Output: ${path.relative(projectRoot, job.output)}`);

  const inputBuffer = readFileSync(job.input);
  const outputBuffer = await convert({
    buffer: inputBuffer,
    format: 'JPEG',
    quality: 0.88,
  });
  writeFileSync(job.output, outputBuffer);

  didWork = true;
}

if (!didWork) {
  // Keep output quiet on typical builds.
  console.log('[images] No image conversions needed.');
}

