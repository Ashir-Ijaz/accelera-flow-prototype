import { pageMeta } from '../data/meta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { MagneticButton } from '../components/animation/MagneticButton'
import { DummyImage } from '../components/ui/DummyImage'
import { media } from '../data/media'

export default function NotFoundPage() {
  useDocumentMeta(pageMeta.notFound)

  return (
    <div className="not-found">
      <div className="section__inner split">
        <div>
          <p className="section-heading__kicker">404</p>
          <h1>This idea took a wrong turn.</h1>
          <div className="stage-copy__actions">
            <MagneticButton to="/">Back home</MagneticButton>
            <MagneticButton to="/brands" className="btn btn--ghost">
              Explore brands
            </MagneticButton>
          </div>
        </div>
        <div className="hero-visual">
          <DummyImage src={media.pulse} className="hero-visual__image" />
        </div>
      </div>
    </div>
  )
}
