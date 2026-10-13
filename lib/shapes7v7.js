/**
 * The 7v7 shapes the Shape board and the article's static diagrams draw. Coordinates are in the 400 x 600 pitch
 * space of lib/pitch7v7.js, our goal at the bottom, attacking up. Plain data, no React, so scripts can read it.
 */

// Position numbers (`num`) follow the usual 11-a-side convention: 1 keeper, 2 right back, 3 left back, 4 and 5 centre
// backs, 6 holding midfield, 7 right wide, 8 central midfield, 9 and 10 forwards, 11 left wide. Right and left are
// from the team's own point of view, looking up the pitch. The 3-2-1 set (1, 2, 3, 5, 6, 8, 9) matches the numbers
// on Chris's own diagram (FORMATION_1-2-3-1_NOTES.md). The 2-3-1 and 3-1-2 numbers apply the same convention.
// Chris confirmed all three sets on 2026-10-13; clubs number 7v7 their own ways.
// The 4v4 diamond has no conventional numbers, so it keeps its role letters.
// Six outfield players keep the same id across shapes so they animate between positions.
// Coordinates are in the 400 x 600 pitch space of lib/pitch7v7.js, our goal at the bottom, attacking up.
export const SHAPES = {
  diamond: {
    label: 'Diamond',
    short: '4v4',
    notation: 'Diamond',
    keeperNotation: '1-2-1',
    gk: { x: 200, y: 566, show: false },
    p: {
      p1: { x: 200, y: 455, role: 'B' },
      p2: { x: 120, y: 370, role: 'S' },
      p3: { x: 280, y: 370, role: 'S' },
      p4: { x: 200, y: 320, role: 'F' },
      p5: { x: 55, y: 440, hide: true, role: '' },
      p6: { x: 345, y: 440, hide: true, role: '' },
    },
    rows: [],
    diamond: ['p1', 'p2', 'p4', 'p3'],
  },
  '231': {
    label: '2-3-1',
    short: '7v7',
    notation: '2-3-1',
    keeperNotation: '1-2-3-1',
    gk: { x: 200, y: 566, show: true, num: 1 },
    p: {
      p1: { x: 135, y: 470, role: 'D', num: 5 },
      p5: { x: 265, y: 470, role: 'D', num: 4 },
      p2: { x: 60, y: 372, role: 'WM', num: 11 },
      p6: { x: 200, y: 372, role: 'CM', num: 8 },
      p3: { x: 340, y: 372, role: 'WM', num: 7 },
      p4: { x: 200, y: 320, role: 'F', num: 9 },
    },
    rows: [['p1', 'p5'], ['p2', 'p6', 'p3']],
    diamond: null,
  },
  '321': {
    label: '3-2-1',
    short: '7v7',
    notation: '3-2-1',
    keeperNotation: '1-3-2-1',
    gk: { x: 200, y: 566, show: true, num: 1 },
    p: {
      p1: { x: 200, y: 488, role: 'CD', num: 5 },
      p5: { x: 55, y: 440, role: 'WD', num: 3 },
      p6: { x: 345, y: 440, role: 'WD', num: 2 },
      p2: { x: 135, y: 372, role: 'CM', num: 6 },
      p3: { x: 265, y: 372, role: 'CM', num: 8 },
      p4: { x: 200, y: 320, role: 'F', num: 9 },
    },
    rows: [['p5', 'p1', 'p6'], ['p2', 'p3']],
    diamond: ['p1', 'p2', 'p4', 'p3'],
  },
  '312': {
    label: '3-1-2',
    short: '7v7',
    notation: '3-1-2',
    keeperNotation: '1-3-1-2',
    gk: { x: 200, y: 566, show: true, num: 1 },
    p: {
      p5: { x: 55, y: 440, role: 'WD', num: 3 },
      p1: { x: 200, y: 488, role: 'CD', num: 5 },
      p6: { x: 345, y: 440, role: 'WD', num: 2 },
      p2: { x: 200, y: 385, role: 'CM', num: 6 },
      p3: { x: 135, y: 322, role: 'F', num: 10 },
      p4: { x: 265, y: 322, role: 'F', num: 9 },
    },
    rows: [['p5', 'p1', 'p6'], ['p3', 'p4']],
    diamond: null,
  },
}
