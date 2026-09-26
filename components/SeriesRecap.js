import Link from 'next/link'
import { TechEyebrow } from '@/components/atmosphere'

/**
 * End-of-series recap card — "What Actually Shapes a Youth Practice" is a locked three-part
 * series (see docs/pitchlabs-learn/PUBLISHING_CALENDAR.md), and article #3 is where it closes.
 * The series data is hardcoded here rather than derived from article frontmatter/cluster data,
 * since this is specific to one named series, not a generic "related articles" feature — the
 * site has no general concept of a multi-article series beyond this one.
 */
const SERIES = [
  {
    slug: 'why-your-u8-practice-feels-like-chaos',
    tag: 'STEP',
    title: 'Why Your U8 Practice Feels Like Chaos',
    blurb: 'Build the right environment — space, task, equipment, players — so the right decision is the obvious one.',
  },
  {
    slug: 'how-much-should-you-actually-say',
    tag: 'Inner ring',
    title: 'How Much Should You Actually Say?',
    blurb: 'Instruct is one tool among twelve. What to say once you’ve decided to step in, and when to stay quiet.',
  },
  {
    slug: 'progress-a-session-without-stopping-the-game',
    tag: 'Outer ring',
    title: 'How to Progress a Session Without Stopping the Game Every Two Minutes',
    blurb: 'Six ways to interrupt play, each with a real time cost — and why the free ones are underused.',
  },
]

/**
 * `variant="full"` (default) is the end-of-article card — eyebrow, the series title, an intro
 * line, and full-size cards with blurbs. `variant="compact"` is for surfacing the series
 * somewhere it's just one section among several — the homepage so far — where a full recap
 * would be too heavy: the real series title still shows (no generic stand-in), but without the
 * eyebrow/intro framing, and the cards drop their blurb and padding to read as a quick list
 * rather than a repeat of the in-article moment.
 */
export function SeriesRecap({ currentSlug, variant = 'full' }) {
  const compact = variant === 'compact'
  return (
    <section className={`series-recap${compact ? ' series-recap-compact' : ''}`}>
      {compact ? (
        <h3 className="series-recap-title series-recap-title-compact">What Actually Shapes a Youth Practice</h3>
      ) : (
        <>
          <TechEyebrow>The Series</TechEyebrow>
          <h3 className="series-recap-title">What Actually Shapes a Youth Practice</h3>
          <p className="series-recap-intro">
            Three decisions, usually made as one instinctive reflex — separated out, one piece at a time.
          </p>
        </>
      )}
      <ol className="series-recap-list">
        {SERIES.map((item, i) => {
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
