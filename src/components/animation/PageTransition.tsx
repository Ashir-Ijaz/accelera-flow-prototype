import { useLayoutEffect } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenisInstance } from '../../hooks/useLenisInstance'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type PageTransitionProps = {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const lenis = useLenisInstance()
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    lenis?.start()
    lenis?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => window.clearTimeout(refresh)
  }, [location.pathname, lenis])

  return (
    <motion.div
      key={location.pathname}
      className="page-enter"
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
