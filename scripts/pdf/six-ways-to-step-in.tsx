// One-page printable "Six Ways to Step In" for "How to Coach Without Stopping the Game". Companion
// to the Coaching Interaction Menu card. Built from the app's react-pdf pieces; wording is the six
// stoppages as published in components/CoachingInterventionWheel.js, with "when it earns its cost"
// lines condensed from the article itself. Times are Chris's rough estimates and are labelled so.
import { Document, Image, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer';
import { registerPdfFonts, makeStyles, PAGE_WIDTH, PRIMARY, ACCENT, INK, LINE, MUTED, type PdfPaper } from '@/components/pdf/ActivityPdfDocument';
import { DENSITIES, renderFitted } from '@/lib/pdf/react/layout';

const ITEMS = [
  {
    name: 'In-flow', cost: 'Free', free: true, fit: 'One player',
    def: 'One sentence, to one player, while everything else keeps moving.',
    when: 'The cheapest tool you have, and the easiest to overuse. Keep it to one idea: it’s still one more thing for the player to hold in mind while they play.',
  },
  {
    name: 'Drinks break', cost: 'Free', free: true, fit: 'Anyone',
    def: 'Coach inside a pause you were already taking.',
    when: 'Free in playing time, not in attention: players are resting and often switched off. One idea, not three.',
  },
  {
    name: 'Pull aside', cost: '20–30 sec', free: false, fit: 'One or two players, a group or a unit',
    def: 'Take one or two players out while the rest keep playing.',
    when: 'When the problem belongs to a couple of players and the rest of the group doesn’t need to hear it.',
  },
  {
    name: 'Freeze frame', cost: '30–45 sec', free: false, fit: 'The whole team',
    def: 'Everything stops. Players hold their positions exactly where they are.',
    when: 'When the exact picture, at this instant, is the teaching point, and you want every player to see it rather than hear it described.',
  },
  {
    name: 'Huddle', cost: '60–90 sec', free: false, fit: 'The whole team',
    def: 'Bring the whole group in, balls down.',
    when: 'When the message belongs to everyone: resetting the objective, or a shared reset after a run of chaos, not five individual corrections.',
  },
  {
    name: 'Walkthrough', cost: '60–120 sec', free: false, fit: 'The team, a unit or a group',
    def: 'Rehearse the movement at walking pace, no pressure.',
    when: 'When a movement needs to be seen slowly once before it’ll show up at game speed, or players can’t yet do what the game asks.',
  },
];

function StopsPage({ paper, logoSrc, level }: { paper: PdfPaper; logoSrc: string; level: number }) {
  const d = DENSITIES[Math.min(level, DENSITIES.length - 1)];
  const s = makeStyles(d);
  const inner = PAGE_WIDTH[paper] - d.margin * 2;
  const t = StyleSheet.create({
    eyebrow: { fontSize: 8, letterSpacing: 1.6, color: PRIMARY, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 },
    intro: { fontSize: d.body, lineHeight: `${d.lineHeight}pt`, color: INK, marginTop: d.gap * 0.6 },
    row: { flexDirection: 'row', borderLeftWidth: 2.5, paddingLeft: 10, paddingVertical: 5, marginTop: d.gap * 0.9 },
    left: { width: inner * 0.3, paddingRight: 10 },
    right: { flex: 1 },
    num: { fontFamily: 'Oswald', fontWeight: 700, fontSize: d.body + 3, color: PRIMARY },
    name: { fontFamily: 'Oswald', fontWeight: 700, fontSize: d.body + 3, textTransform: 'uppercase', color: INK },
    cost: { fontSize: d.body, fontWeight: 700, marginTop: 3 },
    fit: { fontSize: 7.5, letterSpacing: 0.4, color: MUTED, marginTop: 3, textTransform: 'uppercase' },
    def: { fontSize: d.body, lineHeight: `${d.lineHeight}pt`, color: INK },
    whenLabel: { fontSize: 7, letterSpacing: 1.2, color: MUTED, fontWeight: 700, textTransform: 'uppercase', marginTop: 4 },
    when: { fontSize: d.body - 0.5, lineHeight: `${d.lineHeight - 1}pt`, color: INK, marginTop: 1 },
    note: { fontSize: 7.5, color: MUTED, lineHeight: '11pt', borderTopWidth: 0.75, borderTopColor: LINE, paddingTop: 6, marginTop: d.gap * 1.1 },
  });

  return (
    <Page size={paper} style={s.page}>
      <View fixed style={s.footerRule} />
      <Text fixed style={[s.footerText, s.footerLeft]} render={({ pageNumber, totalPages }) => `PitchLabs  ·  Page ${pageNumber} of ${totalPages}`} />
      <Text fixed style={[s.footerText, s.footerRight]}>SIX WAYS TO STEP IN</Text>

      <View style={s.header}>
        <View style={s.brand}>
          <Image src={logoSrc} style={s.logo} />
          <Text style={s.brandText}>PITCHLABS</Text>
        </View>
      </View>

      <Text style={t.eyebrow}>Pitchside card</Text>
      <Text style={s.title}>Six Ways to Step In</Text>
      <Text style={t.intro}>
        Every way of interrupting a live session, from free to expensive. The way I use them: try the free ones first, and match
        the stoppage to who actually needs to hear it. The times are my rough estimates, not measured figures.
      </Text>

      {ITEMS.map((it, i) => (
        <View key={it.name} style={[t.row, { borderLeftColor: it.free ? ACCENT : PRIMARY }]} wrap={false}>
          <View style={t.left}>
            <Text>
              <Text style={t.num}>{`${i + 1}  `}</Text>
              <Text style={t.name}>{it.name}</Text>
            </Text>
            <Text style={[t.cost, { color: it.free ? ACCENT : INK }]}>{it.free ? 'Free' : `About ${it.cost}`}</Text>
            <Text style={t.fit}>{`Reaches: ${it.fit}`}</Text>
          </View>
          <View style={t.right}>
            <Text style={t.def}>{it.def}</Text>
            <Text style={t.whenLabel}>{it.free ? 'Watch out for' : 'Earns its cost'}</Text>
            <Text style={t.when}>{it.when}</Text>
          </View>
        </View>
      ))}

      <Text style={t.note}>
        Pairs with the Coaching Interaction Menu (what to say once you've stepped in). Suggestions, not rules: try one, watch what
        happens with your group, and adjust. More at usepitchlabs.com/learn.
      </Text>
    </Page>
  );
}

export async function renderStops(opts: { publicDir: string; paper: PdfPaper; logoSrc: string }) {
  registerPdfFonts(opts.publicDir.replace(/\/$/, '') + '/');
  return renderFitted(async (level) =>
    new Uint8Array(
      await renderToBuffer(
        <Document title="Six Ways to Step In" author="PitchLabs" creator="PitchLabs">
          <StopsPage paper={opts.paper} logoSrc={opts.logoSrc} level={level} />
        </Document>
      )
    )
  );
}
