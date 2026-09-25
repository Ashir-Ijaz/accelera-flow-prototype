import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrandLogo } from '../ui/BrandLogo'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useLenisInstance } from '../../hooks/useLenisInstance'

const ease = [0.22, 1, 0.36, 1] as const
const SESSION_KEY = 'af-preloader-done'

type LogoPreloaderProps = {
  onDone: () => void
}

export function LogoPreloader({ onDone }: LogoPreloaderProps) {
  const reduced = usePrefersReducedMotion()
  const lenis = useLenisInstance()
  const [progress, setProgress] = useState(reduced ? 100 : 0)
  const [exiting, setExiting] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    lenis?.stop()
    document.documentElement.classList.add('is-booting')
    return () => {
      document.documentElement.classList.remove('is-booting')
      lenis?.start()
    }
  }, [lenis])

  useEffect(() => {
    if (reduced) {
      const id = window.setTimeout(() => {
        try {
          sessionStorage.setItem(SESSION_KEY, '1')
        } catch {
          /* private mode */
        }
        document.documentElement.classList.remove('is-booting')
        lenis?.start()
        onDone()
      }, 80)
      return () => window.clearTimeout(id)
    }

    const started = performance.now()
    const duration = 1400
    let frame = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration)
      const eased = 1 - (1 - t) ** 2.4
      setProgress(Math.round(eased * 100))
      if (t < 1) frame = requestAnimationFrame(tick)
      else window.setTimeout(() => setExiting(true), 160)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduced, lenis, onDone])

  useEffect(() => {
    if (!exiting) return
    const id = window.setTimeout(() => setVisible(false), 740)
    return () => window.clearTimeout(id)
  }, [exiting])

  const handleExitComplete = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* private mode */
    }
    document.documentElement.classList.remove('is-booting')
    lenis?.start()
    onDone()
  }

  if (reduced) return null

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible ? (
        <motion.div
          className={`preloader${exiting ? ' is-exit' : ''}`}
          role="status"
          aria-live="polite"
          aria-busy={!exiting}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease }}
        >
          <div className="preloader__split" aria-hidden="true">
            <span />
            <span />
          </div>

          <div className="preloader__content">
            <motion.div
              className="preloader__mark"
              animate={exiting ? { scale: 1.08, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: exiting ? 0.7 : 0.45, ease }}
            >
              <div className={`preloader__mask${progress > 6 ? ' is-open' : ''}`}>
                <BrandLogo className="brand-logo brand-logo--preloader" />
              </div>
              <div className={`preloader__sweep${progress > 16 ? ' is-run' : ''}`} aria-hidden="true" />
            </motion.div>
            <p className="preloader__word">Accelera Flow LTD</p>
          </div>

          <div className="preloader__progress">
            <span>{progress.toString().padStart(3, '0')}</span>
            <div className="preloader__line" aria-hidden="true">
              <i style={{ width: `${progress}%` }} />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function shouldShowPreloader() {
  if (typeof window === 'undefined') return true
  try {
    return sessionStorage.getItem(SESSION_KEY) !== '1'
  } catch {
    return true
  }
}
