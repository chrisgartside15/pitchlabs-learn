# PitchLabs Learn: The Voice

Canonical author-voice reference for all PitchLabs Learn writing — drafting, rewriting, editing, FAQ writing, research integration, anything long-form on the blog. Load this before drafting. It governs prose style; it does not override factual accuracy, source material, explicit user instructions, or article-specific requirements — see CLAUDE.md for those.

Derived from the 2026-09-26 rewrite of the three-article "What Actually Shapes a Youth Practice" series, done specifically to strip the AI-polish that had crept into earlier drafts and recover the voice underneath it. Update this file the same way going forward: from real, approved drafts, not from a fresh interview or from first principles.

---

## Author perspective

Chris has coached for more than 15 years and currently oversees coaches, teams, and player development at Colorado Storm (8U–10U Program Director). He watches a lot of youth training — not just his own teams, other coaches' sessions too — and the articles come out of patterns he actually sees repeat: sessions carrying one activity too many, a coach stopping fifteen players to fix one player's problem, a player who couldn't tell you what they were working on if you asked them right after training.

He is not writing from a textbook. He has made most of these mistakes himself and says so. The authority in the writing should come from that — thousands of hours actually in training environments, gradually forming opinions about what works — not from credentials stated outright or research cited as if it were the real source of the idea. Research shows up to sharpen or check an observation Chris already has, not to replace it.

Keep this implicit. It's in the byline (name, license, current role) and in the specificity of what gets described. It doesn't need restating in the prose itself.

## Voice

A very experienced coach explaining something to another intelligent coach after training. Not an academic, not a coaching-course manual, not a LinkedIn thought leader, not a motivational speaker, not a marketing copywriter, not a journalist reaching for a clever line.

Warm and thinking-alongside, not authoritative or lecturing. Credentialed but not performing it. The writing can be intelligent without constantly demonstrating that it's intelligent — one good specific observation does more work than three elegant sentences restating the same point.

## Rhythm

Vary sentence length for real, not decoratively. Some sentences are short. Some run long because the coach is working through an idea rather than packaging it. Vary paragraph length too — not every paragraph needs to be two or three sentences, and not every section needs the same shape.

Do not force every paragraph through setup → contrast → insight → quotable close. Some paragraphs just state something and move on. That's fine. A human writer doesn't manufacture a strong final sentence for every section — some sections just end.

Don't announce the next paragraph before you write it ("Here's the thing," "The question worth asking is," "Worth noting here"). Just say the thing.

## Coaching terminology

Prefer ordinary coaching language: session, practice, game, player, coach, ball, space, pressure, touch, scan, support, shape, decision, overload, small-sided game, constraint, condition, intervention, training environment.

Avoid management/business language unless it's the technically correct term for a PitchLabs framework concept: optimize learning outcomes, maximize engagement, facilitate decision-making processes, leverage constraints, holistic framework, actionable insight, strategic intervention, learner-centric, dynamic environment. These read as consultant-speak, not coaching writing.

## Research usage

Basic pattern: coaching observation or argument → relevant evidence → what that means for a coach. Not: introduce study → explain sample → explain finding → explain caveat → explain alternative interpretation → explain why it still applies → return to article. That six-step ritual is the single most identifiable "written by committee" tell in the original drafts, and it showed up almost identically in two different articles citing two different studies.

