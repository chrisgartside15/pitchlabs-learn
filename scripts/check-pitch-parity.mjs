#!/usr/bin/env node
/**
 * Drift guard for lib/pitch7v7.js, the vendored copy of PitchLabs' 7v7 pitch spec.
 * Reads the app's own files (../app by default, or PITCHLABS_APP) and fails if the numbers or skin colours differ.
 * Skips with a warning when the app checkout is not beside this repo. Run: npm run check:pitch
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const learnRoot = resolve(here, '..')
const appRoot = process.env.PITCHLABS_APP ? resolve(process.env.PITCHLABS_APP) : resolve(learnRoot, '../app')

const files = {
  fields: resolve(appRoot, 'lib/fieldDefinitions.ts'),
  buildOut: resolve(appRoot, 'lib/buildOut7v7.ts'),
  skins: resolve(appRoot, 'lib/pitchSkins.ts'),
}

if (!Object.values(files).every(existsSync)) {
  console.warn(`check-pitch-parity: app files not found under ${appRoot}; skipping.`)
  process.exit(0)
}

// Load the vendored module (plain ESM text, no imports) without needing "type": "module".
const src = readFileSync(resolve(learnRoot, 'lib/pitch7v7.js'), 'utf8').replace(/^export /gm, '')
const mod = new Function(`${src}\nreturn { YD, FIELD, GEOMETRY, BUILD_OUT, SKINS }`)()

const fields = readFileSync(files.fields, 'utf8')
const start = fields.indexOf("'7v7': {")
if (start < 0) {
  console.error("check-pitch-parity: could not find the '7v7' definition in fieldDefinitions.ts")
  process.exit(1)
}
const block = fields.slice(start, fields.indexOf("'7v7-no-buildout'", start))
const num = (re) => {
  const m = block.match(re)
  if (!m) throw new Error(`pattern not found: ${re}`)
  return Number(m[1])
}

const spec = {
  length: num(/width:\s*(\d+)/), // field.width is the long side
  width: num(/height:\s*(\d+)/),
  penW: num(/penaltyBox:\s*\{\s*width:\s*(\d+)/),
  penD: num(/penaltyBox:\s*\{[^}]*depth:\s*(\d+)/),
  areaW: num(/goalArea:\s*\{\s*width:\s*(\d+)/),
  areaD: num(/goalArea:\s*\{[^}]*depth:\s*(\d+)/),
  circleR: num(/centerCircle:\s*\{\s*radius:\s*(\d+)/),
  spot: num(/penaltySpot:\s*\{\s*distance:\s*(\d+)/),
  arcR: num(/penaltyArc:\s*\{\s*radius:\s*(\d+)/),
  goalW: num(/goal:\s*\{\s*width:\s*(\d+)/),
  goalD: num(/goal:\s*\{[^}]*depth:\s*([\d.]+)/),
}

const Y = mod.YD
const G = mod.GEOMETRY
const expected = [
  ['field width (short side)', mod.FIELD.w, spec.width * Y],
  ['field length (long side)', mod.FIELD.h, spec.length * Y],
  ['penalty box width', G.penTop.w, spec.penW * Y],
  ['penalty box depth', G.penTop.h, spec.penD * Y],
  ['goal area width', G.areaTop.w, spec.areaW * Y],
  ['goal area depth', G.areaTop.h, spec.areaD * Y],
  ['centre circle radius', G.circle.r, spec.circleR * Y],
  ['penalty spot distance', G.spotTop.y, spec.spot * Y],
  ['goal width', G.goalTop.w, spec.goalW * Y],
  ['goal depth', G.goalTop.h, spec.goalD * Y],
  ['build-out line (lower)', mod.BUILD_OUT.lowerY, (mod.FIELD.h - spec.penD * Y + mod.FIELD.h / 2) / 2],
]

const problems = expected.filter(([, got, want]) => Math.abs(got - want) > 0.001)

// Build-out rule: still "midway between the penalty inner edge and halfway"?
const rule = readFileSync(files.buildOut, 'utf8')
if (!/\(\s*params\.penaltyInnerY\s*\+\s*params\.halfwayLineY\s*\)\s*\/\s*2/.test(rule)) {
  problems.push(['build-out rule', 'vendored: midway', 'app rule text changed, check lib/buildOut7v7.ts'])
}

// Skins.
const skins = readFileSync(files.skins, 'utf8')
const want = {
  pitchlabs: { fill: '#1e3248', line: 'rgba(238, 242, 248, 0.94)', exterior: '#131820' },
  classic: { fill: '#2e6728', a: '#326e2b', b: '#2a6025', line: 'rgba(250, 250, 252, 0.94)' },
}
const pl = mod.SKINS.pitchlabs
const cl = mod.SKINS.classic
for (const [label, mine, theirs] of [
  ['pitchlabs fill', pl.fill, want.pitchlabs.fill],
  ['pitchlabs line', pl.line, want.pitchlabs.line],
  ['pitchlabs exterior', pl.exterior, want.pitchlabs.exterior],
  ['classic fill', cl.fill, want.classic.fill],
  ['classic stripe a', cl.stripes[0], want.classic.a],
  ['classic stripe b', cl.stripes[1], want.classic.b],
  ['classic line', cl.line, want.classic.line],
]) {
  if (mine !== theirs) problems.push([label, mine, theirs])
  if (!skins.includes(theirs)) problems.push([`${label} (app file no longer has ${theirs})`, mine, 'changed in app'])
}

if (problems.length) {
  console.error('check-pitch-parity: lib/pitch7v7.js has drifted from the PitchLabs app:')
  problems.forEach(([what, got, wantV]) => console.error(`  - ${what}: vendored ${got}, app ${wantV}`))
  process.exit(1)
}
console.log('check-pitch-parity: lib/pitch7v7.js matches the app (field, markings, build-out rule, skins).')
