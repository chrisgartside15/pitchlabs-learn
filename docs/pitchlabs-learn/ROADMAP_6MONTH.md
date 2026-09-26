# PitchLabs Learn: 6-Month Roadmap

## Strategy Reset (2026-09-17)

The original 5-cluster plan (Session Planning, Coaching Principles, Age-Specific, Activity Library, Session-by-Objective) was generic — it could have been written by any coach with internet access. This roadmap rebuilds the clusters around what Chris can actually claim: current U8–U10 Pre-Competitive Director, futsal program director, coach educator with a Coach Developer Diploma. See CLAUDE.md for the full rationale.

**Cadence is deliberately not fixed.** Chris's review bandwidth is variable/bursty. This roadmap sets an order of priority, not a locked calendar — PUBLISHING_CALENDAR.md gets updated to reflect actual pace as it becomes clear, rather than this doc assuming a pace that gets missed every month.

**Verified state (2026-09-26):** Site is live at a temporary Vercel URL, not yet pushed to production (see PUBLISHING_CALENDAR.md). Four articles drafted under Coaching Principles: the three-part "What Actually Shapes a Youth Practice" series (STEP → the Coaching Intervention Wheel's inner ring → its outer ring) plus a real pillar, "The Fundamentals of Soccer Coaching." **This roadmap's cluster list and CONTENT_STRATEGY.md/`lib/clusters.js` had drifted out of sync for over a week — the live site ran the old, rejected 5-cluster taxonomy until 2026-09-26, when it was migrated to match this doc.** Coaching Principles was added as a sixth cluster alongside the five below, since it didn't exist when this roadmap was first written and doesn't split cleanly across the other five — see CONTENT_STRATEGY.md's Strategy Reset note for the reasoning. Domain approach decided: `usepitchlabs.com/learn`, a reverse-proxied subpath (not `learn.usepitchlabs.com` — that subdomain idea from earlier is superseded). Target launch date 2026-09-29; the code for the subpath wiring is committed locally in both repos, not yet pushed. See PUBLISHING_CALENDAR.md for the full remaining launch checklist.

## The Clusters

### Cluster 1: Session Planning Fundamentals (`session-planning`)
**Why first:** Directly maps to the product (PitchLabs is a session-planning tool).
**Pillar:** How to Plan a Soccer Training Session: A Complete Guide — **not live.** This entry previously claimed it was live as of 2026-09-18; checked against `content/articles/` on 2026-09-26, no such file exists. That was wrong — corrected here and in CONTENT_STRATEGY.md/`lib/clusters.js`.
**Supporting article directions:** learning objectives before drills, session structure/timing for youth sessions, progressing an activity without stopping play. Note: the "progressing an activity" angle already has a published piece under Coaching Principles ([How to Progress a Session Without Stopping the Game Every Two Minutes](/articles/progress-a-session-without-stopping-the-game)) — a future article here should angle differently rather than re-cover the same ground.
**Note:** Keep this cluster's supporting articles anchored in Chris's actual age range (U6–U10) rather than drifting into general/older-age session planning where the credibility argument weakens.

### Cluster 0: Coaching Principles (`coaching-principles`) — added 2026-09-26, not part of the original reset
**Why it exists outside this roadmap's original five:** written before the STEP / Coaching Intervention Wheel series existed. STEP and the Wheel are real proprietary frameworks — exactly the differentiated IP this whole reset is built around — so this cluster stays, it just wasn't anticipated when Clusters 1–5 below were drafted. Four articles live: three-part series plus pillar. See CONTENT_STRATEGY.md for full detail; this roadmap doesn't duplicate it.

### Cluster 2: Coaching U6–U10 (`coaching-u6-u10`) (NEW — highest-priority new cluster)
**Why:** This is Chris's actual day job and the sharpest differentiation available. Almost no youth-soccer content is written by someone currently running a 200-player, 24-team pre-competitive program.
**Pillar (to write):** Coaching U6–U10 Soccer: What Actually Matters at This Age
**Supporting article directions:** small-sided formats (5v5/7v7) and why they exist, realistic expectations for pre-competitive ages, running trials/team formation fairly, what "development over results" looks like in practice at this age.

### Cluster 3: Futsal & Small-Sided Development (`futsal-small-sided`) (NEW)
**Why:** Direct, credentialed expertise (Girls Futsal Programme Director, United Futsal Foundation Diploma) that almost no competing content has. Futsal also has real, specific search demand and low content competition.
**Pillar (to write):** Why Futsal Develops Better Soccer Players (And How to Actually Use It)
**Supporting article directions:** futsal principles that transfer to 11v11, building a club futsal curriculum, small-sided game numbers/space/rules.

### Cluster 4: Coach Development & CPD (`coach-development`) (NEW)
**Why:** Different audience than parent-coaches — reaches club directors, program leads, and volunteer coaches who need mentoring, which is exactly Chris's Coach Developer Diploma specialty. Longer-term differentiator once PitchLabs considers workforce/club features.
**Pillar (to write):** Building a Coaching Workforce That Actually Improves: A Coach Development Framework
**Supporting article directions:** running effective coach observations, recruiting and onboarding volunteer coaches, designing a CPD workshop, what makes coach mentoring actually change behavior on the field.

### Cluster 5: Activity & Practice Library (`activities`) (LOWER PRIORITY — future)
**Why lower priority:** Highest content-production cost (needs original diagrams per activity) and the most commoditized space — this is where generic content competitors live. Worth doing eventually because it pairs naturally with the PitchLabs builder, but not before the differentiated clusters above have traction.
**Format when tackled:** One article per activity/game, sourced from Chris's actual session library — Problem → Setup → Coaching Points → PitchLabs diagram → Progressions.

## Sequencing Logic

1. **Write Cluster 1's pillar and supporting articles** — no pillar is actually live yet (corrected above); this cluster maps directly to the product, so it shouldn't sit empty.
2. **Cluster 2 (U6–U10) next** — highest credibility, most direct product fit, least competitive coverage from someone with real current authority.
3. **Cluster 3 (Futsal) in parallel or immediately after** — same credibility strength, likely lower keyword competition than general youth coaching.
4. **Cluster 4 (Coach Development)** once 2–3 pieces prove the review/draft workflow and voice are working — this cluster reaches a different reader (club leaders, not individual parent-coaches) so it's worth having the writing process dialed in first.
5. **Cluster 5 (Activity Library)** only after the above are producing traffic and converting — treat as a scaling investment, not a starting one.

## What Success Looks Like (Directional, Not Committed Targets)

No analytics instrumented yet (see PERFORMANCE_FRAMEWORK.md), so these are intentions to revisit once real data exists — not numbers to report against from day one. Timelines below run from launch (2026-09-18).

- **First 2 months:** Cluster 1 finished. Cluster 2 pillar live plus 1–2 supporting articles. Search Console/Analytics actually instrumented. Custom domain connected.
- **Months 3–4:** Cluster 2 substantially built out. Cluster 3 (Futsal) pillar live. First real look at which articles are driving signups, and whether the wedge hypothesis (differentiated > generic) is actually panning out in the data.
- **Months 5–6:** Cluster 4 underway. Revisit this roadmap with real performance data — reprioritize clusters based on what's actually converting, not the original guess.

## Explicit Open Question to Revisit

Whether Cluster 5 (Activity Library) is worth the diagram-production cost at all, versus putting that time into deepening Clusters 2–4 — decide with real data, not now.

## Related Docs

- **CLAUDE.md** — editorial rules and the wedge this roadmap is built on
- **PUBLISHING_CALENDAR.md** — the near-term article queue and remaining launch items
- **PERFORMANCE_FRAMEWORK.md** — how progress against this roadmap gets measured
