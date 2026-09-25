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

Three-part series, Cluster 1 (Session Planning) / Cluster 2 (U6–U10) crossover. All three build on the same "environment" framing (see COACHING_FRAMEWORK.md) — STEP is the design half, the Coaching Intervention Wheel is the interaction half. Article 1 already names articles 2 and 3 in its own "Next in this series" section, so the sequence is locked; don't reorder without updating that section too.

| # | Article | Status | Target Keyword (draft) | Framework | Angle |
|---|---|---|---|---|---|
| 1 | Why Your U8 Practice Feels Like Chaos (And What To Do Instead) | **Drafted, researched, approved** — content/articles/why-your-u8-practice-feels-like-chaos.mdx | U8 soccer practice chaos | STEP (Space/Task/Equipment/Players) | Building the right environment so you barely need to coach with your voice. Grounded in the constraints-led approach, the Challenge Point framework, small-sided-game research, and working-memory-load research. |
| 2 | How Much Should You Actually Say? | **Drafted, researched, approved** — content/articles/how-much-should-you-actually-say.mdx | how much should a youth soccer coach talk during practice | Coaching Intervention Wheel — inner ring (Instruct vs. Question/Silence/Guide/Co-create) | Direct sequel to article 1: STEP builds the environment, this is what you do once it's running. Core hook: a season-long coaching-behavior study found coaches lean on Instruct by default and Question makes up under 10% of what they say — most of that closed, not open. Ties back to article 1's working-memory research (why over-instructing backfires) and previews the "free vs. costly" idea that article 3 goes deeper on. |
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
