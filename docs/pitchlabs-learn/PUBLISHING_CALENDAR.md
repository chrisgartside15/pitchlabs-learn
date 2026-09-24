# PitchLabs Learn: Publishing Calendar

## How This Calendar Works

No fixed weekly cadence — Chris's review bandwidth is bursty. This is a **priority queue**, not a locked schedule: articles are listed in the order they should get drafted and reviewed, and dates get filled in as each one is actually approved and published, not planned in advance. Update this file after every publish rather than trying to predict 60 days out in one sitting.

**Verified current state (2026-09-24):** Site is live on Vercel (temporary `*.vercel.app` URL). Custom domain (`learn.usepitchlabs.com`) is decided but deliberately not connected yet — targeted for end of September 2026, alongside PitchLabs v2. Article #1 is fully drafted, researched, and approved on content — currently being staged on the site (placeholder graphics, GA4 CTA event, navbar link) via a separate Claude Code pass. Not yet published/live.

## Remaining Launch Items (Not Blocking, But Open)

- [ ] Connect `learn.usepitchlabs.com` — hold until PitchLabs v2 ships (end of Sept 2026 target)
- [ ] Set up Google Search Console + confirm indexing (do this once real articles are live, not before)
- [x] GA4 confirmed live on main site (2026-09-18) — blog-route coverage + CTA conversion event being added via Claude Code pass
- [ ] Produce real PitchLabs graphics for article #1 (currently placeholders — see the two `<!-- PITCHLABS GRAPHIC -->` comments in the .mdx for briefs/alt text)

## Live

*(empty — nothing published yet)*

## Queue (Priority Order) — Series 1: "What Actually Shapes a Youth Practice"

Three-part series, Cluster 1 (Session Planning) / Cluster 2 (U6–U10) crossover. All three build on the same "environment" framing (see COACHING_FRAMEWORK.md) — STEP is the design half, the Coaching Intervention Wheel is the interaction half. Article 1 already names articles 2 and 3 in its own "Next in this series" section, so the sequence is locked; don't reorder without updating that section too.

| # | Article | Status | Target Keyword (draft) | Framework | Angle |
|---|---|---|---|---|---|
| 1 | Why Your U8 Practice Feels Like Chaos (And What To Do Instead) | **Drafted, researched, approved** — content/articles/why-your-u8-practice-feels-like-chaos.mdx | U8 soccer practice chaos | STEP (Space/Task/Equipment/Players) | Building the right environment so you barely need to coach with your voice. Grounded in the constraints-led approach, the Challenge Point framework, small-sided-game research, and working-memory-load research. |
| 2 | How Much Should You Actually Say? | Not started | how much should a youth soccer coach talk during practice | Coaching Intervention Wheel — inner ring (Instruct vs. Question/Silence/Guide/Co-create) | Direct sequel to article 1: STEP builds the environment, this is what you do once it's running. Core hook: a season-long coaching-behavior study found coaches lean on Instruct by default and Question makes up under 10% of what they say — most of that closed, not open. Ties back to article 1's working-memory research (why over-instructing backfires) and previews the "free vs. costly" idea that article 3 goes deeper on. |
| 3 | How to Progress a Session Without Stopping the Game Every Two Minutes | Not started | how to coach youth soccer without stopping the game | Coaching Intervention Wheel — outer ring (the 6 ways to stop practice, with real time costs) | Practical/tactical companion to article 2: not just *what* you say but *when/how you stop play to say it*. Core hook, from Chris's own tool documentation: "the most common mistake with young players is stopping the game too often." Two of the six intervention types (drive-by, drinks-break) are free — teaches coaches to lean on those before reaching for a huddle or freeze frame. |

**Research status:** Article 2 and 3's core framework material (the Intervention Wheel, the season-long coaching-behavior study) is already captured in COACHING_FRAMEWORK.md. Neither has been drafted yet — still needs the same research-verification pass article 1 got before any numbers get cited.

Items 4+ deliberately not planned yet — fill in once this series is moving.

## Per-Article Process Checklist

- [ ] Added to queue with cluster + draft keyword
- [ ] Claude drafts full article (grounded in Chris's actual experience — no invented specifics)
- [ ] Chris reviews for accuracy + voice, edits
- [ ] Voice notes updated if this round revealed something about tone/style (see CLAUDE.md)
- [ ] SEO pass (headers, meta, internal links to pillar + 2–3 related articles)
- [ ] Chris explicit approval
- [ ] Publish: commit `.mdx`, push, confirm Vercel deploy actually succeeded (check the live URL, don't assume)
- [ ] Move to "Live" table above with actual publish date, verified against the real URL
- [ ] 2-week check: indexed? any impressions? (see PERFORMANCE_FRAMEWORK.md)

## Notes

- "Live" in this doc means verified against the actual deployed URL or Search Console, never carried over from an earlier doc's unverified claim.
- If a queued article turns out to need expertise or an anecdote Chris doesn't actually have, flag it and either reshape the angle or drop it — see the Decision-Making Framework in CLAUDE.md.

## Related Docs

- **CLAUDE.md** — editorial rules, the wedge, and the review workflow (incl. voice profile once captured)
- **COACHING_FRAMEWORK.md** — the STEP and Intervention Wheel research base articles 2 and 3 draw from
- **ROADMAP_6MONTH.md** — cluster priority and sequencing
- **PERFORMANCE_FRAMEWORK.md** — what to check once articles are live
