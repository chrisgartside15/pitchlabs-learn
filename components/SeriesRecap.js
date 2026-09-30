import Link from 'next/link'
import { TechEyebrow } from '@/components/atmosphere'

/**
 * Series recap card. Each series is a short, ordered set of articles meant to be read in sequence
 * (see docs/pitchlabs-learn/PUBLISHING_CALENDAR.md). The data is hardcoded here rather than derived
 * from article frontmatter, because the blurbs and tags are written for this card specifically; the
 * articles' own `series` / `seriesPart` / `seriesTotal` frontmatter must match the names and order
 * below (it drives the "Part N of M" badge on each article).
 *
 * Usage: `<SeriesRecap currentSlug="..." />` at the end of a series' last article picks the series
 * that contains that slug. `<SeriesRecap variant="compact" seriesId="..." />` renders one series by
 * id (the homepage renders each one this way).
 */
export const SERIES = [
  {
    id: 'what-actually-shapes-a-youth-practice',
    title: 'What Actually Shapes a Youth Practice',
    intro: 'Three decisions, usually made as one instinctive reflex — separated out, one piece at a time.',
    items: [
      {
        slug: 'why-your-practice-feels-like-chaos',
        tag: 'STEP',
        title: 'Why Your Soccer Practice Feels Like Chaos',
        blurb: 'Build the right environment — space, task, equipment, players — so the right decision is the obvious one.',
      },
      {
        slug: 'how-much-should-you-actually-say',
        tag: 'Inner ring',
        title: 'How Much Should You Actually Say?',
        blurb: 'Instruct is one tool among twelve. What to say once you’ve decided to step in, and when to stay quiet.',
      },
      {
        slug: 'coach-without-stopping-the-game',
        tag: 'Outer ring',
        title: 'How to Coach Without Stopping the Game Every Two Minutes',
        blurb: 'Six ways to interrupt play, what each one costs, and why the free ones are underused.',
      },
    ],
  },
  {
    id: 'before-the-decision',
    title: 'Before the Decision',
    intro: 'What a player needs before a game can teach them to decide: seeing the picture, being able to do the skill, and a first touch that frees their eyes.',
    items: [
      {
        slug: 'scanning-and-receiving',
        tag: 'Seeing',
        title: 'Scanning: Why Information Comes Before Decisions',
        blurb: 'Why the research on perceiving studies a head turn, and how to build looking into a game.',
      },
      {
        slug: 'teach-it-or-let-the-game-teach-it',
        tag: 'Doing',
        title: 'Teach It or Let the Game Teach It?',
        blurb: 'Choosing badly, or can’t do it yet? When a game does the teaching, and when a skill needs teaching first.',
      },
      {
        slug: 'first-touch-and-receiving',
        tag: 'Receiving',
        title: 'First Touch and Receiving',
        blurb: 'Why players can’t look up until the ball stops needing them, and how to build a touch that frees their eyes.',
      },
    ],
  },
]

function findSeries({ seriesId, currentSlug }) {
  if (seriesId) return SERIES.find((s) => s.id === seriesId) ?? null
  if (currentSlug) return SERIES.find((s) => s.items.some((i) => i.slug === currentSlug)) ?? null
  return SERIES[0]
}

/**
 * `variant="full"` (default) is the end-of-article card — eyebrow, the series title, an intro
 * line, and full-size cards with blurbs. `variant="compact"` is for surfacing a series somewhere
 * it's just one section among several (the homepage), where a full recap would be too heavy: the
 * real series title still shows, but without the eyebrow/intro framing, and the cards drop their
 * blurb and padding to read as a quick list rather than a repeat of the in-article moment.
 */
export function SeriesRecap({ currentSlug, seriesId, variant = 'full' }) {
  const series = findSeries({ seriesId, currentSlug })
  if (!series) return null
  const compact = variant === 'compact'
  return (
    <section className={`series-recap${compact ? ' series-recap-compact' : ''}`}>
      {compact ? (
        <h3 className="series-recap-title series-recap-title-compact">{series.title}</h3>
      ) : (
        <>
          <TechEyebrow>The Series</TechEyebrow>
          <h3 className="series-recap-title">{series.title}</h3>
          <p className="series-recap-intro">{series.intro}</p>
        </>
      )}
      <ol className="series-recap-list">
        {series.items.map((item, i) => {
          const isCurrent = item.slug === currentSlug
          const content = (
            <>
              <span className="series-recap-num">{i + 1}</span>
              <span className="series-recap-body">
                <span className="series-recap-meta">
                  <span className="series-recap-tag">{item.tag}</span>
                  {isCurrent && <span className="series-recap-here">You&rsquo;re here</span>}
                </span>
                <span className="series-recap-item-title">{item.title}</span>
                {!compact && <span className="series-recap-blurb">{item.blurb}</span>}
              </span>
            </>
          )
          return (
            <li key={item.slug} className={`series-recap-item${isCurrent ? ' current' : ''}`}>
              {isCurrent ? content : <Link href={`/articles/${item.slug}`}>{content}</Link>}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
