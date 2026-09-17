import { useLayoutEffect, useRef, useState } from 'react'
import { Search, Map, PenTool, Radio, MessagesSquare, Sprout } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processStages } from '../../data/process'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeading } from '../layout/SectionHeading'
import type { ProcessStage } from '../../types'

const icons: Record<ProcessStage['icon'], typeof Search> = {
  search: Search,
  map: Map,
  'pen-tool': PenTool,
  radio: Radio,
  messages: MessagesSquare,
  sprout: Sprout,
}

export function ProcessSection() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(reduced ? processStages.length : 0)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node || reduced) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: node,
        start: 'top 75%',
        end: 'bottom 40%',
        onUpdate: (self) => {
          const next = Math.min(processStages.length, Math.ceil(self.progress * processStages.length))
          setActive((current) => (current === next ? current : next))
        },
      })
      gsap.fromTo(
        '.process-line',
        { strokeDashoffset: 480 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: node, start: 'top 75%', end: 'bottom 45%', scrub: true },
        },
      )
    }, node)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={ref} className="section process" aria-labelledby="process-title">
      <div className="section__inner">
        <SectionHeading kicker="Process" title="Discover to grow." />
        <svg className="process__path" viewBox="0 0 1200 80" aria-hidden="true">
          <path
            className="process-line"
            d="M20 50 C 180 10, 280 70, 420 40 S 700 10, 880 48 S 1100 20, 1180 42"
            fill="none"
            stroke="#FF6A00"
            strokeWidth="3"
            strokeDasharray="480"
            strokeDashoffset={reduced ? 0 : 480}
          />
        </svg>
        <div className="process__grid">
          {processStages.map((stage, index) => {
            const Icon = icons[stage.icon]
            const on = index < active
            return (
              <article key={stage.id} className={`process__item${on ? ' is-on' : ''}`}>
                <Icon size={18} color={on ? '#FF6A00' : '#A8A4A5'} aria-hidden="true" />
                <p className="process__num">{stage.index}</p>
                <h3>{stage.title}</h3>
                <p>{stage.sentence}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
