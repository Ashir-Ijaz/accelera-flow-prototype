import { companyFacts } from '../../data/company'
import { media } from '../../data/media'
import { SectionHeading } from '../layout/SectionHeading'
import { DummyImage } from '../ui/DummyImage'
import { Reveal } from '../animation/Reveal'

export function OriginSection() {
  return (
    <section className="section" aria-labelledby="origin-title">
      <div className="section__inner">
        <SectionHeading kicker="Origin" title="Pakistan, 2019. United Kingdom, 2025." />
        <Reveal className="origin__facts">
          <article className="origin__fact">
            <strong>{companyFacts.foundedYear}</strong>
            <p>{companyFacts.foundedPlace}</p>
          </article>
          <article className="origin__fact">
            <strong>{companyFacts.registeredYear}</strong>
            <p>{companyFacts.registeredPlace}</p>
          </article>
          <article className="origin__fact">
            <strong>{companyFacts.teamCount}</strong>
            <p>Students</p>
          </article>
        </Reveal>
        <Reveal className="origin-visual">
          <DummyImage src={media.night} className="hero-visual__image" />
          <svg className="origin-map" viewBox="0 0 1000 280" role="img" aria-label="Abstract path between Pakistan and the United Kingdom">
            <path
              d="M220 170 C 380 40, 620 40, 790 120"
              fill="none"
              stroke="#FF6A00"
              strokeWidth="3"
            />
            <circle cx="220" cy="170" r="10" fill="#F04400" />
            <circle cx="790" cy="120" r="10" fill="#FF9400" />
            <text x="200" y="210" fill="#F5F3F1" fontSize="22" fontFamily="Space Grotesk, sans-serif">
              Pakistan
            </text>
            <text x="720" y="90" fill="#F5F3F1" fontSize="22" fontFamily="Space Grotesk, sans-serif">
              United Kingdom
            </text>
          </svg>
        </Reveal>
      </div>
    </section>
  )
}
