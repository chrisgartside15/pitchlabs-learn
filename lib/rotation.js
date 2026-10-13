/**
 * Rotation planner arithmetic for the Shape board. Pure functions, no research claim: it spreads playing time and
 * positions as evenly as it can, and says where it can't.
 *
 * Inputs: squad size N (>= slots), number of periods P, the shape's slots ({ id, line, role }), and whether the
 * keeper rotates. Output: for every period, which player is in which slot and who is on the bench.
 *
 * Rules, in order of priority:
 *  1. Playing time: bench the players who have sat least so far (ties: whoever sat longest ago), so everyone ends
 *     within one period of each other.
 *  2. Keeper: when rotating, give it to the on-field player who has kept least, and not to the same player twice
 *     in a row if anyone else is available. Otherwise player 1 keeps every period and never sits.
 *  3. Lines: fill forwards, then midfield, then defence, each with the on-field player who has had that line
 *     least, then that exact role least.
 *
 * Lines are derived from role labels: GK; D, CD, WD; CM, WM; F.
 */

export function lineOf(role) {
  if (role === 'GK') return 'G'
  if (role === 'D' || role === 'CD' || role === 'WD') return 'D'
  if (role === 'CM' || role === 'WM') return 'M'
  return 'F'
}

export function planRotation({ players, periods, slots, gkRotates }) {
  const N = players
  const P = periods
  const fieldSize = slots.length
  const benchSize = Math.max(0, N - fieldSize)
  const counts = Array.from({ length: N }, () => ({
    G: 0, D: 0, M: 0, F: 0, played: 0, benched: 0, lastBench: -1, lastKeep: -1, roles: {},
  }))
  const perPeriod = []

  const gkSlot = slots.find((s) => s.line === 'G')
  const outfield = slots.filter((s) => s.line !== 'G')
  const lineOrder = { F: 0, M: 1, D: 2 }
  const fill = [...outfield].sort((a, b) => lineOrder[a.line] - lineOrder[b.line])

  for (let t = 0; t < P; t++) {
    // 1. who sits
    let sitting = []
    if (benchSize > 0) {
      const candidates = []
      for (let i = 0; i < N; i++) if (gkRotates || i !== 0) candidates.push(i)
      candidates.sort(
        (a, b) =>
          counts[a].benched - counts[b].benched ||
          counts[a].lastBench - counts[b].lastBench ||
          b - a
      )
      sitting = candidates.slice(0, benchSize)
    }
    const sitSet = new Set(sitting)
    const field = []
    for (let i = 0; i < N; i++) if (!sitSet.has(i)) field.push(i)

    const assign = {} // slotId -> player index

    // 2. keeper
    let keeper = 0
    if (gkSlot) {
      if (gkRotates) {
        const pool = [...field].sort(
          (a, b) =>
            counts[a].G - counts[b].G ||
            (counts[a].lastKeep === t - 1 ? 1 : 0) - (counts[b].lastKeep === t - 1 ? 1 : 0) ||
            counts[a].lastKeep - counts[b].lastKeep ||
            a - b
        )
        keeper = pool[0]
      }
      assign[gkSlot.id] = keeper
      counts[keeper].G += 1
      counts[keeper].lastKeep = t
    }

    // 3. outfield lines
    const remaining = field.filter((i) => !gkSlot || i !== keeper)
    for (const slot of fill) {
      remaining.sort(
        (a, b) =>
          counts[a][slot.line] - counts[b][slot.line] ||
          (counts[a].roles[slot.role] || 0) - (counts[b].roles[slot.role] || 0) ||
          a - b
      )
      const pick = remaining.shift()
      if (pick === undefined) break
      assign[slot.id] = pick
      counts[pick][slot.line] += 1
      counts[pick].roles[slot.role] = (counts[pick].roles[slot.role] || 0) + 1
    }

    field.forEach((i) => (counts[i].played += 1))
    sitting.forEach((i) => {
      counts[i].benched += 1
      counts[i].lastBench = t
    })
    perPeriod.push({ assign, bench: sitting.slice().sort((a, b) => a - b) })
  }

  // player x period grid of slot ids (null = bench)
  const grid = Array.from({ length: N }, () => Array(P).fill(null))
  perPeriod.forEach((pp, t) => {
    Object.entries(pp.assign).forEach(([slotId, idx]) => {
      grid[idx][t] = slotId
    })
  })

  const played = counts.map((c) => c.played)
  return {
    grid,
    perPeriod,
    played,
    minPlayed: Math.min(...played),
    maxPlayed: Math.max(...played),
    counts,
  }
}
