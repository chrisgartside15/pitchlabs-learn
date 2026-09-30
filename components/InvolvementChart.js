/**
 * The headline finding from "Small-Sided Games for Young Players", drawn as bars rather than left as two
 * percentages in a paragraph. Figures are the per-minute means from Hintermann et al. (PLOS ONE, 2021),
 * table of dominant / non-dominant players: least involved third 2.02 → 4.90, most involved third
 * 3.56 → 6.11 actions per player per minute. The middle third isn't reported separately in the paper,
 * so it isn't shown here either.
 *
 * Plain HTML/CSS bars (no client JS, no chart library) so it renders crisp at any width and reads in
 * the site's always-dark palette.
 */

const SCALE_MAX = 6.5

const GROUPS = [
  { label: 'Least involved third', before: 2.02, after: 4.9, gain: '+143%' },
  { label: 'Most involved third', before: 3.56, after: 6.11, gain: '+72%' },
]

const width = (v) => `${(v / SCALE_MAX) * 100}%`

export function InvolvementChart() {
  return (
    <figure className="ssg-chart" aria-labelledby="ssg-chart-title">
      <span className="tech-eyebrow">
        <span aria-hidden="true" className="tech-eyebrow-tick" />
        Chart · 7v7 to 4v4
      </span>
      <p id="ssg-chart-title" className="ssg-chart-title">
        Actions per player per minute
      </p>

      <div className="ssg-chart-groups">
        {GROUPS.map((g) => (
          <div key={g.label} className="ssg-chart-group">
            <div className="ssg-chart-group-head">
              <span className="ssg-chart-group-label">{g.label}</span>
              <span className="ssg-chart-gain">{g.gain}</span>
            </div>
            <div className="ssg-chart-row">
              <span className="ssg-chart-format">7v7</span>
              <span className="ssg-chart-track">
                <span className="ssg-chart-bar ssg-chart-bar-before" style={{ width: width(g.before) }} />
              </span>
              <span className="ssg-chart-value">{g.before.toFixed(1)}</span>
            </div>
            <div className="ssg-chart-row">
              <span className="ssg-chart-format">4v4</span>
              <span className="ssg-chart-track">
                <span className="ssg-chart-bar ssg-chart-bar-after" style={{ width: width(g.after) }} />
              </span>
              <span className="ssg-chart-value">{g.after.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>

      <figcaption className="ssg-chart-caption">
        <p>
          In 4v4, the least involved players made more actions per minute than the most involved players had in 7v7.
        </p>
        <p className="ssg-chart-source">
          103 ten-year-olds in Switzerland, grouped by how involved they were in 7v7 (middle third not shown). One study:{' '}
          <a href="https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0254900">
            Hintermann et al., <em>PLOS ONE</em>, 2021
          </a>
          .
        </p>
      </figcaption>
    </figure>
  )
}
