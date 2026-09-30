// One-page printable "Coaching Interaction Menu" for "How Much Should You Actually Say?". Built from
// the app's react-pdf pieces (makeStyles, palette, densities, renderFitted); content is the twelve
// interactions exactly as published in components/InterventionWheelTool.js on the Learn site.
import { Document, Image, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer';
import { registerPdfFonts, makeStyles, PAGE_WIDTH, PRIMARY, INK, LINE, MUTED, type PdfPaper } from '@/components/pdf/ActivityPdfDocument';
import { DENSITIES, renderFitted } from '@/lib/pdf/react/layout';

const COLUMN_GAP = 14;

const ITEMS = [
  { name: 'Observe', def: 'Deliberately gather information before you decide to act.', sounds: 'Says nothing yet. Watch first.', pairs: [] as string[] },
  { name: 'Silence', def: 'Deliberately withhold input so the player has to solve it themselves.', sounds: 'Says nothing. The learning is in the solving.', pairs: [] },
  { name: 'Question', def: 'Ask an open question that makes them think for themselves.', sounds: '“What else could you have done there?”', pairs: ['Freeze frame', 'Huddle', 'Drinks break', 'Pull aside'] },
  { name: 'Guide and discovery', def: 'Steer with a nudge and let them find the answer themselves.', sounds: '“Who was free?”', pairs: ['In-flow', 'Pull aside', 'Freeze frame'] },
  { name: 'Co-create', def: 'Build the solution with the players rather than handing it over.', sounds: '“What do we want to try in the next three minutes?”', pairs: ['Huddle', 'Drinks break'] },
  { name: 'Check understanding', def: 'Ask the player to tell you back what they have taken from it.', sounds: '“Tell me what you’re looking for before the ball arrives.”', pairs: ['Huddle', 'Walkthrough', 'Drinks break'] },
  { name: 'Demonstrate', def: 'Show the action rather than describe it.', sounds: '“Watch where my eyes go before the ball gets to me.”', pairs: ['Walkthrough', 'Freeze frame', 'Huddle'] },
  { name: 'Reframe', def: 'Change how the player sees the moment, not what they do.', sounds: '“That wasn’t a bad pass — that was the right idea a second late.”', pairs: ['In-flow', 'Pull aside', 'Drinks break', 'Huddle'] },
  { name: 'Feedback', def: 'Tell the player what happened and what it caused.', sounds: '“Your first touch went toward the defender, so they got to it first.”', pairs: ['In-flow', 'Pull aside', 'Drinks break'] },
  { name: 'Reinforce', def: 'Name what was good, precisely, so it happens again.', sounds: '“That’s it — you looked before it came to you.”', pairs: ['In-flow', 'Pull aside'] },
  { name: 'Challenge', def: 'Raise the demand on a player who is comfortable.', sounds: '“Can you do that again with your other foot?”', pairs: ['In-flow', 'Pull aside', 'Drinks break'] },
  { name: 'Instruct', def: 'Give a direct, unambiguous command.', sounds: '“Body between the ball and the defender. Now.”', pairs: ['Freeze frame', 'Huddle', 'Walkthrough', 'In-flow'] },
];

function MenuPage({ paper, logoSrc, level }: { paper: PdfPaper; logoSrc: string; level: number }) {
  const d = DENSITIES[Math.min(level, DENSITIES.length - 1)];
  const s = makeStyles(d);
  const inner = PAGE_WIDTH[paper] - d.margin * 2;
  const colW = (inner - COLUMN_GAP) / 2;
  const t = StyleSheet.create({
    eyebrow: { fontSize: 8, letterSpacing: 1.6, color: PRIMARY, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 },
    intro: { fontSize: d.body, lineHeight: `${d.lineHeight}pt`, color: INK, marginTop: d.gap * 0.6 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: d.gap },
    card: { width: colW, borderLeftWidth: 2.5, borderLeftColor: PRIMARY, paddingLeft: 9, paddingVertical: 4, marginBottom: d.gap * 0.85 },
    num: { fontFamily: 'Oswald', fontWeight: 700, fontSize: d.body + 2, color: PRIMARY },
    name: { fontFamily: 'Oswald', fontWeight: 700, fontSize: d.body + 2, textTransform: 'uppercase', color: INK },
    def: { fontSize: d.body - 0.5, lineHeight: `${d.lineHeight - 1}pt`, color: INK, marginTop: 2 },
    sounds: { fontSize: d.body - 0.5, lineHeight: `${d.lineHeight - 1}pt`, fontStyle: 'italic', color: MUTED, marginTop: 2 },
    pairs: { fontSize: 7, letterSpacing: 0.3, color: MUTED, marginTop: 3 },
    note: { fontSize: 7.5, color: MUTED, lineHeight: '11pt', borderTopWidth: 0.75, borderTopColor: LINE, paddingTop: 6, marginTop: d.gap * 0.3 },
  });

  return (
    <Page size={paper} style={s.page}>
      <View fixed style={s.footerRule} />
      <Text fixed style={[s.footerText, s.footerLeft]} render={({ pageNumber, totalPages }) => `PitchLabs  ·  Page ${pageNumber} of ${totalPages}`} />
      <Text fixed style={[s.footerText, s.footerRight]}>COACHING INTERACTION MENU</Text>

      <View style={s.header}>
        <View style={s.brand}>
          <Image src={logoSrc} style={s.logo} />
          <Text style={s.brandText}>PITCHLABS</Text>
        </View>
      </View>

      <Text style={t.eyebrow}>Pitchside card</Text>
      <Text style={s.title}>The Coaching Interaction Menu</Text>
      <Text style={t.intro}>
        Twelve ways to respond once you've decided to step in, from saying nothing to a direct command. None of them is the
        default: the one that fits depends on the player and the moment.
      </Text>

      <View style={t.grid}>
        {ITEMS.map((it, i) => (
          <View key={it.name} style={t.card} wrap={false}>
            <Text>
              <Text style={t.num}>{`${i + 1}  `}</Text>
              <Text style={t.name}>{it.name}</Text>
            </Text>
            <Text style={t.def}>{it.def}</Text>
            <Text style={t.sounds}>{it.sounds}</Text>
            {it.pairs.length > 0 && <Text style={t.pairs}>{`Works well with: ${it.pairs.join(', ')}`}</Text>}
          </View>
        ))}
      </View>

      <Text style={t.note}>
        The "works well with" pairings refer to the six ways to stop play (in-flow, drinks break, pull aside, freeze frame,
        huddle, walkthrough). They're suggestions, not rules. More at usepitchlabs.com/learn.
      </Text>
    </Page>
  );
}

export async function renderMenu(opts: { publicDir: string; paper: PdfPaper; logoSrc: string }) {
  registerPdfFonts(opts.publicDir.replace(/\/$/, '') + '/');
  return renderFitted(async (level) =>
    new Uint8Array(
      await renderToBuffer(
        <Document title="The Coaching Interaction Menu" author="PitchLabs" creator="PitchLabs">
          <MenuPage paper={opts.paper} logoSrc={opts.logoSrc} level={level} />
        </Document>
      )
    )
  );
}
