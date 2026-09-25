import { useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ResultShot } from '../../types'
import { DummyImage } from '../ui/DummyImage'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useLenisInstance } from '../../hooks/useLenisInstance'

const ease = [0.22, 1, 0.36, 1] as const

type ResultsFilmProps = {
  items: ResultShot[]
  compact?: boolean
  lead?: string
}

function framePose(offset: number, mobile: boolean) {
  const spread = mobile ? 9.2 : 12.8
  const bias = mobile ? -2.4 : -5.6
  const abs = Math.abs(offset)
  const incoming = offset > 0
  return {
    x: offset * spread + bias,
    y: incoming ? abs * 5.2 : abs * -4.2,
    rotate: Math.max(-9, Math.min(9, offset * (mobile ? -4.4 : -5.2))),
    scale: Math.max(0.84, 1 - abs * 0.085),
    opacity: abs > 2.35 ? 0 : Math.max(0, 1 - abs * 0.26),
    z: Math.round(48 - abs * 8),
  }
}

export function ResultsFilm({ items, compact = false, lead }: ResultsFilmProps) {
  const reduced = usePrefersReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const lenis = useLenisInstance()
  const sectionRef = useRef<HTMLElement>(null)
  const framesRef = useRef<(HTMLButtonElement | null)[]>([])
  const fillRef = useRef<HTMLSpanElement>(null)
  const hintRef = useRef<HTMLParagraphElement>(null)
  const indexRef = useRef(0)
  const [active, setActive] = useState(0)
  const current = items[active] ?? items[0]

  useLayoutEffect(() => {
    if (reduced || items.length === 0) return
    const section = sectionRef.current
    if (!section) return

    const paint = (progress: number) => {
      const max = Math.max(1, items.length - 1)
      const position = progress * max
      for (let index = 0; index < items.length; index += 1) {
        const node = framesRef.current[index]
        if (!node) continue
        const offset = index - position
        if (Math.abs(offset) > 2.4) {
          if (node.style.visibility !== 'hidden') {
            node.style.visibility = 'hidden'
            node.style.opacity = '0'
            node.style.pointerEvents = 'none'
          }
          continue
        }
        const next = framePose(offset, isMobile)
        node.style.visibility = next.opacity < 0.04 ? 'hidden' : 'visible'
        node.style.opacity = String(next.opacity)
        node.style.zIndex = String(next.z)
        node.style.pointerEvents = next.opacity < 0.08 ? 'none' : 'auto'
        node.style.transform = `translate3d(calc(-50% + ${next.x}rem), calc(-50% + ${next.y}%), 0) rotateY(${next.rotate}deg) scale(${next.scale})`
      }
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${progress})`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, 1 - progress * 9))
      }
      const nextIndex = Math.min(items.length - 1, Math.round(position))
      if (nextIndex !== indexRef.current) {
        indexRef.current = nextIndex
        setActive(nextIndex)
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
  }, [items, isMobile, reduced])

  const jumpTo = (index: number) => {
    const section = sectionRef.current
    if (!section || items.length < 2) return
    const top = section.getBoundingClientRect().top + window.scrollY
    const travel = section.offsetHeight - window.innerHeight
    const y = top + (index / (items.length - 1)) * travel
    if (lenis) lenis.scrollTo(y, { duration: 1.05 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  if (!current) return null

  if (reduced) {
    return (
      <section className="results-reel results-reel--static" aria-label="Results">
        {items.map((item, index) => (
          <article key={item.id} className="results-reel__still">
            <p className="results-reel__index">
              {String(index + 1).padStart(2, '0')}
            </p>
            <div className="results-reel__frame results-reel__frame--still">
              <span className="results-reel__plate">
                <DummyImage className="results-reel__shot" src={item.visual} alt="" />
              </span>
            </div>
            <div>
              <small>{item.kicker}</small>
              <h3>{item.label}</h3>
              {item.period ? <p>{item.period}</p> : null}
              <p>{item.detail}</p>
            </div>
          </article>
        ))}
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className={`results-reel${compact ? ' results-reel--compact' : ''}${isMobile ? ' results-reel--mobile' : ''}`}
      style={{ '--holds': String(items.length) } as CSSProperties}
      aria-label="Results"
    >
      <div className="results-reel__pin">
        <div className="results-reel__orbs" aria-hidden="true">
          <span className="results-reel__orb results-reel__orb--a" />
          <span className="results-reel__orb results-reel__orb--b" />
        </div>
        <div className="results-reel__grain" aria-hidden="true" />

        <header className="results-reel__top">
          <div>
            <p className="section-heading__kicker">Results</p>
            {lead ? <p className="results-reel__lead">{lead}</p> : null}
          </div>
          <div className="results-reel__top-end">
            <p className="results-reel__count">
              <AnimatePresence initial={false}>
                <motion.span
                  key={current.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6, position: 'absolute' }}
                  transition={{ duration: 0.45, ease }}
                >
                  {String(active + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              <span className="results-reel__total"> / {String(items.length).padStart(2, '0')}</span>
            </p>
            <p ref={hintRef} className="results-reel__hint">
              Scroll through
            </p>
          </div>
        </header>

        <div className="results-reel__stage">
          <div className="results-reel__floor" aria-hidden="true" />
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              ref={(node) => {
                framesRef.current[index] = node
              }}
              className={`results-reel__frame${index === active ? ' is-on' : ''}`}
              onClick={() => jumpTo(index)}
              aria-label={`${item.label}. ${item.detail}`}
              aria-current={index === active}
            >
              <span className="results-reel__plate">
                <DummyImage
                  className="results-reel__shot"
                  src={item.visual}
                  alt=""
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
              </span>
            </button>
          ))}
        </div>

        <div className="results-reel__foot">
          <div className="results-reel__copy">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, position: 'absolute', left: 0, right: 0, top: 0 }}
                transition={{ duration: 0.52, ease }}
              >
                <motion.small
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {current.kicker}
                </motion.small>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.04 }}
                >
                  {current.label}
                </motion.h2>
                <motion.span
                  className="results-reel__rule"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease, delay: 0.08 }}
                  aria-hidden="true"
                />
                {current.period ? (
                  <motion.p
                    className="results-reel__period"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36, ease, delay: 0.1 }}
                  >
                    {current.period}
                  </motion.p>
                ) : null}
                <motion.p
                  className="results-reel__detail"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.44, ease, delay: 0.14 }}
                >
                  {current.detail}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="results-reel__ticks" aria-hidden="true">
            <span className="results-reel__track">
              <span className="results-reel__fill" ref={fillRef} />
            </span>
            <div className="results-reel__dots">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={index === active ? 'is-on' : undefined}
                  onClick={() => jumpTo(index)}
                  tabIndex={-1}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {current.label}
          {current.period ? ` · ${current.period}` : ''}. {current.detail}
        </p>
      </div>
    </section>
  )
}
