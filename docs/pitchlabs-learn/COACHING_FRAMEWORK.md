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
- [Hintermann, Born, Fuchslocher, Kern & Romann, *PLOS ONE* (2021)](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0254900) — 103 players aged ~10, 4v4 (30×20m) vs 7v7 (50×30m). 4v4 doubled actions per player per minute (2.78 → 5.59); least-involved third +143% (2.02 → 4.90/min) vs most-involved third +72% (3.56 → 6.11/min); successful actions 62% → 73%. Swiss (Swiss Federal Institute of Sport / Swiss FA). Middle third not reported separately. Re-checked against the paper 2026-09-29; the per-minute means drive the InvolvementChart in small-sided-games. Small-sided, first touch, U6–U10.
- [Bergmann, Braksiek & Meier, *International Journal of Sports Science & Coaching*, 17(5), 1089–1100 (2022)](https://www.researchgate.net/publication/357656797) — U7 (n=42) 3v3 vs 7v7 and U9 (n=43) 5v5 vs 7v7 in competition; more technical actions in smaller formats; no difference in effective playing time. DOI not directly confirmed, so the article links ResearchGate. Small-sided.
- [Clemente, Sarmento, Costa, Enes & Lima, *Journal of Human Kinetics* (2019)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6815080/) — 16 players aged ~10, 3v3 vs 6v6; per minute in 6v6: received balls −65.6%, shots −87.6%; moderate between-session variability in technical actions (re-checked 2026-09-29). The article now names the sample size. Small-sided.
- U.S. Soccer Small-Sided Standards ([2017](https://www.ussoccer.com/stories/2017/08/five-things-to-know-how-smallsided-standards-will-change-youth-soccer)) — 4v4 no GK to U8, 7v7 U9–U10, 9v9 U11–U12, 11v11 from U13. Policy, not research. Small-sided, U6–U10.
- U.S. Soccer Play-Practice-Play ([2018](https://www.ussoccer.com/stories/2018/02/five-things-to-know-about-playpracticeplay)) — game, one or two focused activities, game. Recommended structure, not tested. Session pillar.
- [Partington, Cushion, Cope & Harvey, *Reflective Practice*, 16(5), 700–716 (2015)](https://repository.lboro.ac.uk/articles/journal_contribution/The_impact_of_video_feedback_on_professional_youth_football_coaches_reflection_and_practice_behaviour_a_longitudinal_investigation_of_behaviour_change/9617387) — five English professional youth coaches, video feedback over three seasons, CAIS coding: less instruction and feedback, more on-task silence; 4 of 5 more questioning. See-your-own-coaching.
- [Visek et al., *Journal of Physical Activity and Health*, 12(3), 424–433 (2015)](https://journals.humankinetics.com/view/journals/jpah/12/3/article-p424.xml) — 142 youth soccer players (U9–U19), 37 coaches, 57 parents; 81 fun-determinants sorted into 11 dimensions; the top three *dimensions* were being a good sport, trying hard and positive coaching (they're groups, not individual factors). Winning sits in the "Mental Bonuses" dimension, rated 9th of 11. **Corrected 2026-09-29:** earlier copy said winning was "near the bottom of 81 factors"; the paper text on hand doesn't support that. A search result gives winning's individual rank as 48th of 81 (mid-table), but it couldn't be confirmed at source, so neither figure is used. Youngest players were the U9–U11 stratum, so not U6–U8. U6–U10 pillar.
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

## Formations & goal kicks: 7v7 sources (checked 2026-10-09)

For the 1-2-3-1 series. See FORMATION_1-2-3-1_NOTES.md for Chris's own practice. Strength of evidence is stated per source; none of this is youth outcome evidence.

- **Build-out line, rules.** [U.S. Soccer, "Five things to know: how small-sided standards will change youth soccer" (2017)](https://www.ussoccer.com/stories/2017/08/five-things-to-know-how-smallsided-standards-will-change-youth-soccer), read at source. Line sideline to sideline 14 yards in front of each goal, from under-9. On a goal kick or while the keeper holds the ball, the opponents stay behind the line until the ball is back in play. Punts and drop kicks banned for the keeper. The page says recommended 7v7 and 9v9 formations exist but does not list them. Local leagues vary (line position, release triggers, 9v9). Current rulebook text not checked; articles should say "check your league".
- **Recommended 7v7 shape.** [EPYSA's summary of the PDI](https://www.epysa.org/u-s-soccer-player-development-initiatives/), read at source: for U9 and U10, "1-2-3-1 or 1-3-2-1", attributed to U.S. Soccer's Player Development Initiatives. A regional association's summary, not U.S. Soccer itself. U.S. Soccer's own "Selecting a Formation for Your Team" PDF could not be opened (file too large); a search summary said it lists 1-3-2-1 for U9–U10 and describes formations as a guide to adapt to players. **Unverified, so don't write "U.S. Soccer recommends the 1-2-3-1."**
- **Goal kick outcomes (adult men, elite).** Mendes, Rezende & Praça, "Association between goal-kick strategies and the offensive outcome in the UEFA Euro 2020", *Human Movement* 24(3), 64–70 (2023), [doi:10.5114/hm.2023.125924](https://doi.org/10.5114/hm.2023.125924). 595 goal kicks from 51 games. Short goal kicks were associated with unsuccessful offensive sequences, long goal kicks with successful ones (p = 0.021); this contradicted the authors' hypothesis. Read from the journal's abstract page only: short/long definitions and limitations were not on it. One tournament, men's elite, observational. Not youth, and not a claim that long is better at U10.
- **Goal kicks, descriptive (youth elite).** FIFA Training Centre, U-17 World Cup 2025 analysis of short goal kicks: reported short goal kicks rising from 17% (2023) to 39% (2025) and outfield players on either side of the keeper making the first pass to the keeper against a high press. **Seen as a search snippet only, page not opened.** Verify before citing. Descriptive, no outcome comparison.
- **Formation geometry (U19).** González-Rodenas, Ferrandis, Carril-Valdó, Claver-Rabaz, Ballester & Gil-Arias, "Effects of Different Tactical Formations on Positional Team Behaviors during Small Sided Games in Youth Soccer Players", *Journal of Human Kinetics* 97, 237–247 (2025), read at the journal page. 18 sub-elite U19 male players, 7-a-side with keepers on 65 × 50 m, 2-3-1 vs 3-1-2 against a 3-3, 5-minute bouts. 2-3-1 was higher and wider in attack; defending it was higher, shorter and more compact. Positional geometry only, no outcome measure, one opposing shape, no coaching instructions. Too old to carry a U10 claim.
- **Line-breaking passes.** Rein, Raabe & Memmert, "Which pass is better? Novel approaches to assess passing effectiveness in elite soccer", *Human Movement Science* 55, 172–181 (2017): citation confirmed, **findings not read**. Not usable until the paper is opened. Related tracking-data work is adult elite only. "Break the first line of pressure" is treated as common coaching language, not a research finding.
- **Gaps (searched, nothing found):** any study comparing 2-3-1 and 3-2-1 at U10; any study of numerical superiority or line-breaking passes at U10; any youth study of short vs long goal kicks.

## Playing time, play volume and selection: leads (checked 2026-10-10, from search results and abstracts only)

For a possible article on "players who play more excel" (idea from Chris, 2026-10-10, not yet planned). **None of these has been read at source; all are from search results or abstracts. Verify before citing.**

- **Play volume.** Ford, Ward, Hodges & Williams, "The role of deliberate practice and play in career progression in sport: the early engagement hypothesis", *High Ability Studies* 20(1), 65–75 (2009). Elite English youth soccer players, retrospective activity histories, ages 6–12. Players who went on to professional status logged more hours per year in soccer *play*, but not in soccer practice, competition or other sports, than those who didn't progress. Both elite groups practised more than recreational players. Correlational, retrospective, English academy sample. **Play here means informal soccer play, not club minutes.**
- **Selection by birth date, US.** Elite-level samples only, and they show who gets selected, not how players develop:
  - Vincent & Glamser (2006): 1,344 U.S. ODP players born 1984; strong effect in male state, regional and national teams, marginal or none in female.
  - Korgaokar (2013, dissertation): 3,218 male U.S. Soccer Development Academy players; strong effect at U15/16, none at U17/18.
  - Elite Clubs National League study (2018): 7,294 female players; effect across U14–U18.
  - Finnegan et al. (2024): 3,364 U.S. female players; Q1 over-represented at club and talent-ID-centre stages, not at youth national team.
  - Not found: Cobley et al. (2009) meta-analysis (named from memory only).
- **Playing time as outcome, not cause.** Deprez et al. (2014/2015, *Journal of Strength and Conditioning Research*): 388 Belgian players aged 8–16; motor coordination, endurance and speed separated those who stayed from those who dropped out. Playing time here reflects coaches' judgement of current ability. Retrospective and correlational.
- **Gap:** no study found showing that giving a player more minutes causes faster improvement. The "more minutes, more development" claim as stated has no support in what was found, and selection runs the other way (ability and age earn minutes).

## Extra coaching outside the club, ages 6–12: what the evidence says (checked 2026-10-10)

For the "between sessions" parent-facing idea (see PUBLISHING_CALENDAR.md, Idea queue). Source status noted per item: **R** = read at source, **S** = search result/abstract/secondary only, verify before citing.

- **Best direct test of "extra sessions": no extra gain in the skill test. (R)** Sørensen, Dalen & Lagestad, "Effects of a Short-Term Soccer Training Intervention on Skill Course Performance in Youth Players: A Randomized Study", *Sports* 12(12), 345 (2024), [doi:10.3390/sports12120345](https://doi.org/10.3390/sports12120345). 90 players aged 9–12 from a free community soccer school, randomised to intervention (n = 54) or control (n = 36). 11 weekly 75-minute sessions: 1v1, then added pressure, then 4v4 to 7v7, instruction-based coaching. Timed skill course (dribbling, passing, movement). Both groups improved (7.9 s intervention, 3.9 s control), and the groups did not differ significantly. Authors' limits: only 11 sessions, low similarity between test and sessions, test didn't measure decision-making, test familiarisation, sample size. A short-term trial on one test, and it does not rule out longer-term effects.
- **Practice and skill level, retrospective. (S)** Helsen, Starkes & Hodges, "Team sports and the theory of deliberate practice", *Journal of Sport & Exercise Psychology* 20, 12–34 (1998). Soccer and field hockey players, recalled practice; accumulated individual plus team practice rose with skill level. Hour totals not verified (only an unreliable flashcard site gave figures). A 2022 paper on elite youth soccer notes meta-analyses report the explanatory power of deliberate practice as considerably less than originally claimed.
- **What "strong coach" means. (S, secondary summaries only)** Côté & Gilbert, "An integrative definition of coaching effectiveness and expertise", *International Journal of Sports Science & Coaching* (2009): effectiveness is judged on athletes' competence, confidence, connection and character, not only technical outcomes. Original paper not opened.
- **Coach training and dropout. (S, press release)** Smith, Smoll & Cumming (2007) coach-training work: University of Washington reported 11% of athletes with trained coaches quit in a basketball season against 26% with untrained coaches, controlling for win-loss record. Peer-reviewed citation for that study not found; the 30% figure in one secondary source could not be verified.
- **Specialisation and overuse. (S)** AOSSM early sport specialisation consensus statement (2016): no evidence young children benefit from early specialisation in most sports; risks of overuse injury and burnout. AAP clinical report (2016): delay specialisation until after puberty for most sports. Expert consensus, not a systematic review. One sports physician argues volume, not specialisation, drives injury risk. A "weekly organised hours no more than age" rule of thumb is circulated; source not verified.
- **Futsal and touches. (S)** A 2026 study of 14 players (about 12.9 years) found more technical actions in 6v6 futsal than 6v6 football. A UEFA-funded report (Oppici) states the claimed futsal-to-football transfer lacks scientific support, and no final published results were found. No peer-reviewed touches-per-minute comparison found.
- **Cost and equity. (S)** Aspen Institute Project Play 2025 survey: average family spent $1,016 on a child's primary sport in 2024, up 46% since 2019, about $1,491 including other teams; private instruction and camps are named as a driver; 2022 report found the wealthiest families spent about four times what the poorest did.
- **Gaps:** no controlled study of one-on-one or private coaching vs none at ages 6–12; no study showing extra minutes or touches cause faster improvement; no soccer-specific cost figure retrieved.

## 7v7 formations guide (comparison pillar): research pass (checked 2026-10-11)

For the "7v7 Soccer Formations: 2-3-1 vs 3-2-1, and How to Choose" pillar idea. Status: **R** = fetched and read at source; **S** = search summary only, verify before citing. Searches were standard-mode, no keyword-volume tool, so nothing here says anything about search volume.

**What U.S. Soccer itself says (R).**
- [U.S. Way, "Develop through the game", U9–U10 7v7](https://www.ussoccer.com/us-way/player-development/game/formations/u9-u10-7v7): the formation shown is **1-3-2-1** (U7–U8 1-2-1, U11–U12 1-3-2-3, U13+ 1-4-3-3). Wording: "These are examples and other formations may be used"; "each formation builds on the previous format"; "formations change as players play different formats". Roles: one central back and two wing backs, two staggered midfielders (one more attacking, one more defensive), one central forward. "Players have flexibility to interchange between roles (positions) and should be encouraged to try all positions at this age group." Page was truncated; no goal-kick or build-out content on it.
- [U9–U10 age-group guide](https://www.ussoccer.com/us-way/player-development/environment/age-group-guide/u9-u10): "Introduce formations for 7v7: 1-3-2-1"; "Provide opportunities for players to experience all positions"; "Help players learn their role in attack, defense, and transition." No field size, roster, game length or build-out line on it.
- **Net:** U.S. Soccer's own page names the **1-3-2-1 (the 3-2-1)**, not the 2-3-1. The 1-2-3-1 appears only in EPYSA's reproduction of the PDI (see section above). This supports the 3-2-1 and corrects the common "2-3-1 is the standard" line in coaching blogs. It still has to be written as "the example U.S. Soccer shows", not "U.S. Soccer says use it".

**What ranks and what it says (S, search summaries; pages not opened).**
- Results are dominated by commercial lineup-tool and coaching-software blogs (Renderfoot, Cupello, others) plus small coaching sites. Common claims: 2-3-1 is "the industry standard" and the balanced default; 3-2-1 ("Christmas tree") is the defensive, compact option, weak on width unless the outside defenders step up; "test both and see what fits". None cite youth-development research. One says rotate roles across a season and play out from the back every time.
- **Gap this leaves:** no result reasoned from what each shape asks of players (channels, who the keeper's options are, what each costs), none separated rules from opinion, none said where the 2-3-1 claim comes from. That is the angle.

**Rules facts (S, league and state documents; U.S. Soccer's own rules page not read).**
- Format: 7 players including keeper, minimum 5; size 4 ball; two 25-minute halves is the common standard (halftime varies); unlimited substitutions; no heading.
- Field: commonly 55–65 yd × 35–45 yd; one league document gives 60 × 40. Goals up to 6.5 ft × 18.5 ft, smaller recommended.
- **Build-out line varies by source.** U.S. Soccer 2017 (R, earlier section): 14 yards in front of each goal. Another source (S): halfway between the top of the penalty area and the halfway line. Offside is judged from the line (none between the halfway line and the line; no offside below U9). Opponents are released when the keeper passes, rolls or throws, or the goal kick moves. **Do not give a single number without "check your league".**

**Positions and early specialisation (S).**
- No study found comparing rotating positions with fixed positions at 8–10 on development outcomes. Position of the sources is consistent but it is expert consensus and practitioner opinion: keep players moving through positions until about 11–12.
- Related peer-reviewed sources surfaced but not read: a cross-sectional survey of 746 US adolescents aged 12–18 on sport specialisation (PMC6437330, SAGE 10.1177/2325967119832399); it does not address position rotation or under-12s. Not usable for a position claim.
- Consistent with U.S. Soccer's own "try all positions" wording (R, above). That is the citable support for rotation; the claim is guidance, not a measured effect.

**Where the guide's claims should come from.**
- First-person "I do X": only FORMATION_1-2-3-1_NOTES.md (3-2-1 goal-kick routine, why he runs it, one wide player forward on the ball side, central channel control).
- "What the sources say": U.S. Soccer 1-3-2-1 page, rules facts (with "check your league"), the Euro 2020 goal-kick paper and U19 geometry paper already logged above, flagged as not-youth.
- "What I see": 2-3-1 more common in the US, 3-2-1 more common among European tournament teams (observation, not a count).
- **Still unsupported anywhere:** that either shape produces better youth development or results; 2-3-1 vs 3-2-1 matchup effects at U10; any numbers on how often pressers appear. State as gaps.

**Open items before drafting.**
1. Open U.S. Soccer's current rulebook/PDI text for the build-out line, offside and release trigger.
2. Read Rein et al. 2017 and the Euro 2020 paper in full if either will be cited.
3. Chris's own take on the 2-3-1 (what it asks of players, where he'd choose it). Not in the notes.
4. Decide notation once: keeper-first (1-3-2-1) vs outfield-only (3-2-1).

## 7v7 formations guide: international pass (checked 2026-10-11)

Adds to the section above. **R** = fetched and read at source (page summaries by a small model for web pages; PDF read as text); **S** = search summary only, verify before citing.

**Correction to the earlier pass.** The first pass said U.S. Soccer's page shows the 1-3-2-1 and "not the 2-3-1". That is true of U.S. Soccer's own page, but the **FA's 7v7 page shows both the 1-2-3-1 and the 1-3-2-1** (below), and EPYSA's PDI reproduction lists both. So both shapes have official-body backing; neither is "the" standard. The accurate line is: the two most-cited official sources show the 1-3-2-1 (U.S. Soccer) or both (FA).

**Formats differ by country, so "U9/U10" is a US label, not a universal one.**
- **England (R).** [The FA, "What is a format in football"](https://learn.englandfootball.com/articles/resources/2022/What-is-a-format-in-football): from 2026-27, 3v3 at U7, 5v5 at U8–U9, **7v7 at U10–U11**, 9v9 at U12–U13, 11v11 from U14. Mandatory from 2026-27 (a secondary source, S). Formats are a maximum; smaller is fine.
- **England 7v7 page (R).** [How to play and manage 7v7 games](https://learn.englandfootball.com/articles-and-resources/coaching/resources/2025/How-to-play-and-manage-7v7-games): pitch 55×37 m recommended (46×27 m minimum), goals 12×6 ft, size 3 ball, officials required, retreat line used, no offside, no heading, rolling subs, suggests each player gets at least 50% of game time. Shows **a 1-2-3-1 and a 1-3-2-1**, encourages trying different positions, no role descriptions. Retreat-line distance not read (video).
- **United States (R, earlier).** 7v7 at U9–U10; 1-3-2-1 shown; build-out line.
- **Ireland (S).** [FAI Player Development Plan (2015)](https://www.stfrancisfc1958.ie/images/coaching/FAI_Player_Development_Plan.pdf) has 5v5 at U8/U9 and 7v7 at U10/U11 (contents page only). FAI small-sided games page says 7v7 gives "all round flexibility of roles and positions" in attack and defence (could not be re-fetched: 404). A third-party session plan attributed to FAI shows 1-2-3-1 v 1-2-3-1 on 60×40 m; attribution unverified.
- **Germany (S).** DFB reform, binding from summer 2024: E-Jugend (about U10–U11) play 5v5, or 7v7 with goalkeeper using side pitches; built-in rotation; the aim is more touches and goals. **No DFB formation recommendation found**, formations left to coaches. Details of the 7v7 variant not verified.
- **Netherlands (S).** KNVB pupillen: U7 4v4, U8–U10 6v6 on a quarter pitch (42.5×30 m), U11–U12 8v8. **7v7 is not an official matchday format**, only used in practice games. KNVB's exercise database uses 1-3-2-1 against 1-2-2-2 and other shapes; no text on why a shape fits an age found.
- **Spain (S).** Regional federations run F7, F8 or F11 for alevín (U12) with no clear developmental criterion, per the paper below; no RFEF formation recommendation found.
- **Australia (S).** MiniRoos: club pages give 7v7 at U8–U9 (one source) or U8–9 (another); no offside at U7–9; frequent interchange. **No Football Australia formation guidance found**; the Playing Formats document was not opened.
- **Canada (S).** No Canada Soccer formation guidance found; provincial documents point to LTPD / Grassroots Standards and "try all positions".
- **UEFA (S).** UEFA Grassroots Charter text not found.

**Best new evidence: Spanish U12 format study (R, read from PDF text).** Sánchez-García & Sánchez-Sánchez, "Influencia de las modalidades de fútbol 7, 8 y 11 en la demanda técnico-táctica de jugadores de categoría alevín", *RICYDE* 16(61), 236–256 (2020), [doi:10.5232/ricyde2020.06101](https://doi.org/10.5232/ricyde2020.06101).
- 18 men's matches (6 each of F7, F8, F11), 2016–17 season, 7,275 technical-tactical actions, observational, one-way ANOVA with Tukey.
- **Goal-kick starts:** keepers made more short passes to nearby players in F7 and F8, and passed long in F11 (very large effect sizes reported). Authors attribute this to larger player spacing making short passes feel less safe, and conclude F7/F8 suit under-12s better for close-passing associations.
- F11 produced more dribbles and more individual actions; F8 enhanced the offensive phase and close-passing starts.
- **Direct statement of our gap:** the authors say that, as far as they know, **no studies have analysed the influence of the playing system (formation) on technical-tactical demand in young players**; only senior and professional work exists.
- Limits: observational, men's, one season, Spain, 18 matches, compares formats not shapes, authors note coaches' game models were unknown.
- Use: backs "short build-out is more natural at 7v7 than 11v11" with a youth sample. Does not support any shape.
- Related, not read: Práxedes et al. (2017) cited as finding more actions per player in F7; Floro (2004) cited as arguing F8 distributes players more evenly. Both seen only as citations inside secondary text.

**What this changes for the article.**
1. Frame by "7v7", not "U9/U10". Say once that ages differ by country (U9–U10 US, U10–U11 England). This also widens the search audience beyond the US.
2. Notation: both bodies write keeper-first (1-2-3-1, 1-3-2-1). The blogs write outfield-only (2-3-1, 3-2-1). A one-line decoder at the top is worth doing and is itself a search hook ("2-3-1 or 1-2-3-1").
3. International picture in one line: no federation found mandates a shape; U.S. Soccer and the FA each publish examples and say try all positions.
4. Gaps stand. Added: no international body's text explains *why* a shape suits an age.

**Still open.** FA retreat-line distance and release trigger; U.S. Soccer current rulebook text; DFB 7v7 variant specifics and FUNiño; FAI current plan; Football Australia and Canada Soccer primary documents; whether an England-based search audience justifies spelling "football" (site is US-voiced, so probably no).

## 7v7 formations guide: worldwide pass 2 (checked 2026-10-12)

Adds to the two sections above. **R** = read at source, **S** = search summary only.

- **No federation text found that recommends a shape** in Germany, Netherlands, France, Italy, Spain, Portugal, Belgium (Flanders), Japan, Canada, Ireland or Australia. Searched in each local language where relevant. Absence in search is not proof of absence; primary documents were mostly not opened. (S)
- **Formats seen (S):** Italy FIGC Pulcini U10/U11, 7v7 (or 6v6), three 15-minute periods, no offside, self-refereeing; Germany DFB reform binding from 2024/25, E-Jugend 5v5 up to a 7v7 maximum, formation left to coaches, 7v7 field 50–55 × 35 m in regional documents; Portugal (Madeira association, 2025/26) sub-11 plays GR+6x6+GR on half a pitch; France foot à 8 for U10–U11 with 7 outfield players, no prescribed shape; Japan JFA moved U12 to 8v8 in 2011 and published small-sided guidelines in 2022, no formation recommended; Netherlands KNVB 6v6 at U8–U10, 8v8 at U11–U12.
- **Australia (S):** club materials show "7v7 (1-2-3-1 or 1-3-2-1)" for U8–U9, so both shapes appear there too, but I could not trace it to a Football Australia document. **Football Australia "Game Time Policy Template" (R, via PDF text; a club template, not a rule):** for MiniRoos U6–U11, equal game time, coaches must rotate players through every position including goalkeeper; "it is vital that players are exposed to playing in multiple positions". For U12–U18, minimum half game time, with players moving into the positions they are better at as they get older.
- **Retreat/build-out line distance varies widely (S):** U.S. Soccer 2017, 14 yards in front of goal (R, earlier); many U.S. leagues, midpoint between the penalty area and halfway line, with offside judged from the line; some English county tournament rules, opposition retreat to halfway; Scotland 2026 7s rules, 13 m; New Zealand regional rules, 30% of pitch length. All agree the opposition stays back until the keeper releases the ball. No national FA distance found.
- **Peer-reviewed shape work (S for the search, R for the study already logged):** one study compares 7-a-side shapes (2-3-1 vs 3-1-2, U19). A second paper on age, pitch size, position and formation effects on training load (ResearchGate listing) was seen as a title only. No study of the 3-2-1 or of 2-3-1 vs 3-2-1 found.
- **Spanish literature (R for one paper):** the RICYDE paper's claim that no study has examined formation effects on technical-tactical demand in young players stands. Another Spanish paper (Praxedes et al., 2017) is cited as finding more actions per player in F7; not read.
- **Still unopened primary documents:** Football Australia playing formats and Skill Acquisition Manual; Canada Soccer grassroots standards; FFF livrets pédagogiques; FIGC SGS technical materials; DFB 7v7 variant; FA retreat-line video; U.S. Soccer current rulebook. These are the places a shape recommendation, if one exists, would sit.

### 7v7 formations guide: other federations re-read at source (2026-10-13)

Chris asked for the other-countries paragraph to be researched properly. Each line below was read in the federation's own document or page, not a search summary. None of them names a formation.

- **Italy (FIGC SGS, season 2026/27, "Allegato 7b, Approfondimento Regole U10-U11", PDF text read):** Pulcini U10/U11, "7 contro 7 (var. 6 contro 6)", three 15-minute periods; 5v5 allowed for first-year and mixed-age Pulcini. https://files.figc.it/version/c:NmRlYWQ2MjktOGMxZC00:NjdlMDlhZDgtNGRmNi00/Allegato%207b%20-%20Approfondimento_Regole_U10-U11.pdf
- **Germany (DFB Kinderfußball page):** E-Jugend "im Fünf-gegen-Fünf oder im Sieben-gegen-Sieben"; binding for U6 to U11 since 2024/25; 7v7 field 55 x 35 m. https://www.dfb.de/mehr-fussball/kinderfussball
- **Netherlands (KNVB "wedstrijdvormen pupillen" page, undated):** Onder 8 to Onder 10 play 6v6 on 42.5 x 30 m; Onder 11 and 12 play 8v8 on 64 x 42.5 m. https://www.knvb.nl/assist-scheidsrechters/scheidsrechtersco%C3%B6rdinator/wedstrijdvormen-pupillen
- **France (District de Football de Seine-Maritime on fff.fr, published 2025-12-08; a district page, not the national FFF rulebook):** U6-U7 foot à 4, U8-U9 foot à 5, U10-U11 foot à 8. https://dfsm.fff.fr/simple/lois-du-jeu-football-danimation/
- **Japan (JFA tournament guidelines; and the 2026 All Japan U-12 championship rules):** 8v8 recommended for U-12 and under, 11-a-side from age 12; the U-12 championship is played 8-a-side. The JFA line is about U-12 and under, not specifically U9-U10. https://www.jfa.jp/documents/guideline/

## Playing time and fairness: source-reading pass (2026-10-14)

For the "Who gets the minutes?" article (queue #2 in PUBLISHING_CALENDAR.md). Status key, stricter than before: **R** = full text read at source; **A** = abstract or repository record only; **S** = search-result summary or secondary page only; **P** = press release or club policy, not research. Most of these journals are closed access, so only one item below is **R**. Anything marked A, S or P must be verified before it is cited as a finding.

**Correction to the 2026-10-10 section above.** That section says "selection runs the other way (ability and age earn minutes)". The reading here supports a narrower claim: relative age skews **who is selected**, but within an academy it does **not** reliably predict **minutes**. Maturation and current physical performance look like the stronger links to minutes, in small samples. The 2026-10-10 text is left as written; use this section for the claim.

- **Within-academy minutes and relative age. (R)** Díaz-Almazán et al., "Influence of the relative age effect and maturity status on competitive playing time in an elite football academy", *Frontiers in Sports and Active Living* 8 (2026). 172 records from 136 boys, U12 to U15, one La Liga academy in Madrid; minutes from official match software, 2023-24 and 2024-25. Main effects of maturity status (p = .057) and birth quartile (p = .054) were **not** significant. Late maturity was linked to a significant drop in minutes (p = .017); being a defender (p = .035) and being born in quartile 2 (p = .034) to rises. Authors' limits: injuries and added time not counted, very few players in the last quartile, team dynamics not modelled, repeated measures. The paper's discussion leans on the quartile 2 result more than the statistics support. One academy, boys only, professional club: not a grassroots finding.
- **Selection by birth date. (A/S)** Cobley, McKenna, Baker & Wattie (2009), meta-analysis in *Sports Medicine* 39(3), 235-256: 38 studies, 253 samples, 14 sports; relative age effects consistent but small overall, larger with bigger age gaps and strongest for adolescent males at representative level in popular sports. Seen via search summary only; PubMed page would not load. The US soccer samples listed on 2026-10-10 (Vincent & Glamser 2006 and others) stay **A/S** and show selection, not minutes.
- **Play volume. (A)** Ford, Ward, Hodges & Williams (2009), *High Ability Studies* 20(1), 65-75, DOI 10.1080/13598130902860721. Abstract only: elite English youth players, activity ages 6 to 12; the group that reached professional status at 16 logged more hours per year in soccer *play*, not in practice, competition or other sports. Both elite groups logged more practice than recreational players. Sample size, how activity was recorded and limitations are **not** in the abstract. Hendry & Hodges (2019, *Journal of Expertise*) raise measurement concerns about this line of work (S). Play here means informal play, not club minutes.
- **Playing time as an outcome. (A)** Deprez et al. (2015), *Journal of Strength and Conditioning Research* 29(6), 1692-1704, DOI 10.1519/JSC.0000000000000806. Study 1: 388 Belgian players aged 8 to 18, club vs dropout; club players better on motor coordination, soccer-specific endurance and speed; anthropometry and estimated maturity did not separate them. Study 2: 72 high-level players, mean age 16.2; broad jump explained about 16.7% of variance in future playing minutes. Abstract only. The 8-to-16 group contrast is retrospective. The minutes finding is at 16+, not young children.
- **Dropout reasons. (S)** Crane & Temple (2015), systematic review, *European Physical Education Review*: 43 studies from 557 screened; reasons group into lack of enjoyment, perceived competence, social pressures, competing priorities, and physical factors; intrapersonal and interpersonal constraints more often than structural ones. Seen via secondary page; **playing time did not appear in what was retrieved**, so the review cannot be cited for it without the full text.
- **Coaching climate and dropout intention. (S)** A five-country study of 7,769 grassroots players (England, France, Greece, Norway, Spain): coach autonomy support leads to need satisfaction, enjoyment, then lower dropout intention. A prospective study of 327 participants: enjoyment and intentions related to dropout at one year. A longitudinal study of 552 players: motivational climate related to self-esteem then dropout intention. Citations not yet pinned down.
- **Trained coaches and quitting. (P)** University of Washington release (March 2007): 11% quit with trained coaches vs 26% with untrained, basketball season. Journal citation still not confirmed. Do not use as a finding.
- **Equal playing time policies. (P)** Cornwall FA guidance (equal minutes every game U6 to U11, over a season U12 to U16), Camberwell Junior FC and Wythenshawe FC policy documents, and a 50%-minimum caution. These are club and association rules and practitioner opinion. They show what exists in practice, not what the evidence supports.

**What can be written, as of 2026-10-14**
- Minutes are mostly a coach's decision, and early selection into teams is skewed by birth date at representative level. (Selection: A/S; the only R item is about minutes.)
- Within one academy, minutes tracked maturity more than birth quarter, in a modest sample. One study, stated as such.
- Players who later turned professional logged more informal soccer play at 6 to 12, in one English sample, retrospectively.

**What cannot be written**
- That more minutes cause faster improvement. No study found.
- That equal playing time reduces dropout. No study found that measures playing time as a predictor of dropout; the closest evidence is about enjoyment, competence and coaching climate.
- That "minutes follow birth date" within teams. Mixed at best.
- Any dropout percentage tied to coach training.

**Gaps to try next:** a youth-soccer study that actually measures minutes against enjoyment or intention to quit; a grassroots (non-academy) sample of minutes by relative age or maturity; the original Crane & Temple text; the Smith, Smoll & Cumming journal citation.

## Competition in training: source pass (2026-10-22)

For `competition-in-youth-soccer-training.mdx`. Read from abstract pages only; full texts were paywalled or blocked.

- **Cumming, Smoll, Smith & Grossbard (2007), *Journal of Applied Sport Psychology*, 19(3), 322–336, [doi:10.1080/10413200701342640](https://doi.org/10.1080/10413200701342640).** 268 male and female basketball players aged 10–15 on 50 teams, hierarchical linear modelling. Mastery-focused climate went with more favourable ratings of the coach; ego-focused climate with less favourable. Win percentage predicted ratings of the coach's knowledge and teaching but explained much less variance than climate. Enjoyment and coach ratings were more tied to coaching behaviours than to the record. No significant climate-by-winning interactions. Correlational, one sport, abstract only. The "10 times more influential" line is from a University of Washington press release, not the abstract: not used.
- **Breiger, Cumming, Smith & Smoll (2015), *International Journal of Sports Science & Coaching*, 10(2–3), 395–412, [doi:10.1260/1747-9541.10.2-3.395](https://doi.org/10.1260/1747-9541.10.2-3.395).** In strong mastery climates winning had little bearing on athletes' evaluations; in boys in ego climates, enjoyment and liking for coach and teammates tracked win percentage closely. Winning related more to boys' attitudes than girls'; girls responded negatively to ego climates. Sample size, ages and sports not on the abstract page. Abstract only.
- **Visek et al. (2015)**: already logged above ("Batch 2 sources"), read at source. Used for "trying hard" in the top dimensions and winning in the Mental Bonuses dimension (9th of 11). The 40th/48th-of-81 figures from search results are still unconfirmed and not used.
- **Not used, could not be opened:** Morales-Belando, Côté & Arias-Estero (2023), *Physical Education and Sport Pedagogy*, 28(5), 568–581, [doi:10.1080/17408989.2021.2006620](https://doi.org/10.1080/17408989.2021.2006620). Under-12 basketball (94 boys and 2 girls, 8 clubs, ages 9–11, six months), winning/losing with motivational climate as mediator. Open-access PDF sits behind a bot check at digitum.um.es. A search summary suggested its conclusion was that competition wasn't harmful when the emphasis was on improvement, but that was not verified. Add to the article only once read.
- **Gap, stated in the article:** no youth soccer study found testing whether scorekeeping or consequences change effort in training. The small-sided game intensity papers (González-Rodenas et al., Halouani et al.) compare formats and goal types, not scoring. The effort claim rests on Chris's coaching observation.
- **Game rules in the article** (Switching the play; Playing back to go forward, including the zone rules) come from the Animate reels' on-screen text; the zone rules for Playing back to go forward are Chris's own explanation on 2026-10-22. Chris has not separately confirmed the Switching the play wording. Sheet content other than the rules (progressions, regressions, questions, coaching points) was drafted by Claude and approved by Chris on screen; he removed the touch limit.
