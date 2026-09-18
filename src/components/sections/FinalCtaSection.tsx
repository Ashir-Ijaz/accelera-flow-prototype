import { MagneticButton } from '../animation/MagneticButton'
import { media } from '../../data/media'
import { DummyImage } from '../ui/DummyImage'
import { Reveal } from '../animation/Reveal'

export function FinalCtaSection() {
  return (
    <section className="section final-cta" aria-labelledby="final-cta-title">
      <Reveal className="section__inner split">
        <div>
          <p className="section-heading__kicker">Next step</p>
          <h2 id="final-cta-title">Let’s build something worth sharing.</h2>
          <div className="stage-copy__actions">
            <MagneticButton to="/promote" className="btn btn--promote">
              Promotion
            </MagneticButton>
            <MagneticButton to="/contact">Start a project</MagneticButton>
            <MagneticButton to="/brands" className="btn btn--ghost">
              Explore our brands
            </MagneticButton>
          </div>
        </div>
        <div className="hero-visual">
          <DummyImage src={media.ember} className="hero-visual__image" />
        </div>
      </Reveal>
    </section>
  )
}
