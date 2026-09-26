'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The full, three-ring Coaching Intervention Wheel — reworked from the same Colorado Storm SC
 * coach-education tool as components/InterventionWheelTool.js (club branding stripped, restyled
 * to this site's own brand tokens; both tools confirmed as Chris's own IP, cleared 2026-09-24 —
 * see COACHING_FRAMEWORK.md).
 *
 * Deliberately self-contained rather than sharing data with InterventionWheelTool.js: that
 * component ships live on article #2 and is treated as approved, already-reviewed content, so
 * this file carries its own copy of the interaction data instead of refactoring a shared module
 * out from under it. Same reasoning StepTool.js and InterventionWheelTool.js already follow —
 * each tool component in this codebase is independent, not sharing geometry or data helpers.
 *
 * Center ring: who you're coaching (Individual/Group/Unit/Team). Inner ring: how you interact,
 * once you've stepped in (the same twelve interactions as article #2's tool). Outer ring: how you
 * physically stop the game to say it (the six stoppage types, article #3's own content). Selecting
 * any segment in any ring highlights what commonly pairs with it in the other two rings — ported
 * from the reference tool's own pairing logic, not invented here.
 */

const TARGETS = [
  { id: 'individual', name: 'Individual', def: 'One player.', defIntervention: 'driveby' },
  {
    id: 'group',
    name: 'Group',
    def: 'Players across units who share an area of the field — a left back and the left winger in front of them, for example.',
    defIntervention: 'pullaside',
  },
  { id: 'unit', name: 'Unit', def: 'A full line of the team: defensive, midfield, or attacking.', defIntervention: 'pullaside' },
  { id: 'team', name: 'Team', def: 'Everyone.', defIntervention: 'freeze' },
]

const INTERACTIONS = [
  {
    id: 'observe',
    lines: ['OBSERVE'],
    name: 'Observe',
    def: 'Deliberately gather information before you decide to act.',
    sounds: null,
    universal: 'Say nothing yet. Watch, and decide what this group actually needs before you spend time on it.',
    pairs: [],
    anyTarget: true,
  },
  {
    id: 'silence',
    lines: ['SILENCE'],
    name: 'Silence',
    def: 'Deliberately withhold input so the player has to solve it themselves.',
    sounds: null,
    universal: 'Say nothing at all. Let them wrestle with the problem — the learning is in the solving.',
    pairs: [],
    anyTarget: true,
  },
  {
    id: 'question',
    lines: ['QUESTION'],
    name: 'Question',
    def: 'Ask an open question that makes them think for themselves.',
    sounds: 'Who was free?',
    pairs: ['freeze', 'huddle', 'drinks', 'pullaside'],
  },
  {
    id: 'guide',
    lines: ['GUIDE &', 'DISCOVERY'],
    name: 'Guide and discovery',
    def: 'Steer with a nudge and let them find the answer themselves.',
    sounds: 'What did you see over your left shoulder?',
    pairs: ['driveby', 'pullaside', 'freeze'],
  },
  {
    id: 'cocreate',
    lines: ['CO-CREATE'],
    name: 'Co-create',
    def: 'Build the solution with the players rather than handing it over.',
    sounds: 'What do we want to try in the next three minutes?',
    pairs: ['huddle', 'drinks'],
  },
  {
    id: 'check',
    lines: ['CHECK', 'UNDERSTANDING'],
    name: 'Check understanding',
    def: 'Ask the player to tell you back what they have taken from it.',
    sounds: "Tell me what you're looking for before the ball arrives.",
    pairs: ['huddle', 'walkthrough', 'drinks'],
  },
  {
    id: 'demo',
    lines: ['DEMONSTRATE'],
    name: 'Demonstrate',
    def: 'Show the action rather than describe it.',
    sounds: "Watch my hips — I'm opening before it arrives.",
    pairs: ['walkthrough', 'freeze', 'huddle'],
  },
  {
    id: 'reframe',
    lines: ['REFRAME'],
    name: 'Reframe',
    def: 'Change how the player sees the moment, not what they do.',
    sounds: "That wasn't a bad pass — that was the right idea a second late.",
    pairs: ['driveby', 'pullaside', 'drinks', 'huddle'],
  },
  {
    id: 'feedback',
    lines: ['FEEDBACK'],
    name: 'Feedback',
    def: 'Tell the player what happened and what it caused.',
    sounds: 'Your first touch went across you, so the defender got there first.',
    pairs: ['driveby', 'pullaside', 'drinks'],
  },
  {
    id: 'reinforce',
    lines: ['REINFORCE'],
    name: 'Reinforce',
    def: 'Name what was good, precisely, so it happens again.',
    sounds: "That's it — that's exactly the picture I want.",
    pairs: ['driveby', 'pullaside'],
  },
  {
    id: 'challenge',
    lines: ['CHALLENGE'],
    name: 'Challenge',
    def: 'Raise the demand on a player who is comfortable.',
    sounds: 'Can you do that again with your other foot?',
    pairs: ['driveby', 'pullaside', 'drinks'],
  },
  {
    id: 'instruct',
    lines: ['INSTRUCT'],
    name: 'Instruct',
    def: 'Give a direct, unambiguous command.',
    sounds: 'Body between the ball and the defender. Now.',
    pairs: ['freeze', 'huddle', 'walkthrough', 'driveby'],
  },
]

const INTERVENTIONS = [
  {
    id: 'driveby',
    lines: ['DRIVE BY'],
    name: 'Drive by',
    cost: 'Free',
    free: true,
    def: 'One sentence, to one player, while everything else keeps moving.',
    fit: 'Individual',
    targets: ['individual'],
  },
  {
    id: 'drinks',
    lines: ['DRINKS', 'BREAK'],
    name: 'Drinks break',
    cost: 'Free',
    free: true,
    def: 'Coach inside a pause you were already taking.',
    fit: 'Any target',
    targets: ['individual', 'group', 'unit', 'team'],
  },
  {
    id: 'pullaside',
    lines: ['PULL ASIDE'],
    name: 'Pull aside',
    cost: '20–30 sec',
    free: false,
    def: 'Take one or two players out while the rest keep playing.',
    fit: 'Group, unit or individual',
    targets: ['group', 'unit', 'individual'],
  },
  {
    id: 'freeze',
    lines: ['FREEZE', 'FRAME'],
    name: 'Freeze frame',
    cost: '30–45 sec',
    free: false,
    def: 'Everything stops. Players hold their positions exactly where they are.',
    fit: 'Team',
    targets: ['team'],
  },
  {
    id: 'huddle',
    lines: ['HUDDLE'],
    name: 'Huddle',
    cost: '60–90 sec',
    free: false,
    def: 'Bring the whole group in, balls down.',
    fit: 'Team',
    targets: ['team'],
  },
  {
    id: 'walkthrough',
    lines: ['WALK-', 'THROUGH'],
    name: 'Walkthrough',
    cost: '60–120 sec',
    free: false,
    def: 'Rehearse the movement at walking pace, no pressure.',
    fit: 'Team, unit or group',
    targets: ['team', 'unit', 'group'],
  },
]

const TARGETS_BY_ID = Object.fromEntries(TARGETS.map((t) => [t.id, t]))
const INTERACTIONS_BY_ID = Object.fromEntries(INTERACTIONS.map((x) => [x.id, x]))
const INTERVENTIONS_BY_ID = Object.fromEntries(INTERVENTIONS.map((v) => [v.id, v]))

// Derived pairing maps, computed once at module load — mirrors the reference tool's own
// INT_TO_IXN / IXN_TO_TGT / TGT_TO_INT / TGT_TO_IXN, ported from its vanilla-JS forEach loops.
const INTERVENTION_TO_INTERACTIONS = Object.fromEntries(INTERVENTIONS.map((v) => [v.id, []]))
INTERACTIONS.forEach((x) => {
  x.pairs.forEach((vid) => INTERVENTION_TO_INTERACTIONS[vid].push(x.id))
})

function targetsForInteraction(x) {
  if (x.anyTarget) return TARGETS.map((t) => t.id)
  const out = new Set()
  x.pairs.forEach((vid) => INTERVENTIONS_BY_ID[vid].targets.forEach((t) => out.add(t)))
  return [...out]
}
const INTERACTION_TO_TARGETS = Object.fromEntries(INTERACTIONS.map((x) => [x.id, targetsForInteraction(x)]))

const TARGET_TO_INTERVENTIONS = Object.fromEntries(
  TARGETS.map((t) => [t.id, INTERVENTIONS.filter((v) => v.targets.includes(t.id)).map((v) => v.id)])
)
const TARGET_TO_INTERACTIONS = Object.fromEntries(
  TARGETS.map((t) => {
    const set = new Set()
    TARGET_TO_INTERVENTIONS[t.id].forEach((vid) => INTERVENTION_TO_INTERACTIONS[vid].forEach((xid) => set.add(xid)))
    INTERACTIONS.forEach((x) => {
      if (x.anyTarget) set.add(x.id)
    })
    return [t.id, [...set]]
  })
)

function activeSets(sel) {
  if (!sel) return null
  const iv = new Set()
  const ix = new Set()
  const tg = new Set()
  if (sel.kind === 'intervention') {
    iv.add(sel.id)
    INTERVENTION_TO_INTERACTIONS[sel.id].forEach((id) => ix.add(id))
    INTERVENTIONS_BY_ID[sel.id].targets.forEach((id) => tg.add(id))
  } else if (sel.kind === 'interaction') {
    ix.add(sel.id)
    INTERACTIONS_BY_ID[sel.id].pairs.forEach((id) => iv.add(id))
    INTERACTION_TO_TARGETS[sel.id].forEach((id) => tg.add(id))
  } else {
    tg.add(sel.id)
    TARGET_TO_INTERVENTIONS[sel.id].forEach((id) => iv.add(id))
    TARGET_TO_INTERACTIONS[sel.id].forEach((id) => ix.add(id))
  }
  return { intervention: iv, interaction: ix, target: tg }
}

// ---- Geometry: three concentric rings, viewBox 0 0 460 460. Segments start at 12 o'clock and
// run clockwise, matching the reference tool's own layout. ----
const CX = 230
const CY = 230
const R_OUTER_OUT = 216
const R_MID = 151
const R_INNER_BOUND = 89
const R_HUB = 24

function polar(r, deg) {
  const a = ((deg - 90) * Math.PI) / 180
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}

function ringSegmentPath(rOuter, rInner, a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0
  const [x1, y1] = polar(rOuter, a0)
  const [x2, y2] = polar(rOuter, a1)
  const [x3, y3] = polar(rInner, a1)
  const [x4, y4] = polar(rInner, a0)
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${rOuter} ${rOuter} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L${x3.toFixed(2)} ${y3.toFixed(2)} A${rInner} ${rInner} 0 ${large} 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`
}

function wedgePath(r, a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0
  const [x1, y1] = polar(r, a0)
  const [x2, y2] = polar(r, a1)
  return `M${CX} ${CY} L${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`
}

// Same label-fitting approach as InterventionWheelTool.js: clamp with textLength only once actual
// glyph metrics are known, re-measured after the mono webfont swaps in.
function useLabelFit(svgRef) {
  useEffect(() => {
    function fitLabels() {
      const svg = svgRef.current
      if (!svg) return
      svg.querySelectorAll('tspan[data-fit]').forEach((ts) => {
        ts.removeAttribute('textLength')
        ts.removeAttribute('lengthAdjust')
        const max = parseFloat(ts.getAttribute('data-fit'))
        const width = ts.getComputedTextLength()
        if (width > max) {
          ts.setAttribute('textLength', max)
          ts.setAttribute('lengthAdjust', 'spacingAndGlyphs')
        }
      })
    }
    fitLabels()
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitLabels)
    }
  }, [svgRef])
}

// isPaired only means anything once something is selected — with no selection at all, every
// segment sits at the same neutral resting color, not the "commonly pairs with this" highlight.
function segFill(isSelected, isPaired) {
  if (isSelected) return 'var(--brand)'
  if (isPaired) return 'var(--brand-a25)'
  return 'var(--surface-2)'
}

function segTextFill(isSelected) {
  return isSelected ? '#08130d' : 'var(--fg-muted)'
}

function Segment({ kind, id, d, lines, labelPos, fitWidth, lineHeight, isSelected, isPaired, isDimmed, onToggle, ariaLabel }) {
  const startDy = -((lines.length - 1) * lineHeight) / 2
  return (
    <g
      className={`civ-seg${isSelected ? ' active' : ''}${isDimmed ? ' dimmed' : ''}`}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={ariaLabel}
      onClick={() => onToggle(kind, id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle(kind, id)
        }
      }}
    >
      <path d={d} className="civ-seg-hit" style={{ fill: segFill(isSelected, isPaired) }} />
      <text
        x={labelPos[0].toFixed(2)}
        y={labelPos[1].toFixed(2)}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`civ-seg-label civ-seg-label-${kind}`}
        style={{ fill: segTextFill(isSelected) }}
      >
        {lines.map((line, li) => (
          <tspan key={li} x={labelPos[0].toFixed(2)} dy={li === 0 ? startDy : lineHeight} data-fit={fitWidth}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  )
}

export function CoachingInterventionWheel() {
  const [sel, setSel] = useState(null)
  const svgRef = useRef(null)
  useLabelFit(svgRef)

  const sets = activeSets(sel)

  function toggle(kind, id) {
    setSel((current) => (current && current.kind === kind && current.id === id ? null : { kind, id }))
  }

  const outerStep = 360 / INTERVENTIONS.length
  const midStep = 360 / INTERACTIONS.length
  const centerStep = 360 / TARGETS.length

  let panelKicker = 'Start here'
  let panelTitle = 'Pick any segment'
  let panelBody = null
  let headerDesc = "Center: who you're coaching. Inner ring: how you interact. Outer ring: how you stop the game to say it. Select any segment — the wheel highlights what commonly pairs with it."

  if (sel?.kind === 'target') {
    const t = TARGETS_BY_ID[sel.id]
    const def = INTERVENTIONS_BY_ID[t.defIntervention]
    panelKicker = 'Who'
    panelTitle = t.name
    headerDesc = t.def
    panelBody = (
      <>
        <p className="step-tool-card-p">{t.def}</p>
        <p className="step-tool-card-note">
          Suggested default: {def.name} ({def.cost}).
        </p>
      </>
    )
  } else if (sel?.kind === 'interaction') {
    const x = INTERACTIONS_BY_ID[sel.id]
    panelKicker = 'Sounds like'
    panelTitle = x.name
    headerDesc = x.def
    panelBody = (
      <>
        <p className="step-tool-card-p">{x.sounds ? `"${x.sounds}"` : x.universal}</p>
        {x.pairs.length > 0 && (
          <p className="step-tool-card-note">
            Works well with: {x.pairs.map((id) => INTERVENTIONS_BY_ID[id].name).join(', ')} — suggested pairings, not rules.
          </p>
        )}
      </>
    )
  } else if (sel?.kind === 'intervention') {
    const v = INTERVENTIONS_BY_ID[sel.id]
    panelKicker = 'Time cost'
    panelTitle = v.name
    headerDesc = v.def
    panelBody = (
      <>
        <p className="civ-cost">{v.cost}</p>
        <p className="step-tool-card-p">{v.def}</p>
        <p className="step-tool-card-note">Suggested fit: {v.fit}.</p>
        {v.id === 'drinks' ? (
          <p className="step-tool-card-note">
            <strong>Free in playing time — not free in attention.</strong> Players are resting, so keep the message short.
          </p>
        ) : v.free ? (
          <p className="step-tool-card-note">
            <strong>Free.</strong> Costs no playing time. Reach for these first.
          </p>
        ) : (
          <p className="step-tool-card-note">Spends {v.cost} of playing time. Ask whether a free option would do the same job.</p>
        )}
      </>
    )
  }

  return (
    <div className="step-tool">
      <div className="step-tool-header">
        <span className="tech-eyebrow">
          <span aria-hidden="true" className="tech-eyebrow-tick" />
          Interactive · The full wheel
        </span>
        <p key={sel ? `${sel.kind}:${sel.id}` : 'default'} className="step-tool-desc panel-swap">
          {headerDesc}
        </p>
      </div>

      <div className="civ-body">
        <div className="civ-wheel-wrap">
          <svg
            ref={svgRef}
            className="civ-svg"
            viewBox="0 0 460 460"
            role="group"
            aria-label="The Coaching Intervention Wheel: who you're coaching at the center, how you interact on the inner ring, how you stop the game on the outer ring"
          >
            {TARGETS.map((t, i) => {
              const a0 = i * centerStep
              const a1 = a0 + centerStep
              const mid = a0 + centerStep / 2
              const labelPos = polar((R_HUB + R_INNER_BOUND) / 2 + 6, mid)
              const isSelected = sel?.kind === 'target' && sel.id === t.id
              const isPaired = sets ? sets.target.has(t.id) : false
              return (
                <Segment
                  key={t.id}
                  kind="target"
                  id={t.id}
                  d={wedgePath(R_INNER_BOUND, a0, a1)}
                  lines={[t.name.toUpperCase()]}
                  labelPos={labelPos}
                  fitWidth={74}
                  lineHeight={13}
                  isSelected={isSelected}
                  isPaired={isPaired}
                  isDimmed={!!sets && !isSelected && !isPaired}
                  onToggle={toggle}
                  ariaLabel={`Who: ${t.name}. ${t.def}`}
                />
              )
            })}

            <circle cx={CX} cy={CY} r={R_HUB} className="civ-hub" />
            <circle cx={CX} cy={CY} r={R_HUB} className="civ-hub-ring" />

            {INTERACTIONS.map((x, i) => {
              const a0 = i * midStep
              const a1 = a0 + midStep
              const mid = a0 + midStep / 2
              const labelPos = polar((R_MID + R_INNER_BOUND) / 2, mid)
              const isSelected = sel?.kind === 'interaction' && sel.id === x.id
              const isPaired = sets ? sets.interaction.has(x.id) : false
              return (
                <Segment
                  key={x.id}
                  kind="interaction"
                  id={x.id}
                  d={ringSegmentPath(R_MID, R_INNER_BOUND, a0, a1)}
                  lines={x.lines}
                  labelPos={labelPos}
                  fitWidth={54}
                  lineHeight={12}
                  isSelected={isSelected}
                  isPaired={isPaired}
                  isDimmed={!!sets && !isSelected && !isPaired}
                  onToggle={toggle}
                  ariaLabel={`Interaction: ${x.name}. ${x.def}`}
                />
              )
            })}

            {INTERVENTIONS.map((v, i) => {
              const a0 = i * outerStep
              const a1 = a0 + outerStep
              const mid = a0 + outerStep / 2
              const labelPos = polar((R_OUTER_OUT + R_MID) / 2, mid)
              const isSelected = sel?.kind === 'intervention' && sel.id === v.id
              const isPaired = sets ? sets.intervention.has(v.id) : false
              return (
                <Segment
                  key={v.id}
                  kind="intervention"
                  id={v.id}
                  d={ringSegmentPath(R_OUTER_OUT, R_MID, a0, a1)}
                  lines={[...v.lines, v.cost.toUpperCase()]}
                  labelPos={labelPos}
                  fitWidth={78}
                  lineHeight={14}
                  isSelected={isSelected}
                  isPaired={isPaired}
                  isDimmed={!!sets && !isSelected && !isPaired}
                  onToggle={toggle}
                  ariaLabel={`Intervention: ${v.name}. Time cost ${v.cost}. Suggested fit: ${v.fit}.`}
                />
              )
            })}
          </svg>
        </div>

        <aside key={sel ? `${sel.kind}:${sel.id}` : 'default'} className="step-tool-card civ-card panel-swap">
          <p className="step-tool-card-kicker">{panelKicker}</p>
          <p className="step-tool-card-title">{panelTitle}</p>
          {panelBody || (
            <p className="step-tool-card-p">
              Three rings, one framework. Observe and Silence work with anyone, anytime — everything else pairs loosely
              with specific moments and audiences. Select a segment to see how it fits with the rest of the wheel.
            </p>
          )}
        </aside>
      </div>

      {sel && (
        <button type="button" className="step-tool-clear" onClick={() => setSel(null)}>
          Clear
        </button>
      )}
    </div>
  )
}
