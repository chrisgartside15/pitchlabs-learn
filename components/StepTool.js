'use client'

import { useState } from 'react'

/**
 * Interactive STEP-framework diagnostic tool — reworked from an HTML/CSS/JS tool built for
 * Colorado Storm SC's internal coach education. Two things changed on the way in, deliberately:
 *
 * 1. Club branding stripped. The original had a Colorado Storm crest, club name, and its own
 *    teal/gold/black identity. This is a public PitchLabs Learn article, not a Storm-internal
 *    document, so none of that travels — same call already made elsewhere for PitchLabs materials.
 * 2. Restyled to this site's own brand tokens (dark surface, brand green, Sora/Inter/JetBrains
 *    Mono) instead of the original's teal/Oswald identity, so it reads as native content here,
 *    not an embedded foreign tool.
 *
 * The coaching content itself (the four problems, the STEP adjustments for each) is unchanged —
 * that's the real value, and it's a direct interactive version of this article's own "how to fix
 * a session that isn't working" section (Too easy / Too difficult / Too slow / Right game, wrong
 * behavior), so it replaces GRAPHIC 2's static diagnostic-chart placeholder rather than sitting
 * alongside it.
 */

const STEP_META = {
  S: { name: 'Space', q: 'Can I change the area to create more time, pressure, or movement?' },
  T: { name: 'Task', q: 'Can I simplify, add a condition, or change how players score?' },
  E: { name: 'Equipment', q: 'Can I use goals, gates, zones, or different balls to shape the behavior?' },
  P: { name: 'Players', q: 'Can I adjust numbers, add neutrals, or create an overload?' },
}

const DEFAULT_STEPS = {
  S: ['Bigger area — more time and success.', 'Smaller area — more pressure and faster decisions.', 'Change the shape to influence movement.'],
  T: ['Add or remove conditions.', 'Change how players score.', 'Simplify the objective, or add direction, targets, or transition.'],
  E: ['Add goals, gates, or zones.', 'Change the number or type of balls.', 'Use equipment to highlight the action you want.'],
  P: ['Create overloads or underloads.', 'Add neutral players, or adjust team sizes.', 'Match players differently to change the challenge.'],
}

const PROBLEMS = {
  easy: {
    chip: 'Too easy',
    title: 'Too easy',
    stripDesc:
      "Players are succeeding without effort — no mistakes, no stretch, no learning. Raise the difficulty until players are challenged but still finding success.",
    card: [
      "Comfort doesn't drive learning. If every action succeeds, the activity has stopped asking questions. Aim for roughly 60–70% success — enough to stay confident, enough failure to keep learning.",
      "Watch for: players scoring casually, defenders never winning the ball, your strongest players coasting. Often only part of the group finds it easy — consider adjusting Players before shrinking the whole game.",
    ],
    steps: {
      S: ['Shrink the area. Less time and space — faster decisions, pressure on every touch.', 'Narrow the shape. Force players through traffic instead of around it.', 'Tighten scoring zones. Make the space where points are earned harder to reach.'],
      T: ['Add a condition. Two-touch, weaker foot, must beat a defender before scoring.', 'Raise the scoring bar. Goals only count after the target behavior.', 'Add time pressure. Score within 10 seconds of winning the ball.'],
      E: ['Shrink or reduce the goals. Smaller targets demand better execution.', 'Remove gates or targets that made the picture too obvious.', 'Change the ball. A smaller ball raises the technical demand.'],
      P: ['Underload the strong side. Put the dominant players a player down (2v3).', 'Add defenders. More pressure, less time.', 'Rematch the players. Strongest against strongest — every duel a contest.'],
    },
  },
  hard: {
    chip: 'Too difficult',
    title: 'Too difficult',
    stripDesc:
      "Constant breakdowns — players can't find success and confidence is draining. Lower the difficulty until success returns, then rebuild the challenge gradually.",
    card: [
      "Players failing too often aren't learning from it. At 8U–10U, self-esteem is fragile — repeated failure switches players off faster than anything else you'll do as a coach.",
      'Watch for: turnovers within a touch or two, heads dropping, players hiding from the ball. One rebalanced pairing or one extra yard of space often fixes what looks like a technical problem.',
    ],
    steps: {
      S: ['Grow the area. More time and space — more success on the ball.', 'Widen the shape. Give players room to escape pressure.', "Add a safe zone. A space where the ball can't be pressed lets play breathe."],
      T: ['Simplify the objective. One clear job, not three.', 'Remove conditions. Free play first, constraints later.', 'Open up scoring. More ways to score — more success, more engagement.'],
      E: ['Bigger or more goals. More targets, more reward.', 'Add gates or zones that show players where the picture is.', 'Change the ball. A lighter or larger ball lowers the technical demand.'],
      P: ['Overload the strugglers. Give them the extra player (3v2, 4v3).', 'Add a neutral player who always plays for the team in possession.', 'Rebalance the teams. Move one player and the whole game can settle.'],
    },
  },
  slow: {
    chip: 'Too slow',
    title: 'Too slow',
    stripDesc:
      "Low intensity, poor ball-rolling time, players switching off. Speed the environment up — young players engage when the game keeps moving and they're always involved.",
    card: [
      'The game has lost its tempo. Low intensity usually means too much standing, too few touches, or restarts that kill momentum — not lazy players.',
      'Watch for: queues, dead time after every goal or out-of-bounds, one game with too many players in it. The fastest fix is usually adjusting Players: smaller teams, more games, nobody waiting.',
    ],
    steps: {
      S: ['Shrink the area. Tighter space forces quicker play, more actions per minute.', 'Bring goals closer together. Shorter transitions, more scoring moments.', 'Reshape it. Long and narrow creates direct, end-to-end play.'],
      T: ['Add a time limit. "Score within 10 seconds" or a countdown finish.', 'Reward speed. Double points for scoring straight after winning the ball.', 'Add transition. The moment the ball is lost, the game flips — no resets.'],
      E: ['Stage spare balls around the area. Instant restarts — the game never stops.', 'Add counter-goals. Both directions live at all times.', 'More balls in play where it fits (e.g., every player dribbling).'],
      P: ['Smaller teams, more games. Split one slow 6v6 into two lively 3v3s.', 'Cut the queue. Nobody waits more than a few seconds for their turn.', "Add a chaser or press trigger so there's always urgency on the ball."],
    },
  },
  behaviour: {
    chip: 'Wrong behavior',
    title: 'Not producing the behavior',
    stripDesc:
      "The game runs fine — but the objective isn't showing up. Redesign the environment so the target behavior becomes the best way to win.",
    card: [
      'First, check the design: does the game actually require the behavior to succeed? If players can win without doing the thing you want, they will — that\'s game intelligence, not defiance.',
      'Watch for: players finding a legal shortcut around your intention. Reward the behavior in the scoring rather than banning the alternative — constraints that punish rarely teach; incentives that reward usually do.',
    ],
    steps: {
      S: ['Reshape the area so the behavior is the natural choice. Wide channels invite dribbling wide; long pitches invite forward passes.', 'Add zones that frame the picture. An end zone for receiving forward, a middle zone for playing through.', 'Position the space to repeat the exact moment you want (e.g., 1v1s arriving at the same angle).'],
      T: ['Put the behavior in the scoring. A goal after beating a player 1v1 counts double.', "Constrain the alternative, don't ban it. Make the easy option less rewarding, not illegal.", 'Add a trigger condition. "You can only score after a switch of play."'],
      E: ['Use gates, targets, and zones to make the picture obvious. Young players respond to what they can see.', 'Place goals where the behavior leads. Want forward passing? Put the reward at the end of it.', 'Add visual cues — bibs or cones marking who or where the target is.'],
      P: ['Overload to multiply the moment. Constant 2v1s produce constant pass-or-drive decisions.', 'Add a neutral player who guarantees the option you want always exists.', 'Match players to change the duel. The right opponent creates the moment more often.'],
    },
  },
}

