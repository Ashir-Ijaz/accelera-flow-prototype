import { useEffect } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Buttons already wrapped in MagneticButton use `.magnetic` — skip those.
 * Everything else that feels like a control gets the same pull-on-hover.
 */
const SELECTOR = [
  'button:not(:disabled):not(.magnetic)',
  'a.btn:not(.magnetic)',
  '.filter-btn:not(.magnetic)',
  '.icon-btn:not(.magnetic)',
  '.sound-toggle:not(.magnetic)',
  '.back-to-top:not(.magnetic)',
  '.nav__menu-btn:not(.magnetic)',
  '.nav__link:not(.magnetic)',
  '.services-cinema__rail-btn:not(.magnetic)',
  '.voices-theater__name:not(.magnetic)',
  '.results-reel__dots button:not(.magnetic)',
  '.fullscreen-nav__link:not(.magnetic)',
  '.final-cta__link:not(.magnetic)',
].join(',')

const STRENGTH = 22
const SCALE = 1.05
const EASE = 0.18
/** Nav links need ::after for underlines — never attach magnetic sheen (::after) */
const NO_SHEEN = 'nav__link, fullscreen-nav__link, services-cinema__rail-btn'

/**
 * Sitewide magnetic hover — same language as “Explore our brands” / MagneticButton.
 */
export function GlobalMagnetic() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    let node: HTMLElement | null = null
    let rect: DOMRect | null = null
    let raf = 0
    let active = false
    let last = 0
    const target = { x: 0, y: 0, s: 1 }
    const current = { x: 0, y: 0, s: 1 }

    const clearNode = (el: HTMLElement | null) => {
      if (!el) return
      el.style.setProperty('--mx', '0px')
      el.style.setProperty('--my', '0px')
      el.style.setProperty('--ms', '1')
      el.removeAttribute('data-magnetic')
      el.classList.remove('magnetic', 'magnetic--btn')
      el.style.willChange = ''
    }

    const apply = (el: HTMLElement, x: number, y: number, s: number) => {
      el.style.setProperty('--mx', `${x.toFixed(2)}px`)
      el.style.setProperty('--my', `${y.toFixed(2)}px`)
      el.style.setProperty('--ms', s.toFixed(4))
    }

    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      active = false
      last = 0
    }

    const tick = (time: number) => {
      if (!node) {
        stop()
        return
      }
      const dt = last ? Math.min(32, time - last) / 16.67 : 1
      last = time
      const follow = 1 - Math.pow(1 - EASE, dt)
      current.x += (target.x - current.x) * follow
      current.y += (target.y - current.y) * follow
      current.s += (target.s - current.s) * follow
      apply(node, current.x, current.y, current.s)

      const idle =
        target.x === 0 &&
        target.y === 0 &&
        target.s === 1 &&
        Math.abs(current.x) < 0.06 &&
        Math.abs(current.y) < 0.06 &&
        Math.abs(current.s - 1) < 0.001

      if (idle) {
        clearNode(node)
        node = null
        rect = null
        stop()
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (active) return
      active = true
      raf = requestAnimationFrame(tick)
    }

    const release = () => {
      target.x = 0
      target.y = 0
      target.s = 1
      start()
    }

    const onMove = (event: PointerEvent) => {
      const hit = (event.target as Element | null)?.closest?.(SELECTOR) as HTMLElement | null
      if (!hit) {
        if (node) release()
        return
      }

      if (hit !== node) {
        if (node) {
          clearNode(node)
          current.x = 0
          current.y = 0
          current.s = 1
        }
        node = hit
        rect = hit.getBoundingClientRect()
        hit.classList.add('magnetic')
        if (!hit.matches(NO_SHEEN)) hit.classList.add('magnetic--btn')
        hit.style.willChange = 'transform'
        hit.setAttribute('data-magnetic', 'hot')
      }

      if (!rect) rect = hit.getBoundingClientRect()
      const soft = hit.matches('.nav__link, .fullscreen-nav__link')
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5
      target.x = Math.tanh(nx * 2.4) * (soft ? 10 : STRENGTH)
      target.y = Math.tanh(ny * 2.4) * (soft ? 8 : STRENGTH)
      target.s = soft ? 1.02 : SCALE
      hit.setAttribute('data-magnetic', 'hot')
      start()
    }

    const onLeaveWindow = () => {
      if (node) release()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeaveWindow)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow)
      stop()
      clearNode(node)
    }
  }, [reduced])

  return null
}
