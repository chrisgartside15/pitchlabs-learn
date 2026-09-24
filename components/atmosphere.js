/**
 * Small brand vocabulary pulled from the main PitchLabs app's marketing site
 * (App-Studio/Projects/PitchLabs/components/marketing/atmosphere.tsx) so Learn reads as the same
 * product, not a disconnected template. Kept deliberately to one piece — a halfway-line section
 * divider — after the corner-arc card accents the app also uses there were dropped here on
 * request; one signature motif carries more than two competing ones.
 */

/** Section break drawn as a pitch halfway line — a thin rule with a hollow center-circle marker
 *  at its midpoint. Used between major sections instead of plain whitespace. */
export function PitchDivider({ className = '' }) {
  return (
    <div className={`pitch-divider ${className}`} aria-hidden="true">
      <span className="pitch-divider-line" />
      <span className="pitch-divider-dot" />
      <span className="pitch-divider-line" />
    </div>
  )
}

/** Mono, uppercase, tracked label with a short tick-rule prefix — the same kickoff-marker motif
 *  as PitchDivider, in miniature. Semantically a plain paragraph, not a heading. */
export function TechEyebrow({ children }) {
  return (
    <p className="tech-eyebrow">
      <span aria-hidden="true" className="tech-eyebrow-tick" />
      {children}
    </p>
  )
}
