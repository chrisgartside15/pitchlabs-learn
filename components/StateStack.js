/**
 * Holds every state of a panel in the same grid cell and shows one. The box is always as tall as its tallest
 * state, so picking, changing or clearing a selection never resizes the tool or moves the page (Chris, 2026-10-13:
 * nothing should resize on a clear state). Hidden states are invisible, aria-hidden and inert, so they are not
 * read out or tabbed into.
 *
 *   <StateStack active={selected ?? 'default'} items={[{ key: 'default', node: ... }, ...]} />
 */
export function StateStack({ active, items, className = '' }) {
  return (
    <div className={`state-stack${className ? ` ${className}` : ''}`}>
      {items.map(({ key, node }) => {
        const on = key === active
        return (
          <div key={key} className={`state-stack-item${on ? ' is-active' : ''}`} aria-hidden={on ? undefined : true} {...(on ? {} : { inert: '' })}>
            {node}
          </div>
        )
      })}
    </div>
  )
}
