import { pageMeta } from '../data/meta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { MagneticButton } from '../components/animation/MagneticButton'
import { PageHero } from '../components/layout/PageHero'
import { ServicesCinema } from '../components/ui/ServicesCinema'
import { Reveal } from '../components/animation/Reveal'

export default function ServicesPage() {
  useDocumentMeta(pageMeta.services)

  return (
    <>
      <PageHero kicker="Services" title="From attention to action." asideLabel="Practices" tone="flow" />
      <ServicesCinema />
      <div className="section">
        <Reveal className="section__inner split page-close">
          <p>Start a project around one practice, or the full system.</p>
          <MagneticButton to="/contact" strength={26} scale={1.05}>
            Start a project
          </MagneticButton>
        </Reveal>
      </div>
    </>
  )
}
