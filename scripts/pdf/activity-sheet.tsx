// Blank, write-on version of the PitchLabs activity sheet. Built from the app's own react-pdf pieces
// (makeStyles, Section, palette, densities, arrangeActivity, renderFitted) so it matches the export
// exactly, except the dark Coaching Points / Questions band becomes two plain white columns, since
// coaches will be writing on it. The app's own ActivityPdfDocument is not modified.
import { Document, Image, Page, Text, View, renderToBuffer } from '@react-pdf/renderer';
import {
  registerPdfFonts, makeStyles, Section, PAGE_WIDTH, PRIMARY, ACCENT, INK, type PdfPaper, type Styles,
} from '@/components/pdf/ActivityPdfDocument';
import { DENSITIES, arrangeActivity, estimateSectionHeight, pickBesideDiagram, splitColumns, renderFitted } from '@/lib/pdf/react/layout';
import { GRAPHIC_CANVAS_ASPECT_RATIO } from '@/lib/graphics/constants';
import type { PdfSection } from '@/lib/pdf/react/activityModel';

const NB = ' ';
const COLUMN_GAP = 16; // same as ActivityPdfDocument
const blank = (n: number) => Array.from({ length: n }, () => NB);
const text = (key: string, label: string, n: number): PdfSection => ({ key, label, kind: 'text', paragraphs: blank(n), items: [], isCustom: false });
const list = (key: string, label: string, n: number): PdfSection => ({ key, label, kind: 'list', paragraphs: [], items: blank(n), isCustom: false });

function InfoBox({ label, accent, children, s }: { label: string; accent: string; children: React.ReactNode; s: Styles }) {
  return (
    <View style={[s.box, { borderTopColor: accent }]} wrap={false}>
      <Text style={s.boxLabel}>{label}</Text>
      {children}
    </View>
  );
}

function BlankColumn({ label, color, rows, s }: { label: string; color: string; rows: number; s: Styles }) {
  return (
    <View>
      <View style={s.sectionHead}>
        <Text style={[s.label, { color }]}>{label}</Text>
      </View>
      {blank(rows).map((t, i) => (
        <View key={i} style={s.item} wrap={false}>
          <Text style={[s.bullet, { color }]}>•</Text>
          <Text style={s.itemText}>{t}</Text>
        </View>
      ))}
    </View>
  );
}

