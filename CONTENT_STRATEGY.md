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

## Strategy Reset (2026-09-17, migrated into this doc 2026-09-26, superseded by a second reset the same day)

The cluster list was originally five generic clusters (Session Planning, Coaching Principles, Age-Specific Training, Activity Library, Session Planning by Objective) — "could have been written by any coach with internet access." `docs/pitchlabs-learn/ROADMAP_6MONTH.md` replaced that plan on 2026-09-17 with six clusters built around what Chris can actually claim (current U8–U10 Pre-Competitive Director, futsal program director, Coach Developer Diploma): Session Planning Fundamentals, Coaching Principles, Coaching U6–U10, Futsal & Small-Sided Development, Coach Development & CPD, Activity & Practice Library.

**Second reset, same day (2026-09-26):** on review, that six-cluster list had two real problems. First, decision-making content was split across two destinations — Coaching Principles (STEP, the Coaching Intervention Wheel) and Coaching U6–U10 (age-appropriate coaching) — when almost all of what's differentiated about coaching young players *is* the framework applied, not a separate topic. Second, Activity & Practice Library failed the wedge test outright: a drill/activity list is exactly the crowded, low-differentiation content the wedge exists to avoid, regardless of how it's captioned. Fixed by merging the U6–U10 decision-making material into Coaching Principles, replacing the U6–U10 cluster with a narrower **Age & Development** cluster scoped specifically to what changes structurally by age (formats, group sizes, session length — not decision-making itself), dropping Activity & Practice Library entirely, and narrowing Futsal & Small-Sided Development to just **Futsal** (small-sided formats as a session-design choice now lives in Session & Curriculum Design instead). Net: six clusters down to five.

`lib/clusters.js` is the actual source of truth for slugs, titles, and pillar status — this section is the human-readable plan behind it. Keep them in sync; don't let this doc drift again.

## Topic Clusters (Pillars + Supporting Articles)

Each cluster has a pillar article (broad, foundational) that links to supporting articles (specific, deep). Supporting articles link back to the pillar and to each other.

---

### A note on series vs. cluster (added 2026-09-26)

`cluster` (frontmatter) is an article's topical/browsing home — which topic page it lives on, what its badge says. `series` (+ `seriesPart`/`seriesTotal`) is a separate, optional frontmatter concept for a locked, ordered sequence of articles that doesn't have to stay inside one cluster. The two are deliberately decoupled: an article's cluster is whichever topic it's actually about; its series membership (if any) is a different, additional fact about it. See `components/content.js`'s `SeriesBadge` and `components/SeriesRecap.js`.

