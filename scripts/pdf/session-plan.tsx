// Blank, write-on one-page session plan in the style of the PitchLabs app's session PDF cover page
// (components/pdf/SessionPdfDocument.tsx). Built from the app's own react-pdf pieces (makeStyles,
// palette, densities, renderFitted); the app itself is not modified. Everything a coach writes in is
// white, with ruled lines, and the activity table's header is white rather than the export's dark band.
import { Document, Image, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer';
import {
  registerPdfFonts, makeStyles, PAGE_WIDTH, PRIMARY, ACCENT, INK, LINE, MUTED, type PdfPaper, type Styles,
} from '@/components/pdf/ActivityPdfDocument';
import { DENSITIES, renderFitted, type Density } from '@/lib/pdf/react/layout';

const NB = ' ';
const COLUMN_GAP = 16;

function Ruled({ n, d, gap = 1.55 }: { n: number; d: Density; gap?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <View key={i} style={{ height: d.lineHeight * gap, borderBottomWidth: 0.7, borderBottomColor: '#cbd5e1' }} />
      ))}
    </>
  );
}

function Block({ label, color = PRIMARY, s, children }: { label: string; color?: string; s: Styles; children: React.ReactNode }) {
  return (
    <View style={s.section} wrap={false}>
      <View style={[s.sectionHead, { borderBottomColor: LINE }]}>
        <Text style={[s.label, { color }]}>{label}</Text>
      </View>
      {children}
    </View>
  );
}

function Prompt({ text, d, lines = 1 }: { text: string; d: Density; lines?: number }) {
  return (
    <View style={{ marginBottom: 4 }}>
      <Text style={{ fontSize: 7, letterSpacing: 1.1, color: MUTED, fontWeight: 700, textTransform: 'uppercase', marginTop: 3 }}>{text}</Text>
      <Ruled n={lines} d={d} gap={1.35} />
    </View>
  );
}

function BlankSessionPage({ paper, logoSrc, level }: { paper: PdfPaper; logoSrc: string; level: number }) {
  const d = DENSITIES[Math.min(level, DENSITIES.length - 1)];
  const s = makeStyles(d);
  const inner = PAGE_WIDTH[paper] - d.margin * 2;
  const colW = (inner - COLUMN_GAP) / 2;
  const t = StyleSheet.create({
    eyebrow: { fontSize: 8, letterSpacing: 1.6, color: PRIMARY, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 },
    tableHead: { flexDirection: 'row', paddingVertical: 4, paddingHorizontal: 8, marginTop: d.gap, borderBottomWidth: 1.2, borderBottomColor: INK },
    th: { color: MUTED, fontSize: 7, letterSpacing: 1.4, fontWeight: 700, textTransform: 'uppercase' },
    row: { flexDirection: 'row', paddingHorizontal: 8, paddingTop: d.gap * 0.5, minHeight: d.lineHeight * 4.2, borderBottomWidth: 0.75, borderBottomColor: LINE },
    num: { fontFamily: 'Oswald', fontWeight: 700, fontSize: d.body + 6, color: PRIMARY },
    phase: { fontSize: 6.5, letterSpacing: 1, color: MUTED, fontWeight: 700, textTransform: 'uppercase', marginTop: 1 },
    cellDivider: { borderLeftWidth: 0.6, borderLeftColor: LINE },
  });
  const rows = [
    { n: 1, phase: 'Play' },
    { n: 2, phase: 'Practice' },
    { n: 3, phase: 'Play' },
  ];
  const chips = [`DATE${NB.repeat(18)}`, `AGE${NB.repeat(10)}`, `PLAYERS${NB.repeat(8)}`, `${NB.repeat(10)}MIN`];

  return (
    <Page size={paper} style={s.page}>
      <View fixed style={s.footerRule} />
      <Text fixed style={[s.footerText, s.footerLeft]} render={({ pageNumber, totalPages }) => `PitchLabs  ·  Page ${pageNumber} of ${totalPages}`} />
      <Text fixed style={[s.footerText, s.footerRight]}>SESSION PLAN</Text>

      <View style={s.header}>
        <View style={s.brand}>
          <Image src={logoSrc} style={s.logo} />
          <Text style={s.brandText}>PITCHLABS</Text>
        </View>
      </View>

      <Text style={t.eyebrow}>Session plan</Text>
      {/* Write-in line for the session name. */}
      <View style={{ width: inner * 0.62, height: Math.round((d.title + 8) * 1.1), borderBottomWidth: 1, borderBottomColor: INK }} />

      <View style={[s.chips, { marginTop: d.gap * 1.2 }]}>
        {chips.map((c, i) => (
          <Text key={i} style={s.chip}>{c}</Text>
        ))}
      </View>

      <View style={s.objective}>
        <Text style={[s.label, { marginBottom: 2 }]}>The one idea</Text>
        <Text style={{ fontSize: 7.5, color: MUTED }}>One sentence: what is this session about?</Text>
        <Ruled n={2} d={d} gap={1.4} />
      </View>

      <View style={t.tableHead}>
        <Text style={[t.th, { width: 52 }]}>#</Text>
        <Text style={[t.th, { flex: 1 }]}>Activity and what it's for</Text>
        <Text style={[t.th, { width: 96, paddingLeft: 8 }]}>Format</Text>
        <Text style={[t.th, { width: 50, paddingLeft: 8 }]}>Time</Text>
      </View>
      {rows.map((r) => (
        <View key={r.n} style={t.row} wrap={false}>
          <View style={{ width: 52 }}>
            <Text style={t.num}>{r.n}</Text>
            <Text style={t.phase}>{r.phase}</Text>
          </View>
          <View style={{ flex: 1 }} />
          <View style={[{ width: 96 }, t.cellDivider]} />
          <View style={[{ width: 50 }, t.cellDivider]} />
        </View>
      ))}

      <View style={{ flexDirection: 'row', marginTop: d.gap * 1.3 }}>
        <View style={{ width: colW }}>
          <Block label="If it goes wrong" s={s}>
            <Prompt text="Too easy" d={d} />
            <Prompt text="Too difficult" d={d} />
            <Prompt text="Too slow" d={d} />
            <Prompt text="Right game, wrong behavior" d={d} />
          </Block>
        </View>
        <View style={{ width: colW, marginLeft: COLUMN_GAP }}>
          <Block label="How I'll step in" s={s}>
            <Prompt text="What I'll watch for" d={d} lines={2} />
            <Prompt text="Cheapest way to interrupt" d={d} lines={2} />
          </Block>
          <Block label="Afterwards" color={ACCENT} s={s}>
            <Prompt text="What players said they worked on" d={d} />
            <Prompt text="Last five things I said" d={d} lines={2} />
          </Block>
        </View>
      </View>
    </Page>
  );
}

export async function renderBlankSession(opts: { publicDir: string; paper: PdfPaper; logoSrc: string }) {
  registerPdfFonts(opts.publicDir.replace(/\/$/, '') + '/');
  return renderFitted(async (level) =>
    new Uint8Array(
      await renderToBuffer(
        <Document title="PitchLabs Session Plan" author="PitchLabs" creator="PitchLabs">
          <BlankSessionPage paper={opts.paper} logoSrc={opts.logoSrc} level={level} />
        </Document>
      )
    )
  );
}
