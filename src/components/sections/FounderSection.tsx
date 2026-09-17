import { founder } from '../../data/company'
import { media } from '../../data/media'
import { DummyImage } from '../ui/DummyImage'
import { Reveal } from '../animation/Reveal'

export function FounderSection() {
  return (
    <section className="section" aria-labelledby="founder-title">
      <Reveal className="section__inner founder">
        <div className="founder__portrait">
          <DummyImage src={media.board} className="hero-visual__image" />
        </div>
        <div>
          <p className="section-heading__kicker">Founder</p>
          <h2 id="founder-title">{founder.name}</h2>
          <blockquote>“{founder.pullQuote}”</blockquote>
          <p>{founder.statement}</p>
        </div>
      </Reveal>
    </section>
  )
}
