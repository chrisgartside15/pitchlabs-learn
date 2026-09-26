# PitchLabs Learn: Publishing Calendar

## How This Calendar Works

No fixed weekly cadence — Chris's review bandwidth is bursty. This is a **priority queue**, not a locked schedule: articles are listed in the order they should get drafted and reviewed, and dates get filled in as each one is actually approved and published, not planned in advance. Update this file after every publish rather than trying to predict 60 days out in one sitting.

**Verified current state (2026-09-24):** Site is live on Vercel at the temporary domain (`pitchlabs-learn-lime.vercel.app`). **Target launch date: 2026-09-29.** Domain approach is decided as `usepitchlabs.com/learn` (a reverse-proxied subpath — Next.js "multi-zone" rewrite in the main app — not a subdomain; `learn.usepitchlabs.com` from earlier notes in this doc and ROADMAP_6MONTH.md is superseded). Articles #1 and #2 are both fully drafted, researched, and approved on content, with real PitchLabs graphics and interactive components (STEP tool, Intervention Wheel) live — not placeholders anymore. Article #3 not started.

**Everything below is committed locally in both repos, not pushed — holding for the Sept 29 launch date.**

## Remaining Launch Items (Blocking Sept 29)

- [x] Domain architecture decided: `/learn` subpath, not subdomain
- [x] `basePath: '/learn'` added to this app (production-only) — Learn repo commit `2e1f98d`
- [x] Reverse-proxy rewrite added to the main app's `next.config.ts` — App-Studio/Projects/PitchLabs commit `4955e2d` (on branch `phase3/builder-v2` — needs merging to whatever branch that repo deploys from before launch)
- [x] Fixed the two things `basePath` doesn't handle automatically: plain `<img>` src paths and markdown-syntax links inside article `.mdx` content (both would have silently 404'd under the proxy)
- [ ] **Push both repos** (this triggers real Vercel deploys on both — do this deliberately, not as a side effect of something else)
- [ ] Set `NEXT_PUBLIC_GA_ID` on the Learn Vercel project to the **same** value as the main app's, so Learn traffic lands in the existing GA4 property instead of a separate one
- [ ] Confirm `NEXT_PUBLIC_APP_URL` on Learn's Vercel project is unset or `https://usepitchlabs.com` (so "Build Sessions" CTAs don't point at localhost)
- [ ] After both are deployed: verify `usepitchlabs.com/learn` loads the homepage, an article page loads with working images/nav/interactive tools, `sitemap.xml`/`robots.txt` resolve, and GA4 Realtime shows events landing in the right property
- [ ] Set up Google Search Console + submit the sitemap (do this once the real domain is live, not before)

## Remaining Launch Items (Not Blocking, Can Follow Sept 29)

- [ ] Produce a real graphic/diagram for article #2 (currently text + interactive tool only, no static diagram — lower priority since the interactive tool covers the same ground)
- [ ] Favicon (currently none — falls back to browser default)

## Content, Design & SEO Polish (done, 2026-09-24, non-blocking)

Everything below is already committed locally (not pushed) — recorded here so it doesn't need re-deriving later.

