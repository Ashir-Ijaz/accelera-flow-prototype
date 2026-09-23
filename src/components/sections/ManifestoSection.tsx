import { campaign } from '../../data/company'
import { brandBanners } from '../../data/media'
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
          <DummyImage
            src={brandBanners.neuromatrix.src}
            width={brandBanners.neuromatrix.width}
            height={brandBanners.neuromatrix.height}
            className="hero-visual__image"
          />
        </div>
      </Reveal>
    </section>
  )
}
