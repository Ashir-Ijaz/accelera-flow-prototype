import type { Service } from '../../types'
import { serviceMedia, media } from '../../data/media'
import { DummyImage } from './DummyImage'
import { ImageWipe } from '../animation/ImageWipe'
import { useMagnetic } from '../../hooks/useMagnetic'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type ServicePanelProps = {
  service: Service
  active?: boolean
}

export function ServicePanel({ service, active = false }: ServicePanelProps) {
  const reduced = usePrefersReducedMotion()
  const { ref, onPointerMove, onPointerLeave } = useMagnetic<HTMLElement>({
    strength: active ? 16 : 12,
    tilt: true,
    tiltStrength: 7,
    scale: active ? 1.04 : 1.025,
    ease: 0.14,
    enabled: !reduced,
  })

  return (
    <article
      ref={ref}
      className={`service-panel magnetic-card${active ? ' is-active' : ''}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="service-shot">
        <ImageWipe direction="up" accent={active}>
          <DummyImage src={serviceMedia[service.id] ?? media.flow} alt="" width={1600} height={900} loading="eager" />
        </ImageWipe>
      </div>
      <h3>{service.title}</h3>
    </article>
  )
}
