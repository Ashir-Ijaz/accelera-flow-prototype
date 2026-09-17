import { useMemo, useState } from 'react'
import { resultPlaceholders } from '../data/results'
import { pageMeta } from '../data/meta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { AnalyticsPlaceholder } from '../components/ui/AnalyticsPlaceholder'
import { MagneticButton } from '../components/animation/MagneticButton'
import { PageHero } from '../components/layout/PageHero'
import { Reveal } from '../components/animation/Reveal'

export default function ResultsPage() {
  useDocumentMeta(pageMeta.results)
  const [filter, setFilter] = useState<'all' | 'instagram' | 'youtube' | 'client'>('all')
  const visible = useMemo(
    () =>
      filter === 'all'
        ? resultPlaceholders
        : resultPlaceholders.filter((item) => item.category === filter),
    [filter],
  )

  return (
    <PageHero kicker="Results" title="Growth, shown when verified." asideLabel="Boards waiting" tone="signal">
      <div className="search-row">
        {(['all', 'instagram', 'youtube', 'client'] as const).map((value) => (
          <button
            key={value}
            type="button"
            className={`filter-btn${filter === value ? ' is-active' : ''}`}
            onClick={() => setFilter(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <Reveal className="results-grid">
        {visible.map((result) => (
          <AnalyticsPlaceholder key={result.id} result={result} />
        ))}
      </Reveal>
      <div className="split page-close">
        <p>Screenshots sit here when approved.</p>
        <MagneticButton to="/contact">Talk about a brief</MagneticButton>
      </div>
    </PageHero>
  )
}
