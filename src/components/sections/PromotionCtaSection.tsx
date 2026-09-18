import { MagneticButton } from '../animation/MagneticButton'
import { PlatformChoiceGrid } from '../ui/PlatformChoiceGrid'
import { Reveal } from '../animation/Reveal'

export function PromotionCtaSection() {
  return (
    <section className="section promo-cta" aria-labelledby="promo-cta-title">
      <Reveal className="section__inner promo-cta__inner">
        <div className="promo-cta__head">
          <div>
            <p className="section-heading__kicker">Promotion</p>
            <h2 id="promo-cta-title">Need a YouTube or Instagram placement?</h2>
            <p>
              Separate from a full project. Choose the platform, send the brief, and we reply by email with
              pricing and charges.
            </p>
          </div>
          <MagneticButton to="/promote" className="btn btn--promote">
            Promotion
          </MagneticButton>
        </div>
        <PlatformChoiceGrid />
      </Reveal>
    </section>
  )
}
