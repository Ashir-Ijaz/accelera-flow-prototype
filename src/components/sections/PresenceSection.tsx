import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { presenceDesks } from '../../data/presence'
import { WORLD_MAP, projectDesk } from '../../data/worldMap'
import { useLenisInstance } from '../../hooks/useLenisInstance'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { globeTextureSrc } from '../../lib/globeTexture'
import { SectionHeading } from '../layout/SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const
const IDLE_SPIN = 0.055
const DRAG_GAIN = 190
const DAMPING = 0.94
const PIN =
  'M0 0C0 0 11-11 11-20C11-26.8 6.2-32 0-32C-6.2-32-11-26.8-11-20C-11-11 0 0 0 0Z'

function wrapGlobePercent(mapX: number, yaw: number) {
  const t = (((mapX / WORLD_MAP.width - yaw / 360) % 1) + 1) % 1
  const x = t * 200
  return x > 100 ? x - 200 : x
}

function GlobePins() {
  return (
    <>
      {presenceDesks.map((desk) => {
        const point = projectDesk(desk.lng, desk.lat)
        return (
          <button
            key={desk.id}
            type="button"
            data-desk={desk.id}
            className="presence-map__hit"
            style={{
              left: `${(point.x / WORLD_MAP.width) * 100}%`,
              top: `${(point.y / WORLD_MAP.height) * 100}%`,
            }}
            aria-label={`${desk.city}, ${desk.region}`}
          >
            <svg className="presence-map__pin" viewBox="-14 -34 28 36" aria-hidden="true">
              <circle className="presence-map__pulse" r="12" cy="-12" />
              <path d={PIN} />
              <circle cy="-21" r="3.1" fill="#F5F3F1" />
            </svg>
          </button>
        )
      })}
    </>
  )
}

