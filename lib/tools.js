/**
 * Registry of the free tools that have their own page under /tools/<slug>, other than the 7v7 formation builder
 * (which has a dedicated page, app/tools/7v7-formation-builder). Each tool is a component that also sits inside an
 * article; the tool page shows the same component on its own with a short, plain description and a link back to the
 * article it comes from, which carries the sources and attribution.
 *
 * Copy rules (CLAUDE.md): describe what the tool does, in the article's own terms. No new research claims, nothing
 * "ours": STEP and the intervention wheel are attributed as existing ideas, and the rule-of-thumb tools say so.
 * `component` is a key in app/tools/[slug]/page.js's component map. `blurb` and `kind` are what the cards show.
 */
export const TOOLS = [
  {
    slug: 'small-sided-game-splitter',
    component: 'GameSplitter',
    title: 'Small-Sided Game Splitter',
    metaTitle: 'Small-Sided Game Splitter: How to Split Your Players',
    description:
      'Free soccer tool: enter how many players turned up and see every way to split them into small-sided games, with players per ball and a "start here" suggestion.',
    intro:
      'Enter how many players turned up and it lays out the ways to split them: everyone in one game, then two, three or four games at once. It is plain arithmetic, with an odd player out becoming a neutral.',
    how: [
      'Set the number of players with the stepper or by typing.',
      'Read down the rows: how many games, the split, players per ball, and goals needed.',
      'The "Start here" row is the most games that keeps every game between 3v3 and 4v4.',
    ],
    note: 'The "start small" suggestion comes from the article\'s reading of the small-sided games research. The sums are just arithmetic.',
    articleSlug: 'small-sided-games',
    blurb: 'Every way to split the players you have into small-sided games, with players per ball and goals needed.',
    kind: 'Calculator',
  },
  {
    slug: 'step-framework-tool',
    component: 'StepTool',
    title: 'STEP Framework Tool',
    metaTitle: 'STEP Framework for Soccer Coaches: Fix an Activity That Is Not Working',
    description:
      'Free soccer coaching tool: pick the problem (too easy, too difficult, too slow, or right game wrong behavior) and see the Space, Task, Equipment and Players changes to try.',
    intro:
      'Is the activity too easy, too difficult, too slow, or not producing the behavior you want? Pick the problem, then see which of STEP (Space, Task, Equipment, Players) to adjust, without losing the original objective.',
    how: [
      'Pick the problem that best matches what you are seeing.',
      'Read the suggested change for each of Space, Task, Equipment and Players.',
      'Change one thing, run it again, and watch what the players do.',
    ],
    note: 'STEP is an existing coaching framework, not something made up for this site. The article links to the FA\'s own version.',
    articleSlug: 'why-your-practice-feels-like-chaos',
    blurb: 'Pick what is going wrong with an activity and see what to change: space, task, equipment or players.',
    kind: 'Framework',
  },
  {
    slug: 'session-audit',
    component: 'SessionAudit',
    title: 'Session Audit',
    metaTitle: 'Soccer Session Audit: What Did Your Last Practice Ask of Players?',
    description:
      'Free soccer coaching tool: list your last session\'s activities, tag each as repeat, decide or look, and compare the split with one study of youth sessions.',
    intro:
      'List the activities from your last session and roughly how long each ran, then tag what each one mostly asked players to do: repeat a movement, make decisions, or look before the ball arrives.',
    how: [
      'Add each activity with its approximate minutes.',
      'Tag each as Repeat, Decide or Look.',
      'Compare your split with the study average shown under it. A drill-heavy session can be exactly right for a skill players cannot do yet.',
    ],
    note: 'Your entries stay in your browser. The comparison is one study (Ford et al., 2010, via Cushion, Ford and Williams, 2012), and it did not split game time into decide and look.',
    articleSlug: 'fundamentals-of-soccer-coaching',
    blurb: 'See how your last session split between repetition, decisions and looking, next to one study average.',
    kind: 'Self-check',
  },
  {
    slug: 'couldnt-or-didnt',
    component: 'CouldntOrDidnt',
    title: 'Couldn\'t or Didn\'t? A Coaching Diagnostic',
    metaTitle: 'Couldn\'t or Didn\'t? Is It a Teaching Problem or a Choosing Problem?',
    description:
      'Free soccer coaching flowchart: when players keep getting something wrong, decide whether they could not do it (teach it) or did not choose it (change the game).',
    intro:
      'Watch a few breakdowns in a row, then answer for the player or the group. It points you to either a teaching problem or a choosing problem, and what to try next.',
    how: [
      'Ask: can they do the action with nobody near them?',
      'If you are not sure, ask whether the whole group breaks down at the same technical moment.',
      'Read the steps in the result card under the flowchart.',
    ],
    note: 'This is a rule of thumb, not a tested model, and the tool says so.',
    articleSlug: 'teach-it-or-let-the-game-teach-it',
    blurb: 'Three questions to tell a teaching problem from a choosing problem, and what to try next.',
    kind: 'Diagnostic',
  },
  {
    slug: 'coaching-interaction-picker',
    component: 'InterventionWheelTool',
    title: 'Coaching Interaction Picker',
    metaTitle: 'Twelve Ways to Coach a Player: Coaching Interaction Picker',
    description:
      'Free soccer coaching tool: twelve ways to interact once you have stepped in, from saying nothing to a direct instruction. Select one to see how it works and what pairs with it.',
    intro:
      'Once you have decided to say something, how do you say it? Twelve ways to interact once you have stepped in, from saying nothing at all to a direct instruction.',
    how: [
      'Select an interaction: on the ring, or from the list on a phone.',
      'Read what it is at the top, then the card for how it sounds and which stoppage types pair with it.',
      'Clear the selection and try another.',
    ],
    note: 'This is the version of a common coaching-interaction idea that I use. It is not a new method.',
    articleSlug: 'how-much-should-you-actually-say',
    blurb: 'Twelve ways to interact once you have stepped in, from saying nothing to a direct instruction.',
    kind: 'Reference',
  },
  {
    slug: 'coaching-intervention-wheel',
    component: 'CoachingInterventionWheel',
    title: 'Coaching Intervention Wheel',
    metaTitle: 'Coaching Intervention Wheel: Who, How and When to Stop the Game',
    description:
      'Free soccer coaching reference: who you are coaching, how you interact, and how you stop the game, with the pairings that commonly go together.',
    intro:
      'Three choices: who you are coaching (individual, group, unit, team), how you interact once you step in (twelve ways), and how you physically stop the game to say it (six stoppage types). Select any one to see what commonly pairs with it.',
    how: [
      'Select a segment in any ring, or from the lists on a phone.',
      'Whatever commonly pairs with it lights up in the other two groups.',
      'Read the card for what it means, what it costs in playing time, and when it fits.',
    ],
    note: 'This is the version of a common coaching-interaction idea that I use, not a new method.',
    articleSlug: 'coach-without-stopping-the-game',
    blurb: 'Who you are coaching, how you interact, and how you stop the game, with what pairs together.',
    kind: 'Reference',
  },
]

/** The 7v7 formation builder has its own page; this is its card, so every list of tools is built from one place. */
export const FORMATION_BUILDER = {
  slug: '7v7-formation-builder',
  title: '7v7 Formation Builder',
  blurb: 'Drag the 2-3-1, 3-2-1 and 3-1-2 around a 7v7 pitch, set an opponent, and plan your squad rotation.',
  kind: 'Builder',
}

/** Every tool card, formation builder first. */
export const ALL_TOOL_CARDS = [FORMATION_BUILDER, ...TOOLS.map((t) => ({ slug: t.slug, title: t.title, blurb: t.blurb, kind: t.kind }))]

export function getTool(slug) {
  return TOOLS.find((t) => t.slug === slug) || null
}
