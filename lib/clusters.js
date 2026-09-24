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
    goal: 'Own the search space around how coaches should think about training design.',
    pillarSlug: null, // CONTENT_STRATEGY.md lists a pillar here ("How to Plan a Soccer Training
    // Session") but its file isn't in content/articles/ in this repo — treat as not yet published
    // rather than guessing at a slug that doesn't exist.
  },
  {
    slug: 'coaching-principles',
    title: 'Coaching Principles',
    goal: "Establish PitchLabs' point of view on core coaching concepts.",
    pillarSlug: null,
  },
  {
    slug: 'age-groups',
    title: 'Age-Specific Training',
    goal: 'Acknowledge that U6 training looks different from U14 training.',
    pillarSlug: null,
  },
  {
    slug: 'activities',
    title: 'Activity Library',
    goal: 'Show how PitchLabs diagrams enhance simple activity explanations.',
    pillarSlug: null,
  },
  {
    slug: 'session-objectives',
    title: 'Session Planning by Objective',
    goal: 'Help coaches plan sessions around specific problems.',
    pillarSlug: null,
  },
]

export function getCluster(slug) {
  return CLUSTERS.find((c) => c.slug === slug) || null
}
