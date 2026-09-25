import { motion } from 'framer-motion'
import type { Service } from '../../types'
import { serviceMedia, media } from '../../data/media'
import { DummyImage } from '../ui/DummyImage'
import { ImageWipe } from '../animation/ImageWipe'
import { MaskTitle } from '../animation/MaskTitle'
import { useMagnetic } from '../../hooks/useMagnetic'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const ease = [0.22, 1, 0.36, 1] as const

type ServiceDetailBlockProps = {
  service: Service
  index: number
}

export function ServiceDetailBlock({ service, index }: ServiceDetailBlockProps) {
  const reduced = usePrefersReducedMotion()
  const flip = index % 2 === 1
  const visual = useMagnetic<HTMLDivElement>({
    strength: 12,
    tilt: true,
    tiltStrength: 5,
    scale: 1.02,
    ease: 0.14,
    enabled: !reduced,
  })

  return (
    <motion.article
      className={`service-detail${flip ? ' is-flip' : ''}`}
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay: 0.04, ease }}
    >
      <div
        ref={visual.ref}
        className="hero-visual service-detail__visual magnetic-card"
        onPointerMove={visual.onPointerMove}
        onPointerLeave={visual.onPointerLeave}
      >
        <span className="service-detail__index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <ImageWipe direction={flip ? 'right' : 'left'} delay={0.08}>
          <DummyImage
            src={serviceMedia[service.id] ?? media.flow}
            className="hero-visual__image"
            width={1600}
            height={900}
            loading={index < 2 ? 'eager' : 'lazy'}
          />
        </ImageWipe>
      </div>

      <div className="service-detail__copy">
        <p className="section-heading__kicker">Practice {String(index + 1).padStart(2, '0')}</p>
        <MaskTitle text={service.title} as="h2" />
        <motion.p
          className="lede"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, delay: 0.12, ease }}
        >
          {service.description}
        </motion.p>

        <div className="service-detail__lists">
          <div>
            <h3>Suitable for</h3>
            <ul className="tag-list">
              {service.suitableFor.map((item, i) => (
                <motion.li
                  key={item}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3>What we deliver</h3>
            <ul className="tag-list">
              {service.deliverables.map((item, i) => (
                <motion.li
                  key={item}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: 0.14 + i * 0.05, ease }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
