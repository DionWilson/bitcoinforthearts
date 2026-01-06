import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import ffmpegStatic from 'ffmpeg-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const inputMov =
  process.env.HOME_INTRO_SOURCE_MOV ??
  path.join(projectRoot, 'public', 'BFTA-home-page.MOV');

const outputMp4 =
  process.env.HOME_INTRO_OUTPUT_MP4 ??
  path.join(projectRoot, 'public', 'BFTA-home-page.mp4');

function shouldConvert() {
  if (!existsSync(inputMov)) return false;
  if (!existsSync(outputMp4)) return true;

  const inStat = statSync(inputMov);
  const outStat = statSync(outputMp4);
  return inStat.mtimeMs > outStat.mtimeMs;
}

if (!existsSync(inputMov)) {
  console.log(
    `[home-intro] No MOV found at ${inputMov}. Skipping video conversion.`,
  );
  process.exit(0);
}

if (!shouldConvert()) {
  console.log('[home-intro] MP4 is up to date. Skipping video conversion.');
  process.exit(0);
}

const ffmpegPath = typeof ffmpegStatic === 'string' ? ffmpegStatic : null;
if (!ffmpegPath) {
  console.error(
    '[home-intro] ffmpeg path not found (ffmpeg-static). Cannot convert video.',
  );
  process.exit(1);
}

console.log(`[home-intro] Converting MOV → MP4`);
console.log(`[home-intro] Input:  ${inputMov}`);
console.log(`[home-intro] Output: ${outputMp4}`);

const args = [
  '-y',
  '-hide_banner',
  '-loglevel',
  'error',
  '-i',
  inputMov,
  '-map',
  '0:v:0',
  '-map',
  '0:a?',
  // Mobile/browser-friendly H.264 output:
  // - yuv420p + baseline improves compatibility (especially older iOS)
  // - force even dimensions to avoid encoder failures on odd-sized sources
  '-vf',
  'scale=trunc(iw/2)*2:trunc(ih/2)*2',
  '-c:v',
  'libx264',
  '-profile:v',
  'baseline',
  '-level',
  '3.0',
  '-pix_fmt',
  'yuv420p',
  '-movflags',
  '+faststart',
  '-preset',
  'veryfast',
  '-crf',
  '23',
  '-c:a',
  'aac',
  '-b:a',
  '128k',
  outputMp4,
];

const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log('[home-intro] Done.');