export function StepTool() {
  const [selected, setSelected] = useState(null)
  const active = selected ? PROBLEMS[selected] : null

  return (
    <div className="step-tool">
      <div className="step-tool-header">
        <span className="tech-eyebrow">
          <span aria-hidden="true" className="tech-eyebrow-tick" />
          Interactive · Pick a problem
        </span>
        <p key={selected ?? 'default'} className="step-tool-desc panel-swap">
          {active ? active.stripDesc : 'Is the activity too easy, too difficult, too slow, or not producing the behavior you want? Diagnose first, then adjust without losing the original objective.'}
        </p>
        <div className="step-tool-chips">
          {Object.entries(PROBLEMS).map(([key, p]) => (
            <button
              key={key}
              type="button"
              className={`step-tool-chip${selected === key ? ' active' : ''}`}
              onClick={() => setSelected(key)}
            >
              {p.chip}
            </button>
          ))}
        </div>
      </div>

      <div className="step-tool-body">
        <div key={`panels-${selected ?? 'default'}`} className="step-tool-panels panel-swap">
          {Object.keys(STEP_META).map((letter) => (
            <div key={letter} className="step-tool-panel">
              <div className="step-tool-panel-head">
                <span className="step-tool-letter">{letter}</span>
                <span className="step-tool-pname">{STEP_META[letter].name}</span>
              </div>
              <p className="step-tool-pq">{STEP_META[letter].q}</p>
              {(active ? active.steps[letter] : DEFAULT_STEPS[letter]).map((line, i) => {
                const splitAt = line.indexOf('. ')
                const lead = splitAt === -1 ? line : line.slice(0, splitAt + 1)
                const rest = splitAt === -1 ? '' : line.slice(splitAt + 1)
                return (
                  <div key={i} className="step-tool-adj">
                    <span className="step-tool-tick" aria-hidden="true">▸</span>
                    <span>
                      <strong>{lead}</strong>
                      {rest}
                    </span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <aside key={`card-${selected ?? 'default'}`} className="step-tool-card panel-swap">
          <p className="step-tool-card-kicker">{active ? 'Diagnosis' : 'Start here'}</p>
          <p className="step-tool-card-title">{active ? active.title : 'Pick a problem'}</p>
          {active ? (
            active.card.map((p, i) => <p key={i} className="step-tool-card-p">{p}</p>)
          ) : (
            <p className="step-tool-card-p">
              The four chips above are the four ways an activity goes wrong. Select one — the S·T·E·P panels update with the adjustments that fix that problem, and this card explains what to watch for. One rule underneath all four: adjust the activity without changing the objective.
            </p>
          )}
          <p className="step-tool-card-note">Suggestions, not rules — change one variable at a time, let it run, and watch the response before adjusting again.</p>
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
