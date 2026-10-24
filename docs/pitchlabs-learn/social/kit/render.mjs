// Usage: node render.mjs specs/<name>.json [--safe]
// Writes out/<name>-1.png ... for a carousel, out/<name>.png for a reel cover.
// --safe draws the Instagram profile-grid crop on covers (check only; never post that version).
import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import { basename, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const specPath = process.argv[2];
if (!specPath) { console.error('usage: node render.mjs specs/<name>.json [--safe]'); process.exit(1); }
const safe = process.argv.includes('--safe');
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
const name = basename(specPath, '.json');
const isCover = spec.type === 'cover';
const size = isCover ? { width: 1080, height: 1920 } : { width: 1080, height: 1350 };
const frames = isCover ? [0] : spec.slides.map((_, k) => k);

mkdirSync(resolve(here, 'out'), { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
await page.addInitScript(s => { window.SPEC = s; }, spec);
for (const k of frames) {
  const url = pathToFileURL(resolve(here, 'kit.html')).href + `?i=${k}` + (safe ? '&safe' : '');
  await page.goto(url);
  await page.waitForSelector('body[data-ready="1"]');
  const file = resolve(here, 'out', isCover ? `${name}${safe ? '-safe' : ''}.png` : `${name}-${k + 1}.png`);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, ...size } });
  console.log(file);
}
await browser.close();
