import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { voiceThemes } from '../../data/voices'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useLenisInstance } from '../../hooks/useLenisInstance'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { VoiceQuote } from './VoiceQuote'

const ease = [0.22, 1, 0.36, 1] as const
const HOLD = 0.74

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

/** Depth stack that stays inside the stage — previous cards visible only during handoff. */
function cardPose(offset: number, mobile: boolean) {
  const abs = Math.abs(offset)
  if (abs < 0.02) {
    return { x: 0, y: 0, rotateY: 0, scale: 1, opacity: 1, z: 60 }
  }
  if (abs >= 0.98) {
    return {
      x: offset * (mobile ? 3 : 4.5),
      y: abs * 1.2,
      rotateY: offset > 0 ? -14 : 14,
      scale: 0.9,
      opacity: 0,
      z: 10,
    }
  }
  const spread = mobile ? 2.6 : 3.8
  const fade = 1 - abs / 0.98
  return {
    x: offset * spread,
    y: abs * (mobile ? 0.6 : 0.9),
    rotateY: Math.max(-14, Math.min(14, offset * -12)),
    scale: Math.max(0.9, 1 - abs * 0.06),
    opacity: fade * fade * 0.5,
    z: Math.round(40 - abs * 12),
  }
}

/**
 * Sticky quote theater — voices orbit in a holographic 3D ring.
 */
export function VoicesTheater() {
  const reduced = usePrefersReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const lenis = useLenisInstance()
  const sectionRef = useRef<HTMLElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])
  const indexRef = useRef(0)
  const [active, setActive] = useState(0)
  const current = voiceThemes[active] ?? voiceThemes[0]

  useLayoutEffect(() => {
    if (reduced || voiceThemes.length === 0) return
    const section = sectionRef.current
    if (!section) return

    const paint = (progress: number) => {
      const position = visualPosition(progress, voiceThemes.length)
      const activeIndex = Math.min(voiceThemes.length - 1, Math.round(position))

      for (let index = 0; index < voiceThemes.length; index += 1) {
        const node = cardsRef.current[index]
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
        const next = cardPose(offset, isMobile)
        const hide = next.opacity < 0.04
        node.style.visibility = hide ? 'hidden' : 'visible'
        node.style.opacity = String(next.opacity)
        node.style.zIndex = String(next.z)
        node.style.pointerEvents = Math.abs(offset) < 0.2 ? 'auto' : 'none'
        node.style.transform = `translate3d(calc(-50% + ${next.x}rem), calc(-50% + ${next.y}rem), 0) rotateY(${next.rotateY}deg) scale(${next.scale})`
      }

      if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress})`
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${progress * 70}deg)`
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
  }, [isMobile, reduced])

  const jumpTo = (index: number) => {
    const section = sectionRef.current
    if (!section || voiceThemes.length < 2) return
    const top = section.getBoundingClientRect().top + window.scrollY
    const travel = Math.max(1, section.offsetHeight - window.innerHeight)
    const max = voiceThemes.length - 1
    const target = index >= max ? 1 : (index + HOLD * 0.45) / max
    const y = top + target * travel
    if (lenis) lenis.scrollTo(y, { duration: 0.9 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  if (reduced) {
    return (
      <div className="voices-gallery">
        {voiceThemes.map((voice, index) => (
          <VoiceQuote key={voice.id} voice={voice} index={index} />
        ))}
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="voices-theater"
      style={{ '--holds': voiceThemes.length } as CSSProperties}
      aria-label="Team voices"
    >
      <div className="voices-theater__pin">
        <div className="voices-theater__aura" aria-hidden="true" />
        <div className="voices-theater__ring" ref={ringRef} aria-hidden="true" />
        <div className="voices-theater__progress" aria-hidden="true">
          <span ref={fillRef} />
        </div>

        <AnimatePresence initial={false}>
          <motion.span
            key={`q-${current.id}`}
            className="voices-theater__glyph"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.12, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06, position: 'absolute' }}
            transition={{ duration: 0.5, ease }}
          >
            “
          </motion.span>
        </AnimatePresence>

        <div className="voices-theater__stage">
          <div className="voices-theater__deck">
            {voiceThemes.map((voice, index) => {
              const on = index === active
              return (
                <article
                  key={voice.id}
                  ref={(node) => {
                    cardsRef.current[index] = node
                  }}
                  className={`voices-theater__card${on ? ' is-on' : ''}`}
                  aria-hidden={!on}
                >
                  <div className="voices-theater__panel">
                    <p className="voices-theater__kicker">{voice.kicker}</p>
                    <h3 className="voices-theater__theme">{voice.theme}</h3>
                    <blockquote className="voices-theater__body">{voice.body}</blockquote>
                    <footer className="voices-theater__foot">
                      <span className="voices-theater__rule" aria-hidden="true" />
                      <cite>{voice.title}</cite>
                    </footer>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="voices-theater__meta">
          <AnimatePresence initial={false}>
            <motion.p
              key={current.id}
              className="voices-theater__live"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, position: 'absolute' }}
              transition={{ duration: 0.42, ease }}
            >
              <span>{current.title}</span>
              <em>
                {String(active + 1).padStart(2, '0')} / {String(voiceThemes.length).padStart(2, '0')}
              </em>
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="voices-theater__names" role="tablist" aria-label="Jump to voice">
          {voiceThemes.map((voice, index) => (
            <button
              key={voice.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={`voices-theater__name${index === active ? ' is-on' : ''}`}
              onClick={() => jumpTo(index)}
            >
              {voice.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
