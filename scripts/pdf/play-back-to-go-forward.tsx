// "Play Back to Go Forward": a 3v3 where a goal in the same passage of play counts double after the team has
// played back a zone. Same ActivityPdfDocument as the other printables; the diagram is a frame from the clip.
import { renderToBuffer } from '@react-pdf/renderer';
import { ActivityPdfDocument, registerPdfFonts, type PdfPaper } from '@/components/pdf/ActivityPdfDocument';
import { renderFitted } from '@/lib/pdf/react/layout';
import type { ActivityPdfModel, PdfSection } from '@/lib/pdf/react/activityModel';

const text = (key: string, label: string, paragraphs: string[]): PdfSection => ({ key, label, kind: 'text', paragraphs, items: [], isCustom: false });
const list = (key: string, label: string, items: string[]): PdfSection => ({ key, label, kind: 'list', paragraphs: [], items, isCustom: false });

export async function renderPlayBack(opts: { publicDir: string; paper: PdfPaper; logoSrc: string; diagramSrc: string }) {
  registerPdfFonts(opts.publicDir.replace(/\/$/, '') + '/');
  const model: ActivityPdfModel = {
    title: 'Play Back to Go Forward',
    templateName: null,
    durationMinutes: 15,
    tags: ['U8–U10', 'Possession', 'Passing', '6 players', 'Medium Grid'],
    players: '6',
    area: 'Medium Grid',
    objective:
      "Win the ball, and if nothing's on, play back to a teammate underneath before going forward again, rather than forcing it into pressure.",
    sections: [
      text('preparation', 'Preparation', [
        '30 × 20 yd area split into three equal zones. Two small goals at each end. Spare balls at both ends so play restarts straight away.',
      ]),
      text('organization', 'Organization', [
        "3v3, no goalkeepers. Each team attacks the two goals at one end and defends the two at the other. A normal goal counts 1. If a team wins the ball in the middle zone, they can play back into their own back zone. If they win it in the furthest zone, the one they're attacking, they can play back to the middle zone. Any goal scored in that same passage of play counts double. A team that wins the ball in its own zone can't score double. Defenders can step into the back zone. After a goal or when the ball goes out, restart from a spare ball.",
      ]),
      list('rules', 'Rules', [
        "Score in either goal you're attacking: 1 point",
        'Win it in the middle or furthest zone, play back a zone, then score in the same passage of play: 2 points',
        'Win it in your own zone: no double points',
        'Defenders may enter the back zone',
        'No goalkeepers',
        'Restart straight away from the spare balls',
      ]),
      list('progressions', 'Progressions', [
        'Double goals count triple, or only goals after a pass back count',
        'Narrow the area (e.g. 30 × 15 yd) for more pressure',
      ]),
      list('regressions', 'Regressions', [
        'Add a neutral who plays for whichever team has the ball',
        'Widen the area, or keep defenders out of the back zone',
        'Drop the double-goal rule until players can keep the ball',
      ]),
      list('equipment', 'Equipment', ['4 small goals', '6+ balls', 'Cones', 'Bibs (2 colors)']),
      text('dimensions', 'Field size', ['30 x 20yd']),
      list('questions', 'Questions for Players', [
        "Where did we win it, and who's free behind the ball?",
        'When is playing back better than forcing it forward?',
        'When is going straight forward the better choice?',
      ]),
      list('coaching_points', 'Coaching Points', [
        'Support underneath at an angle, so the pass back is easy to receive',
        'Open body to see the whole pitch before the ball arrives',
        'Once the ball has gone back, go forward quickly before the defense resets',
        "If the way forward is open, take it, since playing back isn't always right",
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
