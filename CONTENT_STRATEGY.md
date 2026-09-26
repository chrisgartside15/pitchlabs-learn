# PitchLabs Learn: Content Strategy

## Purpose

PitchLabs Learn is an owned acquisition channel that:
- Teaches soccer coaches how to think about session design, not just what activities to copy
- Demonstrates PitchLabs' expertise and point of view through content
- Drives organic search traffic to coaches actively researching these topics
- Links content to the builder product without compromising the content's usefulness

Every article should pass this test:
**Would a soccer coach genuinely bookmark this even if PitchLabs didn't exist?**

## Guiding Principles

1. **Authenticity over volume:** Fewer, deeply useful articles rather than hundreds of SEO copy.
2. **Ownership:** Original coaching insights, original diagrams. Not AI-generated activity lists.
3. **Connection, not contamination:** Articles link naturally to each other and the product, but don't force the product into every piece.
4. **Coaches write for coaches:** Tone reflects genuine coaching experience, not marketing copy.

## Strategy Reset (2026-09-17, migrated into this doc 2026-09-26)

The cluster list below was originally five generic clusters (Session Planning, Coaching Principles, Age-Specific Training, Activity Library, Session Planning by Objective) — "could have been written by any coach with internet access." `docs/pitchlabs-learn/ROADMAP_6MONTH.md` replaced that plan on 2026-09-17 with clusters built around what Chris can actually claim (current U8–U10 Pre-Competitive Director, futsal program director, Coach Developer Diploma). This file — and `lib/clusters.js`, which reads directly from it — had never actually been updated to match that reset, so the live site ran the rejected taxonomy for over a week. Fixed 2026-09-26.

**Coaching Principles survives as a sixth cluster**, alongside the roadmap's five, rather than being folded into one of them — the roadmap was written before the STEP / Coaching Intervention Wheel series and its pillar existed, so it didn't anticipate this content. STEP and the Wheel are real proprietary frameworks (exactly the differentiated IP the wedge is built on), and the four articles under this cluster don't split cleanly across the other five.

`lib/clusters.js` is the actual source of truth for slugs, titles, and pillar status — this section is the human-readable plan behind it. Keep them in sync; don't let this doc drift again.

## Topic Clusters (Pillars + Supporting Articles)

Each cluster has a pillar article (broad, foundational) that links to supporting articles (specific, deep). Supporting articles link back to the pillar and to each other.

---

### A note on series vs. cluster (added 2026-09-26)

`cluster` (frontmatter) is an article's topical/browsing home — which topic page it lives on, what its badge says. `series` (+ `seriesPart`/`seriesTotal`) is a separate, optional frontmatter concept for a locked, ordered sequence of articles that doesn't have to stay inside one cluster. The two are deliberately decoupled: an article's cluster is whichever topic it's actually about; its series membership (if any) is a different, additional fact about it. See `components/content.js`'s `SeriesBadge` and `components/SeriesRecap.js`.

