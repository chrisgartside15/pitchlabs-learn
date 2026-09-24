/**
 * Topic clusters (pillar + supporting-article groups), taken directly from CONTENT_STRATEGY.md
 * rather than invented here — this file is the single source of truth the app reads from; the
 * strategy doc is the human-readable plan. Add a cluster here when the strategy doc gets one.
 *
 * `pillarSlug` is optional: set it once that cluster's pillar article file exists in
 * content/articles/. Leaving it unset renders the cluster page's pillar slot as "coming soon"
 * instead of a broken link.
 */
export const CLUSTERS = [
  {
    slug: 'session-planning',
    title: 'Session Planning',
    // `goal` is reader-facing copy (topic cards, cluster page subtitle) — write it to the
    // coach reading it, not as an internal content-strategy note to the team. The earlier
    // versions of these five ("own the search space...", "establish PitchLabs' point of
    // view...") were the latter, copied straight out of CONTENT_STRATEGY.md's planning notes.
    goal: 'How to actually plan a session — what to include, what to cut, and why.',
    pillarSlug: null, // CONTENT_STRATEGY.md lists a pillar here ("How to Plan a Soccer Training
    // Session") but its file isn't in content/articles/ in this repo — treat as not yet published
    // rather than guessing at a slug that doesn't exist.
  },
  {
    slug: 'coaching-principles',
    title: 'Coaching Principles',
    goal: 'The thinking behind good coaching — decision-making, scanning, and what actually helps players learn.',
    pillarSlug: null,
  },
  {
    slug: 'age-groups',
    title: 'Age-Specific Training',
    goal: 'What changes as players get older, and what stays the same.',
    pillarSlug: null,
  },
  {
    slug: 'activities',
    title: 'Activity Library',
    goal: 'Practical drills and games, explained clearly enough to run today.',
    pillarSlug: null,
  },
  {
    slug: 'session-objectives',
    title: 'Session Planning by Objective',
    goal: "Sessions built around the specific problem you're trying to solve.",
    pillarSlug: null,
  },
]

export function getCluster(slug) {
  return CLUSTERS.find((c) => c.slug === slug) || null
}
