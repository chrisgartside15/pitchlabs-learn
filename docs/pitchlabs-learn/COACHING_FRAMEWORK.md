# PitchLabs Learn: Coaching Framework (Internal)

This is not a published page. It's the shared, research-grounded foundation that PitchLabs Learn articles draw from, so the blog argues from a consistent underlying philosophy instead of each article reasoning from scratch. Add to it every time an article surfaces real research worth keeping — this document should grow with the content, not get written once and go stale.

**How to use this:** before drafting an article, check whether it touches a principle already documented here — reuse the citation and framing rather than re-deriving it. After researching a new article, add what you found here, even in rough form, so the next article can build on it.

---

## Working Definition: What "Environment" Actually Means

**Environment = Session/Activity Design (STEP) + Coaching Interactions (the Intervention Wheel).** STEP is a widely taught model that Chris uses and applies; it is not his invention. The Intervention Wheel is treated the same way — not claimed as Chris's own creation, just the version of a common coaching-interaction idea that he's assembled and uses. Present it as "the version I use and how I use it," not as a first-of-its-kind idea. Both were used in Colorado Storm coach education, with Storm branding removed for PitchLabs. This replaces the earlier generic version of this section, which was reconstructed from outside research before these tools were shared. Use them by name going forward.

**Source note (corrected 2026-09-28, updated again 2026-09-28).** Earlier versions recorded both tools as "Chris's own, IP confirmed," then corrected to say STEP isn't his but the Wheel is his own creation. Chris has since said plainly he doesn't want anything on this site claimed as his own — for both STEP and the Wheel, the standing claim is just: this is what I use and how I use it, nothing here is proprietary or original. On Storm, Chris states that Storm's claim is on the Learning Plans document, not on these tools; that is his account, not a legal opinion. An interactive `<StepTool />` reworked from the tool used in Colorado Storm coach education already ships live in article #1, and a rebranded standalone HTML version of the Wheel (Storm crest/name/palette stripped, PitchLabs tokens applied) exists at `docs/pitchlabs-learn/coaching-intervention-wheel-pitchlabs-reference.html`; it still needs converting into a React component (`components/CoachingInterventionWheel.js`, mirroring StepTool.js) before it can ship in an article. **Still open:** the twelve interactions on the Wheel resemble a common coaching-behaviour vocabulary; if Chris knows the source of the labels, name it in the article.

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

