import { useCallback, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { teamMembers } from '../../data/team'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { DummyImage } from '../ui/DummyImage'
import { SectionHeading } from '../layout/SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

export function TeamSection() {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const member = teamMembers[active] ?? teamMembers[0]!
  const count = teamMembers.length

  const go = useCallback(
    (next: number) => {
      const index = ((next % count) + count) % count
      let dir = index > active ? 1 : -1
      if (active === count - 1 && index === 0) dir = 1
      if (active === 0 && index === count - 1) dir = -1
      setDirection(dir)
      setActive(index)
    },
    [active, count],
  )

  const onKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(active + 1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(active - 1)
    }
  }

  return (
    <section className="section team" aria-labelledby="team-title" onKeyDown={onKeyDown}>
      <div className="section__inner">
        <SectionHeading kicker="Team" title="The people behind the work." />
        <div className="team-stage">
          <div className="team-stage__frame">
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.div
                key={member.id}
                className="team-stage__portrait"
                custom={direction}
                initial={reduced ? false : { opacity: 0, x: direction * 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: direction * -28 }}
                transition={{ duration: reduced ? 0 : 0.32, ease }}
              >
                <DummyImage src={member.visual} width={900} height={1125} alt="" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="team-stage__copy">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={member.id}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduced ? 0 : 0.28, ease }}
              >
                {member.role ? <p className="team-stage__role">{member.role}</p> : null}
                <h3>{member.name}</h3>
                <p className="team-stage__index">
                  {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="team-stage__nav">
              <button type="button" className="icon-btn" aria-label="Previous person" onClick={() => go(active - 1)}>
                <ChevronLeft size={20} strokeWidth={2.2} />
              </button>
              <button type="button" className="icon-btn" aria-label="Next person" onClick={() => go(active + 1)}>
                <ChevronRight size={20} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
        <div className="team-line" role="tablist" aria-label="Team">
          {teamMembers.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={item.name}
              className={`team-line__dot${index === active ? ' is-on' : ''}`}
              onClick={() => go(index)}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: reduced ? 0 : index * 0.045, ease }}
            >
              <DummyImage src={item.visual} width={900} height={1125} alt="" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
