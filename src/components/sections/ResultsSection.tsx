import { featuredResults } from '../../data/results'
import { ResultsFilm } from './ResultsFilm'
import { MagneticButton } from '../animation/MagneticButton'

export function ResultsSection() {
  return (
    <>
      <ResultsFilm items={featuredResults} compact />
      <div className="section results-film__close">
        <div className="section__inner split page-close">
          <p>Eleven boards on the full reel.</p>
          <MagneticButton to="/results" className="btn btn--ghost">
            All boards
          </MagneticButton>
        </div>
      </div>
    </>
  )
}
