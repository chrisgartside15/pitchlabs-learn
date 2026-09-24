# PitchLabs Learn: Coaching Framework (Internal)

This is not a published page. It's the shared, research-grounded foundation that PitchLabs Learn articles draw from, so the blog argues from a consistent underlying philosophy instead of each article reasoning from scratch. Add to it every time an article surfaces real research worth keeping — this document should grow with the content, not get written once and go stale.

**How to use this:** before drafting an article, check whether it touches a principle already documented here — reuse the citation and framing rather than re-deriving it. After researching a new article, add what you found here, even in rough form, so the next article can build on it.

---

## Working Definition: What "Environment" Actually Means

**Environment = Session/Activity Design (STEP) + Coaching Interactions (the Intervention Wheel).** These are Chris's own two frameworks, built for Colorado Storm coach education — not external theory, real tested tools. This replaces the earlier generic version of this section, which was reconstructed from outside research before these tools were shared. Use these by name going forward.

**Source note — IP status confirmed by Chris for both tools (STEP: 2026-09-24; the Coaching Intervention Wheel: 2026-09-24).** Both are Chris's own — he built them himself; both are fine to reuse, rebrand, and build into interactive PitchLabs versions. An interactive `<StepTool />` reworked from Chris's own tool already ships live in article #1. The Coaching Intervention Wheel is now cleared the same way — no further IP check needed before building it into a public-facing tool or graphic. A rebranded standalone HTML version (Storm crest/name/palette stripped, PitchLabs tokens applied) exists at `docs/pitchlabs-learn/coaching-intervention-wheel-pitchlabs-reference.html` — still needs converting into a React component (`components/CoachingInterventionWheel.js`, mirroring StepTool.js) before it can actually ship in an article. For blog writing (not interactive tools), draw on the underlying framework and language (Space/Task/Equipment/Players; the named interventions and interactions) either way — that was never the IP question.

---

## Component 1: STEP (Session/Activity Design)

**What it is:** a four-lever framework for designing and adjusting practice activities. Each letter is a question to ask when building or fixing a session:

- **S — Space:** "Can I change the area to create more time, pressure, or movement?"
- **T — Task:** "Can I simplify, add a condition, or change how players score?"
- **E — Equipment:** "Can I use goals, gates, zones, or different balls to shape the behaviour?"
- **P — Players:** "Can I adjust numbers, add neutrals, or create an overload?"

**The diagnostic use (this is the sharper, more useful part):** the tool isn't just "here are four levers," it's built around diagnosing *what's actually wrong* with a session, then adjusting the right lever:

- **Too easy** — players succeeding without effort, no learning happening. Target ~60–70% success rate: enough to stay confident, enough failure to keep learning. Often only *part* of the group finds it easy — consider adjusting Players before shrinking the whole game for everyone.
- **Too difficult** — constant breakdowns, confidence draining. In the foundation phase (younger ages) repeated failure switches players off fast. Fix: simplify first, rebuild challenge gradually.
- **Too slow** — low intensity, players switching off, poor ball-rolling time. Usually means too much standing/queuing, not lazy players. Fastest fix is often Players: smaller teams, more games running, nobody waiting.
- **Wrong behaviour** — the game runs fine, but players aren't doing the thing you designed it for. First question: does the game actually *require* that behaviour to win? If players can succeed without doing it, they will — that's game intelligence, not defiance. Fix by rewarding the target behaviour in the scoring, not by banning the workaround. **Constraints that punish rarely teach; incentives that reward usually do.**

