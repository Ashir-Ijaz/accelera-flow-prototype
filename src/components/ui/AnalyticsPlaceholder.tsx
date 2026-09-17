import type { ResultPlaceholder } from '../../types'
import { resultMedia, media } from '../../data/media'
import { DummyImage } from './DummyImage'

type AnalyticsPlaceholderProps = {
  result: ResultPlaceholder
}

export function AnalyticsPlaceholder({ result }: AnalyticsPlaceholderProps) {
  return (
    <article className="analytics-card">
      <span className="analytics-card__badge">Awaiting verified data</span>
      <div className="analytics-shot">
        <DummyImage src={resultMedia[result.id] ?? media.board} alt="" />
      </div>
      <h3>{result.label}</h3>
    </article>
  )
}
