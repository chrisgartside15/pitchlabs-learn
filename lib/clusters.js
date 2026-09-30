/**
 * Topic clusters (pillar + supporting-article groups), taken directly from CONTENT_STRATEGY.md
 * rather than invented here — this file is the single source of truth the app reads from; the
 * strategy doc is the human-readable plan. Add a cluster here when the strategy doc gets one.
 *
 * `pillarSlug` is optional: set it once that cluster's pillar article file exists in
 * content/articles/. Leaving it unset renders the cluster page's pillar slot as "coming soon"
 * instead of a broken link.
 *
 * Migrated 2026-09-26 (second migration same day) from the 6-cluster taxonomy to this 5-cluster
 * one, on Chris's direct call rather than a strategy-doc reset. The previous taxonomy split
 * decision-making content across two clusters (Coaching Principles / Coaching U6–U10) and kept a
 * generic "Activity & Practice Library" cluster that failed the wedge test outright — a drill
 * list is exactly the crowded, low-differentiation content CLAUDE.md's wedge section warns
 * against. This version: merges the decision-making material into one deep Coaching Principles
 * pillar instead of splitting it two ways; replaces the U6–U10 age cluster with a narrower Age &
 * Development cluster scoped specifically to what changes structurally by age (formats, group
 * sizes, session length) rather than decision-making itself; drops Activity & Practice Library
 * entirely rather than holding it as a lower-priority placeholder; and narrows Futsal &
 * Small-Sided Development to just Futsal, since small-sided-format content (5v5/7v7 as a
 * session-design choice) fits Session & Curriculum Design better than it fits a futsal-specific
 * cluster. See CONTENT_STRATEGY.md's Strategy Reset note for the full reasoning.
 */
export const CLUSTERS = [
  {
    slug: 'coaching-principles',
    title: 'Coaching Principles',
    // `goal` is reader-facing copy (topic cards, cluster page subtitle) — write it to the coach
    // reading it, not as an internal content-strategy note to the team.
    goal: 'How players learn, and how to coach them in the moment: decisions, scanning and what you say.',
    pillarSlug: 'fundamentals-of-soccer-coaching',
  },
  {
    slug: 'session-design',
    title: 'Session & Curriculum Design',
    goal: 'How to plan and build a session, from structure to small-sided formats.',
    pillarSlug: 'how-to-plan-a-soccer-training-session',
  },
  {
    slug: 'age-development',
    title: 'Age & Development',
    goal: 'What changes as players grow: formats, group sizes, attention and what matters most at each age.',
    pillarSlug: 'coaching-u6-to-u10',
  },
  {
    slug: 'futsal',
    title: 'Futsal',
    goal: 'Futsal-specific coaching, and what actually transfers back to 11v11.',
    pillarSlug: null,
  },
  {
    slug: 'coach-development',
    title: 'Coach Development & CPD',
    goal: 'Coaching the coaches: mentoring, observation, and seeing your own coaching clearly.',
    pillarSlug: null,
  },
]

export function getCluster(slug) {
  return CLUSTERS.find((c) => c.slug === slug) || null
}
