// Re-renders Chris's "Switch of Play to Four Goals" export through the app's own ActivityPdfDocument
// (unchanged), with the same content, minus the doubled quote marks on the questions (the document
// adds its own). Also produces an A4 version.
import { renderToBuffer } from '@react-pdf/renderer';
import { ActivityPdfDocument, registerPdfFonts, type PdfPaper } from '@/components/pdf/ActivityPdfDocument';
import { renderFitted } from '@/lib/pdf/react/layout';
import type { ActivityPdfModel, PdfSection } from '@/lib/pdf/react/activityModel';

const text = (key: string, label: string, paragraphs: string[]): PdfSection => ({ key, label, kind: 'text', paragraphs, items: [], isCustom: false });
const list = (key: string, label: string, items: string[]): PdfSection => ({ key, label, kind: 'list', paragraphs: [], items, isCustom: false });

export async function renderSwitch(opts: { publicDir: string; paper: PdfPaper; logoSrc: string; diagramSrc: string }) {
  registerPdfFonts(opts.publicDir.replace(/\/$/, '') + '/');
  const model: ActivityPdfModel = {
    title: 'Switch of Play to Four Goals',
    templateName: null,
    durationMinutes: 15,
    tags: ['U8–U10', 'Possession', 'Passing', '5–8 players', 'Medium Grid'],
    players: '5–8',
    area: 'Medium Grid',
    objective:
      'Win the ball, then look for the open side before committing: switch play away from where you won it rather than driving at the nearest goal.',
    sections: [
      text('preparation', 'Preparation', [
        '25 × 20 yd area split into two halves with a line down the middle. Two small goals at each end, one in each half. Spare balls at both ends so play restarts straight away.',
      ]),
      text('organization', 'Organization', [
        '3v3 (or 4v4), no goalkeepers. Each team attacks the two goals at one end and defends the two at the other. A normal goal counts 1. A goal scored in the half opposite to where your team won the ball counts double. After a goal or when the ball goes out, restart from a spare ball.',
      ]),
      list('rules', 'Rules', [
        "Score in either goal you're attacking: 1 point",
        'Score on the opposite side to where you won the ball: 2 points',
        'No goalkeepers',
        'Restart straight away from the spare balls',
      ]),
      list('progressions', 'Progressions', [
        'Switched goals count triple, or only switched goals count',
        'Narrow the area (e.g. 25 × 15 yd) for more pressure and quicker decisions',
        'A touch limit, set to what your players can manage',
      ]),
      list('regressions', 'Regressions', [
        'Add a neutral who plays for whichever team has the ball',
        'Make the area bigger (e.g. 30 × 25 yd)',
        'Drop the double-goal rule until players can keep the ball',
      ]),
      list('equipment', 'Equipment', ['4 small goals', '6+ balls', 'Cones', 'Bibs (2 colors)']),
      text('dimensions', 'Field size', ['25 x 20yd']),
      list('questions', 'Questions for Players', [
        'Where did we win the ball, and which side is open now?',
        'Who can see the far goal?',
        'When is the near goal the better choice?',
      ]),
      list('coaching_points', 'Coaching Points', [
        'Look to the far side before the ball arrives',
        'First touch away from pressure, toward the open side',
        'When your team wins it, get wide on the far side',
        "If the near goal is open, take it, since switching isn't the only right answer",
      ]),
    ],
    graphics: [{ name: 'Blog Graphic #1', src: opts.diagramSrc }],
    creatorName: null,
    sessionNote: null,
    updatedAt: new Date().toISOString(),
  };
  return renderFitted(async (level) =>
    new Uint8Array(await renderToBuffer(<ActivityPdfDocument model={model} paper={opts.paper} logoSrc={opts.logoSrc} level={level} />))
  );
}
