import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { presencePeople } from '../../data/presence'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { DummyImage } from '../ui/DummyImage'
import { SectionHeading } from '../layout/SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

/** Organic scatter for the portrait field (not geographic). */
const fieldSlots: Array<{ x: number; y: number; size: 'lg' | 'md' | 'sm' }> = [
  { x: 6, y: 8, size: 'lg' },
  { x: 38, y: 2, size: 'md' },
  { x: 68, y: 10, size: 'sm' },
  { x: 18, y: 42, size: 'md' },
  { x: 52, y: 36, size: 'lg' },
  { x: 78, y: 44, size: 'md' },
  { x: 8, y: 72, size: 'sm' },
  { x: 42, y: 70, size: 'md' },
  { x: 72, y: 74, size: 'lg' },
]

/**
 * Presence — real team portraits on an atmospheric stage.
 * Hover or select a person to bring them forward.
 */
export function PresenceSection() {
  const reduced = usePrefersReducedMotion()
  const [activeId, setActiveId] = useState(presencePeople[0]?.id ?? 'aoun')
  const activeIndex = Math.max(
    0,
    presencePeople.findIndex((person) => person.id === activeId),
  )
  const active = presencePeople[activeIndex] ?? presencePeople[0]!

  return (
    <section className="section presence" aria-label="The people behind the work">
      <div className="section__inner presence__inner">
        <SectionHeading
          kicker="Presence"
          title="Nine desks. One flow."
          body="A student team behind the brands — hover a portrait to meet who is in the room."
        />

        <div className="presence-room" data-active={active.id}>
          <div className="presence-room__glow" aria-hidden="true" />
          <div className="presence-room__grid" aria-hidden="true" />

          <div className="presence-room__feature">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={active.id}
                className="presence-room__portrait"
                initial={reduced ? false : { opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.38, ease }}
              >
                <DummyImage
                  src={active.visual}
                  alt=""
                  width={900}
                  height={1125}
                  loading="eager"
                  className="presence-room__photo"
                />
                <figcaption className="presence-room__caption">
                  <p className="presence-room__index">
                    {String(activeIndex + 1).padStart(2, '0')}
                    <span> / {String(presencePeople.length).padStart(2, '0')}</span>
                  </p>
                  <h3>{active.name}</h3>
                  <p className="presence-room__role">{active.role}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <ul className="presence-field" role="list">
            {presencePeople.map((person, index) => {
              const slot = fieldSlots[index] ?? fieldSlots[0]!
              const on = person.id === active.id
              return (
                <li
                  key={person.id}
                  className={`presence-pin presence-pin--${slot.size}${on ? ' is-on' : ''}`}
                  style={{
                    left: `${slot.x}%`,
                    top: `${slot.y}%`,
                    animationDelay: `${index * 0.22}s`,
                  }}
                >
                  <button
                    type="button"
                    className="presence-pin__btn"
                    aria-label={`${person.name}, ${person.role}`}
                    aria-pressed={on}
                    onPointerEnter={() => setActiveId(person.id)}
                    onFocus={() => setActiveId(person.id)}
                    onClick={() => setActiveId(person.id)}
                  >
                    <DummyImage
                      src={person.visual}
                      alt=""
                      width={320}
                      height={400}
                      className="presence-pin__photo"
                    />
                    <span className="presence-pin__veil" aria-hidden="true" />
                    <span className="presence-pin__meta">
                      <strong>{person.name.split(' ')[0]}</strong>
                      <em>{person.role}</em>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <p className="presence-room__hint">Hover a portrait</p>
        </div>
      </div>
    </section>
  )
}
