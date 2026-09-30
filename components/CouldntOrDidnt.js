'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

/**
 * "Couldn't or didn't?" — an interactive flowchart for "Teach It or Let the Game Teach It?". Every branch
 * is visible at once (so it reads like a printed flowchart and can be screenshotted), and answering
 * highlights the path and reveals the next steps underneath.
 *
 * The logic is the article's own rule of thumb, not a tested model, and the tool says so:
 *   Can they do the action with nobody near them?  yes → choosing problem; no → teaching problem;
 *   not sure → does the whole group break down at the same technical moment? yes → teaching; no → probably choosing.
 *
 * Reuses the .step-tool panel so the site's interactive tools read as one family. GA4: `tool_use` with
 * tool "couldnt_or_didnt" and the result, each time a result is reached.
 */

const RESULTS = {
  choosing: {
    kicker: "Didn't",
    title: 'A choosing problem',
    lead: "They can do it. The game just isn't making the choice you want the one that pays.",
    steps: [
      'Change the game rather than the player: the space, the numbers, or the scoring.',
      'Reward the behavior you want instead of banning the workaround.',
      'In the Switch of Play game: they see the far side and play it short anyway, so make switched goals count for more.',
    ],
    link: { href: '/articles/why-your-practice-feels-like-chaos', label: 'How I use STEP to change a game' },
  },
  teaching: {
    kicker: "Couldn't",
    title: 'A teaching problem',
    lead: "They can't do it yet, so no change to the scoring will fix it. Teach it, then put it back.",
    steps: [
      'Simplify the task a long way first: more space, fewer defenders, a bigger target.',
      'Show it, with one cue rather than five.',
      'Give some varied repetition: change the pace, angle and distance rather than feeding the same ball.',
      'Keep it short, then put them back into the game so the skill gets used for a reason.',
      "In the Switch of Play game: the pass can't reach across the 25 yards, so a few minutes of passing over that distance.",
    ],
    link: { href: '/articles/first-touch-and-receiving', label: 'The skill that most often needs teaching first' },
  },
}

export function CouldntOrDidnt() {
  const [first, setFirst] = useState(null) // 'yes' | 'no' | 'unsure'
  const [second, setSecond] = useState(null) // 'yes' | 'no'
  const lastTracked = useRef(null)

  const result =
    first === 'yes' ? 'choosing' : first === 'no' ? 'teaching' : first === 'unsure' && second ? (second === 'yes' ? 'teaching' : 'choosing') : null
  const probably = first === 'unsure' && second === 'no'

  useEffect(() => {
    const key = result ? `${first}:${second ?? ''}` : null
    if (key && key !== lastTracked.current) {
      lastTracked.current = key
      trackEvent('tool_use', { tool: 'couldnt_or_didnt', action: 'result', result })
    }
  }, [result, first, second])

  const pickFirst = (v) => {
    setFirst(first === v ? null : v)
    setSecond(null)
  }
  const pickSecond = (v) => setSecond(second === v ? null : v)
  const reset = () => {
    setFirst(null)
    setSecond(null)
  }

  const branchState = (branch) => (!first ? '' : first === branch ? ' on' : ' off')
  // On the "Not sure" path the result comes from the second question, so the Yes/No outcome boxes stay
  // dimmed with their branches rather than lighting up inside a faded column.
  const outcomeState = (kind) => (!result || first === 'unsure' ? '' : result === kind ? ' on' : ' off')
  const r = result ? RESULTS[result] : null

  return (
    <div className="step-tool cd-tool">
      <div className="step-tool-header">
        <span className="tech-eyebrow">
          <span aria-hidden="true" className="tech-eyebrow-tick" />
          Interactive · Couldn&apos;t or didn&apos;t?
        </span>
        <p className="step-tool-desc">
          Watch a few breakdowns in a row, then answer for the player or the group. A rule of thumb, not something a study
          has tested.
        </p>
      </div>

      <div className="cd-flow">
        <div className="cd-node cd-start">The game keeps breaking down</div>
        <div className="cd-arrow" aria-hidden="true" />
        <div className="cd-node cd-question">
          <p className="cd-q-text">Can they do the action with nobody near them?</p>
          <div className="cd-answers" role="group" aria-label="Can they do the action with nobody near them?">
            {[
              ['yes', 'Yes'],
              ['no', 'No'],
              ['unsure', 'Not sure'],
            ].map(([v, label]) => (
              <button key={v} type="button" className={`cd-answer${first === v ? ' active' : ''}`} aria-pressed={first === v} onClick={() => pickFirst(v)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="cd-stem" aria-hidden="true" />
        <div className="cd-branches">
          <div className={`cd-branch${branchState('yes')}`}>
            <span className="cd-branch-label">Yes</span>
            <div className="cd-arrow" aria-hidden="true" />
            <div className={`cd-node cd-outcome cd-outcome-choosing${outcomeState('choosing')}`}>
              <span className="cd-outcome-kicker">Didn&apos;t</span>
              Choosing problem: change the game
            </div>
          </div>

          <div className={`cd-branch${branchState('no')}`}>
            <span className="cd-branch-label">No</span>
            <div className="cd-arrow" aria-hidden="true" />
            <div className={`cd-node cd-outcome cd-outcome-teaching${outcomeState('teaching')}`}>
              <span className="cd-outcome-kicker">Couldn&apos;t</span>
              Teaching problem: teach it, then put it back
            </div>
          </div>

          <div className={`cd-branch${branchState('unsure')}`}>
            <span className="cd-branch-label">Not sure</span>
            <div className="cd-arrow" aria-hidden="true" />
            <div className="cd-node cd-question cd-question-small">
              <p className="cd-q-text">Does the whole group break down at the same technical moment?</p>
              <div className="cd-answers" role="group" aria-label="Does the whole group break down at the same technical moment?">
                {[
                  ['yes', 'Yes: teaching'],
                  ['no', 'No: probably choosing'],
                ].map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    className={`cd-answer cd-answer-small${second === v ? ' active' : ''}`}
                    aria-pressed={second === v}
                    disabled={first !== 'unsure'}
                    onClick={() => pickSecond(v)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cd-result" aria-live="polite">
        {r ? (
          <div className={`cd-result-card cd-result-${result}`}>
            <p className="cd-result-kicker">{r.kicker}</p>
            <p className="cd-result-title">
              {probably ? `Probably ${r.title.charAt(0).toLowerCase()}${r.title.slice(1)}` : r.title}
            </p>
            <p className="cd-result-lead">
              {probably
                ? 'If the breakdowns are spread across different moments, a game change is the first thing I’d try. Watch whether it helps: if it doesn’t, come back to the teaching side.'
                : r.lead}
            </p>
            <ul className="cd-steps">
              {r.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="cd-result-link">
              <Link href={r.link.href}>{r.link.label} →</Link>
            </p>
            <button type="button" className="step-tool-clear cd-reset" onClick={reset}>
              Start again
            </button>
          </div>
        ) : (
          <p className="cd-empty">{first === 'unsure' ? 'Answer the second question to see what to try.' : 'Pick an answer to see what to try.'}</p>
        )}
      </div>
    </div>
  )
}
