import { MagneticButton } from '../animation/MagneticButton'
import { media } from '../../data/media'
import { DummyImage } from '../ui/DummyImage'
import { Reveal } from '../animation/Reveal'
import { ImageWipe } from '../animation/ImageWipe'
import { MaskTitle } from '../animation/MaskTitle'
import { useMagnetic } from '../../hooks/useMagnetic'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useUiSound } from '../../hooks/useUiSound'

export function FinalCtaSection() {
  const reduced = usePrefersReducedMotion()
  const { playTick } = useUiSound()
  const visual = useMagnetic<HTMLDivElement>({
    strength: 14,
    tilt: true,
    tiltStrength: 6,
    scale: 1.025,
    ease: 0.13,
    enabled: !reduced,
  })

  return (
    <section className="final-cta final-cta--cinema" aria-label="Next step">
      <div className="final-cta__atmosphere" aria-hidden="true" />
      <Reveal className="section__inner final-cta__stage">
        <div className="final-cta__copy">
          <p className="section-heading__kicker">Next step</p>
          <MaskTitle text="Let’s build something worth sharing." as="h2" />
          <p className="final-cta__lede">
            One practice or the full system — we start where the work needs to move.
          </p>
          <div className="stage-copy__actions final-cta__actions">
            <MagneticButton
              to="/promote"
              className="btn btn--promote"
              strength={28}
              scale={1.06}
              onClick={playTick}
            >
              Promotion
            </MagneticButton>
            <MagneticButton to="/contact" strength={28} scale={1.06} onClick={playTick}>
              Start a project
            </MagneticButton>
          </div>
          <MagneticButton to="/brands" className="final-cta__link" strength={22} scale={1.02}>
            Explore our brands
          </MagneticButton>
        </div>
        <div
          ref={visual.ref}
          className="hero-visual final-cta__visual magnetic-card"
          onPointerMove={visual.onPointerMove}
          onPointerLeave={visual.onPointerLeave}
        >
          <ImageWipe direction="right" delay={0.1} accent>
            <DummyImage
              src={media.finalCta}
              width={1600}
              height={900}
              className="hero-visual__image"
              loading="eager"
            />
          </ImageWipe>
          <span className="final-cta__frame" aria-hidden="true" />
        </div>
      </Reveal>
    </section>
  )
}
