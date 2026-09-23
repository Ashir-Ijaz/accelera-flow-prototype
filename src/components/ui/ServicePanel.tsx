import type { Service } from '../../types'
import { serviceMedia, media } from '../../data/media'
import { DummyImage } from './DummyImage'

type ServicePanelProps = {
  service: Service
  active?: boolean
}

export function ServicePanel({ service, active = false }: ServicePanelProps) {
  return (
    <article className={`service-panel${active ? ' is-active' : ''}`}>
      <div className="service-shot">
        <DummyImage src={serviceMedia[service.id] ?? media.flow} alt="" width={1600} height={900} loading="eager" />
      </div>
      <h3>{service.title}</h3>
    </article>
  )
}
