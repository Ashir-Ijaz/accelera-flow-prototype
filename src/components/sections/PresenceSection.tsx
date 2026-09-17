import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { presenceDesks } from '../../data/presence'
import {
  WORLD_MAP,
  countryPaths,
  graticule,
  lakePaths,
  landTone,
  projectDesk,
} from '../../data/worldMap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeading } from '../layout/SectionHeading'
import { Reveal } from '../animation/Reveal'

const ease = [0.22, 1, 0.36, 1] as const
const PIN =
  'M0 0C0 0 11-11 11-20C11-26.8 6.2-32 0-32C-6.2-32-11-26.8-11-20C-11-11 0 0 0 0Z'

function flightArc(
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  const lift = Math.min(92, 16 + Math.hypot(to.x - from.x, to.y - from.y) * 0.16)
  return `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${Math.min(from.y, to.y) - lift} ${to.x} ${to.y}`
}

export function PresenceSection() {
  const reduced = usePrefersReducedMotion()
  const [activeId, setActiveId] = useState(presenceDesks[0].id)
  const grid = useMemo(() => graticule(), [])
  const active = presenceDesks.find((desk) => desk.id === activeId) ?? presenceDesks[0]
  const hub = projectDesk(presenceDesks[0].lng, presenceDesks[0].lat)
  const activePoint = projectDesk(active.lng, active.lat)

  return (
    <section className="section presence" aria-label="Desks across the map">
      <div className="section__inner">
        <SectionHeading
          kicker="Presence"
          title="Desks across the map."
          body="The work is faceless. The people behind it are not in one room. These are the student desks the brands are made from, with the company registered in the United Kingdom."
        />
        <Reveal className="presence__stage">
          <div className="presence-map">
            <svg
              className="presence-map__svg"
              viewBox={`0 0 ${WORLD_MAP.width} ${WORLD_MAP.height}`}
              role="img"
              aria-label="World map of Accelera Flow desks"
            >
              <defs>
                <linearGradient id="presence-ocean" x1="0%" y1="0%" x2="8%" y2="100%">
                  <stop offset="0%" stopColor="#141821" />
                  <stop offset="48%" stopColor="#10141c" />
                  <stop offset="100%" stopColor="#0c0f15" />
                </linearGradient>
                <radialGradient id="presence-globe" cx="48%" cy="42%" r="62%">
                  <stop offset="0%" stopColor="rgba(255,106,0,0.1)" />
                  <stop offset="58%" stopColor="rgba(255,106,0,0.02)" />
                  <stop offset="100%" stopColor="rgba(255,106,0,0)" />
                </radialGradient>
                <filter id="presence-land-shadow" x="-4%" y="-4%" width="108%" height="108%">
                  <feDropShadow dx="0" dy="1.2" stdDeviation="1.4" floodColor="#000" floodOpacity="0.45" />
                </filter>
                <filter id="presence-pin-glow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="2.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width={WORLD_MAP.width} height={WORLD_MAP.height} fill="url(#presence-ocean)" />
              <rect width={WORLD_MAP.width} height={WORLD_MAP.height} fill="url(#presence-globe)" />
              {grid.map((line) => (
                <path
                  key={line.d}
                  d={line.d}
                  className={line.major ? 'presence-map__graticule is-major' : 'presence-map__graticule'}
                />
              ))}
              <g filter="url(#presence-land-shadow)">
                {countryPaths.map((country, index) => (
                  <path
                    key={index}
                    d={country.d}
                    fill={landTone(country.tone)}
                    stroke="rgba(18, 16, 17, 0.55)"
                    strokeWidth="0.85"
                    strokeLinejoin="round"
                  />
                ))}
              </g>
              {lakePaths.map((d, index) => (
                <path key={`lake-${index}`} d={d} fill="#0d1118" stroke="rgba(18,16,17,0.35)" strokeWidth="0.4" />
              ))}
              {presenceDesks.map((desk) => {
                if (desk.id === presenceDesks[0].id) return null
                const to = projectDesk(desk.lng, desk.lat)
                const on = desk.id === activeId
                return (
                  <path
                    key={`${desk.id}-arc`}
                    d={flightArc(hub, to)}
                    fill="none"
                    stroke={on ? '#FF6A00' : 'rgba(255,106,0,0.22)'}
                    strokeWidth={on ? 1.7 : 1}
                    className={reduced ? undefined : 'presence-map__arc'}
                  />
                )
              })}
              {presenceDesks.map((desk) => {
                const point = projectDesk(desk.lng, desk.lat)
                const on = desk.id === activeId
                const labelX = desk.label === 'left' ? -16 : 16
                return (
                  <g
                    key={desk.id}
                    className={`presence-map__marker${on ? ' is-on' : ''}`}
                    transform={`translate(${point.x} ${point.y})`}
                    filter={on ? 'url(#presence-pin-glow)' : undefined}
                  >
                    {reduced ? null : <circle className="presence-map__pulse" r="18" cy="-8" />}
                    <path d={PIN} fill={on ? '#FF9400' : '#F04400'} />
                    <circle cy="-21" r="3.1" fill="#F5F3F1" />
                    <text
                      x={labelX}
                      y="-18"
                      textAnchor={desk.label === 'left' ? 'end' : 'start'}
                      className="presence-map__label"
                    >
                      {desk.city}
                    </text>
                  </g>
                )
              })}
            </svg>
            {presenceDesks.map((desk) => {
              const point = projectDesk(desk.lng, desk.lat)
              return (
                <button
                  key={`${desk.id}-hit`}
                  type="button"
                  className={`presence-map__hit${desk.id === activeId ? ' is-on' : ''}`}
                  style={{
                    left: `${(point.x / WORLD_MAP.width) * 100}%`,
                    top: `${(point.y / WORLD_MAP.height) * 100}%`,
                  }}
                  aria-pressed={desk.id === activeId}
                  aria-label={`${desk.city}, ${desk.region}`}
                  onMouseEnter={() => setActiveId(desk.id)}
                  onFocus={() => setActiveId(desk.id)}
                  onClick={() => setActiveId(desk.id)}
                />
              )
            })}
            <aside
              className="presence-map__card"
              style={{
                left: `${Math.min(72, Math.max(4, (activePoint.x / WORLD_MAP.width) * 100 - 8))}%`,
                top: `${Math.min(78, Math.max(10, (activePoint.y / WORLD_MAP.height) * 100 + 6))}%`,
              }}
            >
              <p className="presence-map__card-kicker">{active.region}</p>
              <p className="presence-map__card-city">{active.city}</p>
              <p>{active.focus}</p>
            </aside>
          </div>
          <ul className="presence-list">
            {presenceDesks.map((desk, index) => (
              <motion.li
                key={desk.id}
                initial={reduced ? false : { opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease }}
              >
                <button
                  type="button"
                  className={`presence-list__item${desk.id === activeId ? ' is-on' : ''}`}
                  onMouseEnter={() => setActiveId(desk.id)}
                  onFocus={() => setActiveId(desk.id)}
                  onClick={() => setActiveId(desk.id)}
                >
                  <span className="presence-list__city">{desk.city}</span>
                  <span className="presence-list__region">{desk.region}</span>
                  <span className="presence-list__focus">{desk.focus}</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
