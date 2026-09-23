import { useLayoutEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../../data/services'
import { useLenisInstance } from '../../hooks/useLenisInstance'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeading } from '../layout/SectionHeading'
import { ServicePanel } from '../ui/ServicePanel'
import { MagneticButton } from '../animation/MagneticButton'

export function ServicesStorySection() {
  const reduced = usePrefersReducedMotion()
  const lenis = useLenisInstance()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ on: false, x: 0, scroll: 0 })
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    if (reduced) return
    const section = sectionRef.current
    const pin = pinRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section || !pin || !viewport || !track) return

    const measure = () => {
      const travel = Math.max(0, track.scrollWidth - viewport.clientWidth)
      section.style.height = `${window.innerHeight + travel}px`
      return travel
    }

    const ctx = gsap.context(() => {
      measure()
      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -(track.scrollWidth - viewport.clientWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(1, track.scrollWidth - viewport.clientWidth)}`,
            scrub: true,
            invalidateOnRefresh: true,
            onRefresh: measure,
            onUpdate: (self) => {
              const next = Math.round(self.progress * (services.length - 1))
              setActive((current) => (current === next ? current : next))
            },
          },
        },
      )
    }, section)

    const onResize = () => {
      measure()
      ScrollTrigger.refresh()
    }
    const images = Array.from(track.querySelectorAll('img'))
    images.forEach((image) => image.addEventListener('load', onResize))
    window.addEventListener('resize', onResize)
    ScrollTrigger.refresh()

    return () => {
      images.forEach((image) => image.removeEventListener('load', onResize))
      window.removeEventListener('resize', onResize)
      section.style.height = ''
      ctx.revert()
    }
  }, [reduced])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    drag.current = { on: true, x: event.clientX, scroll: window.scrollY }
    event.currentTarget.classList.add('is-dragging')
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return
    const next = drag.current.scroll + (drag.current.x - event.clientX)
    if (lenis) lenis.scrollTo(next, { immediate: true })
    else window.scrollTo({ top: next, left: 0, behavior: 'auto' })
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    drag.current.on = false
    event.currentTarget.classList.remove('is-dragging')
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`services-story${reduced ? ' services-story--static' : ''}`}
      aria-labelledby="services-story-title"
    >
      <div ref={pinRef} className="services-story__pin">
        <div className="services-story__heading">
          <SectionHeading kicker="Services" title="Five practices, one publishing system." />
        </div>
        <div
          ref={viewportRef}
          className="services-story__viewport"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div ref={trackRef} className="services-story__track">
            {services.map((service, index) => (
              <ServicePanel key={service.id} service={service} active={index === active} />
            ))}
          </div>
        </div>
        <div className="services-story__footer">
          <div className="services-progress" aria-hidden="true">
            <i style={{ width: `${((active + 1) / services.length) * 100}%` }} />
          </div>
          <MagneticButton to="/services" className="btn btn--ghost">
            All services
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