export function PresenceSection() {
  const reduced = usePrefersReducedMotion()
  const lenis = useLenisInstance()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mapSrc, setMapSrc] = useState('')
  const globeRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const yawRef = useRef(0)
  const velRef = useRef(reduced ? 0 : IDLE_SPIN)
  const dragRef = useRef({
    pointer: -1,
    live: false,
    moved: false,
    lastX: 0,
    lastT: 0,
    width: 1,
  })
  const activeRef = useRef<string | null>(null)
  const reducedRef = useRef(reduced)
  const [cardYaw, setCardYaw] = useState(0)
  const active = presenceDesks.find((desk) => desk.id === activeId)
  const activePoint = active ? projectDesk(active.lng, active.lat) : null
  const cardLeft = activePoint ? wrapGlobePercent(activePoint.x, cardYaw) : 0
  const cardTop = activePoint ? (activePoint.y / WORLD_MAP.height) * 100 : 0

  useEffect(() => {
    activeRef.current = activeId
  }, [activeId])

  useEffect(() => {
    reducedRef.current = reduced
  }, [reduced])

  const applySpin = () => {
    yawRef.current = ((yawRef.current % 360) + 360) % 360
    if (worldRef.current) {
      worldRef.current.style.transform = `translate3d(${-(yawRef.current / 360) * 50}%, 0, 0)`
    }
  }

  useEffect(() => {
    setMapSrc(globeTextureSrc())
  }, [])

  useEffect(() => {
    applySpin()
    let frame = 0
    let running = true

    const tick = () => {
      if (!running) return
      if (!dragRef.current.live) {
        if (activeRef.current) {
          velRef.current *= 0.82
        } else if (reducedRef.current) {
          velRef.current *= DAMPING
          if (Math.abs(velRef.current) < 0.01) velRef.current = 0
        } else if (Math.abs(velRef.current) < IDLE_SPIN + 0.02) {
          velRef.current += (IDLE_SPIN - velRef.current) * 0.04
        } else {
          velRef.current *= DAMPING
        }
        yawRef.current += velRef.current
        applySpin()
      }
      frame = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (running && frame) return
      running = true
      frame = window.requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      window.cancelAnimationFrame(frame)
      frame = 0
    }

    const onVis = () => {
      if (document.visibilityState === 'visible') start()
      else stop()
    }

    document.addEventListener('visibilitychange', onVis)
    start()

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    event.preventDefault()
    dragRef.current = {
      pointer: event.pointerId,
      live: false,
      moved: false,
      lastX: event.clientX,
      lastT: performance.now(),
      width: event.currentTarget.getBoundingClientRect().width || 1,
    }
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (drag.pointer !== event.pointerId) return

    const dx = event.clientX - drag.lastX
    const now = performance.now()
    if (!drag.live) {
      if (Math.abs(dx) < 6) return
      drag.live = true
      drag.moved = true
      globeRef.current?.classList.add('is-dragging')
      globeRef.current?.setPointerCapture(event.pointerId)
      setActiveId(null)
      lenis?.stop()
    }

    const dt = Math.max(8, now - drag.lastT)
    const dyaw = -(dx / drag.width) * DRAG_GAIN
    yawRef.current += dyaw
    velRef.current = dyaw * (16 / dt)
    drag.lastX = event.clientX
    drag.lastT = now
    applySpin()
  }

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (drag.pointer !== event.pointerId && !drag.live) {
      drag.pointer = -1
      return
    }
    const wasDragging = drag.live
    drag.live = false
    drag.pointer = -1
    globeRef.current?.classList.remove('is-dragging')
    if (wasDragging) {
      velRef.current = Math.max(-4.2, Math.min(4.2, velRef.current))
      lenis?.start()
    }
    if (globeRef.current?.hasPointerCapture(event.pointerId)) {
      globeRef.current.releasePointerCapture(event.pointerId)
    }
    window.setTimeout(() => {
      drag.moved = false
    }, 40)
  }

  const showDesk = (id: string) => {
    if (dragRef.current.live || dragRef.current.moved) return
    setCardYaw(yawRef.current)
    setActiveId(id)
  }

  return (
    <section className="section presence" aria-label="Desks across the map">
      <div className="section__inner presence__inner">
        <SectionHeading
          kicker="Presence"
          title="Desks across the map."
          body="Drag to turn the globe. Hover a pin for that desk."
        />
        <div
          ref={globeRef}
          className="presence-globe"
          data-active={activeId ?? ''}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerOver={(event) => {
            const target = event.target as HTMLElement
            const hit = target.closest<HTMLElement>('.presence-map__hit')
            if (hit?.dataset.desk) showDesk(hit.dataset.desk)
          }}
          onPointerOut={(event) => {
            const next = event.relatedTarget as HTMLElement | null
            if (next?.closest('.presence-map__hit, .presence-map__card')) return
            if (!dragRef.current.live) setActiveId(null)
          }}
        >
          <div className="presence-globe__disc">
            <div ref={worldRef} className="presence-map__world">
              <div className="presence-map__copy">
                {mapSrc ? <img className="presence-map__photo" src={mapSrc} alt="" draggable={false} /> : null}
                <GlobePins />
              </div>
              <div className="presence-map__copy">
                {mapSrc ? <img className="presence-map__photo" src={mapSrc} alt="" draggable={false} /> : null}
                <GlobePins />
              </div>
            </div>
          </div>
          <p className="presence-globe__hint">Drag to rotate</p>
          <AnimatePresence>
            {active && activePoint ? (
              <motion.aside
                key={active.id}
                className={`presence-map__card${cardLeft > 58 ? ' is-left' : ''}${cardTop > 62 ? ' is-up' : ''}`}
                style={{
                  left: cardLeft > 58 ? undefined : `${cardLeft}%`,
                  right: cardLeft > 58 ? `${100 - cardLeft}%` : undefined,
                  top: cardTop > 62 ? undefined : `${cardTop}%`,
                  bottom: cardTop > 62 ? `${100 - cardTop}%` : undefined,
                }}
                initial={reduced ? false : { opacity: 0, scale: 0.96, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.98, y: 4 }}
                transition={{ duration: 0.12, ease }}
              >
                <p className="presence-map__card-kicker">{active.region}</p>
                <p className="presence-map__card-city">{active.city}</p>
                <ul className="presence-map__people">
                  {active.people.map((person) => (
                    <li key={person.name}>
                      <strong>{person.name}</strong>
                      <span>{person.role}</span>
                    </li>
                  ))}
                </ul>
                <p>{active.focus}</p>
              </motion.aside>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
