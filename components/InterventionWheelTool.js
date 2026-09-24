'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Interactive STEP-framework diagnostic tool — reworked from an HTML/CSS/JS tool built for
 * Colorado Storm SC's internal coach education. Two things changed on the way in, deliberately:
 *
 * 1. Club branding stripped. The pasted source had a Colorado Storm crest, club name, Barlow
 *    Condensed type, and its own teal/black/gold identity (confirmed as Chris's own IP, not
 *    Storm's — same call already made for STEP/StepTool.js).
 * 2. Restyled to this site's own brand tokens (dark surface, brand green, Sora/Inter/JetBrains
 *    Mono), reusing the .step-tool-* detail-card classes from globals.css.
 *
 * Deliberately scoped to the INTERACTION ring only (see COACHING_FRAMEWORK.md, "Deliberate
 * scoping decision, 2026-09-24") — the source tool's outer "intervention" ring (Huddle / Drive
 * by / Freeze frame — HOW you stop play, with its time-cost data) and its centre "target" ring
 * (Group / Team / Unit / Individual) are article #3's own content, not #2's, and are not built
 * here. This renders as a single circular ring of the twelve interactions, not the source's
 * three-ring wheel.
 */

const INTERACTIONS = [
  {
    id: 'observe',
    lines: ['OBSERVE'],
    name: 'Observe',
    def: 'Deliberately gather information before you decide to act.',
    sounds: null,
    universal: 'Say nothing yet. Watch, and decide what this group actually needs before you spend time on it.',
    pairs: [],
  },
  {
    id: 'silence',
    lines: ['SILENCE'],
    name: 'Silence',
    def: 'Deliberately withhold input so the player has to solve it themselves.',
    sounds: null,
    universal: 'Say nothing at all. Let them wrestle with the problem — the learning is in the solving.',
    pairs: [],
  },
  {
    id: 'question',
    lines: ['QUESTION'],
    name: 'Question',
    def: 'Ask an open question that makes them think for themselves.',
    sounds: 'Who was free?',
    pairs: ['Freeze frame', 'Huddle', 'Drinks break', 'Pull aside'],
  },
  {
    id: 'guide',
    lines: ['GUIDE &', 'DISCOVERY'],
    name: 'Guide and discovery',
    def: 'Steer with a nudge and let them find the answer themselves.',
    sounds: 'What did you see over your left shoulder?',
    pairs: ['Drive by', 'Pull aside', 'Freeze frame'],
  },
  {
    id: 'cocreate',
    lines: ['CO-CREATE'],
    name: 'Co-create',
    def: 'Build the solution with the players rather than handing it over.',
    sounds: 'What do we want to try in the next three minutes?',
    pairs: ['Huddle', 'Drinks break'],
  },
  {
    id: 'check',
    lines: ['CHECK', 'UNDERSTANDING'],
    name: 'Check understanding',
    def: 'Ask the player to tell you back what they have taken from it.',
    sounds: "Tell me what you're looking for before the ball arrives.",
    pairs: ['Huddle', 'Walkthrough', 'Drinks break'],
  },
  {
    id: 'demo',
    lines: ['DEMONSTRATE'],
    name: 'Demonstrate',
    def: 'Show the action rather than describe it.',
    sounds: "Watch my hips — I'm opening before it arrives.",
    pairs: ['Walkthrough', 'Freeze frame', 'Huddle'],
  },
  {
    id: 'reframe',
    lines: ['REFRAME'],
    name: 'Reframe',
    def: 'Change how the player sees the moment, not what they do.',
    sounds: "That wasn't a bad pass — that was the right idea a second late.",
    pairs: ['Drive by', 'Pull aside', 'Drinks break', 'Huddle'],
  },
  {
    id: 'feedback',
    lines: ['FEEDBACK'],
    name: 'Feedback',
    def: 'Tell the player what happened and what it caused.',
    sounds: 'Your first touch went across you, so the defender got there first.',
    pairs: ['Drive by', 'Pull aside', 'Drinks break'],
  },
  {
    id: 'reinforce',
    lines: ['REINFORCE'],
    name: 'Reinforce',
    def: 'Name what was good, precisely, so it happens again.',
    sounds: "That's it — that's exactly the picture I want.",
    pairs: ['Drive by', 'Pull aside'],
  },
  {
    id: 'challenge',
    lines: ['CHALLENGE'],
    name: 'Challenge',
    def: 'Raise the demand on a player who is comfortable.',
    sounds: 'Can you do that again with your other foot?',
    pairs: ['Drive by', 'Pull aside', 'Drinks break'],
  },
  {
    id: 'instruct',
    lines: ['INSTRUCT'],
    name: 'Instruct',
    def: 'Give a direct, unambiguous command.',
    sounds: 'Body between the ball and the defender. Now.',
    pairs: ['Freeze frame', 'Huddle', 'Walkthrough', 'Drive by'],
  },
]

// ---- Wheel geometry: a single 12-segment ring, viewBox 0 0 320 320. ----
const CX = 160
const CY = 160
const R_OUTER = 150
const R_INNER = 82
const SEGMENTS = INTERACTIONS.length
const STEP_DEG = 360 / SEGMENTS

function polar(r, deg) {
  const a = ((deg - 90) * Math.PI) / 180
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}