**Relationship to outside research:** STEP maps closely onto the academic "constraints-led approach" (Newell's "task constraints" specifically, plus Space touching what academics call environmental constraints) — see below. The FA's own public coaching material ([How to use constraints in your coaching session](https://www.thefa.com/bootroom/resources/coaching/how-to-use-constraints-in-your-coaching-session)) teaches something structurally similar (space, numbers, rules/parameters, individual constraints via the "3 Rs"), and STEP itself is a widely taught inclusion-and-adaptation model, not Chris's invention. Cite the FA and academic sources as the source, and describe STEP as the tool Chris uses. The four-symptoms-to-four-levers diagnostic and the 60–70% success target came with the STEP tool from the Storm coach-education material, so they are not claimed as Chris's own either (corrected 2026-09-29): articles describe the split as "how I use STEP," never "my own diagnostic."

**Used in:** "Why Your U8 Practice Feels Like Chaos" (article #1, drafted/approved) — including a live interactive `<StepTool />` component on the site.

---

## Component 2: The Coaching Intervention Wheel (Coaching Interactions)

**Provenance (updated 2026-09-28): not claimed as Chris's own — similar models exist elsewhere, and the standing claim is just what he uses and how he uses it.** Say so plainly in articles ("the version I use and how I use it"). What is distinctive and safe to emphasise: the three-layer assembly (who you're coaching, how you interact, how you stop the game), the time cost on each stoppage, and matching the stoppage to who needs to hear it. Avoid "first", "original method", "proprietary", or "my own." The HTML rebrand (Storm crest/name/palette removed, PitchLabs tokens applied) is done — see the source note above for the file location and the remaining step (convert to a React component).

**What it is:** a framework for the *other* half of environment — not what you build, but how and when you step into it. Three layers:

**WHO you're coaching (centre of the wheel):**
- **Individual** — one player
- **Group** — players across units who share an area of the field
- **Unit** — a line of the team (defensive/midfield/attacking)
- **Team** — everyone

**HOW you stop practice (outer ring) — with real time costs, which matters a lot:**
- **In-flow** (formerly "in-flow") — one sentence to one player, nothing stops. **Free.**
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

**External validation this matters — verified directly against the source, 2026-09-24:** the "season-long study" ([Harvey, Cushion, Cope & Muir, *Sports Coaching Review*, 2(1), 13–32, 2013](https://doi.org/10.1080/21640629.2013.837238) — authors confirmed 2026-09-29, now named in article #2) is three collegiate coaches (field hockey, volleyball, basketball), each observed for a full season — 1,000, 533, and 905 minutes of sessions respectively. Instruction made up 27–37% of each coach's total behaviors; Questioning made up only 9–14% — roughly a 3-to-1 gap favoring instruction. Of the questions asked, closed questions (one right answer, already known to the coach) outnumbered open ones by roughly 8 to 1. One coach, asked why his questioning stayed closed, said: "I imagine it was very closed... probably... because I... wanted the answer immediately, knew what the answer was and knew that they could give me it." ([Study PDF](https://cdn1.sportngin.com/attachments/document/feaa-2890941/A_season_long_investigation_into_coaching_behaviou.pdf))

**Important caveat, corrected 2026-09-24:** this is collegiate coaches across three other sports, not youth soccer and not U8. Frame it as a coaching-behavior pattern, not a soccer-specific or age-specific finding — don't imply otherwise in copy.

**Youth-soccer-specific counterpart found, 2026-09-28:** [O'Connor, Larkin, Robertson & Goodyear, "The art of the question: the structure of questions posed by youth soccer coaches during training," *Physical Education and Sport Pedagogy*, 27(3), 304–319 (2021)](https://www.tandfonline.com/doi/abs/10.1080/17408989.2021.1877270). Filmed 19 Australian youth soccer coaches (U12–U16) during real training. Coaches asked ~71 questions per session (0.88/minute); closed (convergent) questions were 52.2% vs. 47.8% open (divergent) — a much narrower gap than the collegiate study's 8-to-1. **Use both together, honestly:** the direction (coaches lean closed, Instruct dominates) holds across sport and age, but the *magnitude* of the imbalance in soccer specifically is nowhere near as extreme as the collegiate numbers alone would suggest — article #2 now cites both and says so explicitly rather than only citing the more dramatic collegiate ratio.

**Second, independent line of evidence (added 2026-09-24; authors confirmed 2026-09-29 as Zhang, Du & Tao, Chinese sample, published 2025 in vol. 15 — article #2 now names them):** a 2024 study of 325 youth athletes (ages 12–18, team/individual/endurance sports) found autonomy-supportive coaching (asking, involving athletes in decisions — the Question/Co-create end of this framework) predicted psychological resilience, which predicted optimism, which predicted better development outcomes, via serial mediation (β = 0.079, p < 0.01 for the full pathway) ([Frontiers in Psychology, 2024](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1433171/full)). Caveat: sample skews older than U8 (12–18), and it measures resilience/development, not a technical skill.

**Soccer-specific counterpart, added 2026-09-28:** [Álvarez, Balaguer, Castillo & Duda, "Coach Autonomy Support and Quality of Sport Engagement in Young Soccer Players," *The Spanish Journal of Psychology*, 12(1), 138–148 (2009)](https://www.cambridge.org/core/journals/spanish-journal-of-psychology/article/coach-autonomy-support-and-quality-of-sport-engagement-in-young-soccer-players/2DDD3502AA8358BBB56B509DAE4EA40E). n=370 youth soccer players (cadet category, roughly ages 12–16, Spain). Coach autonomy support → psychological need satisfaction → self-determined motivation → enjoyment/less boredom. Bigger sample, older study, soccer-specific — but still skews older than U8 and still measures motivation/enjoyment, not skill or game performance. Article #2 now cites this alongside the 2024 study and states plainly, in both cases, what's actually shown (motivation/enjoyment) versus what isn't (skill acquisition, and anything about players younger than ~12) — don't let either study imply more than that going forward.

**Used in:**
- **Article #2 — "How Much Should You Actually Say?"** (drafted, in review as of 2026-09-24): built around the inner ring — Instruct vs. Question/Silence/Guide/Co-create. Uses the verified season-long study numbers above plus the 2024 autonomy-supportive coaching study, alongside a cross-reference to article 1's working-memory research. Now cleared to include a rebranded interactive Wheel component (mirroring StepTool) if desired — pending confirmation of exactly which article(s) it ships in.
- **Article #3 — "How to Progress a Session Without Stopping the Game Every Two Minutes"** (drafted 2026-09-25, pending Chris's review — content/articles/coach-without-stopping-the-game.mdx): now presents the **full wheel** (center + both rings), not just the outer ring — the center/target layer (Individual/Group/Unit/Team, with each target's suggested default intervention from the reference tool's `TARGETS` data) is introduced for the first time here, and the inner ring gets a short recap before the outer ring (this article's actual new content) goes deep. Built around the six stoppage types and their time costs. Leads with "the most common mistake with young players is stopping the game too often" and the free-vs-costly distinction (in-flow/drinks-break vs. huddle/freeze-frame), now backed by the Cushion, Ford & Williams (2012) research below rather than resting on Chris's tool documentation alone. Also draws on the reference tool's "fit" field (each stoppage type's suggested audience) as a second axis alongside time cost: picking the *wrong-scope* stoppage (e.g. a whole-team huddle for one player's issue) wastes attention as well as time, tying back to article #1's working-memory material. Ships with the full three-ring `<CoachingInterventionWheel />` tool (built 2026-09-25) and a closing `<SeriesRecap />` card linking all three articles — see "Open / To Research" below for why that tool is its own component rather than merged into article #2's.

---

## Component 3: Scanning (Perceiving)

**What it is:** the third leg of perceive/decide/execute, left deliberately unresolved in "The Fundamentals of Soccer Coaching" (pillar). Resolved 2026-09-28: perceiving isn't treated as a separate mental stage. The actual research on it studies a physical action — a head/body turn away from the ball to gather information — which sport scientists call scanning or visual exploratory activity (VEA). This is the honest fix for the PDE-vs-ecological-dynamics tension flagged earlier: scanning is observable and trainable the same way STEP-driven decisions are, because it's a behavior, not a cognitive stage a coach has to somehow reach into.

**Origin:** coined by Geir Jordet (Norwegian School of Sport Sciences), working explicitly from the ecological approach to visual perception — the same theoretical line (Gibson, Davids) already cited for constraints-led practice in article #1. Not Chris's own; standard sport-science terminology, cite Jordet.

**Source 1 — verified directly, 2026-09-28:** [Aksum, Brotangen, Bjørndal, Magnaguagno & Jordet, "Scanning activity of elite football players in 11 vs. 11 match play," *PLOS ONE*, 16(8), e0244118 (2021)](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0244118). Eye-tracking on 4 elite Norwegian midfielders (ages 17–23) during real 11v11 matches, 869 scans analyzed. Scans averaged 39.65 centiseconds, 90.3% under 66 centiseconds, and only 2.3% involved a foveal fixation — scanning is a brief glance, not a sustained look.

**Source 2 — verified directly, 2026-09-28:** [Aksum, Pokolm, Bjørndal, Rein, Memmert & Jordet, "Scanning activity in elite youth football players," *Journal of Sports Sciences*, 39(21), 2401–2410 (2021)](https://www.tandfonline.com/doi/full/10.1080/02640414.2021.1935115). 53 outfield players across the 2018 UEFA U17 and U19 European Championship finals, 1,686 possessions analyzed. U19 players scanned more than U17 players; scanning frequency correlated with pass completion; tighter opponent pressing reduced scanning frequency.

**Caveat, same shape as every other age-mismatch flagged in this doc:** both studies are elite academy/professional players aged 17–23, not grassroots 8-to-10-year-olds. There is no equivalent scanning study at U8–U10. Article treats the age-development trend (younger age group scans less) as a reasonable extrapolation, explicitly labeled as extrapolation, not as direct evidence — and does not invent a specific scanning-frequency target for U8 players, since none exists.

**Used in:** "Scanning and Receiving: Why Information Comes Before Decisions" (drafted 2026-09-28, `content/articles/scanning-and-receiving.mdx`) — the direct answer to the pillar's open thread. Also grounds a revision to the pillar itself: the "perceive, decide, execute" section now states plainly that perceiving is an action, not a stage, rather than leaving it as an open question.

---

## Principle: Working memory limits how many instructions actually land

**Core claim:** Loading a session with multiple simultaneous coaching points doesn't multiply learning — it competes for limited working memory, and can measurably hurt performance, especially for players with lower working-memory capacity. This is the research-side explanation for why the Intervention Wheel's "Instruct" option should be used sparingly relative to Question/Guide/Silence.

**Source:** [Working Memory Capacity Limits Motor Learning When Implementing Multiple Instructions](https://www.frontiersin.org/articles/10.3389/fpsyg.2017.01350/full), Buszard et al., Frontiers in Psychology (2017) — author confirmed via direct source check, 2026-09-24. Study design: 90 children aged 8–10, given **five** explicit instructions before every block of a 240-shot basketball shooting task. Children with higher working-memory capacity improved consistently; children with lower working-memory capacity showed a performance *decline* — the instruction volume itself became the obstacle, not the skill.

**Caveat — don't overstate this, and this has already leaked into a live draft once:** the study does not establish a precise "safe" number of instructions. Don't cite "one instruction" or "1–2 instructions" as if the research says that specifically — the honest framing is "even a handful of instructions measurably overloads many children," not a precise cutoff. (Article #1's live FAQ currently states "One" as the answer to "how many coaching points should you give a U8 player" — this is flagged as wrong and being corrected; if you're drafting from this doc, don't repeat that error.)

**Used in:** "Why Your U8 Practice Feels Like Chaos" (article #1); also the bridge into article #2's Instruct-vs-Question argument; also grounds the age-group section of "The Fundamentals of Soccer Coaching" (pillar, drafted 2026-09-26).

**Correction, 2026-09-28:** the "five instructions" number had drifted into being cited as a de facto policy threshold across three articles (this study's own experimental parameter, presented as if it were a discovered ceiling) — this is the exact overreach the caveat above already warned against, it just wasn't fully caught in the live text until a second pass. Article #1's body text and FAQ answer are now corrected to state plainly that five was the study's own test parameter, not a proven limit. Apply the same framing if this study is cited again anywhere else.

**Complicating counter-evidence, not yet used in any article:** [Moran et al., "Do verbal coaching cues and analogies affect motor skill performance in youth populations?", *PLOS ONE* (2023)](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0280201) — a meta-analysis across youth populations (ages ~10–15, including soccer academy players in Tunisia and Iran) testing *cue type/complexity* (not instruction count) on sprint/jump performance, found the neutral, simplest cue performed as well as or better than more complex external-focus/analogy cues in most comparisons. Doesn't contradict the working-memory-load argument directly (different measure: cue complexity vs. instruction quantity), but it's an honest reason not to treat "fewer/simpler instructions always help" as settled beyond doubt. Worth citing if this site ever makes a stronger claim than it currently does about instruction simplicity improving outcomes.

---

## Principle: Coaches over-instruct and are poor judges of their own frequency

**Core claim:** This is the primary research backing for article #3, and it's youth-soccer-specific — unlike the season-long coaching-behavior study used in article #2 (three collegiate coaches, other sports), this one is soccer, and includes coaches working with players as young as nine.

**Source — verified directly against the primary PDF, 2026-09-25:** [Cushion, Ford & Williams, "Coach behaviours and practice structures in youth soccer: Implications for talent development," *Journal of Sports Sciences*, 30(15), 2012](https://doi.org/10.1080/02640414.2012.721930). A review paper synthesizing multiple observational studies of real youth soccer coaching sessions (grassroots through professional academy, ages spanning roughly 9–21). Key points confirmed from the primary source (not a secondhand summary):

- **Instruction is the single most frequently observed coach behaviour across every study reviewed**, at every age group and skill level, with only minor variation by age/skill. Table I in the paper reports instruction ranging ~27–63% of all coded coach behaviours depending on the study/methodology (the wide range reflects differing coding schemes across studies, not a real underlying swing — don't cite a single precise percentage as *the* number).
- **"The rate per minute for frequency of instructional behaviours was generally greater than 1 per minute across studies"** (p. 5) — this is the safe, citable, study-stated summary claim. Direct quote, safe to use as-is.
- **Coaches have limited self-awareness of their own behaviour frequency** — "athletes' ratings correlating more strongly with observed behaviours than the coaches' own self-ratings" (p. 4, citing Partington & Cushion 2011; Smith & Smoll 2007). **Precision note, corrected 2026-09-25:** the paper establishes that coach self-ratings correlate poorly with observed behavior — it does NOT establish a specific direction (i.e. it doesn't say coaches specifically *underestimate* their frequency, only that their self-ratings are unreliable). An earlier draft of this doc and article #3 both overstated this as "coaches underestimate" — cite it as "coaches are poor judges of their own frequency" / self-ratings don't reliably track reality, not as a specific under-count.
- **Ford et al. (2010a), cited within this review:** a video-based time-use analysis of 70 sessions across three ages (9, 13, 16) found sessions split ~64% "Training Form" (isolated drills, no game context) vs. ~36% "Playing Form" (small-sided/conditioned games), with almost no change by age — the 9-year-old breakdown specifically was 69.38% Training Form / 30.62% Playing Form (Table II). Useful for validating article #1's constraints-led/game-based argument with real data, not just Chris's own framing.
- **Wulf & Shea (2004)**, cited within this review (in *Skill Acquisition in Sport: Research, Theory and Practice*): instruction/feedback given immediately after a skill is executed can prevent a player from processing their own intrinsic feedback, leading to "over-correcting" errors that didn't need correcting. Useful mechanism for *why* stopping to give feedback too often can actively hurt, not just cost time — but Wulf & Shea's own review of this literature is explicitly mixed ("the good, the bad, and the ugly" — their own subtitle), so frame this as a plausible mechanism, not a settled, strong effect. Don't cite it as if the evidence is one-sided.

**Caveat — checked before citing anywhere else:** a separate, more recent 2022 meta-analysis specifically on reduced-feedback-frequency (*Psychology of Sport and Exercise*, 61 studies) found **no significant effect** of reduced feedback frequency on motor learning, calling the underlying evidence "severely underpowered." This directly complicates using "less feedback = better learning" as a strong, standalone claim — which is why this doc leans on the Cushion et al. youth-soccer-specific behavioural data (a *description* of what coaches actually do, and coaches' own lack of awareness of it) as the primary backing for article #3, rather than the shakier feedback-frequency motor-learning literature. If a future article wants to cite feedback frequency specifically, cite this caveat too.

**Used in:** "How to Progress a Session Without Stopping the Game Every Two Minutes" (article #3, drafted 2026-09-25); the Ford et al. Training Form/Playing Form split specifically also grounds "The Fundamentals of Soccer Coaching" (pillar, drafted 2026-09-26)'s "good activity ≠ good coaching" opening argument.

---

## Consistency pass, 2026-09-29 (all five articles)

Cross-article audit for conflicting research and messaging. What changed, so it doesn't drift back:

- **Instruction vs. questioning:** article #2 now uses Cushion et al. (2012) for the youth-soccer instruction claim (most frequent behaviour, >1/min) and O'Connor et al. (2021) only for the question split (~52/48). The collegiate 3-to-1 and 8-to-1 figures are always labelled collegiate/other sports. Article #3 no longer restates the 3-to-1 as if it applied to soccer.
- **Coach self-awareness:** "coaches think they talk less than they do" / "guesses run lower" removed everywhere. Use "coaches' self-ratings match observed behaviour less well than their players' ratings do" (no direction).
- **Perceive/decide/execute:** pillar no longer says "three separate skills"; it presents information-processing (stages) vs. ecological dynamics (coupled) as a live disagreement and uses PDE as a shorthand. Scanning is described as what perceiving looks like on the field, trained via STEP levers, not as a separate "tool."
- **Wheel provenance and time costs:** articles #2 and #3 now say the Wheel/menu isn't Chris's and that the stoppage times are his rough estimates, per CLAUDE.md.
- **Feedback frequency:** article #3 now cites McKay et al. (2022) alongside Wulf & Shea, and the Wulf & Shea link (previously pointing to an unrelated 1999 Shea & Wulf PDF) now points to the Cushion review it's cited through.
- **Moran et al. (2023)** — now used in article #2. Verified 2026-09-29: 173 boys under 18 (UK, Tunisia, Iran; school and academy), jump and 20m sprint; no difference between neutral and external/analogy cues in 7 of 8 analyses, one small effect favouring neutral. Earlier note here said ages ~10–15; the paper says under 18.

**Soundness pass, 2026-09-29 (second round, after a "how would someone argue against this" review):**

- **The beginner / base-level problem is now addressed.** Game-based design assumes players can already execute enough to take part; when they can't, direct teaching (Demonstrate, Instruct, repetition, heavy Task simplification) comes first. Article #1 has a new section ("What a game can't teach on its own"), article #2's "When Instruct is the right call" carries the argument, article #3's walkthrough entry links to it, and the pillar's FAQ no longer says technique "needs isolated repetition to build reliably" (the comparison evidence below doesn't support that).
- **Article #1 de-U8'd** (title, slug, TL;DR, FAQs). Slug is now `why-your-practice-feels-like-chaos`. The U8 4v4 example activity stays as an example.
- **Buszard framing:** every mention now says the same five instructions *helped* the higher-working-memory children, and that it was pre-block instructions for basketball shooting, not live-game coaching points.
- **Challenge point** is called a theoretical framework, not a finding.
- **Article #3** now states plainly that the stoppage costs and pairings are practical judgment, that Cushion's instruction rate includes talk during play (not just stoppages), and gives the counter-case for freeze frames. In-flow is no longer "no reason to ration it" (that contradicted article #2's working-memory argument).
- **Scanning:** added correlation-not-causation, and that head-turn counts miss peripheral vision.
- **Pillar:** removed the unattributed "a lot of coach education leaves out entire tactical layers" line (likely Storm-derived; see Storm section below).

- [Kirschner, Sweller & Clark, *Educational Psychologist*, 41(2), 75–86 (2006)](https://doi.org/10.1207/s15326985ep4102_1) — verified 2026-09-29. Argues guided instruction beats minimal guidance for novices; "the advantage of guidance begins to recede only when learners have sufficiently high prior knowledge." Classroom/academic learning, not motor skills; always say so. Articles #1 and Teach It (article #2 now links to Teach It instead of re-citing it).
- [Bromilow, Milne, Woods, Dowsett & Keogh, *Sports Medicine – Open*, 11, 90 (2025)](https://doi.org/10.1186/s40798-025-00893-y) — systematic review, verified from full text 2026-09-29. Nine studies comparing nonlinear (constraints-led) vs linear (drill-based) pedagogy in team-invasion sports (seven soccer, one AFL, one hockey). Technical outcomes: 66% no difference, 34% favoured nonlinear, none favoured linear. Tactical (four studies): nonlinear significantly better in ~66% of outcomes, one outcome favoured linear. Youngest samples: Abate Daga et al. (≤9, community soccer, serious risk of bias) and Deuker et al. (10 ± 1). Several nonlinear arms included task simplification / attentional-focus cues. Authors: "based on limited studies," many small samples, call for research across developmental levels and more representative skill tests. Articles #1, #3 and the pillar.

**New sources verified 2026-09-29 and now cited:**

- [Gathercole, Pickering, Ambridge & Wearing, *Developmental Psychology*, 40(2), 177–190 (2004)](https://doi.org/10.1037/0012-1649.40.2.177) — working memory components expand steadily from ~4 to 15 years. Grounds the pillar's "working memory develops with age" (Buszard doesn't show age change; all its participants were 8–10).
- [McKay et al., *Psychology of Sport and Exercise*, 61, 102165 (2022)](https://doi.org/10.1016/j.psychsport.2022.102165) — meta-analysis, no significant effect of reduced relative feedback frequency on learning; studies severely underpowered. Article #3.
- [McGuckian, Beavan, Mayer, Chalkley & Pepping, *Science and Medicine in Football*, 4(4), 278–284 (2020)](https://www.tandfonline.com/doi/abs/10.1080/24733938.2020.1769174) — 14 U13 + 13 U23 Bundesliga-club players, Footbonaut, head-worn sensor. More head turns before receiving → faster passing; more during possession → slower. Youngest scanning data found so far. Scanning article.
- ["No evidence that visual exploratory activity distinguishes the super elite from elite football players," *Science and Medicine in Football*, 9(2) (2024)](https://www.tandfonline.com/doi/abs/10.1080/24733938.2024.2325139) — 18 award-winning vs 18 elite teammates, 2018–19 Champions League, same team/match/line: no significant difference in VEA or performance. First author not yet confirmed (paywalled); article cites journal and year only. Scanning article — the counterweight to "better players scan more."
- [Pocock, Dicks, Thelwell et al., *Journal of Applied Sport Psychology*, 31(2), 218–234 (2019)](https://www.tandfonline.com/doi/abs/10.1080/10413200.2017.1395929) — 6-week PETTLEP imagery intervention, 5 elite academy players, single-case multiple baseline; VEA improved, especially central midfielders. Scanning article — an alternative (non-constraints) route to more scanning.
- Jordet: articles no longer say he "coined" the term; say the research is "most closely associated with" him.

## Batch 2 sources (verified 2026-09-29)

- [Kalyuga, Ayres, Chandler & Sweller, *Educational Psychologist*, 38(1), 23–31 (2003)](https://doi.org/10.1207/S15326985EP3801_4) — expertise reversal effect: guidance that helps novices becomes redundant or harmful for more knowledgeable learners. Classroom learning, not sport. Teach-it article.
- [Pacheco, de Oliveira, dos Santos, Godoi Filho & Drews, *International Journal of Sports Science & Coaching*, 18(5), 1702–1725 (2023)](https://doi.org/10.1177/17479541231168930) — systematic review of soccer research on augmented information, focus of attention, demonstration and practice schedule (revisiting Williams & Hodges 2005's "myths"); results "in most cases, not unanimous." Teach-it, first touch, session pillar.
- Bernstein, *The Co-ordination and Regulation of Movements* (1967) — "repetition without repetition." Linked via [a 2020 Frontiers review](https://www.frontiersin.org/articles/10.3389/fpsyg.2020.02018/full). Teach-it, first touch.
- [Hintermann, Born, Fuchslocher, Kern & Romann, *PLOS ONE* (2021)](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0254900) — 103 players aged ~10, 4v4 (30×20m) vs 7v7 (50×30m). 4v4 doubled actions per player per minute; least-involved third +143% vs most-involved third +72%; success rates improved. Small-sided, first touch, U6–U10.
- [Bergmann, Braksiek & Meier, *International Journal of Sports Science & Coaching*, 17(5), 1089–1100 (2022)](https://www.researchgate.net/publication/357656797) — U7 (n=42) 3v3 vs 7v7 and U9 (n=43) 5v5 vs 7v7 in competition; more technical actions in smaller formats; no difference in effective playing time. DOI not directly confirmed, so the article links ResearchGate. Small-sided.
- [Clemente, Sarmento, Costa, Enes & Lima, *Journal of Human Kinetics* (2019)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6815080/) — 16 players aged ~10, 3v3 vs 6v6; per minute in 6v6: received balls −65.6%, shots −87.6%; technical actions varied a lot between sessions. Small-sided.
- U.S. Soccer Small-Sided Standards ([2017](https://www.ussoccer.com/stories/2017/08/five-things-to-know-how-smallsided-standards-will-change-youth-soccer)) — 4v4 no GK to U8, 7v7 U9–U10, 9v9 U11–U12, 11v11 from U13. Policy, not research. Small-sided, U6–U10.
- U.S. Soccer Play-Practice-Play ([2018](https://www.ussoccer.com/stories/2018/02/five-things-to-know-about-playpracticeplay)) — game, one or two focused activities, game. Recommended structure, not tested. Session pillar.
- [Partington, Cushion, Cope & Harvey, *Reflective Practice*, 16(5), 700–716 (2015)](https://repository.lboro.ac.uk/articles/journal_contribution/The_impact_of_video_feedback_on_professional_youth_football_coaches_reflection_and_practice_behaviour_a_longitudinal_investigation_of_behaviour_change/9617387) — five English professional youth coaches, video feedback over three seasons, CAIS coding: less instruction and feedback, more on-task silence; 4 of 5 more questioning. See-your-own-coaching.
- [Visek et al., *Journal of Physical Activity and Health*, 12(3), 424–433 (2015)](https://journals.humankinetics.com/view/journals/jpah/12/3/article-p424.xml) — 142 youth soccer players (U9–U19), 37 coaches, 57 parents; 81 fun-determinants; top: being a good sport, trying hard, positive coaching; winning among the lowest-rated ("near the bottom," per the university's release). Players 9+, not U6–U8. U6–U10 pillar.
- [Cobley, Baker, Wattie & McKenna, *Sports Medicine*, 39(3), 235–256 (2009)](https://pubmed.ncbi.nlm.nih.gov/19290678/) — relative age effect meta-analysis: 38 studies, 253 samples, 14 sports; consistent but small effects; strongest in 15–18-year-old males at representative level in popular sports. U6–U10 pillar.

**Checked and deliberately not used:** widely repeated "Liverpool / Manchester United / Minneapolis" small-sided statistics (no primary source found); a Barça Innovation Hub blog claim about body orientation and progressive passes (not peer-reviewed); contextual-interference-in-children claims seen only in secondary summaries.

## Supporting Academic Grounding (secondary to STEP + the Wheel, not primary)

**[Newell's Model of Constraints (1986)](https://wiki.ubc.ca/Course:KIN366/ConceptLibrary/Newell's_Model_of_Constraints)** — the academic base under all of this. Three interacting categories: Individual constraints (player's own physical/psychological state), Task constraints (rules, goal, equipment — what STEP mostly operationalizes), Environmental constraints strictly defined (weather, surface, social context — narrower than how "environment" is used in this blog). Use this if an article needs to show real academic depth, but STEP and the Wheel are the primary, named frameworks for this blog — lead with those, not the academic model.

**The constraints-led approach more broadly** — [The FA's Boot Room](https://www.thefa.com/bootroom/resources/coaching/how-to-use-constraints-in-your-coaching-session); [Renshaw, Davids, Newcombe, Roberts](https://www.routledge.com/The-Constraints-Led-Approach-Principles-for-Sports-Coaching-and-Practice/Renshaw-Davids-Newcombe-Roberts/p/book/9781138104075). Useful as external validation that STEP-style thinking is mainstream, credentialed sport science. **Corrected 2026-09-28:** this line previously said "since STEP is Chris's own and should get top billing" — that's the exact overclaim corrected elsewhere in this doc (see the source note near the top). STEP still gets top billing in articles because it's the tool Chris actually uses and applies, not because he invented it.

**Autonomy-supportive coaching, more broadly (self-determination theory)** — the 2024 study and the Álvarez et al. (2009) soccer-specific study above both sit inside a larger body of work (Mageau & Vallerand, Conroy & Coatsworth, and others) on autonomy-supportive vs. controlling coaching styles and athlete motivation/outcomes. Two studies are now individually verified and citable (see above); the wider literature beyond those two is still just a lead for future articles, not yet citable.

**STEP's possible Youth Sport Trust (2002) origin — resolved.** Checked 2026-09-28: the live article text no longer contains this claim (article #1 currently says STEP "isn't mine and it isn't new," linking the FA, with no Youth Sport Trust / 2002 attribution). No longer an open item.

---

## Supporting Institutional Grounding: Colorado Storm Learning Plans (internal reference only, 2026-09-18)

Chris co-wrote Storm's internal "Learning Plans" document (250+ pages, Storm's claim, per Chris: it covers the Learning Plans, not STEP or the Wheel). The Learning Plans are not to be quoted, paraphrased structurally, or cited as a source on the public blog unless Storm clears it. Skimmed for background validation only. Three things worth keeping in mind when writing:

- **"Coaches as environmental architects"** is Storm's own official language for the same idea this framework already centers — good confirmation the instinct behind STEP/the Wheel isn't a personal quirk, it's consistent with how Chris already thinks and writes at the institutional level. Doesn't change anything already written here.
- **Storm's own Game Model only coaches two of the four "game moments" (Attacking, Defending) below U11 — no transition moments** because they're judged too cognitively abstract for that age. This is a concrete, credentialed reason to keep things simple at U6-U10 that isn't just "keep it simple" as a vibe — do not use this in a public article until the Storm ownership question above is answered by someone qualified to answer it. If it is cleared, attribute it openly. Using Storm's reasoning while hiding the source is not allowed under this site's attribution rule (see CLAUDE.md).
- **Storm's own U7-U10 coaching-behavior guidance** ("simple language and short instructions," "facilitate rather than direct," "short activity blocks with frequent breaks") lines up closely with what's already in CLAUDE.md's voice section and the article draft. Reassuring, not new — no changes needed.

**Not mined further:** the U11+ sections (same template, older ages) weren't read in full — out of scope for the current U6-U10 wedge. Revisit only if a specific future article needs it.

## Open / To Research

- Futsal-specific research on decision-making transfer to 11v11 (needed once Cluster 4 / `futsal` starts — see ROADMAP_6MONTH.md)
- Coach development / CPD research base (needed once Cluster 5 / `coach-development` starts) — the Intervention Wheel itself may BE this content, worth revisiting when that cluster starts
- ~~Article #3: quick check for supporting literature on stoppage frequency and flow in youth sessions~~ — **done 2026-09-25**, see "Coaches over-instruct and are poor judges of their own frequency" above.
- ~~Convert `coaching-intervention-wheel-pitchlabs-reference.html` into a React component~~ — **built 2026-09-25**, `components/CoachingInterventionWheel.js`, live in article #3 as `<CoachingInterventionWheel />`. Built as its own self-contained full three-ring tool with its own copy of the interaction data, deliberately **not** merged into or sharing data with article #2's existing `<InterventionWheelTool />` (inner-ring-only) — that component is already live/approved content, and consolidating them was judged higher-risk than the duplication cost of ~90 lines of interaction copy across two independent, self-contained tool components (matching this codebase's existing pattern: StepTool.js and InterventionWheelTool.js already don't share code either). Revisit consolidation only if the duplicated data actually drifts out of sync in practice.
- ~~Verify the Youth Sport Trust / 2002 STEP origin claim before it's cited as fact anywhere~~ — **resolved 2026-09-28**, claim isn't in the live text, see Supporting Academic Grounding above.
- Wider self-determination theory / autonomy-supportive coaching literature beyond the two now-verified studies (Mageau & Vallerand, Conroy & Coatsworth) — a lead for future articles, not yet individually verified

## Product Idea Parking Lot (not being built now)

- PitchLabs-branded version of the Intervention Wheel — STEP's own PitchLabs-branded interactive version already exists (article #1); the Wheel is now IP-cleared too (2026-09-24), rebranded as a standalone HTML reference file, and just needs the React-component conversion before it's a candidate for article #2 or #3
- Possible future gated/downloadable resource once these frameworks are proven out in blog content and there's an actual audience — revisit later, not now (see prior discussion on avoiding premature productization)

## Related Docs

- **CLAUDE.md** — editorial rules, the wedge, and voice
- **ROADMAP_6MONTH.md** — cluster sequencing
- **PUBLISHING_CALENDAR.md** — article queue