"What Actually Shapes a Youth Practice" is the first (currently only) series, and it spans two clusters on purpose — articles 1 and 3 are genuinely session-design/session-execution content (Session Planning Fundamentals' own stated direction below describes them almost exactly), while article 2 is genuinely about interaction philosophy (Coaching Principles). Splitting a series across clusters like this is a normal, well-understood content pattern (most SaaS blogs with multi-part guides do this) as long as the series identity stays visually distinct and consistent regardless of which cluster badge is showing — the `SeriesBadge` next to the `ClusterBadge` on each article, plus the `SeriesRecap` card and prev/next footer links, are what carry that.

---

### CLUSTER 1: Session Planning Fundamentals (`session-planning`)

**Why:** Directly maps to the product (PitchLabs is a session-planning tool).

**Pillar Article (to write):**
- How to Plan a Soccer Training Session: A Complete Guide
- **Not live.** An earlier version of this doc claimed this was live as of September 2026 — checked against `content/articles/`, no such file exists. That claim was false; corrected here and in `lib/clusters.js`'s comment.

**Supporting Articles — 2 of 3 parts of the "What Actually Shapes a Youth Practice" series (see note above):**
1. Why Your U8 Soccer Practice Feels Like Chaos (And How to Fix It) — **PUBLISHED**, part 1 of 3
   (`content/articles/why-your-u8-practice-feels-like-chaos.mdx`) — environment design, the STEP framework
2. How to Progress a Session Without Stopping the Game Every Two Minutes — **PUBLISHED**, part 3 of 3
   (`content/articles/progress-a-session-without-stopping-the-game.mdx`) — the Coaching Intervention Wheel's outer ring (the six stoppage types) — moved here from Coaching Principles 2026-09-26, since "progressing an activity without stopping play" is this cluster's own stated direction almost verbatim. Part 2 of the series stays under Coaching Principles (see below); the `series` field keeps all three linked regardless.

**Other supporting article directions (per ROADMAP_6MONTH.md, not yet drafted):** learning objectives before drills, session structure/timing for youth sessions. Keep this cluster's supporting articles anchored in Chris's actual age range (U6–U10) rather than drifting into general/older-age session planning, where the credibility argument weakens.

---

### CLUSTER 2: Coaching Principles (`coaching-principles`)

**Goal:** Establish PitchLabs' point of view on core coaching concepts. Kept as a sixth cluster per the Strategy Reset note above.

**Pillar Article:**
- The Fundamentals of Soccer Coaching — **PUBLISHED** (`content/articles/fundamentals-of-soccer-coaching.mdx`)
  - What separates good coaching from a well-run activity
  - Perceive → decide → execute, and why "perceive" is deliberately left open rather than resolved
  - Why the coach's job changes by age group
  - Not part of the numbered series below — it's the umbrella piece the series (and eventually every Coaching Principles article) supports.

**Supporting Articles:**

**Part 2 of the "What Actually Shapes a Youth Practice" series** (parts 1 and 3 are under Session Planning Fundamentals — see the note above and Cluster 1):
1. How Much Should You Actually Say? — **PUBLISHED**, part 2 of 3
   (`content/articles/how-much-should-you-actually-say.mdx`) — the Coaching Intervention Wheel's inner ring (Instruct vs. Question/Silence/Guide/Co-create)

**Other supporting articles (planned, not yet drafted):**
2. Scanning and Receiving: Why Information Comes Before Decisions — directly answers the pillar's deliberately-unresolved "perceiving" thread
   - What scanning is and why it matters
   - How to create practices that force scanning
   - Age-appropriate expectations
3. Body Position and First Touch: Why Context Matters More Than Technique
4. Support and Movement: Creating Options for the Player on the Ball
5. Decision-Making Under Pressure
6. Possession vs. Purpose
7. Pressing: What It Is and What It Isn't

---

### CLUSTER 3: Coaching U6–U10 (`coaching-u6-u10`)

**Why:** Chris's actual day job and the sharpest differentiation available — almost no youth-soccer content is written by someone currently running a large pre-competitive program at this exact age range.

**Pillar Article (to write):**
- Coaching U6–U10 Soccer: What Actually Matters at This Age

**Supporting article directions:** small-sided formats (5v5/7v7) and why they exist, realistic expectations for pre-competitive ages, running trials/team formation fairly, what "development over results" looks like in practice at this age.

---

### CLUSTER 4: Futsal & Small-Sided Development (`futsal-small-sided`)

**Why:** Direct, credentialed expertise (Girls Futsal Programme Director, United Futsal Foundation Diploma) that almost no competing content has. Real, specific search demand and low content competition.

**Pillar Article (to write):**
- Why Futsal Develops Better Soccer Players (And How to Actually Use It)

**Supporting article directions:** futsal principles that transfer to 11v11, building a club futsal curriculum, small-sided game numbers/space/rules.

---

### CLUSTER 5: Coach Development & CPD (`coach-development`)

**Why:** Reaches a different audience than parent-coaches — club directors, program leads, and volunteer coaches who need mentoring, which is exactly Chris's Coach Developer Diploma specialty. Longer-term differentiator.

**Pillar Article (to write):**
- Building a Coaching Workforce That Actually Improves: A Coach Development Framework

**Supporting article directions:** running effective coach observations, recruiting and onboarding volunteer coaches, designing a CPD workshop, what makes coach mentoring actually change behavior on the field.

---

### CLUSTER 6: Activity & Practice Library (`activities`)

**Why lower priority:** Highest content-production cost (needs original diagrams per activity) and the most commoditized space — this is where generic content competitors live. Worth doing eventually because it pairs naturally with the PitchLabs builder, but not before the differentiated clusters above have traction.

**Format when tackled:** One article per activity/game, sourced from Chris's actual session library — Problem → Setup → Coaching Points → PitchLabs diagram → Progressions.

**Examples (illustrative, not a committed list):** Rondos (4v2, 5v2, directional, positional), small-sided games (3v3, 4v4, 5v5), possession games, transition games, 1v1/2v1/2v2.

---

## Clusters retired in the 2026-09-17 reset

Removed from `lib/clusters.js` 2026-09-26 — no published articles referenced either slug, so this was a zero-risk removal. Listed here only so the reasoning isn't lost if either topic resurfaces:

- **Age-Specific Training** — generic; superseded by Coaching U6–U10, which is scoped to Chris's actual credentialed age range instead of spanning U6–U14 in the abstract.
- **Session Planning by Objective** — generic; the useful parts of this idea (sessions built around a specific problem) are better served by supporting articles within Session Planning Fundamentals or Coaching Principles than as their own cluster.

## SEO & Search Intent

Directional notes on search demand, not a committed keyword list — verify actual volume/competition before targeting.

### High-Volume Searches (Harder but worth it)

- "how to plan a soccer training session"
- "soccer training drills"
- "youth soccer coaching tips"

### Medium-Volume Searches (Best ROI)

- "how to coach scanning in soccer"
- "small-sided games soccer"
- "soccer decision-making drills"
- "possession drills soccer"
- "futsal training drills"
- "u8 soccer coaching"

### Long-Tail Searches (Easy wins)

- "4v4 soccer games for youth"
- "how to coach supporting angles"
- "rondo soccer drill variations"
- "futsal to 11v11 transfer"

## URL & Linking Strategy

**Actual URL structure (verified against the app, 2026-09-26 — this section previously described a nested pattern the app never implemented):**

```
/                                          (home)
/articles                                 (all articles, flat list)
/articles/[article-slug]                  (every article, regardless of cluster)
/topics                                   (all clusters)
/topics/[cluster-slug]                    (cluster landing page: pillar + supporting articles)
```

Production serves all of the above under a `/learn` basePath (e.g. `usepitchlabs.com/learn/articles/...`) — see `next.config.js` and `lib/site.js`. Articles are **not** nested under their cluster in the URL; `cluster` is only frontmatter metadata used for grouping and the topic-page pillar/supporting split.

**Linking:**

- Every supporting article links back to its cluster pillar
- Related articles link to each other (e.g., the three Coaching Principles supporting articles cross-link, and now the pillar too)
- CTAs link to the PitchLabs builder when appropriate, never forced

## Planning & Progress

This doc holds the *what* and *why* for each cluster. For current status, don't duplicate a calendar or schedule here — it goes stale (an earlier version of this section did, claiming a pillar was live that was never drafted). Check instead:

- **`docs/pitchlabs-learn/PUBLISHING_CALENDAR.md`** — the actual article queue, what's drafted/published, in priority order
- **`docs/pitchlabs-learn/ROADMAP_6MONTH.md`** — cluster sequencing and the 6-month plan
- **`docs/pitchlabs-learn/PERFORMANCE_FRAMEWORK.md`** — what to track once articles are live

## Measurement

Track:
- Organic search traffic by article
- Time on page
- Bounce rate (low bounce = good content)
- Links from external sources
- Conversion to app.pitchlabs.com

Early indicator of success:
- 10k+ monthly organic search visits within 6 months
- Multiple articles ranking for target keywords
- External coaches linking to PitchLabs Learn

---

## Notes

- Don't publish dozens of articles to "game" Google. Quality + structure wins long-term.
- Every article should link to others. An isolated article doesn't help Google understand the site's topical authority.
- Video/diagrams are a huge advantage. Use them liberally.
- Author byline + credentials matter. Put your name and license on articles you genuinely write.
- SEO optimization happens AFTER writing. Write first, then optimize for readability and metadata.
