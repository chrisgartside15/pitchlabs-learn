# PitchLabs Learn: Performance Framework

## What We're Actually Optimizing For

The blog's job is qualified signups to usepitchlabs.com, not raw traffic. A viral article with zero coach-relevance is a vanity metric. Every metric below is in service of one question: **is this article turning searching coaches into PitchLabs users?**

Given Chris's bandwidth is variable/bursty, this framework is deliberately lightweight to start — it should not require a dashboard build before the first article can be measured.

**Analytics status (2026-09-18): GA4 is linked on the main site.** Not yet confirmed: whether it also covers the `/learn` blog section specifically, and whether conversion to usepitchlabs.com is tracked as a distinct event (vs. just pageviews). Until both are confirmed, treat Tier 1 as "available, not yet verified end-to-end" rather than "fully instrumented" — see Setup Required below.

## Metrics, by Priority

### Tier 1 — Track from Article 1 (needs only Vercel Analytics / Google Search Console, both free)

| Metric | What it tells you | Where it comes from |
|---|---|---|
| Organic search impressions & clicks, by article | Is Google surfacing this, and for what queries | Google Search Console |
| Ranking position for target keyword | Are we actually winning the search we wrote for | Google Search Console |
| Sessions to article, by source | Organic vs. referral vs. direct | GA4 (linked on main site) or Vercel Analytics |
| CTA clicks to usepitchlabs.com, by article | Direct intent signal — which articles actually push people toward the product | GA4 event on the CTA link, once set up |

### Tier 2 — Add once Tier 1 is instrumented and there's enough traffic to be meaningful (roughly after 5–10 articles are live)

| Metric | What it tells you |
|---|---|
| Time on page | Engagement proxy — but see caveat below |
| Bounce rate | Whether the article satisfies the search intent or the reader leaves immediately |
| Internal link clicks (to other articles / pillar) | Whether topical-authority linking is actually working, not just present |
| Signup conversion rate (sessions → usepitchlabs.com signup) | The real bottom-line number, once it's trackable end-to-end |

### Tier 3 — Later / directional, not weekly-tracked

- Backlinks from other coaching sites/forums (external validation of authority)
- Returning visitors / newsletter signups if that channel gets built
- Keyword rankings for the broader cluster, not just individual articles

## Caveats — Read Before Trusting a Number

- **Time on page and bounce rate are noisy at low volume.** Don't draw conclusions from an article with under ~100 sessions. Treat early numbers as directional, not decisive.
- **"High time on page" isn't automatically good.** It can mean genuine engagement or it can mean the reader is struggling to find the answer. Cross-check against bounce rate and whether they click the CTA or another article.
- **Don't conflate correlation with the wedge working.** If an off-wedge article (see CLAUDE.md) ranks well, that's evidence about SEO difficulty, not evidence the strategy should drift generic — check whether it's actually converting before treating it as a signal to write more like it.
- **No fabricated numbers, ever.** If a number isn't confirmed in Search Console or GA4, the honest answer is "we don't have this data yet," not an estimate presented as a measurement.

## Review Cadence

Given bursty bandwidth, this is built around checkpoints, not a fixed weekly ritual:

- **After each new article, 2 weeks post-publish:** quick check — is it indexed, any impressions yet, does the CTA work.
- **Monthly (or whenever there's a natural pause):** review all live articles together — rankings, sessions, CTA clicks. Compare to prior month only once there are at least 2 months of data.
- **At cluster completion** (see ROADMAP_6MONTH.md): fuller review — did the cluster build topical authority (are pillar + supporting articles all appearing for related queries), and is the cluster driving signups.

## Setup Required (Partially Done)

- [x] GA4 linked — confirmed live on the main site (2026-09-18)
- [ ] Confirm GA4 is capturing the `/learn` blog section specifically, not just the main marketing site
- [ ] Verify the site in Google Search Console (if not already done)
- [ ] Add a distinguishable GA4 event (or at minimum a UTM) on the CTA link(s) to usepitchlabs.com — pageviews alone won't show conversion intent
- [ ] Decide where numbers get reviewed — this doc can hold a running log, or a future project doc/dashboard can

Until the blog-specific coverage and the CTA event are both confirmed, "performance" for early articles is honestly: is it live, is it indexed, does it read well, and are there any organic clicks at all — the deeper funnel metrics (time on page, bounce, conversion) shouldn't be reported as real numbers until verified.

## Related Docs

- **CLAUDE.md** — editorial rules and the wedge this content is built on
- **PUBLISHING_CALENDAR.md** — near-term article queue
- **ROADMAP_6MONTH.md** — cluster sequencing this performance data should eventually inform
