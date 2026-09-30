// One-page printable "Coaching Tally Sheet" for "How to See Your Own Coaching". Built from the app's
// react-pdf pieces like the other Learn printables; the app itself is not modified. Rows are the article's
// "What to count" table, word for word where possible. Everything a coach writes in is white.
import { Document, Image, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer';
import { registerPdfFonts, makeStyles, PAGE_WIDTH, PRIMARY, ACCENT, INK, LINE, MUTED, type PdfPaper } from '@/components/pdf/ActivityPdfDocument';
import { DENSITIES, renderFitted, type Density } from '@/lib/pdf/react/layout';

const NB = ' ';
const COLUMN_GAP = 16;
const CLIPS = ['Clip 1', 'Clip 2', 'Clip 3'];

const COUNTS = [
  { name: 'Instructions', what: 'Telling a player what to do.' },
  { name: 'Questions: closed', what: 'One right answer you already have in mind.' },
  { name: 'Questions: open', what: 'A real question with more than one answer.' },
  { name: 'Deliberate silence', what: 'A moment you chose not to say anything.' },
  { name: 'Stoppages', what: 'Every time play stops for you.' },
];

const WHO = [
  { name: 'One player', what: 'Could an in-flow word or a pull aside have done it?' },
  { name: 'A group', what: 'A few players, or one unit.' },
  { name: 'Everyone', what: 'The message belonged to the whole team.' },
];

function Ruled({ n, d, gap = 1.55 }: { n: number; d: Density; gap?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <View key={i} style={{ height: d.lineHeight * gap, borderBottomWidth: 0.7, borderBottomColor: '#cbd5e1' }} />
      ))}
    </>
  );
}

