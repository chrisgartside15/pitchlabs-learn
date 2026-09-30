// Renders one printable to Letter and A4 PDFs. Run by build.sh from a temp work dir that holds the bundled
// <name>.bundle.mjs and a node_modules symlink to the PitchLabs app, so `sharp` and `@react-pdf/renderer`
// resolve from there. Usage: node render.mjs <name> <outDir> <appDir> <assetsDir>
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const [name, outDir, APP, ASSETS] = process.argv.slice(2);

// name → exported render function, published file stem, and any diagram the page needs.
const PRINTABLES = {
  'activity-sheet': { fn: 'renderBlank', out: 'pitchlabs-activity-sheet', diagram: 'blank-box' },
  'session-plan': { fn: 'renderBlankSession', out: 'pitchlabs-session-plan' },
  'switch-of-play': { fn: 'renderSwitch', out: 'switch-of-play-to-four-goals', diagram: 'switch' },
  'interaction-menu': { fn: 'renderMenu', out: 'coaching-interaction-menu' },
  'six-ways-to-step-in': { fn: 'renderStops', out: 'six-ways-to-step-in' },
  'tally-sheet': { fn: 'renderTally', out: 'coaching-tally-sheet' },
};

const spec = PRINTABLES[name];
if (!spec) {
  console.error(`Unknown printable "${name}". Known: ${Object.keys(PRINTABLES).join(', ')}`);
  process.exit(1);
}

const dataUri = (mime, buf) => `data:${mime};base64,${buf.toString('base64')}`;
const logoSrc = dataUri('image/png', await sharp(join(APP, 'public/Main Logo 2048x2048.png')).resize(256).png().toBuffer());

let diagramSrc;
if (spec.diagram === 'blank-box') {
  // Plain white drawing box at the app's 16:9 diagram size, with a light slate edge so it prints clearly.
  const W = 2400, H = 1350, b = 8;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#ffffff"/><rect x="${b / 2}" y="${b / 2}" width="${W - b}" height="${H - b}" fill="none" stroke="#94a3b8" stroke-width="${b}"/></svg>`;
  diagramSrc = dataUri('image/png', await sharp(Buffer.from(svg)).png().toBuffer());
} else if (spec.diagram === 'switch') {
  // The diagram as exported from PitchLabs (extracted from Chris's original activity PDF).
  diagramSrc = dataUri('image/jpeg', readFileSync(join(ASSETS, 'switch-of-play-diagram.jpg')));
}

const mod = await import(`./${name}.bundle.mjs`);
for (const [paper, suffix] of [['LETTER', 'letter'], ['A4', 'a4']]) {
  const r = await mod[spec.fn]({ publicDir: join(APP, 'public'), paper, logoSrc, diagramSrc });
  const file = join(outDir, `${spec.out}-${suffix}.pdf`);
  writeFileSync(file, r.bytes);
  console.log(`${spec.out}-${suffix}.pdf  pages ${r.pages}  density level ${r.level}`);
}