function ringSegmentPath(a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0
  const [x1, y1] = polar(R_OUTER, a0)
  const [x2, y2] = polar(R_OUTER, a1)
  const [x3, y3] = polar(R_INNER, a1)
  const [x4, y4] = polar(R_INNER, a0)
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${R_OUTER} ${R_OUTER} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L${x3.toFixed(2)} ${y3.toFixed(2)} A${R_INNER} ${R_INNER} 0 ${large} 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`
}

// The chord width at the label's mid-radius (~60px, for a 30°/12-segment wheel at this size) is
// the absolute ceiling before a label starts overlapping its neighbour's wedge — clamping right
// up to that ceiling still let long labels (e.g. "UNDERSTANDING") touch the boundary with zero
// margin, which visibly collided with "Demonstrate" next door. Clamped well under the chord
// instead, so every label keeps a real gap from its neighbours regardless of font metrics.
const LABEL_MAX_WIDTH = 44

export function InterventionWheelTool() {
  const [selected, setSelected] = useState(null)
  const active = selected ? INTERACTIONS.find((i) => i.id === selected) : null
  const svgRef = useRef(null)

  useEffect(() => {
    function fitLabels() {
      const svg = svgRef.current
      if (!svg) return
      const tspans = svg.querySelectorAll('tspan[data-fit]')
      tspans.forEach((ts) => {
        ts.removeAttribute('textLength')
        ts.removeAttribute('lengthAdjust')
        const width = ts.getComputedTextLength()
        if (width > LABEL_MAX_WIDTH) {
          ts.setAttribute('textLength', LABEL_MAX_WIDTH)
          ts.setAttribute('lengthAdjust', 'spacingAndGlyphs')
        }
      })
    }
    fitLabels()
    // Re-measure once the mono webfont finishes swapping in — a fit computed against the
    // fallback font's metrics can be wrong (too loose or too tight) once the real glyphs render.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitLabels)
    }
  }, [])

  return (
    <div className="step-tool">
      <div className="step-tool-header">
        <span className="tech-eyebrow">
          <span aria-hidden="true" className="tech-eyebrow-tick" />
          Interactive · Pick an interaction
        </span>
        <p className="step-tool-desc">
          {active
            ? active.def
            : "Once you've decided to say something, how do you say it? Twelve ways to interact once you've stepped in — from saying nothing at all to a direct instruction. Select a segment of the wheel."}
        </p>
      </div>

      <div className="wheel-tool-body">
        <div className="wheel-tool-wheel-wrap">
          <svg
            ref={svgRef}
            className="wheel-tool-svg"
            viewBox="0 0 320 320"
            role="group"
            aria-label="Twelve coaching interactions, arranged in a circle"
          >
            {INTERACTIONS.map((interaction, i) => {
              const a0 = i * STEP_DEG
              const a1 = a0 + STEP_DEG
              const mid = a0 + STEP_DEG / 2
              const [lx, ly] = polar((R_OUTER + R_INNER) / 2, mid)
              const isSelected = selected === interaction.id
              const startDy = -((interaction.lines.length - 1) * 12.5) / 2
              return (
                <g
                  key={interaction.id}
                  className="wheel-tool-seg"
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`${interaction.name}: ${interaction.def}`}
                  onClick={() => setSelected(isSelected ? null : interaction.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelected(isSelected ? null : interaction.id)
                    }
                  }}
                >
                  <path
                    d={ringSegmentPath(a0, a1)}
                    className="wheel-tool-seg-hit"
                    style={{
                      fill: isSelected ? 'var(--brand)' : 'var(--surface-2)',
                      stroke: 'var(--surface-0)',
                    }}
                  />
                  <text
                    x={lx.toFixed(2)}
                    y={ly.toFixed(2)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="wheel-tool-seg-label"
                    style={{ fill: isSelected ? '#08130d' : 'var(--fg-muted)' }}
                  >
                    {interaction.lines.map((line, li) => (
                      <tspan key={li} x={lx.toFixed(2)} dy={li === 0 ? startDy : 12.5} data-fit="true">
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              )
            })}
            <circle cx={CX} cy={CY} r={R_INNER - 6} className="wheel-tool-hub" />
            <circle cx={CX} cy={CY} r={R_INNER - 6} className="wheel-tool-hub-ring" />
            <circle cx={CX} cy={CY} r={3} className="wheel-tool-hub-dot" />
          </svg>
        </div>

        <aside className="step-tool-card wheel-tool-card">
          <p className="step-tool-card-kicker">{active ? 'Sounds like' : 'Start here'}</p>
          <p className="step-tool-card-title">{active ? active.name : 'Pick an interaction'}</p>
          {active ? (
            <>
              <p className="step-tool-card-p">
                {active.sounds ? `"${active.sounds}"` : active.universal}
              </p>
              {active.pairs.length > 0 && (
                <p className="step-tool-card-note">
                  Works well with: {active.pairs.join(', ')} — suggested pairings, not rules.
                </p>
              )}
            </>
          ) : (
            <p className="step-tool-card-p">
              Twelve segments, one wheel. Observe and Silence work with anyone, anytime — the rest
              pair loosely with specific moments in a session. Select one to see how it actually
              sounds out loud.
            </p>
          )}
        </aside>
      </div>

      {selected && (
        <button type="button" className="step-tool-clear" onClick={() => setSelected(null)}>
          Clear
        </button>
      )}
    </div>
  )
}
