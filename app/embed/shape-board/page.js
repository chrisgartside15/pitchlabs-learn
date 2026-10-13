import { notFound } from 'next/navigation'
import { ShapeBoard } from '@/components/ShapeBoard'
import { EmbedCredit } from '@/components/EmbedCredit'
import { SITE_URL, SHOW_TOOLS } from '@/lib/site'

const TOOL_PATH = '/tools/7v7-formation-builder'

export const metadata = {
  title: '7v7 Formation Builder (embed) - PitchLabs Learn',
  // Embeds are for other people's pages; the tool page is the one search should know about.
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}${TOOL_PATH}` },
}

export default function EmbedShapeBoard() {
  if (!SHOW_TOOLS) notFound()
  // The root layout adds the site header and footer; this shell sits over them so the iframe shows only the board.
  return (
    <div className="embed-shell">
      <ShapeBoard embedded />
      <EmbedCredit href={`${SITE_URL}${TOOL_PATH}`}>7v7 formation builder by PitchLabs</EmbedCredit>
    </div>
  )
}
