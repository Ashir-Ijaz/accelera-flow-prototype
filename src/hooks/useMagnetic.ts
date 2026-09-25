import { useCallback, useEffect, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react'

type MagneticOptions = {
  strength?: number
  ease?: number
  tilt?: boolean
  tiltStrength?: number
  scale?: number
  enabled?: boolean
}

type MagneticState = {
  x: number
  y: number
  rx: number
  ry: number
  s: number
  g: number
}

/**
 * Premium magnetic field — rect cached on enter (no layout thrash on move).
 */
export function useMagnetic<T extends HTMLElement>(
  options: MagneticOptions = {},
): {
  ref: RefObject<T | null>
  onPointerMove: (event: ReactPointerEvent<T>) => void
  onPointerLeave: () => void
} {
  const {
    strength = 20,
    ease = 0.16,
    tilt = false,
    tiltStrength = 7,
    scale = 1.035,
    enabled = true,
  } = options

  const ref = useRef<T | null>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const target = useRef<MagneticState>({ x: 0, y: 0, rx: 0, ry: 0, s: 1, g: 0 })
  const current = useRef<MagneticState>({ x: 0, y: 0, rx: 0, ry: 0, s: 1, g: 0 })
  const raf = useRef(0)
  const active = useRef(false)
  const last = useRef(0)

  const stop = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = 0
    active.current = false
    last.current = 0
  }, [])

  const apply = useCallback(
    (node: T, state: MagneticState) => {
      node.style.setProperty('--mx', `${state.x.toFixed(2)}px`)
      node.style.setProperty('--my', `${state.y.toFixed(2)}px`)
      node.style.setProperty('--ms', state.s.toFixed(4))
      node.style.setProperty('--glow', state.g.toFixed(3))
      if (tilt) {
        node.style.setProperty('--tilt', `rotateX(${state.rx.toFixed(2)}deg) rotateY(${state.ry.toFixed(2)}deg)`)
      }
    },
    [tilt],
  )

  const tick = useCallback(
    (time: number) => {
      const node = ref.current
      if (!node) {
        stop()
        return
      }
      const dt = last.current ? Math.min(32, time - last.current) / 16.67 : 1
      last.current = time
      const follow = 1 - Math.pow(1 - ease, dt)
      const c = current.current
      const t = target.current
      c.x += (t.x - c.x) * follow
      c.y += (t.y - c.y) * follow
      c.rx += (t.rx - c.rx) * follow
      c.ry += (t.ry - c.ry) * follow
      c.s += (t.s - c.s) * follow
      c.g += (t.g - c.g) * follow
      apply(node, c)

      const idle =
        t.x === 0 &&
        t.y === 0 &&
        t.s === 1 &&
        Math.abs(c.x) < 0.06 &&
        Math.abs(c.y) < 0.06 &&
        Math.abs(c.s - 1) < 0.001
      if (idle) {
        apply(node, { x: 0, y: 0, rx: 0, ry: 0, s: 1, g: 0 })
        node.removeAttribute('data-magnetic')
        node.style.willChange = 'auto'
        stop()
        return
      }
      raf.current = requestAnimationFrame(tick)
    },
    [apply, ease, stop],
  )

  const start = useCallback(() => {
    if (active.current) return
    active.current = true
    raf.current = requestAnimationFrame(tick)
  }, [tick])

  useEffect(() => {
    const onResize = () => {
      rectRef.current = null
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('resize', onResize)
      stop()
    }
  }, [stop])

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      if (!enabled) return
      const node = ref.current
      if (!node) return
      if (!rectRef.current) {
        rectRef.current = node.getBoundingClientRect()
        node.style.willChange = 'transform'
      }
      const rect = rectRef.current
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5
      target.current.x = Math.tanh(nx * 2.4) * strength
      target.current.y = Math.tanh(ny * 2.4) * strength
      target.current.s = scale
      target.current.g = Math.min(1, Math.hypot(nx, ny) * 1.6 + 0.35)
      if (tilt) {
        target.current.ry = Math.tanh(nx * 2.2) * tiltStrength
        target.current.rx = Math.tanh(-ny * 2.2) * tiltStrength
      }
      node.setAttribute('data-magnetic', 'hot')
      start()
    },
    [enabled, strength, scale, tilt, tiltStrength, start],
  )

  const onPointerLeave = useCallback(() => {
    rectRef.current = null
    target.current = { x: 0, y: 0, rx: 0, ry: 0, s: 1, g: 0 }
    start()
  }, [start])

  return { ref, onPointerMove, onPointerLeave }
}
