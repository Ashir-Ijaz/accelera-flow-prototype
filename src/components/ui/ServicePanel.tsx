import type { Service } from '../../types'
import { serviceMedia, media } from '../../data/media'
import { DummyImage } from './DummyImage'

type ServicePanelProps = {
  service: Service
  index: number
  active?: boolean
}

export function ServicePanel({ service, index, active = false }: ServicePanelProps) {
  return (
    <article className={`service-panel${active ? ' is-active' : ''}`}>
      <div className="service-shot">
        <DummyImage src={serviceMedia[service.id] ?? media.flow} alt="" />
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3>{service.title}</h3>
    </article>
  )
}