**Relationship to outside research:** this maps closely onto the academic "constraints-led approach" (Newell's "task constraints" specifically, plus Space touching what academics call environmental constraints) — see below. The FA's own public coaching material ([How to use constraints in your coaching session](https://www.thefa.com/bootroom/resources/coaching/how-to-use-constraints-in-your-coaching-session)) teaches something structurally similar (space, numbers, rules/parameters, individual constraints via the "3 Rs"). STEP is Chris's own applied version of the same underlying idea — cite STEP by name as the primary framework; the FA/academic material is supporting validation, not the main source.

**Used in:** "Why Your U8 Practice Feels Like Chaos" (article #1, drafted/approved) — including a live interactive `<StepTool />` component on the site, confirmed clear to ship (Chris's own IP, 2026-09-24).

---

## Component 2: The Coaching Intervention Wheel (Coaching Interactions)

**IP status confirmed by Chris (2026-09-24): the Wheel is his own, same as STEP.** Cleared to rebrand and build into a public/interactive asset. The HTML rebrand (Storm crest/name/palette removed, PitchLabs tokens applied) is done — see the source note above for the file location and the remaining step (convert to a React component).

**What it is:** a framework for the *other* half of environment — not what you build, but how and when you step into it. Three layers:

**WHO you're coaching (centre of the wheel):**
- **Individual** — one player
- **Group** — players across units who share an area of the field
- **Unit** — a line of the team (defensive/midfield/attacking)
- **Team** — everyone

**HOW you stop practice (outer ring) — with real time costs, which matters a lot:**
- **Drive by** — one sentence to one player, nothing stops. **Free.**
- **Drinks break** — coach inside a pause you were taking anyway. **Free.**
- **Pull aside** — take one or two players out while play continues. 20–30 sec.
- **Huddle** — bring everyone in, balls down. 60–90 sec.
- **Walkthrough** — rehearse the movement at walking pace, no pressure. 60–120 sec.
- **Freeze frame** — stop everything, players hold position. 30–45 sec.

**The single most important line from Chris's own tool documentation: "The most common mistake with young players is stopping the game too often."** Two of the six interventions are free — use those far more than the ones that cost playing time.

**HOW you interact once you've stepped in (inner ring):**
- **Observe** — deliberately gather information before deciding to act (says nothing yet)
- **Silence** — deliberately withhold input so the player has to solve it themselves
- **Question** — open question that makes them think ("Who was free?")
- **Guide and discovery** — steer with a nudge, let them find the answer ("What did you see over your left shoulder?")
- **Co-create** — build the solution with the players, not hand it over ("What do we want to try in the next three minutes?")
- **Check understanding** — ask them to tell you back what they took from it
- **Demonstrate** — show the action rather than describe it
- **Reframe** — change how the player sees the moment, not what they do ("That wasn't a bad pass — that was the right idea a second late.")
- **Feedback** — tell the player what happened and what it caused
- **Reinforce** — name precisely what was good, so it happens again
- **Challenge** — raise the demand on a player who's comfortable
- **Instruct** — a direct, unambiguous command ("Body between the ball and the defender. Now.")

**Important framing from the tool itself:** pairings between interventions and interactions are *suggestions, not rules* — a starting point for experimentation, then reflection on what worked for your group. Don't present this as a rigid decision tree in blog writing.

**External validation this matters — verified directly against the source, 2026-09-24:** the "season-long study" is three collegiate coaches (field hockey, volleyball, basketball), each observed for a full season — 1,000, 533, and 905 minutes of sessions respectively. Instruction made up 27–37% of each coach's total behaviors; Questioning made up only 9–14% — roughly a 3-to-1 gap favoring instruction. Of the questions asked, closed questions (one right answer, already known to the coach) outnumbered open ones by roughly 8 to 1. One coach, asked why his questioning stayed closed, said: "I imagine it was very closed... probably... because I... wanted the answer immediately, knew what the answer was and knew that they could give me it." ([Study PDF](https://cdn1.sportngin.com/attachments/document/feaa-2890941/A_season_long_investigation_into_coaching_behaviou.pdf))

**Important caveat, corrected 2026-09-24:** this is collegiate coaches across three other sports, not youth soccer and not U8. There's no equivalent instrument-and-stopwatch study found yet for youth soccer specifically. Frame it as a coaching-behavior pattern, not a soccer-specific or age-specific finding — don't imply otherwise in copy.

**Second, independent line of evidence (added 2026-09-24):** a 2024 study of 325 youth athletes (ages 12–18, team/individual/endurance sports) found autonomy-supportive coaching (asking, involving athletes in decisions — the Question/Co-create end of this framework) predicted psychological resilience, which predicted optimism, which predicted better development outcomes, via serial mediation (β = 0.079, p < 0.01 for the full pathway) ([Frontiers in Psychology, 2024](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1433171/full)). Caveat: sample skews older than U8 (12–18), and it measures resilience/development, not a technical skill. Useful as a second, psychological (not just cognitive) line of evidence — don't overstate direct applicability to U6–U10.

**Used in:**
- **Article #2 — "How Much Should You Actually Say?"** (drafted, in review as of 2026-09-24): built around the inner ring — Instruct vs. Question/Silence/Guide/Co-create. Uses the verified season-long study numbers above plus the 2024 autonomy-supportive coaching study, alongside a cross-reference to article 1's working-memory research. Now cleared to include a rebranded interactive Wheel component (mirroring StepTool) if desired — pending confirmation of exactly which article(s) it ships in.
- **Article #3 — "How to Progress a Session Without Stopping the Game Every Two Minutes"** (not yet drafted): built around the outer ring — the six stoppage types and their time costs. Lead with "the most common mistake with young players is stopping the game too often" and the free-vs-costly distinction (drive-by/drinks-break vs. huddle/freeze-frame). Same interactive-tool opportunity as article #2, now cleared on IP.

---

## Principle: Working memory limits how many instructions actually land

**Core claim:** Loading a session with multiple simultaneous coaching points doesn't multiply learning — it competes for limited working memory, and can measurably hurt performance, especially for players with lower working-memory capacity. This is the research-side explanation for why the Intervention Wheel's "Instruct" option should be used sparingly relative to Question/Guide/Silence.

**Source:** [Working Memory Capacity Limits Motor Learning When Implementing Multiple Instructions](https://www.frontiersin.org/articles/10.3389/fpsyg.2017.01350/full), Buszard et al., Frontiers in Psychology (2017) — author confirmed via direct source check, 2026-09-24. Study design: 90 children aged 8–10, given **five** explicit instructions before every block of a 240-shot basketball shooting task. Children with higher working-memory capacity improved consistently; children with lower working-memory capacity showed a performance *decline* — the instruction volume itself became the obstacle, not the skill.

**Caveat — don't overstate this, and this has already leaked into a live draft once:** the study does not establish a precise "safe" number of instructions. Don't cite "one instruction" or "1–2 instructions" as if the research says that specifically — the honest framing is "even a handful of instructions measurably overloads many children," not a precise cutoff. (Article #1's live FAQ currently states "One" as the answer to "how many coaching points should you give a U8 player" — this is flagged as wrong and being corrected; if you're drafting from this doc, don't repeat that error.)

**Used in:** "Why Your U8 Practice Feels Like Chaos" (article #1); also the bridge into article #2's Instruct-vs-Question argument.

---

## Supporting Academic Grounding (secondary to STEP + the Wheel, not primary)

**[Newell's Model of Constraints (1986)](https://wiki.ubc.ca/Course:KIN366/ConceptLibrary/Newell's_Model_of_Constraints)** — the academic base under all of this. Three interacting categories: Individual constraints (player's own physical/psychological state), Task constraints (rules, goal, equipment — what STEP mostly operationalizes), Environmental constraints strictly defined (weather, surface, social context — narrower than how "environment" is used in this blog). Use this if an article needs to show real academic depth, but STEP and the Wheel are the primary, named frameworks for this blog — lead with those, not the academic model.

**The constraints-led approach more broadly** — [The FA's Boot Room](https://www.thefa.com/bootroom/resources/coaching/how-to-use-constraints-in-your-coaching-session); [Renshaw, Davids, Newcombe, Roberts](https://www.routledge.com/The-Constraints-Led-Approach-Principles-for-Sports-Coaching-and-Practice/Renshaw-Davids-Newcombe-Roberts/p/book/9781138104075). Useful as external validation that STEP-style thinking is mainstream, credentialed sport science — not useful as the primary framework name, since STEP is Chris's own and should get top billing.

**Autonomy-supportive coaching, more broadly (self-determination theory)** — the 2024 study above sits inside a larger body of work (Mageau & Vallerand, Conroy & Coatsworth, and others) on autonomy-supportive vs. controlling coaching styles and athlete motivation/outcomes. Not yet individually verified beyond the 2024 study cited above — treat the wider literature as a lead for future articles, not yet citable.

**STEP's possible Youth Sport Trust (2002) origin — unverified.** A live draft of article #1 states "It came out of the Youth Sport Trust in 2002." This has not been checked against a primary source. Verify before citing it as fact anywhere, including here.

---

## Supporting Institutional Grounding: Colorado Storm Learning Plans (internal reference only, 2026-09-18)

Chris co-wrote Storm's internal "Learning Plans" document (250+ pages, Storm IP — not to be quoted, paraphrased structurally, or cited as a source on the public blog). Skimmed for background validation only. Three things worth keeping in mind when writing:

- **"Coaches as environmental architects"** is Storm's own official language for the same idea this framework already centers — good confirmation the instinct behind STEP/the Wheel isn't a personal quirk, it's consistent with how Chris already thinks and writes at the institutional level. Doesn't change anything already written here.
- **Storm's own Game Model only coaches two of the four "game moments" (Attacking, Defending) below U11 — no transition moments** because they're judged too cognitively abstract for that age. This is a concrete, credentialed reason to keep things simple at U6-U10 that isn't just "keep it simple" as a vibe — worth citing in spirit (not by name/source) in a future article that needs to justify *why* younger ages get a stripped-down version of a concept.
- **Storm's own U7-U10 coaching-behavior guidance** ("simple language and short instructions," "facilitate rather than direct," "short activity blocks with frequent breaks") lines up closely with what's already in CLAUDE.md's voice section and the article draft. Reassuring, not new — no changes needed.

**Not mined further:** the U11+ sections (same template, older ages) weren't read in full — out of scope for the current U6-U10 wedge. Revisit only if a specific future article needs it.

## Open / To Research

- Futsal-specific research on decision-making transfer to 11v11 (needed once Cluster 3 starts)
- Coach development / CPD research base (needed once Cluster 4 starts) — the Intervention Wheel itself may BE this content, worth revisiting when that cluster starts
- Article #3: no additional research identified as strictly needed — the Intervention Wheel's own time-cost data is the core content; still worth a quick check for supporting literature on stoppage frequency and flow in youth sessions when drafting starts
- Verify the Youth Sport Trust / 2002 STEP origin claim before it's cited as fact anywhere (see Supporting Academic Grounding above)
- Wider self-determination theory / autonomy-supportive coaching literature (Mageau & Vallerand, Conroy & Coatsworth) — a lead for future articles, not yet individually verified
- Convert `coaching-intervention-wheel-pitchlabs-reference.html` into a React component (`components/CoachingInterventionWheel.js`), mirroring how StepTool.js was built from the STEP HTML tool, then decide which article(s) it ships in

## Product Idea Parking Lot (not being built now)

- PitchLabs-branded version of the Intervention Wheel — STEP's own PitchLabs-branded interactive version already exists (article #1); the Wheel is now IP-cleared too (2026-09-24), rebranded as a standalone HTML reference file, and just needs the React-component conversion before it's a candidate for article #2 or #3
- Possible future gated/downloadable resource once these frameworks are proven out in blog content and there's an actual audience — revisit later, not now (see prior discussion on avoiding premature productization)

## Related Docs

- **CLAUDE.md** — editorial rules, the wedge, and voice
- **ROADMAP_6MONTH.md** — cluster sequencing
- **PUBLISHING_CALENDAR.md** — article queue
