import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../../data/services'
import { serviceMedia, media } from '../../data/media'
import { DummyImage } from '../ui/DummyImage'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useLenisInstance } from '../../hooks/useLenisInstance'
import { useMagnetic } from '../../hooks/useMagnetic'
import { ServiceDetailBlock } from './ServiceDetailBlock'

const ease = [0.22, 1, 0.36, 1] as const
/** Share of each chapter spent fully settled & readable */
const HOLD = 0.72

/** Flat dwell in the middle of each chapter, short eased handoff at the edge. */
function visualPosition(progress: number, count: number) {
  const max = Math.max(1, count - 1)
  const raw = progress * max
  if (raw >= max) return max
  const i = Math.floor(raw)
  const t = raw - i
  if (t <= HOLD) return i
  const u = (t - HOLD) / (1 - HOLD)
  const smoothed = u * u * (3 - 2 * u)
  return i + smoothed
}

function shotPose(offset: number) {
  const abs = Math.abs(offset)
  if (abs < 0.02) {
    return { x: 0, y: 0, rotateY: 0, rotateX: 0, scale: 1, opacity: 1, z: 50 }
  }
  // Hide settled neighbors completely — only show during the handoff window
  if (abs >= 0.98) {
    return {
      x: offset * 18,
      y: offset > 0 ? 8 : -6,
      rotateY: offset > 0 ? -18 : 18,
      rotateX: 0,
      scale: 0.88,
      opacity: 0,
      z: 10,
    }
  }
  const incoming = offset > 0
  const fade = 1 - abs / 0.98
  return {
    x: offset * 16,
    y: incoming ? abs * 5 : abs * -4,
    rotateY: Math.max(-22, Math.min(22, offset * -16)),
    rotateX: Math.max(-4, Math.min(4, offset * 2)),
    scale: Math.max(0.86, 1 - abs * 0.1),
    opacity: fade * fade * 0.55,
    z: Math.round(30 - abs * 14),
  }
}

/**
 * Sticky scroll cinema — practices stack in 3D film depth as you scrub.
 */
export function ServicesCinema() {
  const reduced = usePrefersReducedMotion()
  const lenis = useLenisInstance()
  const sectionRef = useRef<HTMLElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const bladeRef = useRef<HTMLSpanElement>(null)
  const shutterRef = useRef<HTMLSpanElement>(null)
  const shotsRef = useRef<(HTMLDivElement | null)[]>([])
  const indexRef = useRef(0)
  const [active, setActive] = useState(0)
  const current = services[active] ?? services[0]
  const visual = useMagnetic<HTMLDivElement>({
    strength: 8,
    scale: 1.01,
    tilt: true,
    tiltStrength: 3,
  })

  useLayoutEffect(() => {
    if (reduced || services.length === 0) return
    const section = sectionRef.current
    if (!section) return

    const paint = (progress: number) => {
      const position = visualPosition(progress, services.length)
      const activeIndex = Math.min(services.length - 1, Math.round(position))

      for (let index = 0; index < services.length; index += 1) {
        const node = shotsRef.current[index]
        if (!node) continue
        const offset = index - position
        if (Math.abs(offset) > 1.02) {
          if (node.style.opacity !== '0') {
            node.style.opacity = '0'
            node.style.pointerEvents = 'none'
            node.style.visibility = 'hidden'
          }
          continue
        }
        const next = shotPose(offset)
        const hide = next.opacity < 0.04
        node.style.visibility = hide ? 'hidden' : 'visible'
        node.style.opacity = String(next.opacity)
        node.style.zIndex = String(next.z)
        node.style.pointerEvents = 'none'
        node.style.transform = `translate3d(${next.x}%, ${next.y}%, 0) rotateX(${next.rotateX}deg) rotateY(${next.rotateY}deg) scale(${next.scale})`
      }

      if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress})`
      if (bladeRef.current) {
        bladeRef.current.style.transform = `translate3d(0, ${progress * 86}%, 0)`
        bladeRef.current.style.opacity = String(0.25 + progress * 0.55)
      }
      if (shutterRef.current) {
        const max = Math.max(1, services.length - 1)
        const raw = progress * max
        const t = raw - Math.floor(raw)
        const inHandoff = t > HOLD
        const flash = inHandoff ? Math.sin(((t - HOLD) / (1 - HOLD)) * Math.PI) : 0
        shutterRef.current.style.opacity = String(flash * 0.35)
      }

      if (activeIndex !== indexRef.current) {
        indexRef.current = activeIndex
        setActive(activeIndex)
      }
    }

    paint(0)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => paint(self.progress),
      })
    }, section)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [reduced])

  const jumpTo = (index: number) => {
    const section = sectionRef.current
    if (!section || services.length < 2) return
    const top = section.getBoundingClientRect().top + window.scrollY
    const travel = Math.max(1, section.offsetHeight - window.innerHeight)
    const max = services.length - 1
    const target = index >= max ? 1 : (index + HOLD * 0.45) / max
    const y = top + target * travel
    if (lenis) lenis.scrollTo(y, { duration: 0.85 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  if (reduced) {
    return (
      <div className="services-page">
        {services.map((service, index) => (
          <ServiceDetailBlock key={service.id} service={service} index={index} />
        ))}
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="services-cinema"
      style={{ '--holds': services.length } as CSSProperties}
      aria-label="Services cinema"
    >
      <div className="services-cinema__pin">
        <span className="services-cinema__blade" ref={bladeRef} aria-hidden="true" />
        <span className="services-cinema__shutter" ref={shutterRef} aria-hidden="true" />
        <div className="services-cinema__progress" aria-hidden="true">
          <span ref={fillRef} />
        </div>

        <aside className="services-cinema__rail" aria-label="Practices">
          {services.map((service, index) => (
            <button
              key={service.id}
              type="button"
              className={`services-cinema__rail-btn${index === active ? ' is-on' : ''}`}
              onClick={() => jumpTo(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <em>{service.title}</em>
            </button>
          ))}
        </aside>

        <div className="services-cinema__stage">
          <AnimatePresence initial={false}>
            <motion.p
              key={`num-${current.id}`}
              className="services-cinema__giant"
              aria-hidden="true"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14, position: 'absolute', inset: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              {String(active + 1).padStart(2, '0')}
            </motion.p>
          </AnimatePresence>

          <div
            ref={visual.ref}
            className="services-cinema__gate magnetic-card"
            onPointerMove={visual.onPointerMove}
            onPointerLeave={visual.onPointerLeave}
          >
            <div className="services-cinema__deck">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  ref={(node) => {
                    shotsRef.current[index] = node
                  }}
                  className="services-cinema__shot"
                >
                  <DummyImage
                    src={serviceMedia[service.id] ?? media.flow}
                    alt=""
                    width={1600}
                    height={900}
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
            <span className="services-cinema__frame" aria-hidden="true" />
          </div>

          <div className="services-cinema__copy">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, position: 'absolute', inset: 0 }}
                transition={{ duration: 0.48, ease }}
              >
                <p className="section-heading__kicker">
                  Practice {String(active + 1).padStart(2, '0')} /{' '}
                  {String(services.length).padStart(2, '0')}
                </p>
                <h2 className="services-cinema__title">{current.title}</h2>
                <p className="lede">{current.description}</p>
                <div className="services-cinema__lists">
                  <div>
                    <h3>Suitable for</h3>
                    <ul className="tag-list">
                      {current.suitableFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>What we deliver</h3>
                    <ul className="tag-list">
                      {current.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="services-cinema__hint" aria-hidden="true">
          Scroll the practices
        </p>
      </div>
    </section>
  )
}