- **Navigation bugs fixed:** prev/next article arrows were inverted (a newer part 2 showed as "← " before part 1 — index math assumed oldest-first sort, the array is actually newest-first); a dead cross-article link used a URL pattern that was never built.
- **SEO/infra baseline added:** `sitemap.xml`, `robots.txt`, `metadataBase`, canonical URLs on every page, JSON-LD `Article` structured data per article, a branded 404 page (was Next's unstyled default), `loading="lazy"` on in-article images.
- **Reading time is now computed, not typed.** Both articles claimed "7 min read" by hand; actual word count put them at 7–9 min depending on the rate assumed. `getReadingTimeMinutes()` in `lib/articles.js` computes it from the real word count (225 wpm) and will stay correct as articles change.
- **Voice-consistency pass**, checked against Chris's stated voice spec (warm, thinking-alongside, not authoritative; credentialed but not lecturing; problem → direct answer, not a slow build; jargon defined, never dumbed down): article 1's opening now leads with the direct answer instead of two rhetorical hook questions; the "17 coaches / 22 teams" line reads as observation rather than an explicit credential statement; "ecological dynamics" now gets a plain-language gloss; article 1 gained a matching "part one of a series" closing footer (article 2 already had one, article 1 didn't). `lib/clusters.js`'s five topic blurbs were rewritten — they'd been shipped as internal content-strategy notes ("own the search space...") instead of reader-facing copy.
- **Design polish:** consistent site-wide spacing rhythm and card hover states, `prefers-reduced-motion` support, `next/link`-based nav (was plain `<a>`, full page reloads), the Intervention Wheel rebuilt as a proper circular SVG (was a chip-row grid), and the article footer sequence (closing `---`, the italic series note, the CTA box, author bio) given consistent spacing — the `<hr>` was falling back to the browser's tiny default margin instead of the site's own spacing scale.

## Live

*(empty — nothing published yet)*

## Queue (Priority Order) — Series 1: "What Actually Shapes a Youth Practice"

Three-part series, spanning two clusters on purpose (see "Series decoupled from cluster" below): articles 1 and 3 live under `session-planning`, article 2 lives under `coaching-principles`. All three build on the same "environment" framing (see COACHING_FRAMEWORK.md) — STEP is the design half, the Coaching Intervention Wheel is the interaction half. Article 1 already names articles 2 and 3 in its own "Next in this series" section, so the sequence is locked; don't reorder without updating that section too.

| # | Article | Status | Target Keyword (draft) | Framework | Angle |
|---|---|---|---|---|---|
| 1 | Why Your U8 Practice Feels Like Chaos (And What To Do Instead) | **Drafted, researched, approved** — content/articles/why-your-u8-practice-feels-like-chaos.mdx | U8 soccer practice chaos | STEP (Space/Task/Equipment/Players) | Building the right environment so you barely need to coach with your voice. Grounded in the constraints-led approach, the Challenge Point framework, small-sided-game research, and working-memory-load research. |
| 2 | How Much Should You Actually Say? | **Drafted, researched, approved** — content/articles/how-much-should-you-actually-say.mdx | how much should a youth soccer coach talk during practice | Coaching Intervention Wheel — inner ring (Instruct vs. Question/Silence/Guide/Co-create) | Direct sequel to article 1: STEP builds the environment, this is what you do once it's running. Core hook: a season-long coaching-behavior study found coaches lean on Instruct by default and Question makes up under 10% of what they say — most of that closed, not open. Ties back to article 1's working-memory research (why over-instructing backfires) and previews the "free vs. costly" idea that article 3 goes deeper on. |
| 3 | How to Progress a Session Without Stopping the Game Every Two Minutes | **Drafted, researched, pending Chris's review** — content/articles/progress-a-session-without-stopping-the-game.mdx | how to coach youth soccer without stopping the game | Coaching Intervention Wheel — full wheel (center + inner ring recap + outer ring in depth) | Practical/tactical companion to article 2: not just *what* you say but *when/how you stop play to say it*. Now opens with real research backing rather than Chris's tool documentation alone: instruction is the most frequent coach behaviour in every youth-soccer coaching study reviewed, happening more than once a minute on average, and coaches consistently underestimate their own frequency ([Cushion, Ford & Williams, *Journal of Sports Sciences*, 2012](https://doi.org/10.1080/02640414.2012.721930)). Presents the whole Coaching Intervention Wheel for the first time (center: who you're coaching; inner ring: recapped from article 2; outer ring: this article's six stoppage types and their time costs) rather than just the outer-ring slice. Two of the six intervention types (drive-by, drinks-break) are free — teaches coaches to lean on those before reaching for a huddle or freeze frame. Adds a second axis beyond time cost: each stoppage type also has a natural "fit" (who it reaches — individual/group/unit/team), and matching scope to audience is framed as equally important as watching the clock. Also ties into article 1's environment argument via real data on how little youth sessions actually spend in game-realistic play. |

**Research status (updated 2026-09-25):** Article 3 is now backed by real, verified external research — see COACHING_FRAMEWORK.md's "Coaches over-instruct and consistently underestimate how often they do it" section for the full citation trail (Cushion, Ford & Williams 2012, plus Ford et al. 2010 and Wulf & Shea 2004 cited within it). A shakier feedback-frequency meta-analysis was checked and deliberately left out — see that same section's caveat. Also updated: articles 1 and 2's forward-reference text ("the next piece in this series...") is now a real link to article 3's slug, and article 2 gained a closing-footer link forward to article 3 — this was previously plain text since article 3 didn't exist yet.

**Built 2026-09-25:** the full three-ring interactive tool — `components/CoachingInterventionWheel.js`, live in article 3 (`<CoachingInterventionWheel />`, replacing the earlier placeholder comment). Deliberately kept separate from article #2's existing `<InterventionWheelTool />` (inner-ring-only) rather than replacing it — see COACHING_FRAMEWORK.md's "Open / To Research" for the reasoning. Also added: `components/SeriesRecap.js`, a closing card recapping all three articles in the series, live at the end of article 3.

**Series decoupled from cluster, 2026-09-26:** articles 1 and 3 moved from `coaching-principles` to `session-planning` — both are genuinely session-design/execution content, and Session Planning Fundamentals was sitting empty despite being the product-aligned cluster. Article 2 and the pillar stay under `coaching-principles`. To keep the series reading experience intact across two clusters, added `series`/`seriesPart`/`seriesTotal` frontmatter fields (separate from `cluster`) and a new `SeriesBadge` component (`components/content.js`) shown next to the cluster badge on all three articles — a plain label, not a link, deliberately styled differently from the clickable `ClusterBadge` pill so the two read as different kinds of information. `SeriesRecap` and the closing-footer links were already slug-based, not cluster-based, so neither needed to change. See CONTENT_STRATEGY.md's "A note on series vs. cluster" for the full reasoning.

**TL;DR blocks added, 2026-09-26:** all four articles now open with a `<TLDR>` component (`components/content.js`) — 3–5 bullets, right after the header/meta, before the narrative opening. Articles 2 and 3 (parts 2 and 3 of the series) also get a "catch up" line inside the same box linking back to the earlier part(s) by title — surfaced at the top, not just the closing footer, since a reader deciding whether to keep reading needs to know they're mid-series before investing time, not after. Now the standard for every future article — see `PITCHLABS_VOICE.md`'s "TL;DR" entry under Structural preferences.

**Series made discoverable site-wide, 2026-09-26:** added an "Explore a Series" section to the homepage (`app/page.js`), between "Browse by Topic" and "Featured" — reuses `<SeriesRecap showHeading={false} />` so the series data stays single-sourced, not duplicated. Chosen over building a full `/series` index + detail route pair (mirroring `/topics`), which would be real infrastructure for exactly one series — revisit if/when a second series exists. Caught and fixed two real, pre-existing bugs while wiring this up (both affect the article-embedded card too, not just the new homepage one): (1) `.series-recap-list`'s 3-column `@container` layout had no qualifying `container-type` ancestor anywhere, so it silently never activated — the "3 cards side by side" design has never actually rendered that way until now; (2) `.series-recap-item a` was missing `text-decoration: none` / `color: inherit`, so titles showed as plain underlined blue-ish links outside of `article`'s own link styling (which happened to mask it when embedded in an article, but not on the homepage). Both fixed in `app/globals.css`.

Items 4+ deliberately not planned yet — fill in once this series is moving.

**Voice rewrite, 2026-09-26:** all three articles above were rewritten for voice — stripped AI-polish patterns (over-caveated research paragraphs, duplicated opening hooks, a "worth sitting with" tic) while keeping every framework term, citation, number, and quote unchanged from the versions in this table. See `docs/pitchlabs-learn/PITCHLABS_VOICE.md`, now the canonical voice reference for all future PitchLabs Learn writing (wired into both `CLAUDE.md` files).

## Cluster 2 Pillar: "The Fundamentals of Soccer Coaching"

| Article | Status | Framework | Angle |
|---|---|---|---|
| The Fundamentals of Soccer Coaching | **Drafted 2026-09-26, revised same day, pending Chris's review** — content/articles/fundamentals-of-soccer-coaching.mdx | Introduces STEP and the Coaching Intervention Wheel as one underlying idea, without the tool-level detail — deliberately leaves "perceiving" (the third leg of perceive → decide → execute) unresolved rather than mapped to an existing tool | Per CONTENT_STRATEGY.md's original outline: what separates good coaching from a well-run activity, the perceive → decide → execute sequence (standard sports-science terminology, not separately cited — same treatment as "ecological dynamics" in article 1), and why a coach's job changes by age group. Reuses already-verified research rather than introducing new claims: the Ford et al./Cushion et al. Training Form vs. Playing Form split (article 3's citation) grounds "good activity ≠ good coaching," and the Buszard working-memory study (articles 1 & 2's citation) grounds the age-group section. **Revised same day per Chris's feedback:** first draft leaned too hard on "STEP + the Wheel already answer this," which read as a wrap-up of finished work rather than a hub for a cluster with six more planned supporting articles (see CONTENT_STRATEGY.md's Cluster 2 list — scanning, first touch, support/movement, decision-making under pressure, possession vs. purpose, pressing). Revised to genuinely provoke rather than resolve: opens with a self-check question before the reader continues, explicitly names "perceiving" as the least-covered third of the sequence with no tidy answer yet, and the closing section says so outright instead of wrapping up. Sets up the still-unwritten "Scanning and Receiving" piece without naming or linking it, since it isn't drafted yet. |

**Wired up 2026-09-26:** `lib/clusters.js`'s `coaching-principles` cluster now has `pillarSlug: 'fundamentals-of-soccer-coaching'` — the pillar slot on `/topics/coaching-principles` is live instead of "coming soon." Articles 1, 2, and 3 each gained a light backlink to the pillar (varied placement per article — not all three handled identically), satisfying CLAUDE.md's "links to pillar article" checklist item for the first time in this cluster.

**Cluster taxonomy migrated 2026-09-26:** the live site had been running the original, generic 5-cluster plan that ROADMAP_6MONTH.md's 2026-09-17 strategy reset explicitly rejected — CONTENT_STRATEGY.md and `lib/clusters.js` were never actually updated after that reset. Migrated `lib/clusters.js`, CONTENT_STRATEGY.md, and fixed stale claims in ROADMAP_6MONTH.md (it claimed a Session Planning pillar was "LIVE, verified 2026-09-18" — no such file exists and never did). Site now runs 6 clusters: `session-planning`, `coaching-principles` (kept as a 6th cluster alongside the roadmap's 5 — see CONTENT_STRATEGY.md's Strategy Reset note), `coaching-u6-u10`, `futsal-small-sided`, `coach-development`, `activities`. Removed `age-groups` and `session-objectives` (zero articles referenced either slug — confirmed before removing). Verified: sitemap.xml reflects all 6 topic URLs, both removed slugs 404 cleanly, no console/build errors.

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
