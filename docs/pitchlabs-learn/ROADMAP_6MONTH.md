# PitchLabs Learn: 6-Month Roadmap

## Strategy Reset (2026-09-17), then a second reset (2026-09-26)

The original 5-cluster plan (Session Planning, Coaching Principles, Age-Specific, Activity Library, Session-by-Objective) was generic — it could have been written by any coach with internet access. The 2026-09-17 reset rebuilt the clusters around what Chris can actually claim: current U8–U10 Pre-Competitive Director, futsal program director, coach educator with a Coach Developer Diploma. That produced six clusters: Session Planning Fundamentals, Coaching Principles, Coaching U6–U10, Futsal & Small-Sided Development, Coach Development & CPD, Activity & Practice Library.

**Second reset, 2026-09-26 (same day as the migration that finally brought the live site in line with the first reset — see below):** on review, Coaching Principles and Coaching U6–U10 were splitting decision-making content across two destinations when almost all of what's differentiated about coaching young players *is* the framework (STEP, the Coaching Intervention Wheel) applied, not a separate topic. And Activity & Practice Library failed the wedge test outright — a drill list is exactly the generic content this whole reset exists to move away from. Down to **five clusters**: Coaching Principles (merged), Session & Curriculum Design, Age & Development (replaces Coaching U6–U10, narrowed to what changes structurally by age rather than decision-making), Futsal (narrowed from Futsal & Small-Sided — small-sided formats moved into Session & Curriculum Design), Coach Development & CPD. Activity & Practice Library cut entirely, not deprioritized. See CONTENT_STRATEGY.md for the full per-cluster detail — this roadmap doesn't duplicate it.

**Cadence is deliberately not fixed.** Chris's review bandwidth is variable/bursty. This roadmap sets an order of priority, not a locked calendar — PUBLISHING_CALENDAR.md gets updated to reflect actual pace as it becomes clear, rather than this doc assuming a pace that gets missed every month.

**Launched 2026-09-29** at `https://www.usepitchlabs.com/learn` with 11 articles — see PUBLISHING_CALENDAR.md's Live section. *Pre-launch note (2026-09-26), kept for history:* Site is live at a temporary Vercel URL, not yet pushed to production (see PUBLISHING_CALENDAR.md). Four articles drafted: the three-part "What Actually Shapes a Youth Practice" series (STEP → the Coaching Intervention Wheel's inner ring → its outer ring, split across Coaching Principles and Session & Curriculum Design) plus a real Coaching Principles pillar, "The Fundamentals of Soccer Coaching." Domain approach decided: `usepitchlabs.com/learn`, a reverse-proxied subpath (not `learn.usepitchlabs.com` — that subdomain idea from earlier is superseded). Target launch date 2026-09-29; the code for the subpath wiring is committed locally in both repos, not yet pushed. See PUBLISHING_CALENDAR.md for the full remaining launch checklist.

## The Clusters

### Cluster 1: Coaching Principles (`coaching-principles`)
**Why first:** STEP and the Coaching Intervention Wheel are the tools Chris actually uses and teaches. Neither is claimed as his own — similar models to both exist elsewhere, and the honest claim for each is just what he uses and how he uses it. Neither should be described as proprietary. Four articles drafted (three-part series plus pillar), none published yet. See CONTENT_STRATEGY.md for full detail.

### Cluster 2: Session & Curriculum Design (`session-design`)
**Why:** Directly maps to the product (PitchLabs is a session-planning tool), broadened to include season/program-level sequencing, not just a single session.
**Pillar:** How to Plan a Soccer Training Session: A Complete Guide — **not live.**
**Supporting article directions:** learning objectives before drills, session structure/timing for youth sessions, small-sided formats (5v5/7v7) and why they exist, building a season-long curriculum. Note: "progressing an activity without stopping play" already has a published piece here ([How to Progress a Session Without Stopping the Game Every Two Minutes](/articles/progress-a-session-without-stopping-the-game)) — a future article should angle differently rather than re-cover the same ground.
**Note:** Keep supporting articles anchored in Chris's actual age range (U6–U10) rather than drifting into general/older-age session planning where the credibility argument weakens.

### Cluster 3: Age & Development (`age-development`) (highest-priority new cluster)
**Why:** This is Chris's actual day job and the sharpest differentiation available. Almost no youth-soccer content is written by someone currently running a 200-player, 24-team pre-competitive program. Scoped to what changes structurally by age — formats, group sizes, session length — not decision-making, which stays in Coaching Principles.
**Pillar (to write):** Coaching U6–U10 Soccer: What Actually Matters at This Age
**Supporting article directions:** realistic expectations for pre-competitive ages, running trials/team formation fairly, what "development over results" looks like in practice at this age, how format/group size should change from U6 through U12+.

### Cluster 4: Futsal (`futsal`)
**Why:** Direct, credentialed expertise (Girls Futsal Programme Director, United Futsal Foundation Diploma) that almost no competing content has. Real, specific search demand and low content competition.
**Pillar (to write):** Why Futsal Develops Better Soccer Players (And How to Actually Use It)
**Supporting article directions:** futsal principles that transfer to 11v11, building a club futsal curriculum, futsal-specific rules and space.

### Cluster 5: Coach Development & CPD (`coach-development`)
**Why:** Different audience than parent-coaches — reaches club directors, program leads, and volunteer coaches who need mentoring, which is exactly Chris's Coach Developer Diploma specialty. Longer-term differentiator once PitchLabs considers workforce/club features.
**Pillar (to write):** Building a Coaching Workforce That Actually Improves: A Coach Development Framework
**Supporting article directions:** running effective coach observations, recruiting and onboarding volunteer coaches, designing a CPD workshop, what makes coach mentoring actually change behavior on the field.

## Sequencing Logic

1. **Build out Cluster 2 (Session & Curriculum Design)'s pillar** — no pillar is actually live yet; this cluster maps directly to the product, so it shouldn't sit empty while Cluster 1 already has four live pieces.
2. **Cluster 3 (Age & Development) next** — highest credibility, most direct product fit, least competitive coverage from someone with real current authority.
3. **Cluster 4 (Futsal) in parallel or immediately after** — same credibility strength, likely lower keyword competition than general youth coaching.
4. **Cluster 5 (Coach Development)** once 2–3 more pieces prove the review/draft workflow and voice are working — this cluster reaches a different reader (club leaders, not individual parent-coaches) so it's worth having the writing process dialed in first.

## What Success Looks Like (Directional, Not Committed Targets)

No analytics instrumented yet (see PERFORMANCE_FRAMEWORK.md), so these are intentions to revisit once real data exists — not numbers to report against from day one. Timelines below run from launch (2026-09-18).

- **First 2 months:** Cluster 2's pillar live. Cluster 3 pillar live plus 1–2 supporting articles. Search Console/Analytics actually instrumented. Custom domain connected.
- **Months 3–4:** Cluster 3 substantially built out. Cluster 4 (Futsal) pillar live. First real look at which articles are driving signups, and whether the wedge hypothesis (differentiated > generic) is actually panning out in the data.
- **Months 5–6:** Cluster 5 underway. Revisit this roadmap with real performance data — reprioritize clusters based on what's actually converting, not the original guess.

## Related Docs

- **CLAUDE.md** — editorial rules and the wedge this roadmap is built on
- **PUBLISHING_CALENDAR.md** — the near-term article queue and remaining launch items
- **PERFORMANCE_FRAMEWORK.md** — how progress against this roadmap gets measured
