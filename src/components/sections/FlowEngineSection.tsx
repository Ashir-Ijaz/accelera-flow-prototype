import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { flowStages, stageFromProgress } from '../../data/flowStages'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { FlowEngineFallback } from '../three/FlowEngineFallback'
import { ScrollStageCopy } from '../three/ScrollStageCopy'
import { WebGLErrorBoundary } from '../three/WebGLErrorBoundary'
import type { MutableProgress } from '../three/flowPaths'

const FlowEngineCanvas = lazy(() => import('../three/FlowEngineCanvas'))

export function FlowEngineSection() {
  const reduced = usePrefersReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<MutableProgress>({ value: 0 })
  const stageKeyRef = useRef(flowStages[0].key)
  const [stage, setStage] = useState(flowStages[0])
  const [active, setActive] = useState(true)
  const pinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = pinRef.current
    if (!node) return

    const sync = () => {
      const rect = node.getBoundingClientRect()
      const near = rect.bottom > 0 && rect.top < window.innerHeight
      setActive(near && document.visibilityState === 'visible')
    }

    const observer = new IntersectionObserver(sync, { rootMargin: '12% 0px', threshold: 0 })
    observer.observe(node)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [reduced])

  useLayoutEffect(() => {
    if (reduced) return
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current.value = self.progress
          const next = stageFromProgress(self.progress)
          if (next.key !== stageKeyRef.current) {
            stageKeyRef.current = next.key
            setStage(next)
          }
        },
      })
    }, section)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [isMobile, reduced])

  if (reduced) {
    return (
      <section className="flow-engine flow-engine--static" aria-label="Flow Engine">
        <FlowEngineFallback />
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className={`flow-engine${isMobile ? ' flow-engine--mobile' : ''}`}
      aria-label="Flow Engine"
    >
      <div ref={pinRef} className="flow-engine__pin">
        <WebGLErrorBoundary>
          <Suspense fallback={<div className="flow-engine__canvas" />}>
            <FlowEngineCanvas
              progressRef={progressRef}
              reduced={reduced}
              isMobile={isMobile}
              active={active}
              emphasized={stage.boards}
            />
          </Suspense>
        </WebGLErrorBoundary>
        <ScrollStageCopy stage={stage} />
      </div>
    </section>
  )
}
