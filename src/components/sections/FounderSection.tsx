import { founder } from '../../data/company'
import { teamMedia } from '../../data/media'
import { DummyImage } from '../ui/DummyImage'
import { Reveal } from '../animation/Reveal'
import { ImageWipe } from '../animation/ImageWipe'

export function FounderSection() {
  return (
    <section className="section" aria-labelledby="founder-title">
      <Reveal className="section__inner founder">
        <div className="founder__portrait">
          <ImageWipe direction="up" delay={0.05}>
            <DummyImage src={teamMedia.aoun} width={900} height={1125} className="hero-visual__image" />
          </ImageWipe>
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
