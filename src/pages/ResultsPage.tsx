import { useState } from 'react'
import { resultFilters, resultsForFilter } from '../data/results'
import { pageMeta } from '../data/meta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { ResultsFilm } from '../components/sections/ResultsFilm'
import { MagneticButton } from '../components/animation/MagneticButton'
import { PageHero } from '../components/layout/PageHero'
import type { ResultFilter } from '../types'

export default function ResultsPage() {
  useDocumentMeta(pageMeta.results)
  const [filter, setFilter] = useState<ResultFilter>('all')
  const items = resultsForFilter(filter)

  return (
    <>
      <PageHero
        kicker="Results"
        title="What the pages are doing."
        body="Instagram and YouTube boards from work already in the flow. Figures and reporting periods stay on the screenshots."
        asideLabel="Boards"
        tone="board"
      >
        <div className="search-row">
          {resultFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`filter-btn${filter === item.id ? ' is-active' : ''}`}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <ul className="tag-list">
          <li>Screenshots only</li>
          <li>Figures stay on the shot</li>
          <li>No invented totals</li>
        </ul>
      </PageHero>
      {items.length > 0 ? (
        <ResultsFilm key={filter} items={items} />
      ) : (
        <section className="section results-await">
          <div className="section__inner">
            <p className="section-heading__kicker">Awaiting verified data</p>
            <h2>Nothing invented for this filter.</h2>
            <p className="lede">
              Boards will sit here once they are supplied. Figures stay on the original screenshots.
            </p>
          </div>
        </section>
      )}
      <div className="section">
        <div className="section__inner split page-close">
          <p>Want a board like these for a new page?</p>
          <MagneticButton to="/contact">Talk about a brief</MagneticButton>
        </div>
      </div>
    </>
  )
}
