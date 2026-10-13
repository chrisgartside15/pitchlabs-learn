import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShapeBoard } from '@/components/ShapeBoard'
import { EmbedCode } from '@/components/EmbedCode'
import { ToolCards } from '@/components/ToolCards'
import { TechEyebrow } from '@/components/atmosphere'
import { TrackedCtaLink } from '@/components/TrackedCtaLink'
import { APP_URL } from '@/lib/analytics'
import { SITE_URL, SHOW_TOOLS, TOOLS_PUBLISHED } from '@/lib/site'

const PATH = '/tools/7v7-formation-builder'

export const metadata = {
  title: '7v7 Formation Builder: Free 2-3-1 and 3-2-1 Shape Board - PitchLabs Learn',
  description:
    'Free 7v7 formation builder. Drag a 2-3-1, 3-2-1 or 4v4 diamond around a 7v7 pitch, set the opponent’s shape, pass the ball, then save a PNG or share a link.',
  alternates: { canonical: `${SITE_URL}${PATH}` },
  // Indexable only once the Tools section is released (TOOLS_PUBLISHED in lib/site.js).
  robots: TOOLS_PUBLISHED ? { index: true, follow: true } : { index: false, follow: false },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '7v7 Formation Builder',
  url: `${SITE_URL}${PATH}`,
  description:
    'A free interactive 7v7 shape board: drag players, set both teams’ shapes, pass the ball, and save or share the arrangement.',
  applicationCategory: 'SportsApplication',
  operatingSystem: 'Any (web browser)',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  creator: { '@type': 'Organization', name: 'PitchLabs', url: 'https://www.usepitchlabs.com' },
}

export default function FormationBuilderPage() {
  if (!SHOW_TOOLS) notFound()
  return (
    <div className="articles-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-header">
        <Link href="/tools" className="back-link">
          ← All tools
        </Link>
        <TechEyebrow>Free tool</TechEyebrow>
        <h1>7v7 Formation Builder</h1>
        <p>
          Set a 2-3-1, 3-2-1 or 3-1-2 on a 7v7 pitch, put an opponent against it, move players and pass the ball. Then
          plan who plays where for every period, and save or share the result.
        </p>
      </div>

      <ShapeBoard />

      <article className="tool-notes">
        <h2>How to use it</h2>
        <ul>
          <li>Pick a shape for your team and for the opponent. Each side is independent, and the opponent can be switched off.</li>
          <li>Drag any player to move them, and tap one to pass them the ball. Undo steps back one move at a time.</li>
          <li>Switch between in possession and out of possession. Out of possession the shape stays the same, just narrower and deeper.</li>
          <li>Show the lines, the diamond, passing lanes from whoever has the ball, the zones, or position numbers in place of the role letters.</li>
          <li>Turn on Draw arrows and drag on the pitch to show a pass or a run.</li>
          <li>Switch to the rotation planner, set your squad size and periods, and step through the games so the same players don&rsquo;t always get the shorter share.</li>
          <li>Save a PNG, print or copy the rotation, or copy a link that opens the board exactly as you left it.</li>
        </ul>

        <h2>Numbers, and what they mean</h2>
        <p>
          Shapes are written from defence to attack with the keeper left out, so a 2-3-1 is two defenders, three
          midfielders and one forward. U.S. Soccer and the FA count the keeper, so the same shapes appear there as
          1-2-3-1 and 1-3-2-1. The board shows both.
        </p>

        <h2>What this is not</h2>
        <p>
          The positions are illustrative, not measured, and no shape here is presented as better than another. I
          looked for a study comparing a 2-3-1 with a 3-2-1 at this age and didn&rsquo;t find one. The captions on the
          board are my opinions and are labelled that way. The pitch is PitchLabs&rsquo; own 7v7 field, and leagues
          differ on the build-out line, so check yours.
        </p>

        <h2>Where it comes from</h2>
        <ul>
          <li>
            <a href="https://www.ussoccer.com/us-way/player-development/game/formations/u9-u10-7v7" target="_blank" rel="noopener noreferrer">
              U.S. Soccer, formations for 7v7
            </a>{' '}
            (shows a 1-3-2-1 as an example and says other formations may be used).
          </li>
          <li>
            <a href="https://learn.englandfootball.com/articles-and-resources/coaching/resources/2025/How-to-play-and-manage-7v7-games" target="_blank" rel="noopener noreferrer">
              The FA, how to play and manage 7v7 games
            </a>{' '}
            (shows a 1-2-3-1 and a 1-3-2-1).
          </li>
          <li>
            <a href="https://doi.org/10.5232/ricyde2020.06101" target="_blank" rel="noopener noreferrer">
              Sánchez-García &amp; Sánchez-Sánchez (RICYDE, 2020)
            </a>
            , goalkeepers played shorter in 7-a-side and 8-a-side than in 11-a-side for under-12s.
          </li>
          <li>
            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12127938/" target="_blank" rel="noopener noreferrer">
              González-Rodenas et al. (Journal of Human Kinetics, 2025)
            </a>
            , the nearest shape comparison I found: 2-3-1 against 3-1-2 with under-19 players.
          </li>
        </ul>

        <div className="tool-cta">
          <p>
            Like how it works? PitchLabs is where you build the whole session: the activities, the diagrams, the plan
            you take pitchside.
          </p>
          <TrackedCtaLink href={APP_URL} location="tool_formation_builder" className="nav-cta">
            Plan a session in PitchLabs
          </TrackedCtaLink>
        </div>

        <p>
          Want the thinking behind the shapes? Read{' '}
          <Link href="/articles/7v7-soccer-formations">7v7 Formations: 2-3-1 or 3-2-1, and How to Choose</Link>. More free
          tools are on the <Link href="/tools">tools page</Link>.
        </p>

        <details className="tool-embed">
          <summary>Embed this on your own site</summary>
          <p>Free to embed. It keeps a link back here, so please leave it in.</p>
          <EmbedCode
          src={`${SITE_URL}/embed/shape-board`}
          href={`${SITE_URL}${PATH}`}
          linkText="7v7 formation builder by PitchLabs"
        />
        </details>

        <h2>More free tools</h2>
      </article>
      <ToolCards exclude="7v7-formation-builder" limit={3} />
    </div>
  )
}