function TallyPage({ paper, logoSrc, level }: { paper: PdfPaper; logoSrc: string; level: number }) {
  const d = DENSITIES[Math.min(level, DENSITIES.length - 1)];
  const s = makeStyles(d);
  const inner = PAGE_WIDTH[paper] - d.margin * 2;
  const colW = (inner - COLUMN_GAP) / 2;
  const clipW = 74;
  const nameW = inner * 0.22;
  const t = StyleSheet.create({
    eyebrow: { fontSize: 8, letterSpacing: 1.6, color: PRIMARY, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 },
    intro: { fontSize: d.body, lineHeight: `${d.lineHeight}pt`, color: INK, marginTop: d.gap * 0.6 },
    sectionLabel: { fontSize: 7.5, letterSpacing: 1.4, fontWeight: 700, textTransform: 'uppercase', color: PRIMARY, marginTop: d.gap * 1.3 },
    head: { flexDirection: 'row', paddingVertical: 4, marginTop: d.gap * 0.5, borderBottomWidth: 1.2, borderBottomColor: INK },
    th: { color: MUTED, fontSize: 7, letterSpacing: 1.4, fontWeight: 700, textTransform: 'uppercase' },
    row: { flexDirection: 'row', minHeight: d.lineHeight * 3.1, borderBottomWidth: 0.75, borderBottomColor: LINE },
    rowSmall: { flexDirection: 'row', minHeight: d.lineHeight * 2.4, borderBottomWidth: 0.75, borderBottomColor: LINE },
    nameCell: { width: nameW, paddingTop: 6, paddingRight: 8 },
    name: { fontFamily: 'Oswald', fontWeight: 700, fontSize: d.body + 1.5, textTransform: 'uppercase', color: INK },
    whatCell: { flex: 1, paddingTop: 7, paddingRight: 8 },
    what: { fontSize: d.body - 0.5, lineHeight: `${d.lineHeight - 1}pt`, color: MUTED },
    clip: { width: clipW, borderLeftWidth: 0.6, borderLeftColor: LINE },
    minutesLabel: { fontSize: 7, letterSpacing: 1.1, color: MUTED, fontWeight: 700, textTransform: 'uppercase', paddingTop: 6 },
    promptLabel: { fontSize: 7, letterSpacing: 1.1, color: MUTED, fontWeight: 700, textTransform: 'uppercase', marginTop: 3 },
    note: { fontSize: 7.5, color: MUTED, lineHeight: '11pt', borderTopWidth: 0.75, borderTopColor: LINE, paddingTop: 6, marginTop: d.gap * 1.2 },
  });
  const chips = [`DATE${NB.repeat(18)}`, `ACTIVITY${NB.repeat(34)}`, `AGE${NB.repeat(10)}`];

  const ClipHeads = () => (
    <>
      {CLIPS.map((c) => (
        <Text key={c} style={[t.th, { width: clipW, paddingLeft: 8 }]}>{c}</Text>
      ))}
    </>
  );
  const ClipCells = () => (
    <>
      {CLIPS.map((c) => (
        <View key={c} style={t.clip} />
      ))}
    </>
  );

  return (
    <Page size={paper} style={s.page}>
      <View fixed style={s.footerRule} />
      <Text fixed style={[s.footerText, s.footerLeft]} render={({ pageNumber, totalPages }) => `PitchLabs  ·  Page ${pageNumber} of ${totalPages}`} />
      <Text fixed style={[s.footerText, s.footerRight]}>COACHING TALLY SHEET</Text>

      <View style={s.header}>
        <View style={s.brand}>
          <Image src={logoSrc} style={s.logo} />
          <Text style={s.brandText}>PITCHLABS</Text>
        </View>
      </View>

      <Text style={t.eyebrow}>Video review</Text>
      <Text style={s.title}>Coaching Tally Sheet</Text>
      <Text style={t.intro}>
        Film about ten minutes of one activity, with sound. Watch it back once and make a mark each time one of these happens.
        The tally shows your patterns. Whether they're the right patterns for your players is your call.
      </Text>

      <View style={[s.chips, { marginTop: d.gap * 1.1 }]}>
        {chips.map((c, i) => (
          <Text key={i} style={s.chip}>{c}</Text>
        ))}
      </View>

      <Text style={t.sectionLabel}>What you did</Text>
      <View style={t.head}>
        <Text style={[t.th, { width: nameW }]}>Count</Text>
        <Text style={[t.th, { flex: 1 }]}>What you're looking for</Text>
        <ClipHeads />
      </View>
      {COUNTS.map((r) => (
        <View key={r.name} style={t.row} wrap={false}>
          <View style={t.nameCell}>
            <Text style={t.name}>{r.name}</Text>
          </View>
          <View style={t.whatCell}>
            <Text style={t.what}>{r.what}</Text>
          </View>
          <ClipCells />
        </View>
      ))}
      <View style={[t.rowSmall, { minHeight: d.lineHeight * 2 }]} wrap={false}>
        <View style={[t.nameCell, { width: undefined, flex: 1 }]}>
          <Text style={t.minutesLabel}>Minutes filmed</Text>
        </View>
        <ClipCells />
      </View>

      <Text style={t.sectionLabel}>Who each stoppage was for</Text>
      <View style={t.head}>
        <Text style={[t.th, { width: nameW }]}>For</Text>
        <Text style={[t.th, { flex: 1 }]}> </Text>
        <ClipHeads />
      </View>
      {WHO.map((r) => (
        <View key={r.name} style={t.rowSmall} wrap={false}>
          <View style={t.nameCell}>
            <Text style={t.name}>{r.name}</Text>
          </View>
          <View style={t.whatCell}>
            <Text style={t.what}>{r.what}</Text>
          </View>
          <ClipCells />
        </View>
      ))}

      <View style={{ flexDirection: 'row', marginTop: d.gap * 1.4 }} wrap={false}>
        <View style={{ width: colW }}>
          <Text style={[t.sectionLabel, { marginTop: 0 }]}>What stood out</Text>
          <Ruled n={3} d={d} gap={1.45} />
        </View>
        <View style={{ width: colW, marginLeft: COLUMN_GAP }}>
          <Text style={[t.sectionLabel, { marginTop: 0, color: ACCENT }]}>One thing to change next time</Text>
          <Ruled n={3} d={d} gap={1.45} />
        </View>
      </View>

      <Text style={t.note}>
        Counts aren't quality: a well-timed instruction can be exactly right. For a rough reference point, not a target, 19
        Australian coaches of U12–U16 players asked a little under one question a minute, about half closed and half open
        (O'Connor et al., 2021). More at usepitchlabs.com/learn.
      </Text>
    </Page>
  );
}

export async function renderTally(opts: { publicDir: string; paper: PdfPaper; logoSrc: string }) {
  registerPdfFonts(opts.publicDir.replace(/\/$/, '') + '/');
  return renderFitted(async (level) =>
    new Uint8Array(
      await renderToBuffer(
        <Document title="Coaching Tally Sheet" author="PitchLabs" creator="PitchLabs">
          <TallyPage paper={opts.paper} logoSrc={opts.logoSrc} level={level} />
        </Document>
      )
    )
  );
}
