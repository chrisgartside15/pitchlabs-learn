/**
 * Phone-width stand-in for the wheel diagrams. The wheels' labels are sized in SVG units to fit
 * their segments, so they land at ~6px on a phone; below 560px the wheel is hidden (CSS) and
 * these chips drive the same selection state instead. Hidden on wider screens.
 */
export function WheelChips({ groups, onSelect }) {
  return (
    <div className="wheel-chips">
      {groups.map((g) => (
        <div key={g.kind} className="wheel-chip-group">
          <p className="wheel-chip-label">{g.label}</p>
          <div className="wheel-chip-row">
            {g.items.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.state === 'active'}
                className={`wheel-chip${item.state ? ` ${item.state}` : ''}`}
                onClick={() => onSelect(g.kind, item.id)}
              >
                {item.name}
                {item.meta && <span className="wheel-chip-meta">{item.meta}</span>}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Keeps the detail card in view after a chip tap, since the chip list can be taller than a phone screen.
export function scrollCardIntoView(el) {
  if (!el || typeof window === 'undefined' || !window.matchMedia('(max-width: 560px)').matches) return
  requestAnimationFrame(() => el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }))
}
