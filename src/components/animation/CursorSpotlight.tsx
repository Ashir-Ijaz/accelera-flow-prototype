import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Pt = { x: number; y: number }

const HOT_SELECTOR =
  'a, button, [role="button"], .magnetic, .magnetic-card, .filter-btn, input, textarea, select, label'
/** Longer mist ribbon behind the cursor */
const MAX = 42

/**
 * Orange glow + watery trail — soft sprites, no canvas blur filters (smooth FPS).
 * Circle glow only when idle; while moving, only the trail shows.
 */
export function CursorSpotlight() {
  const reduced = usePrefersReducedMotion()
  const glowRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    const canvas = canvasRef.current
    const glow = glowRef.current
    const root = rootRef.current
    if (!canvas || !glow || !root) return

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const makeSprite = (size: number, inner: string, mid: string) => {
      const s = document.createElement('canvas')
      s.width = size
      s.height = size
      const c = s.getContext('2d')
      if (!c) return s
      const g = c.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      g.addColorStop(0, inner)
      g.addColorStop(0.38, mid)
      g.addColorStop(1, 'rgba(255,106,0,0)')
      c.fillStyle = g
      c.fillRect(0, 0, size, size)
      return s
    }

    // Brighter trail sprays
    const spriteWide = makeSprite(220, 'rgba(255,106,0,0.34)', 'rgba(255,140,50,0.16)')
    const spriteMid = makeSprite(130, 'rgba(255,170,80,0.4)', 'rgba(255,120,40,0.16)')
    const spriteCore = makeSprite(72, 'rgba(255,230,190,0.48)', 'rgba(255,150,60,0.18)')

    const mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5, on: true, hot: 0 }
    const glowPos = { x: mouse.x, y: mouse.y, a: 1, hot: 0, idle: 1 }
    const points: Pt[] = []
    let raf = 0
    let running = false
    let w = 0
    let h = 0
    let stillFrames = 0
    let leaveIdleFrames = 0
    let lastHot = false
    let lastSampleX = mouse.x
    let lastSampleY = mouse.y

    const resize = () => {
      const dpr = 1
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const isHot = (node: EventTarget | null) => {
      if (!(node instanceof Element)) return false
      return Boolean(node.closest(HOT_SELECTOR))
    }

    const start = () => {
      if (running) return
      running = true
      leaveIdleFrames = 0
      raf = requestAnimationFrame(frame)
    }

    const onMove = (event: PointerEvent) => {
      const moved = Math.hypot(event.clientX - mouse.x, event.clientY - mouse.y)
      mouse.x = event.clientX
      mouse.y = event.clientY
      mouse.on = true
      if (moved > 0.5) stillFrames = 0
      const hot = isHot(event.target)
      mouse.hot = hot ? 1 : 0
      if (hot !== lastHot) {
        lastHot = hot
        root.dataset.hot = hot ? 'true' : 'false'
      }
      const last = points[0]
      if (!last || Math.hypot(last.x - mouse.x, last.y - mouse.y) > 2) {
        points.unshift({ x: mouse.x, y: mouse.y })
        if (points.length > MAX) points.length = MAX
        lastSampleX = mouse.x
        lastSampleY = mouse.y
      }
      start()
    }

    const onLeave = () => {
      mouse.on = false
      mouse.hot = 0
      if (lastHot) {
        lastHot = false
        root.dataset.hot = 'false'
      }
      start()
    }

    const drawSprite = (img: HTMLCanvasElement, x: number, y: number, scale: number, alpha: number) => {
      if (alpha < 0.015) return
      const sw = img.width * scale
      const sh = img.height * scale
      ctx.globalAlpha = alpha
      ctx.drawImage(img, x - sw / 2, y - sh / 2, sw, sh)
    }

    const frame = () => {
      // Detect stillness even when pointer events stop firing
      const drift = Math.hypot(mouse.x - lastSampleX, mouse.y - lastSampleY)
      if (drift < 1.2 && mouse.on) stillFrames += 1
      else if (mouse.on) stillFrames = 0
      lastSampleX = mouse.x
      lastSampleY = mouse.y

      // Circle only when sitting still (~100ms+); fades out as soon as you move
      const idleTarget = !mouse.on ? 0 : stillFrames > 8 ? 1 : 0
      glowPos.idle += (idleTarget - glowPos.idle) * (idleTarget > glowPos.idle ? 0.12 : 0.28)

      glowPos.x += (mouse.x - glowPos.x) * 0.1
      glowPos.y += (mouse.y - glowPos.y) * 0.1
      glowPos.a += ((mouse.on ? 1 : 0.75) - glowPos.a) * 0.1
      glowPos.hot += (mouse.hot - glowPos.hot) * 0.14

      const hot = glowPos.hot
      const idle = glowPos.idle
      // Idle glow — larger + brighter so it reads clearly when still
      const scale = (1.05 - hot * 0.35) * (0.95 + idle * 0.08)
      glow.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0) scale(${scale})`
      glow.style.opacity = String(glowPos.a * idle * (1.0 - hot * 0.72))

      if (points.length === 0) points.push({ x: mouse.x, y: mouse.y })
      points[0].x += (mouse.x - points[0].x) * 0.2
      points[0].y += (mouse.y - points[0].y) * 0.2
      for (let i = 1; i < points.length; i += 1) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.18
        points[i].y += (points[i - 1].y - points[i].y) * 0.18
      }
      while (points.length < MAX) {
        const tip = points[points.length - 1]
        points.push({ x: tip.x, y: tip.y })
      }

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'screen'

      // Trail only while moving — smaller head bead at the cursor tip
      const trailAmt = (1 - idle) * glowPos.a
      if (trailAmt > 0.04) {
        const mist = trailAmt * (1.0 - hot * 0.7)
        const widthScale = (1.05 - hot * 0.35) * 1.0
        const step = Math.max(1, Math.floor(points.length / 16))

        for (let i = points.length - 1; i >= 0; i -= step) {
          const p = points[i]
          const t = i / Math.max(1, points.length - 1)
          const fade = (1 - t * 0.78) * mist
          drawSprite(spriteWide, p.x, p.y, (1.05 - t * 0.32) * widthScale, fade * 0.55)
          drawSprite(spriteMid, p.x, p.y, (0.88 - t * 0.25) * widthScale, fade * 0.7)
        }

        const head = points[0]
        drawSprite(spriteCore, head.x, head.y, (0.72 - hot * 0.18) * widthScale, mist * 0.75)
        drawSprite(spriteMid, head.x, head.y, (0.9 - hot * 0.15) * widthScale, mist * 0.4)
      }

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'

      if (mouse.on) {
        leaveIdleFrames = 0
        raf = requestAnimationFrame(frame)
        return
      }

      const dx = Math.abs(mouse.x - glowPos.x) + Math.abs(mouse.y - glowPos.y)
      const settled = dx < 0.4 && glowPos.idle < 0.02
      if (settled) leaveIdleFrames += 1
      else leaveIdleFrames = 0

      if (leaveIdleFrames > 45) {
        running = false
        raf = 0
        return
      }
      raf = requestAnimationFrame(frame)
    }

    resize()
    for (let i = 0; i < MAX; i += 1) points.push({ x: mouse.x, y: mouse.y })

    const onVis = () => {
      if (document.visibilityState === 'hidden') {
        cancelAnimationFrame(raf)
        running = false
        raf = 0
      } else {
        start()
      }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVis)
    // Start idle so first paint can show the circle after a brief settle
    stillFrames = 20
    start()

    return () => {
      cancelAnimationFrame(raf)
      running = false
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div className="cursor-fx" ref={rootRef} aria-hidden="true" data-hot="false">
      <span className="cursor-spotlight" ref={glowRef} />
      <canvas ref={canvasRef} className="cursor-fx__canvas" />
    </div>
  )
}
