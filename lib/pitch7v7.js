/**
 * 7v7 pitch geometry for the Shape board, vendored from the PitchLabs app (read 2026-10-12), not imported, so
 * Learn does not depend on app internals at build time:
 *   - app/lib/fieldDefinitions.ts  `'7v7'`  60 x 40 yd, penalty box 24 x 12, goal area 8 x 4, centre circle r 8,
 *     penalty spot 10, penalty arc r 8, goal 6 yd wide x 1.5 deep.
 *   - app/lib/buildOut7v7.ts  build-out line midway between the penalty area's inner edge and the halfway line
 *     ("not a fixed yard offset from halfway").
 *   - app/lib/pitchSkins.ts  the `classic` and `pitchlabs` pitch colours.
 * If the app's 7v7 field or build-out rule changes, update this file to match.
 *
 * User units: 10 per yard, so the pitch is 400 x 600 with the top as the attacking end (y = 0) and our goal at
 * the bottom (y = 600). Not a research claim: a drawing of PitchLabs' own 7v7 field. Real leagues vary (U.S.
 * Soccer's 2017 article puts the build-out line 14 yards from goal), and the board says so.
 */

export const YD = 10
export const FIELD = { w: 40 * YD, h: 60 * YD }

const PEN = { w: 24 * YD, d: 12 * YD }
const AREA = { w: 8 * YD, d: 4 * YD }
const GOAL = { w: 6 * YD, d: 1.5 * YD }
const CIRCLE_R = 8 * YD
const SPOT = 10 * YD
const ARC_R = 8 * YD

const cx = FIELD.w / 2
const mid = FIELD.h / 2

// The penalty arc is the part of the r-8 circle around the spot that sits outside the box.
const arcHalfChord = Math.sqrt(ARC_R * ARC_R - (PEN.d - SPOT) * (PEN.d - SPOT))

export const GEOMETRY = {
  penTop: { x: cx - PEN.w / 2, y: 0, w: PEN.w, h: PEN.d },
  penBottom: { x: cx - PEN.w / 2, y: FIELD.h - PEN.d, w: PEN.w, h: PEN.d },
  areaTop: { x: cx - AREA.w / 2, y: 0, w: AREA.w, h: AREA.d },
  areaBottom: { x: cx - AREA.w / 2, y: FIELD.h - AREA.d, w: AREA.w, h: AREA.d },
  goalTop: { x: cx - GOAL.w / 2, y: -GOAL.d, w: GOAL.w, h: GOAL.d },
  goalBottom: { x: cx - GOAL.w / 2, y: FIELD.h, w: GOAL.w, h: GOAL.d },
  circle: { cx, cy: mid, r: CIRCLE_R },
  spotTop: { x: cx, y: SPOT },
  spotBottom: { x: cx, y: FIELD.h - SPOT },
  arcTop: `M ${cx - arcHalfChord} ${PEN.d} A ${ARC_R} ${ARC_R} 0 0 0 ${cx + arcHalfChord} ${PEN.d}`,
  arcBottom: `M ${cx - arcHalfChord} ${FIELD.h - PEN.d} A ${ARC_R} ${ARC_R} 0 0 1 ${cx + arcHalfChord} ${FIELD.h - PEN.d}`,
}

/** Build-out lines, midway between each penalty area's inner edge and the halfway line. */
export const BUILD_OUT = {
  upperY: (PEN.d + mid) / 2,
  lowerY: (FIELD.h - PEN.d + mid) / 2,
}

export const SKINS = {
  pitchlabs: {
    id: 'pitchlabs',
    label: 'PitchLabs',
    stripes: null,
    fill: '#1e3248',
    line: 'rgba(238, 242, 248, 0.94)',
    exterior: '#131820',
  },
  classic: {
    id: 'classic',
    label: 'Grass',
    stripes: ['#326e2b', '#2a6025'],
    fill: '#2e6728',
    line: 'rgba(250, 250, 252, 0.94)',
    exterior: '#173d1a',
  },
}
