/**
 * The twelve coaching interactions (the inner ring of the Coaching Intervention Wheel), shared by
 * components/InterventionWheelTool.js (article #2) and components/CoachingInterventionWheel.js
 * (article #3). One copy so the wording can't drift between the two tools. The same definitions and
 * example phrases are also printed on the "Coaching Interaction Menu" download
 * (public/downloads/coaching-interaction-menu-*.pdf) and listed in the text of "How Much Should You
 * Actually Say?" — if you change wording here, update those too.
 *
 * `pairs` are stoppage ids (the outer ring, defined in CoachingInterventionWheel.js); use
 * STOPPAGE_NAMES to show them as labels. Pairings are suggestions, not rules.
 *
 * Example phrases revised 2026-09-29 so each one matches its own definition: Question is genuinely
 * open, Guide and discovery is a narrowed nudge, Reinforce names the specific behavior, and
 * Demonstrate / Feedback use language a U8–U10 player can picture.
 */

export const STOPPAGE_NAMES = {
  driveby: 'In-flow',
  drinks: 'Drinks break',
  pullaside: 'Pull aside',
  freeze: 'Freeze frame',
  huddle: 'Huddle',
  walkthrough: 'Walkthrough',
}

export const INTERACTIONS = [
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
    sounds: 'What else could you have done there?',
    pairs: ['freeze', 'huddle', 'drinks', 'pullaside'],
  },
  {
    id: 'guide',
    lines: ['GUIDE &', 'DISCOVERY'],
    name: 'Guide and discovery',
    def: 'Steer with a nudge and let them find the answer themselves.',
    sounds: 'Who was free?',
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
    sounds: 'Watch where my eyes go before the ball gets to me.',
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
    sounds: 'Your first touch went toward the defender, so they got to it first.',
    pairs: ['driveby', 'pullaside', 'drinks'],
  },
  {
    id: 'reinforce',
    lines: ['REINFORCE'],
    name: 'Reinforce',
    def: 'Name what was good, precisely, so it happens again.',
    sounds: "That's it — you looked before it came to you.",
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