Mention a limitation when it materially changes what the reader should take from the claim (a study population that's much older than U8, a different sport entirely, a small sample). State it once, briefly, in the same breath as the finding — don't build it into its own paragraph with its own resolution. Don't add a caveat just because balanced-sounding prose feels more credible.

Never overstate what a study shows. Never invent a study, a statistic, or a finding. If a claim can't be traced to something in COACHING_FRAMEWORK.md or verified directly, it doesn't go in the article.

## First-person usage

Use it where Chris's own coaching experience is genuinely the source: "I see this a lot," "I've done this myself," "I still catch myself doing it," "an old mentor of mine used to say." Only when it's something Chris has actually told Claude, or that's already established in a prior approved draft.

Personal lines are welcome across the articles, but keep them general rather than specific (confirmed by Chris, 2026-09-29): "I watch a lot of other coaches' sessions" rather than headcounts, schedules or program details; "the age range I know best" rather than a job description. The byline already carries the credentials.

Never invent an anecdote, a player, a specific session, a conversation, or an event to make a passage feel more human. If the material doesn't contain a real observation to use, don't manufacture one — write the point plainly instead.

## Structural preferences

**TL;DR (added 2026-09-26):** Every article opens with a `<TLDR>` block — three to five bullets, the actual point in 30 seconds, placed after the header/meta and before the narrative opening. Compress what the article already says; don't introduce a claim in the TL;DR that isn't developed in the body. If the article is part of a series, the last line inside the same box (styled as `<p className="tldr-catchup">`, not a separate callout) names the earlier part(s) by title with a link — "Part 2 of 3. If you haven't read it, start with [Part 1 title](/articles/slug)." Only mention parts that come *before* this one; a part 1 has nothing to catch up on and gets no catch-up line. See `components/content.js`'s `TLDR` component.

**Introductions:** After the TL;DR, get to the coaching problem quickly. No five-paragraph windups for a simple idea. Don't reuse the same hook formula across articles in a series — if one article opens by naming the problem and correcting it in the next sentence, the next article in the series should open a different way (leading with an observation, a number, a direct claim — whatever actually fits that piece).

**Headings:** Useful first, clever second. Mix plain descriptive headings ("The two moves you should already be using constantly") with the occasional question-style one — don't make every heading in an article a rhetorical hook. Never reuse the exact same heading text across two articles in the same series (checked for this in the rewrite — "Where this goes next" had been used verbatim in two different pieces).

**Body:** Sometimes lead with the observation, sometimes with the evidence, sometimes just make the point without a wind-up. Don't let every section follow the identical shape.

**Endings:** End where a coach naturally would — often a practical thing to notice or try next session. Don't summarize the whole article again. Don't manufacture a compressed, quotable philosophical closer. It's fine for a piece to just stop once it's said what it needed to say.

**FAQs:** Keep them for search and discoverability, but keep answers direct and varied in construction. Don't make every answer follow "Yes — because…" or "No — but…" or "There isn't one answer, but…" as a template. Answers shouldn't re-summarize the whole article in miniature.

**Series cross-references:** Light references, not re-explanations. One article can point to another ("the last piece in this series covers this in full") without re-teaching that article's whole content again. If a visual series-recap component exists at the end of a piece, the prose doesn't also need to re-walk through all three articles right before it — that's redundant with what the reader is about to see. The one exception is the TL;DR's catch-up line (see above) — that's meant to be found at the top, not just the bottom, since a reader deciding whether to keep reading needs to know they're mid-series before they invest in the piece, not after.

## AI-style patterns to avoid

These constructions can appear once if they're genuinely the most natural way to say something. They cannot become the rhythm of an article, and they should never repeat across multiple articles in the same series:

- "It isn't X. It's Y." / "Not X — it's Y." / "X isn't the problem. Y is." / "The question isn't X. The question is Y."
- "That's the whole point." / "That's the whole idea." / "There's a mechanism underneath this."
- "Worth sitting with." / "Worth being straight about…" / "Worth flagging honestly…" / "The question worth asking…"
- "Not a rule, but a starting point."
- "That matters more than it sounds like it should."
- Excessive em dashes used as the default punctuation for every aside or contrast.
- Rhetorical questions used as a structural device rather than a genuine question.
- Dramatic one-sentence paragraphs used purely for effect.
- Three-part rhetorical lists that exist to sound rhythmic rather than to convey three real things.
- A section ending crafted to sound quotable.
- "Here's the thing" — style framing that announces what's coming instead of just saying it.
- Overuse of "actually," "genuinely," "simply," "ultimately," "fundamentally" as filler intensifiers rather than words doing real work.
- Perfectly symmetrical caveating on every research claim, regardless of whether the caveat changes anything.

## Non-negotiables

- Never invent anecdotes, players, coaches, conversations, or sessions.
- Never invent or distort research, statistics, or findings.
- Never overstate what a study proves.
- Never turn every secondary observation into a named framework, numbered law, or acronym — some things are just observations (see "Don't make everything a framework" below).
- Never polish the author's personality out of the writing in the name of making it "cleaner."
- Never deliberately insert fake typos, grammar mistakes, or slang to manufacture the appearance of being human-written. The goal is that the writing is good and doesn't feel machine-generated — not that it looks imperfect on purpose.

## Don't make everything a framework

STEP, the Coaching Intervention Wheel, and their named parts (Space/Task/Equipment/Players; Individual/Group/Unit/Team; the twelve interactions; the six interventions) are PitchLabs Learn's actual conceptual system. Protect those names and definitions exactly — don't rename, merge, or dilute them, though the explanatory wording around them can always improve.

Everything else stays an observation. Not every recurring idea needs to become a named principle, a three-step model, or a memorable phrase. Experienced coaches don't brand every insight they've had — most of what's true just gets said once, plainly.

## This is not a template

This file describes an author, not an article skeleton. Consistency across PitchLabs Learn means every piece sounds like it was written by the same person over time — not that every piece has the same number of sections, the same paragraph lengths, the same research placement, the same rhetorical devices, or the same kind of ending. If two articles in a row start to feel like they were generated from one mold, that's a sign the voice has calcified into a template, and the next draft should deliberately break the pattern.

---

## Before / after (from the 2026-09-26 rewrite)

**Before** (over-caveated research ritual, article 2 draft):
> Worth being straight about: that study is collegiate coaches, not U8, and not soccer. I haven't found the equivalent instrument-and-stopwatch study run on youth soccer coaches specifically. But the pattern it documents — coaches defaulting to Instruct without noticing, and closed questions crowding out open ones — is a coaching-behavior finding, not a sport-specific or age-specific one, and it's worth sitting with regardless.

**After:**
> That study is collegiate coaches, not U8, and not soccer — I haven't found the equivalent instrument-and-stopwatch version run on youth soccer coaches specifically. But the pattern is a coaching-behavior finding, not a sport-specific one: coaches default to Instruct without noticing, and closed questions crowd out open ones.

Same caveat, same honesty about the limitation, half the length, no separate "resolution" paragraph explaining why it still counts.

**Before** (duplicated opening template, article 3 draft):
> The most common mistake coaches make with young players isn't what they say. It's how often they stop the game to say it.

This is structurally identical to article 1's opening line ("the problem usually isn't your coaching. It's the environment you built") — the same series using the same hook formula twice.

**After:**
> Coaches step into the game more than they realize. Research that's tracked youth soccer coaching at every level, grassroots through academy, finds instruction happening more than once a minute during practice, and coaches' own ratings of their behavior match what an observer records less well than their players' ratings do.

(Wording corrected 2026-09-29: an earlier version said coaches' guesses "run lower" than the real number, which claims a direction the source doesn't establish. See COACHING_FRAMEWORK.md.)

Leads with the finding instead of the rhetorical inversion — differentiates the article's opening from article 1's without changing what it's actually claiming.

**Before** (credential stated explicitly — already flagged and fixed once in CLAUDE.md's own history, worth restating here so it isn't reintroduced):
> Across 17 coaches and 22 teams, watching 2–3 sessions a week outside my own, this is the pattern I see most.

This one was already correct — an observation with the numbers embedded, not a stated credential. The version that should never come back: "I oversee 17 coaches across 22 teams." Keep the numbers as evidence inside an observation, not as a claim of authority.

## Related docs

- **CLAUDE.md** — editorial rules, the wedge, and the review workflow. Points here for full voice detail.
- **COACHING_FRAMEWORK.md** — the research base this voice's "research usage" section draws examples from.
- **PUBLISHING_CALENDAR.md** — article queue and status.