function BlankSheetPage({ paper, logoSrc, diagramSrc, level }: { paper: PdfPaper; logoSrc: string; diagramSrc: string; level: number }) {
  const d = DENSITIES[Math.min(level, DENSITIES.length - 1)];
  const s = makeStyles(d);
  const inner = PAGE_WIDTH[paper] - d.margin * 2;
  const colW = (inner - COLUMN_GAP) / 2;
  const sections: PdfSection[] = [
    text('preparation', 'Preparation', 2),
    list('equipment', 'Equipment', 4),
    text('dimensions', 'Field size', 1),
    text('organization', 'Organization', 4),
    list('rules', 'Rules', 4),
    list('progressions', 'Progressions', 4),
  ];
  const arr = arrangeActivity(sections);
  const boxesH =
    (arr.prep ? estimateSectionHeight(arr.prep, colW, d) + 14 : 0) +
    (arr.equipment ? 26 + Math.ceil(arr.equipment.items.length / 2) * (d.lineHeight + 2) : 0) +
    62 + arr.facts.length * (d.lineHeight + 2);
  const beside = pickBesideDiagram(arr.rest, colW, Math.max(0, colW / GRAPHIC_CANVAS_ASPECT_RATIO - boxesH), d);
  const flow = arr.rest.slice(beside.length);
  const { left, right } = splitColumns(flow, colW, d);
  const trioW = (inner - COLUMN_GAP * (arr.trio.length - 1)) / Math.max(1, arr.trio.length);
  const chips = [`${NB.repeat(8)}MIN`, `AGE${NB.repeat(10)}`, `THEME${NB.repeat(18)}`, NB.repeat(18)];

  return (
    <Page size={paper} style={s.page}>
      <View fixed style={s.footerRule} />
      <Text fixed style={[s.footerText, s.footerLeft]} render={({ pageNumber, totalPages }) => `PitchLabs  ·  Page ${pageNumber} of ${totalPages}`} />
      <Text fixed style={[s.footerText, s.footerRight]}>ACTIVITY SHEET</Text>

      <View style={s.header}>
        <View style={s.brand}>
          <Image src={logoSrc} style={s.logo} />
          <Text style={s.brandText}>PITCHLABS</Text>
        </View>
      </View>

      {/* Write-in line for the activity name, at the height the title would take. */}
      <View style={{ width: inner * 0.62, height: Math.round(d.title * 1.12), borderBottomWidth: 1, borderBottomColor: INK }} />
      <View style={s.chips}>
        {chips.map((c, i) => (
          <Text key={i} style={s.chip}>{c}</Text>
        ))}
      </View>

      <View style={s.objective}>
        <Text style={[s.label, { marginBottom: 2 }]}>Objective</Text>
        <Text style={s.objectiveText}>{`${NB}\n${NB}`}</Text>
      </View>

      <View style={s.topRow}>
        <View style={{ width: colW }}>
          <View style={s.diagramWrap}>
            <Image src={diagramSrc} style={{ width: colW, height: colW / GRAPHIC_CANVAS_ASPECT_RATIO }} />
          </View>
        </View>
        <View style={{ flex: 1, marginLeft: COLUMN_GAP }}>
          <InfoBox label="Preparation" accent={PRIMARY} s={s}>
            {arr.prep?.paragraphs.map((p, i) => <Text key={i} style={s.para}>{p}</Text>)}
            <View style={{ marginTop: 4 }}>
              <Text style={s.boxSubLabel}>Equipment</Text>
              <View style={s.equipRow}>
                {arr.equipment?.items.map((it, i) => (
                  <View key={i} style={s.equipItem} wrap={false}>
                    <View style={s.checkbox} />
                    <Text style={s.equipText}>{it}</Text>
                  </View>
                ))}
              </View>
            </View>
          </InfoBox>
          <InfoBox label="Players" accent={ACCENT} s={s}>
            <Text style={s.boxBig}>{NB.repeat(5)}<Text style={s.boxBigUnit}>{'  players'}</Text></Text>
            <Text style={s.para}>{NB}</Text>
            {arr.facts.map((f) => (
              <View key={f.label} style={s.factRow}>
                <Text style={s.factLabel}>{f.label}</Text>
                <Text style={s.factValue}>{f.value}</Text>
              </View>
            ))}
          </InfoBox>
          {beside.map((sec) => <Section key={sec.key} sec={sec} s={s} />)}
        </View>
      </View>

      {flow.length > 0 && (
        <View style={s.columns}>
          <View style={{ width: right.length ? colW : inner }}>
            {left.map((sec) => <Section key={sec.key} sec={sec} s={s} />)}
          </View>
          {right.length > 0 && (
            <View style={{ width: colW, marginLeft: COLUMN_GAP }}>
              {right.map((sec) => <Section key={sec.key} sec={sec} s={s} />)}
            </View>
          )}
        </View>
      )}

      {arr.trio.length > 0 && (
        <View style={s.columns}>
          {arr.trio.map((sec, i) => (
            <View key={sec.key} style={{ width: trioW, marginLeft: i === 0 ? 0 : COLUMN_GAP }}>
              <Section sec={sec} s={s} />
            </View>
          ))}
        </View>
      )}

      {/* Replaces the app's dark band: two white, write-on columns. */}
      <View style={[s.columns, { marginTop: d.gap * 1.2 }]} wrap={false}>
        <View style={{ width: colW }}>
          <BlankColumn label="Coaching Points" color={PRIMARY} rows={5} s={s} />
        </View>
        <View style={{ width: colW, marginLeft: COLUMN_GAP }}>
          <BlankColumn label="Questions for Players" color={ACCENT} rows={5} s={s} />
        </View>
      </View>
    </Page>
  );
}

export async function renderBlank(opts: { publicDir: string; paper: PdfPaper; logoSrc: string; diagramSrc: string }) {
  registerPdfFonts(opts.publicDir.replace(/\/$/, '') + '/');
  // Same one-page fitting the app's PDF preview uses: roomiest density that fits on one page.
  return renderFitted(async (level) =>
    new Uint8Array(
      await renderToBuffer(
        <Document title="PitchLabs Activity Sheet" author="PitchLabs" creator="PitchLabs">
          <BlankSheetPage paper={opts.paper} logoSrc={opts.logoSrc} diagramSrc={opts.diagramSrc} level={level} />
        </Document>
      )
    )
  );
}