"What Actually Shapes a Youth Practice" is the first (currently only) series, and it spans two clusters on purpose — articles 1 and 3 are genuinely session-design/session-execution content (Session & Curriculum Design's own stated direction below describes them almost exactly), while article 2 is genuinely about interaction philosophy (Coaching Principles). Splitting a series across clusters like this is a normal, well-understood content pattern (most SaaS blogs with multi-part guides do this) as long as the series identity stays visually distinct and consistent regardless of which cluster badge is showing — the `SeriesBadge` next to the `ClusterBadge` on each article, plus the `SeriesRecap` card and prev/next footer links, are what carry that.

---

### CLUSTER 1: Coaching Principles (`coaching-principles`)

**Why first:** This is the site's spine — STEP and the Coaching Intervention Wheel are the tools Chris actually uses and teaches, and every other cluster either applies this thinking to a specific context or sits adjacent to it. Neither is his invention. Similar models to both exist elsewhere, so the honest claim for each is "the version I use and how I use it," plus what is distinctive in Chris's application of the Wheel specifically: the time cost on each stoppage, and matching the stoppage to who needs to hear it. Merges what used to be split across "Coaching Principles" and "Coaching U6–U10" — almost all of what's differentiated about coaching young players *is* this framework applied, not a separate topic.

**Pillar Article:**
- The Fundamentals of Soccer Coaching — **PUBLISHED** (`content/articles/fundamentals-of-soccer-coaching.mdx`)
  - What separates good coaching from a well-run activity
  - Perceive → decide → execute, and why "perceive" is deliberately left open rather than resolved
  - Why the coach's job changes by age group
  - Not part of the numbered series below — it's the umbrella piece the series (and eventually every Coaching Principles article) supports.

**Supporting Articles:**

**Part 2 of the "What Actually Shapes a Youth Practice" series** (parts 1 and 3 are under Session & Curriculum Design — see the note above and Cluster 2):
1. How Much Should You Actually Say? — **PUBLISHED**, part 2 of 3
   (`content/articles/how-much-should-you-actually-say.mdx`) — the Coaching Intervention Wheel's inner ring (Instruct vs. Question/Silence/Guide/Co-create)

2. Scanning and Receiving: Why Information Comes Before Decisions — **DRAFTED 2026-09-28** (`content/articles/scanning-and-receiving.mdx`), pending Chris's review. Directly answers the pillar's previously-unresolved "perceiving" thread, and resolves it by reframing perceiving as scanning (an action), not a separate cognitive stage — see COACHING_FRAMEWORK.md's "Component 3: Scanning" for the research base (Jordet et al.). Pillar article updated to link here instead of leaving the thread open.

**Other supporting articles (planned, not yet drafted):**
3. Decision-Making Under Pressure
4. Possession vs. Purpose
5. Pressing: What It Is and What It Isn't

---

### CLUSTER 2: Session & Curriculum Design (`session-design`)

**Why:** Directly maps to the product (PitchLabs is a session-planning tool) — and broadened beyond single-session planning to include how you sequence what you teach across a season or program, since that's a zoom-level distinction on the same question, not genuinely different territory. This is also where small-sided formats (5v5/7v7) live — a structural session-design choice, not a futsal-specific one.

**Pillar Article (to write):**
- How to Plan a Soccer Training Session: A Complete Guide — **not live.**

**Supporting Articles — 2 of 3 parts of the "What Actually Shapes a Youth Practice" series (see note above):**
1. Why Your Soccer Practice Feels Like Chaos (And How to Fix It) — **PUBLISHED**, part 1 of 3
   (`content/articles/why-your-practice-feels-like-chaos.mdx`) — environment design, the STEP framework
2. How to Progress a Session Without Stopping the Game Every Two Minutes — **PUBLISHED**, part 3 of 3
   (`content/articles/coach-without-stopping-the-game.mdx`) — the Coaching Intervention Wheel's outer ring (the six stoppage types)

**Other supporting article directions (not yet drafted):** learning objectives before drills, session structure/timing for youth sessions, small-sided formats (5v5/7v7) and why they exist, building a season-long curriculum/syllabus. Keep supporting articles anchored in Chris's actual age range (U6–U10) rather than drifting into general/older-age session planning, where the credibility argument weakens.

---

### CLUSTER 3: Age & Development (`age-development`)

**Why:** Chris's actual day job and the sharpest differentiation available — almost no youth-soccer content is written by someone currently running a large pre-competitive program at this exact age range. Scoped narrowly to what actually changes *structurally* by age (formats, group sizes, session length, development priorities) — deliberately not decision-making itself, which stays in Coaching Principles, so the two clusters don't compete for the same content.

**Pillar Article (to write):**
- Coaching U6–U10 Soccer: What Actually Matters at This Age

**Supporting article directions:** realistic expectations for pre-competitive ages, running trials/team formation fairly, what "development over results" looks like in practice at this age, how format/group size should change from U6 through U12+.

---

### CLUSTER 4: Futsal (`futsal`)

**Why:** Direct, credentialed expertise (Girls Futsal Programme Director, United Futsal Foundation Diploma) that almost no competing content has. Real, specific search demand and low content competition. Narrowed from the earlier "Futsal & Small-Sided Development" — small-sided-format content now lives in Session & Curriculum Design, so this cluster stays futsal-specific.

**Pillar Article (to write):**
- Why Futsal Develops Better Soccer Players (And How to Actually Use It)

**Supporting article directions:** futsal principles that transfer to 11v11, building a club futsal curriculum, futsal-specific rules and space.

---

### CLUSTER 5: Coach Development & CPD (`coach-development`)

**Why:** Reaches a different audience than parent-coaches — club directors, program leads, and volunteer coaches who need mentoring, which is exactly Chris's Coach Developer Diploma specialty. Longer-term differentiator, authority play more than a direct conversion driver.

**Pillar Article (to write):**
- Building a Coaching Workforce That Actually Improves: A Coach Development Framework

**Supporting article directions:** running effective coach observations, recruiting and onboarding volunteer coaches, designing a CPD workshop, what makes coach mentoring actually change behavior on the field.

---

## Clusters retired

Not in `lib/clusters.js` — listed here only so the reasoning isn't lost if a topic resurfaces.

**Retired in the 2026-09-17 reset:**
- **Age-Specific Training** — generic; superseded by what's now Age & Development, scoped to Chris's actual credentialed age range instead of spanning U6–U14 in the abstract.
- **Session Planning by Objective** — generic; the useful parts of this idea are better served by supporting articles within Session & Curriculum Design or Coaching Principles than as their own cluster.

**Retired in the second reset (2026-09-26, same day as the migration above):**
- **Coaching U6–U10** — replaced by the narrower Age & Development (see Cluster 3 above); its decision-making-adjacent article directions moved to Coaching Principles instead.
- **Activity & Practice Library** — cut outright, not just deprioritized. A drill/activity list is the exact generic, low-differentiation content the wedge exists to avoid; the only version worth writing (an activity run explicitly through STEP or the Intervention Wheel) belongs inside Coaching Principles or Session & Curriculum Design, not a standalone destination.
- **Futsal & Small-Sided Development** — narrowed to Futsal; small-sided-format content moved to Session & Curriculum Design.

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
- Conversion to usepitchlabs.com

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
