import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { LenisContext } from '../../hooks/useLenisInstance'
import type { LenisApi } from '../../hooks/useLenisInstance'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

type SmoothScrollProviderProps = {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reduced = usePrefersReducedMotion()
  const location = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  const api = useMemo<LenisApi>(
    () => ({
      scrollTo: (value, options) => {
        const instance = lenisRef.current
        if (instance) instance.scrollTo(value, options)
        else window.scrollTo({ top: value, left: 0, behavior: options?.immediate ? 'auto' : 'smooth' })
      },
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [],
  )

  useEffect(() => {
    if (reduced) return

    const instance = new Lenis({
      autoRaf: false,
      duration: 0.55,
      smoothWheel: true,
    })

    lenisRef.current = instance
    instance.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      instance.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    void document.fonts.ready.then(refresh)

    return () => {
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(tick)
      instance.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  useLayoutEffect(() => {
    lenisRef.current?.start()
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => window.clearTimeout(id)
  }, [location.pathname])

  return <LenisContext.Provider value={api}>{children}</LenisContext.Provider>
}
