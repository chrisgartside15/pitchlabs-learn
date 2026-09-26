/**
 * Topic clusters (pillar + supporting-article groups), taken directly from CONTENT_STRATEGY.md
 * rather than invented here — this file is the single source of truth the app reads from; the
 * strategy doc is the human-readable plan. Add a cluster here when the strategy doc gets one.
 *
 * `pillarSlug` is optional: set it once that cluster's pillar article file exists in
 * content/articles/. Leaving it unset renders the cluster page's pillar slot as "coming soon"
 * instead of a broken link.
 *
 * Migrated 2026-09-26 to match docs/pitchlabs-learn/ROADMAP_6MONTH.md's 2026-09-17 strategy
 * reset, which replaced the original generic 5-cluster plan (Session Planning, Coaching
 * Principles, Age-Specific Training, Activity Library, Session Planning by Objective — "could
 * have been written by any coach with internet access") with clusters built around what Chris
 * can actually claim. CONTENT_STRATEGY.md and this file had never actually been updated to match
 * that reset until now, so the live site was running the rejected plan for over a week.
 *
 * Coaching Principles is kept as a sixth cluster alongside the roadmap's five rather than folded
 * into one of them — STEP and the Coaching Intervention Wheel are real proprietary frameworks
 * (exactly the differentiated-IP the wedge wants), and the four articles under it don't split
 * cleanly across the roadmap's five clusters. The roadmap was written a week before this
 * series/pillar existed, so it didn't anticipate this content — not evidence it should be cut.
 */
export const CLUSTERS = [
  {
    slug: 'session-planning',
    title: 'Session Planning Fundamentals',
    // `goal` is reader-facing copy (topic cards, cluster page subtitle) — write it to the
    // coach reading it, not as an internal content-strategy note to the team. The earlier
    // versions of these ("own the search space...", "establish PitchLabs' point of view...")
    // were the latter, copied straight out of CONTENT_STRATEGY.md's planning notes.
    goal: 'How to actually plan a session — what to include, what to cut, and why.',
    pillarSlug: null, // ROADMAP_6MONTH.md's own Cluster 1 entry claims this pillar is "LIVE,
    // verified 2026-09-18" — checked against content/articles/, no such file exists. That claim
    // is stale/wrong; flagged in the roadmap doc itself. Treat as not yet published.
  },
  {
    slug: 'coaching-principles',
    title: 'Coaching Principles',
    goal: 'The thinking behind good coaching — decision-making, scanning, and what actually helps players learn.',
    pillarSlug: 'fundamentals-of-soccer-coaching',
  },
  {
    slug: 'coaching-u6-u10',
    title: 'Coaching U6–U10',
    goal: "What actually matters at this age — realistic expectations, small-sided formats, and development over results.",
    pillarSlug: null, // ROADMAP_6MONTH.md: "Coaching U6–U10 Soccer: What Actually Matters at
    // This Age" (to write).
  },
  {
    slug: 'futsal-small-sided',
    title: 'Futsal & Small-Sided Development',
    goal: 'Futsal and small-sided play, and what actually transfers back to 11v11.',
    pillarSlug: null, // ROADMAP_6MONTH.md: "Why Futsal Develops Better Soccer Players (And How
    // to Actually Use It)" (to write).
  },
  {
    slug: 'coach-development',
    title: 'Coach Development & CPD',
    goal: 'Coaching the coaches — mentoring, CPD, and building a workforce that actually improves.',
    pillarSlug: null, // ROADMAP_6MONTH.md: "Building a Coaching Workforce That Actually
    // Improves: A Coach Development Framework" (to write). Different audience than the other
    // clusters — club directors and program leads, not individual parent-coaches.
  },
  {
    slug: 'activities',
    title: 'Activity & Practice Library',
    goal: 'Practical drills and games, explained clearly enough to run today.',
    pillarSlug: null,
  },
]

export function getCluster(slug) {
  return CLUSTERS.find((c) => c.slug === slug) || null
}
