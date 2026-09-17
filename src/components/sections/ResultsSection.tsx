import { resultPlaceholders } from '../../data/results'
import { SectionHeading } from '../layout/SectionHeading'
import { AnalyticsPlaceholder } from '../ui/AnalyticsPlaceholder'
import { MagneticButton } from '../animation/MagneticButton'
import { Reveal } from '../animation/Reveal'

export function ResultsSection() {
  return (
    <section className="section" aria-labelledby="results-title">
      <div className="section__inner">
        <SectionHeading kicker="Results" title="Verified figures to be added" />
        <Reveal className="results-grid">
          {resultPlaceholders.map((result) => (
            <AnalyticsPlaceholder key={result.id} result={result} />
          ))}
        </Reveal>
        <div className="stage-copy__actions" style={{ marginTop: '1.8rem' }}>
          <MagneticButton to="/results" className="btn btn--ghost">
            See the boards
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
