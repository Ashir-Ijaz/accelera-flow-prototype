import { campaign } from '../../data/company'
import { media } from '../../data/media'
import { DummyImage } from '../ui/DummyImage'
import { Reveal } from '../animation/Reveal'

export function ManifestoSection() {
  return (
    <section className="section manifesto" aria-labelledby="manifesto-title">
      <Reveal className="section__inner split">
        <div>
          <h2 id="manifesto-title" className="sr-only">
            Manifesto
          </h2>
          <p className="manifesto__line">
            <span>{campaign.primary}</span>
          </p>
          <div className="manifesto__rule" aria-hidden="true" />
          <p className="manifesto__line">
            <span>The work takes centre stage.</span>
          </p>
        </div>
        <div className="hero-visual">
          <DummyImage src={media.flow} className="hero-visual__image" />
        </div>
      </Reveal>
    </section>
  )
}
