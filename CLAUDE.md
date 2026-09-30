# PitchLabs Learn: Operating Rules

## Purpose & North Star

PitchLabs Learn is a working coach's notebook: how Chris uses established coaching tools, where each one comes from, where it holds up, and how other coaches can adapt it to build their own way of thinking about coaching, at any age.

It is also an owned acquisition channel for PitchLabs, a session-planning tool for individual soccer coaches. Reputation and SEO traffic are the mechanism; qualified signups to usepitchlabs.com are the outcome. The notebook framing and the acquisition goal are not in tension as long as the content is useful on its own.

**The Test:** Would a coach genuinely bookmark this even if PitchLabs didn't exist?

## What This Site Is, and Isn't

**It is not a new methodology, and none of its tools are proprietary — including the Coaching Intervention Wheel.** STEP, the constraints-led approach, challenge point, the working-memory research and the rest come from other people. The Coaching Intervention Wheel is presented the same way: not as something Chris invented, but as the version of a common coaching-interaction idea that he's assembled, uses, and teaches. The honest claim for every tool on this site, without exception, is "this is what I use and how I use it" — never "my own," "proprietary," or "first of its kind." Chris's contribution is the integration: choosing what to use, translating it for the players he coaches, testing it in real sessions, and being honest about how strong the evidence is. That is an underserved job, and it is the one this site does.

"Not my own" is not a reason to skip citing evidence. Every piece of a tool that outside research actually speaks to — why a lever works, what a study found about it — still gets that research named and linked, exactly as strictly as if the tool were claimed as original. The two rules run in parallel, not in tension: claim no invention, and still ground what can be grounded. Where a specific detail is genuinely just Chris's own practice with no research behind it (a diagnostic split, a time estimate, a rule of thumb), say that plainly too, rather than letting it sit next to citations and borrow their weight by proximity.

Rules that follow from that:

1. **Attribute every tool, framework and finding to its source, in the article.** If the source is unknown, say so and flag it to Chris rather than implying it is ours. Never call something "our", "proprietary" or "my own framework" unless Chris has confirmed authorship and it has been checked against a primary source. A recorded "confirmed by Chris" is an assertion, not a verification.
2. **Show use, then invite adaptation.** Where possible an article shows how Chris uses the tool in a real session, then how a reader could adapt it to their own players and setting. The goal is the reader's own thinking, not adoption of Chris's.
3. **Separate "I've done this" from "the source says this".** First-person use claims are limited to what Chris has actually coached (below). Anything else is framed as what the source says, with the limits of that source stated.
4. **State the strength of the evidence.** One study, its sample and its sport are named when a claim leans on it, and a single study is never presented as settled.

## Scope (earlier docs call this "the wedge")

**Topic scope is any age and any format.** The tools and the thinking apply from the youngest ages to adult, and how a tool changes with age is itself good content.

**Experience claims are limited to what Chris has actually done:**

- **Young age-group coaching (U6–U10)**: 15+ years coaching, currently 8U–10U Program Director
- **Small-sided formats (5v5 / 7v7)** at that age
- **Futsal**: Girls Futsal Programme Director (2021–2024), United Futsal Foundation Diploma
- **Coach development / CPD**: Coach Developer Diploma, coach education workshops and mentoring for the club's coaching staff (confirm headcount before quoting a number publicly)

Credentials: UEFA C, US Soccer National B License, Coach Developer Diploma, BA (Hons) Physical Education & School Sports.

Writing outside that experience is fine when it is framed as source-based, not experience-based (for example, "here is what the research says about 14-year-olds; I haven't coached this"). What stays out regardless of search volume: generic drill lists, elite or professional-level analysis presented as if from experience, and topics that exist only because the keyword looks good.

## Editorial Principles

1. **Authenticity over volume.** Fewer, deeply useful articles beats a high-frequency content mill. Every article should reflect something Chris has actually coached, built, or observed — not a generalized "best practices" rewrite.
2. **Claim only what you've done.** Any age is in scope, but first-person experience claims stay within the scope list above. Outside it, write as source-based and say so (see Decision-Making Framework).
3. **Topical authority through linking.** Every article links back to its cluster pillar and to 2–3 related articles. An isolated article doesn't build site authority.
4. **Connection without contamination.** CTAs link to the PitchLabs builder when relevant to the article — never forced, never mid-argument.
5. **Byline with real credentials.** Author bio includes Chris's actual licenses and current role. This is the trust signal that generic content can't fake — use it.

## Content Workflow

Claude drafts; Chris reviews and approves before anything publishes. Nothing goes live without explicit sign-off.

1. **Plan:** Article gets added to the publishing calendar with cluster, target keyword, and angle before drafting starts.
2. **Draft:** Claude writes a full first draft — structure, argument, examples — grounded in Chris's stated coaching experience. Claude does not invent specific anecdotes, statistics, or claims of expertise Chris hasn't stated.
3. **Review:** Chris reads for factual/coaching accuracy, voice, and anything that doesn't reflect how he'd actually say it. This is also where `docs/pitchlabs-learn/PITCHLABS_VOICE.md` gets refined — see "Chris's Voice" below.
4. **Optimize:** SEO pass (headers, meta, internal links) happens after the writing is right, never before.
5. **Publish:** `.mdx` file in `content/articles/` with required frontmatter, commit to GitHub, Vercel auto-deploys.

### Frontmatter Template
```yaml
---
title: "Article Title"
excerpt: "Brief excerpt for listings and social sharing."
date: "YYYY-MM-DD"
author: "Chris Gartside, 8U–10U Program Director | USSF B License"
cta: "Optional call-to-action linking to usepitchlabs.com"
---
```

## Chris's Voice

**For any PitchLabs Learn editorial writing, article drafting, rewriting, editing, research integration, FAQ writing, or related long-form content: read `docs/pitchlabs-learn/PITCHLABS_VOICE.md` before drafting and follow it as the canonical author voice.** That file governs prose style — it does not override factual accuracy, source material, explicit user instructions, or article-specific requirements.

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
- Any experience claim in it is one Chris can honestly make, or the piece is clearly framed as source-based
- Every tool or framework it uses is attributed to its source
- It addresses a real problem coaches search for
- It connects to 2–3 other planned or existing articles

**Don't write it if:**
- It's a generic activity/drill list with no original analysis
- It would need Chris to claim experience he doesn't have
- It's an excuse to force the product into the piece
- It only exists because the keyword volume looks good

## Review Checklist Before Publishing

- [ ] Passes the bookmark test
- [ ] Grounded in real coaching experience, or clearly framed as source-based
- [ ] Every tool, framework and study is attributed, with the strength of evidence stated
- [ ] Byline includes real name, license(s), current role
- [ ] Links to pillar article (if a supporting article) and 2–3 related articles
- [ ] Frontmatter accurate (title, excerpt, date, author)
- [ ] No broken images or links
- [ ] Chris has explicitly approved — nothing auto-publishes

## Related Docs

(all under `docs/pitchlabs-learn/` unless noted)

- **PITCHLABS_VOICE.md** — canonical author voice for all PitchLabs Learn writing; read before drafting or editing any article
- **PUBLISHING_CALENDAR.md** — near-term article queue
- **PERFORMANCE_FRAMEWORK.md** — what to track and how to read it
- **ROADMAP_6MONTH.md** — cluster sequencing and 6-month goals
- **COACHING_FRAMEWORK.md** — the research/framework base (STEP, the Coaching Intervention Wheel) articles draw from
