import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenisInstance } from '../../hooks/useLenisInstance'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useUiSound } from '../../hooks/useUiSound'
import { LOGO_MARK_SRC } from '../../data/navigation'

const ease = [0.22, 1, 0.36, 1] as const

type PageTransitionProps = {
  children: ReactNode
}

function RouteOverlay({ signal, onWhoosh }: { signal: string; onWhoosh: () => void }) {
  const [show, setShow] = useState(false)
  const first = useRef(true)

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setShow(true)
    onWhoosh()
  }, [signal, onWhoosh])

  return (
    <AnimatePresence>
      {show ? (
        <motion.div key={signal} className="route-overlay" aria-hidden="true">
          <motion.div
            className="route-overlay__veil"
            initial={{ clipPath: 'inset(0 0 0 0)' }}
            animate={{ clipPath: ['inset(0 0 0 0)', 'inset(0 0 0 0)', 'inset(0 0 100% 0)'] }}
            transition={{ duration: 0.92, times: [0, 0.34, 1], ease }}
            onAnimationComplete={() => setShow(false)}
          />
          <motion.div
            className="route-overlay__glow"
            initial={{ opacity: 0, scaleX: 0.15 }}
            animate={{ opacity: [0, 1, 0.85, 0], scaleX: [0.15, 1, 1.2, 1.35] }}
            transition={{ duration: 0.78, times: [0, 0.28, 0.62, 1], ease, delay: 0.04 }}
          />
          <motion.div
            className="route-overlay__line"
            initial={{ x: '-24vw', opacity: 0 }}
            animate={{ x: '124vw', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.76, times: [0, 0.1, 0.72, 1], ease, delay: 0.06 }}
          />
          <motion.img
            className="route-overlay__mark"
            src={LOGO_MARK_SRC}
            alt=""
            width={118}
            height={119}
            initial={{ opacity: 0, y: 16, x: '-50%', scale: 0.86 }}
            animate={{ opacity: [0, 1, 1, 0], y: [16, 0, 0, -12], x: '-50%', scale: [0.86, 1, 1.04, 1.08] }}
            transition={{ duration: 0.78, times: [0, 0.18, 0.68, 1], ease, delay: 0.05 }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const lenis = useLenisInstance()
  const reduced = usePrefersReducedMotion()
  const { playWhoosh } = useUiSound()

  useLayoutEffect(() => {
    lenis?.start()
    lenis?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 240)
    return () => window.clearTimeout(refresh)
  }, [location.pathname, lenis])

  return (
    <>
      {reduced ? null : <RouteOverlay signal={location.pathname} onWhoosh={playWhoosh} />}
      <div key={location.pathname} className="page-enter">
        {children}
      </div>
    </>
  )
}
