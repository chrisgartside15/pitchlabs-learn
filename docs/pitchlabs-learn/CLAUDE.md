# PitchLabs Learn: Operating Rules

## Purpose & North Star

PitchLabs Learn is an owned acquisition channel for PitchLabs, a session-planning tool for individual soccer coaches. Content exists to drive qualified signups to app.pitchlabs.com — SEO traffic and reputation are the mechanism, not the goal.

**The Test:** Would a coach genuinely bookmark this even if PitchLabs didn't exist?

## The Wedge: Why This Content Can Win

Generic "soccer coaching tips" content is a crowded, low-trust space anyone can write with a weekend of research. PitchLabs Learn does not compete there. It competes on Chris's actual, verifiable specialty:

- **Young age-group coaching (U6–U10)** — current 8U–10U Pre-Competitive Programme Director, Colorado Storm
- **Small-sided formats (5v5 / 7v7)** — built and implemented club-wide frameworks for this specific age/format combination
- **Futsal** — Girls Futsal Programme Director (2021–2024), United Futsal Foundation Diploma
- **Coach development / CPD** — Coach Developer Diploma, designs and delivers coach education workshops and mentoring for a 13-coach workforce

Credentials: UEFA C, US Soccer National B License, Coach Developer Diploma, BA (Hons) Physical Education & School Sports.

Content that falls outside this wedge (advanced tactics for U15+, elite/professional-level analysis, topics with no direct coaching experience behind them) is lower priority or out of scope, regardless of search volume, unless written with an explicit guest contributor or clearly framed as research-backed rather than experience-backed.

## Editorial Principles

1. **Authenticity over volume.** Fewer, deeply useful articles beats a high-frequency content mill. Every article should reflect something Chris has actually coached, built, or observed — not a generalized "best practices" rewrite.
2. **Stay in the wedge.** Default to U6–U10, small-sided formats, futsal, and coach development. Venturing outside this needs a specific reason (see Decision-Making Framework).
3. **Topical authority through linking.** Every article links back to its cluster pillar and to 2–3 related articles. An isolated article doesn't build site authority.
4. **Connection without contamination.** CTAs link to the PitchLabs builder when relevant to the article — never forced, never mid-argument.
5. **Byline with real credentials.** Author bio includes Chris's actual licenses and current role. This is the trust signal that generic content can't fake — use it.

## Content Workflow

Claude drafts; Chris reviews and approves before anything publishes. Nothing goes live without explicit sign-off.

1. **Plan:** Article gets added to the publishing calendar with cluster, target keyword, and angle before drafting starts.
2. **Draft:** Claude writes a full first draft — structure, argument, examples — grounded in Chris's stated coaching experience. Claude does not invent specific anecdotes, statistics, or claims of expertise Chris hasn't stated.
3. **Review:** Chris reads for factual/coaching accuracy, voice, and anything that doesn't reflect how he'd actually say it. This is also where `PITCHLABS_VOICE.md` gets refined — see "Chris's Voice" below.
4. **Optimize:** SEO pass (headers, meta, internal links) happens after the writing is right, never before.
5. **Publish:** `.mdx` file in `content/articles/` with required frontmatter, commit to GitHub, Vercel auto-deploys.

### Frontmatter Template
```yaml
---
title: "Article Title"
excerpt: "Brief excerpt for listings and social sharing."
date: "YYYY-MM-DD"
author: "Christopher Gartside, UEFA C / US Soccer B License"
cta: "Optional call-to-action linking to app.pitchlabs.com"
---
```

## Chris's Voice

**For any PitchLabs Learn editorial writing, article drafting, rewriting, editing, research integration, FAQ writing, or related long-form content: read `PITCHLABS_VOICE.md` (same directory) before drafting and follow it as the canonical author voice.** That file governs prose style — it does not override factual accuracy, source material, explicit user instructions, or article-specific requirements.

Quick summary (see the voice file for the full profile, examples, and the list of AI-style patterns to actively avoid): warm, thinking-alongside, not authoritative or lecturing; problem → solution → further explanation as the default shape, not a rigid template; anecdotes light and only ever real (never invented); ordinary coaching language over business/consultant language; research used to sharpen an observation, not performed as a literature review.

Rewritten and re-derived 2026-09-26 from the three-article "What Actually Shapes a Youth Practice" series, specifically to strip out AI-polish patterns that had crept into earlier drafts (over-caveated research paragraphs, duplicated hook formulas across articles, a "worth sitting with" tic, heavy em-dash density). This absorbs and supersedes the two refinement notes previously kept inline here (the 2026-09-24 pass that fixed article 1's opening and dropped an "I oversee 17 coaches..." credential line) — see the voice file's "Before / after" section for both, kept as concrete examples. Chris's edits to actual drafts remain the higher-priority signal when they conflict with the voice file — update that file directly as the voice keeps solidifying, don't let it go stale.

## Technical Guidelines

- Articles live in `content/articles/[slug].mdx`
- Images in `public/images/articles/`
- URL structure: articles are `/articles/[article-slug]` (not nested under cluster) and topics are `/topics/[cluster-slug]`, both prefixed with `/learn` only in production (see `next.config.js`'s `basePath`, added 2026-09-24) — not part of the app's own internal route pattern
- No frontmatter changes after publication (breaks SEO)
- All articles use MDX format — supports Markdown and React components

## Decision-Making Framework

**Write it if:**
- It comes from something Chris has actually coached, built, or observed
- It fits the wedge (U6–U10, small-sided formats, futsal, coach development) or has a clear, explicit reason to sit outside it
- It addresses a real problem coaches search for
- It connects to 2–3 other planned or existing articles

**Don't write it if:**
- It's a generic activity/drill list with no original analysis
- It requires expertise Chris doesn't have and can't honestly claim
- It's an excuse to force the product into the piece
- It only exists because the keyword volume looks good

## Review Checklist Before Publishing

- [ ] Passes the bookmark test
- [ ] Grounded in real coaching experience, not generic advice
- [ ] Byline includes real name, license(s), current role
- [ ] Links to pillar article (if a supporting article) and 2–3 related articles
- [ ] Frontmatter accurate (title, excerpt, date, author)
- [ ] No broken images or links
- [ ] Chris has explicitly approved — nothing auto-publishes

## Related Docs

- **PITCHLABS_VOICE.md** — canonical author voice for all PitchLabs Learn writing; read before drafting or editing any article
- **PUBLISHING_CALENDAR.md** — near-term article queue
- **PERFORMANCE_FRAMEWORK.md** — what to track and how to read it
- **ROADMAP_6MONTH.md** — cluster sequencing and 6-month goals
- **COACHING_FRAMEWORK.md** — the research/framework base (STEP, the Coaching Intervention Wheel) articles draw from
