import { motion } from 'framer-motion'
import { companyFacts } from '../../data/company'
import { media } from '../../data/media'
import {
  originDesks,
  originPakistanPaths,
  originUkPaths,
} from '../../data/originMap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeading } from '../layout/SectionHeading'
import { DummyImage } from '../ui/DummyImage'
import { Reveal } from '../animation/Reveal'
import { ImageWipe } from '../animation/ImageWipe'

const ease = [0.22, 1, 0.36, 1] as const

/** Local group placement — PK left, UK right. */
const PK = { tx: 42, ty: 4, s: 0.9 }
const UK = { tx: 730, ty: 2, s: 0.92 }

function localPoint(
  group: { tx: number; ty: number; s: number },
  point: { x: number; y: number },
) {
  return {
    x: group.tx + point.x * group.s,
    y: group.ty + point.y * group.s,
  }
}

const karachi = localPoint(PK, originDesks.karachi)
const london = localPoint(UK, originDesks.london)
const ARC = `M${karachi.x.toFixed(1)} ${karachi.y.toFixed(1)} C 320 32, 620 32, ${london.x.toFixed(1)} ${london.y.toFixed(1)}`

function MapPin({ x, y, fill }: { x: number; y: number; fill: string }) {
  return (
    <g className="origin-map__pin" transform={`translate(${x} ${y})`}>
      <circle className="origin-map__halo" r="16" />
      <circle r="5.5" fill={fill} filter="url(#origin-glow)" />
      <circle r="2" fill="#F5F3F1" />
    </g>
  )
}

export function OriginSection() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="section" aria-labelledby="origin-title">
      <div className="section__inner">
        <SectionHeading kicker="Origin" title="Pakistan, 2019. United Kingdom, 2025." />
        <Reveal className="origin__facts">
          <article className="origin__fact">
            <strong>{companyFacts.foundedYear}</strong>
            <p>{companyFacts.foundedPlace}</p>
          </article>
          <article className="origin__fact">
            <strong>{companyFacts.registeredYear}</strong>
            <p>{companyFacts.registeredPlace}</p>
          </article>
          <article className="origin__fact">
            <strong>{companyFacts.teamCount}</strong>
            <p>Students</p>
          </article>
        </Reveal>

        <Reveal className="origin-visual origin-visual--map">
          <ImageWipe direction="left" delay={0.04} accent={false}>
            <DummyImage src={media.night} className="hero-visual__image origin-visual__photo" />
          </ImageWipe>
          <svg
            className="origin-map"
            viewBox="0 0 960 286"
            role="img"
            aria-label="Map path from Pakistan to the United Kingdom"
          >
            <defs>
              <linearGradient id="origin-arc" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF9400" />
                <stop offset="55%" stopColor="#FF6A00" />
                <stop offset="100%" stopColor="#F04400" />
              </linearGradient>
              <filter id="origin-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g transform={`translate(${PK.tx} ${PK.ty}) scale(${PK.s})`}>
              {originPakistanPaths.map((d) => (
                <path key={d.slice(0, 24)} className="origin-map__land" d={d} />
              ))}
            </g>

            <g transform={`translate(${UK.tx} ${UK.ty}) scale(${UK.s})`}>
              {originUkPaths.map((d) => (
                <path key={d.slice(0, 24)} className="origin-map__land" d={d} />
              ))}
            </g>

            <motion.path
              className="origin-map__path"
              d={ARC}
              fill="none"
              stroke="url(#origin-arc)"
              strokeWidth="2.4"
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0, opacity: 0.3 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 1.15, ease, delay: 0.05 }}
            />

            <circle cx="480" cy="48" r="3" fill="#FF6A00" />
            <circle cx="360" cy="62" r="2" fill="#FF9400" opacity="0.55" />
            <circle cx="600" cy="62" r="2" fill="#F04400" opacity="0.55" />

            <MapPin x={karachi.x} y={karachi.y} fill="#FF9400" />
            <MapPin x={london.x} y={london.y} fill="#F04400" />

            <text className="origin-map__label" x={karachi.x} y="248" textAnchor="middle">
              Pakistan
            </text>
            <text className="origin-map__year" x={karachi.x} y="268" textAnchor="middle">
              2019 · Founded
            </text>
            <text className="origin-map__label" x={london.x} y="248" textAnchor="middle">
              United Kingdom
            </text>
            <text className="origin-map__year" x={london.x} y="268" textAnchor="middle">
              2025 · Registered
            </text>
          </svg>
        </Reveal>
      </div>
    </section>
  )
}
