import { services } from '../data/services'
import { serviceMedia, media } from '../data/media'
import { pageMeta } from '../data/meta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { MagneticButton } from '../components/animation/MagneticButton'
import { PageHero } from '../components/layout/PageHero'
import { DummyImage } from '../components/ui/DummyImage'

export default function ServicesPage() {
  useDocumentMeta(pageMeta.services)

  return (
    <PageHero kicker="Services" title="From attention to action." asideLabel="Practices" tone="flow">
      {services.map((service) => (
        <article key={service.id} className="service-detail">
          <div className="hero-visual">
            <DummyImage
              src={serviceMedia[service.id] ?? media.flow}
              className="hero-visual__image"
              width={1600}
              height={900}
              loading="eager"
            />
          </div>
          <div>
            <h2>{service.title}</h2>
            <p className="lede">{service.description}</p>
            <div className="service-detail__lists">
              <div>
                <h3>Suitable for</h3>
                <ul className="tag-list">
                  {service.suitableFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>What we deliver</h3>
                <ul className="tag-list">
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      ))}
      <div className="split page-close">
        <p>Start a project.</p>
        <MagneticButton to="/contact">Start a project</MagneticButton>
      </div>
    </PageHero>
  )
}
