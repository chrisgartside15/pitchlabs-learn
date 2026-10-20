# PitchLabs Learn: Publishing Plan

**Reset 2026-10-14.** The previous calendar (launch log, per-article review history, lock records, old queue) is archived, unedited, at `docs/archive/PUBLISHING_CALENDAR_2026-09-to-10-14.md`. Other docs still cite it for "what was reviewed and why" on any live article. Treat the archive as history: don't update it.

## What Learn is for (decided 2026-10-14, Chris)

**PitchLabs signups.** For the next 90 days an article earns its place by bringing qualified coaches toward the app. Authority, CPD and courses are a later layer (see Parked). Judge by CTA clicks and signups beside sessions, as `/admin/learn` already shows. No fixed publishing pace: a priority queue, dated only when an article is approved and live.

## Where things stand (2026-10-14)

- **12 articles live and locked**, 11 from 2026-09-29 plus the 7v7 formations pillar (2026-10-13). Don't edit a locked article, its tools or its downloads unless Chris asks about that article. Lock notes sit in each file's frontmatter; review history is in the archive.
- **Traffic is small.** 28 days to 2026-10-14: 69 Learn sessions (32.7% of all sessions), 268 search impressions, 7 clicks, 9 CTA clicks to the app. Search Console runs 3+ days behind. Directional only.
- **Search has barely started** and no query has more than 5 impressions. Most Learn traffic that converts is not coming from search (How Much Should You Actually Say: 2 impressions, 22 views, 3 CTA clicks).
- **The shape board is the most-used thing on Learn:** 11 of 16 tool events; the formation builder is the most-viewed tool page.
- **Keyword volume is unchecked.** A Keyword Planner pass wasn't completed. Third-party estimates for neighbouring terms exist but are not trustworthy enough to choose on. Don't claim volume in any brief.

## How we choose the next article

An article goes in the queue only if it passes all of these:

1. **Wedge test.** It rests on what Chris can claim from his own practice and on sources read at source. Not a drill library, not generic session plans.
2. **Product path.** There is a natural, honest step from the article to a PitchLabs feature (builder, Animate, shape board, printables).
3. **Evidence it is wanted**, from the best signal available, stated plainly: tool use, search queries, CTA clicks, or Chris's coaching-night questions. "No signal yet" is allowed, but is written down.
4. **Claims are safe.** Each research claim is marked read-at-source or not, in `COACHING_FRAMEWORK.md`. No causal claims the evidence doesn't support.
5. **Chris's real experience supplies the angle.** Anything about "what I do" waits for his answers; nothing is invented.

Nothing publishes without Chris's sign-off. Voice: `PITCHLABS_VOICE.md`.

## Queue (priority order, proposed 2026-10-14, Chris to ratify)

| # | Article | Why now | Blocked on | Status |
|---|---|---|---|---|
| 1 | **Inviting the Press: building out from a 7v7 goal kick** (3-2-1, part 1) | Formations is where visitors use the tools; the draft and notes exist; pairs with the live pillar | Chris: where the 3-2-1 goes wrong; wording of the REVIEW-marked options. Build: Animate clips (4), `VideoClip` component, `formations` series entry (`SeriesRecap.js`) | Drafted, unapproved: `content/articles/_DRAFT-7v7-3-2-1-goal-kick-in-possession.mdx` |
| 2 | **3-2-1 out of possession** (part 2) | Completes the series | Part 1; Chris's answers on press and build-out line | Planned |



## Parked (with reasons, so they don't get re-proposed blind)

- **"Who gets the minutes?" (playing time and fairness, with a FairPlay link).** Parked 2026-10-14 (Chris): the evidence is too thin. Source reading (`COACHING_FRAMEWORK.md`, "source-reading pass") found no study showing more minutes cause faster improvement, none measuring minutes against dropout, and mixed results on birth date and minutes within a team; only one paper was read in full. Revisit if a youth-soccer study measuring minutes against enjoyment or intention to quit turns up, or if the angle becomes "minutes are a decision, made on purpose" with Chris's own practice as the substance. If revived: PitchLabs stays the main CTA, FairPlay appears once as the separate game-day app with a campaign link so clicks are measurable (FairPlay is maintenance-only, in VALIDATE).
- **"Soccer practice plans" article.** Rejected as framed (2026-10-14, Chris): reads as a drill or session-plan page, which the strategy already rejected. A planning piece is welcome only as a decision or diagnosis article.
- **Play volume between club sessions** (Chris, 2026-10-10). Parent-facing; no causal evidence; risk of reading as "book more paid training". Needs a decision on audience first.
- **Coach Development and CPD cluster.** A later layer aimed at club leaders, not individual coaches. Wait for a signal: add an email capture to the coach-development article and see whether anyone asks. Don't build a course ahead of an audience.
- **2-3-1 build-out and tournament-watching pieces.** After the 3-2-1 pilot.
- **Futsal topic.** Hidden until it has an article.

## Measurement and housekeeping

- **2 weeks after each article goes live:** indexed? impressions? CTA clicks? (`PERFORMANCE_FRAMEWORK.md`). Record the result here, with the date.
- **Still open from launch:** star `blog_cta_click` as a GA4 key event; register the `embed_host` dimension.
- **Open question:** a real keyword-volume check. Needs Google Ads Keyword Planner under the right Google account (the account in the browser is not the PitchLabs one). Until then, volume claims are "unchecked".

## Per-article checklist

- [ ] Passes the five tests above, with the evidence for each written in the queue row
- [ ] Draft grounded in Chris's real experience; no invented specifics
- [ ] Sources read at source and logged in `COACHING_FRAMEWORK.md`
- [ ] Chris reviews for accuracy and voice
- [ ] SEO pass: headings, meta, links to the pillar and 2 to 3 related articles
- [ ] Chris's explicit approval
- [ ] Publish: commit `.mdx`, push, confirm the live URL (don't assume the deploy)
- [ ] Add to Live, below, with the verified date
- [ ] 2-week check

## Live (all locked)

| Slug | Role | Live |
|---|---|---|
| `why-your-practice-feels-like-chaos` | Series 1, part 1 | 2026-09-29 |
| `how-much-should-you-actually-say` | Series 1, part 2 | 2026-09-29 |
| `coach-without-stopping-the-game` | Series 1, part 3 | 2026-09-29 |
| `fundamentals-of-soccer-coaching` | Pillar: coaching principles | 2026-09-29 |
| `scanning-and-receiving` | Before the Decision, part 1 | 2026-09-29 |
| `teach-it-or-let-the-game-teach-it` | Before the Decision, part 2 | 2026-09-29 |
| `first-touch-and-receiving` | Before the Decision, part 3 | 2026-09-29 |
| `small-sided-games` | Session design | 2026-09-29 |
| `see-your-own-coaching` | Coach development | 2026-09-29 |
| `coaching-u6-to-u10` | Pillar: age and development | 2026-09-29 |
| `how-to-plan-a-soccer-training-session` | Pillar: session design | 2026-09-29 |
| `7v7-soccer-formations` | Pillar: formations | 2026-10-13 |

Dates are the real go-live dates; article frontmatter carries the staggered dates (decided 2026-09-29).
