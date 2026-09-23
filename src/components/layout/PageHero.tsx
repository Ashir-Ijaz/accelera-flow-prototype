import type { ReactNode } from 'react'
import { DummyImage } from '../ui/DummyImage'
import { media } from '../../data/media'
import type { VisualTone } from '../ui/ThemeVisual'

const toneImage: Record<VisualTone, string> = {
  flow: media.flow,
  ember: media.ember,
  signal: media.signal,
  night: media.night,
  board: media.board,
  pulse: media.pulse,
}

type PageHeroProps = {
  kicker: string
  title: string
  body?: string
  asideLabel: string
  tone?: VisualTone
  visual?: string
  className?: string
  children?: ReactNode
}

export function PageHero({
  kicker,
  title,
  body,
  asideLabel,
  tone = 'flow',
  visual,
  className = '',
  children,
}: PageHeroProps) {
  return (
    <div className={`page-hero${className ? ` ${className}` : ''}`}>
      <div className="section__inner page-hero__inner">
        <div className="split">
          <div>
            <p className="section-heading__kicker">{kicker}</p>
            <h1>{title}</h1>
            {body ? <p className="lede">{body}</p> : null}
          </div>
          <aside className="hero-visual">
            <DummyImage
              src={visual ?? toneImage[tone]}
              className="hero-visual__image"
              loading={visual ? 'eager' : 'lazy'}
            />
            <span>{asideLabel}</span>
          </aside>
        </div>
        {children}
      </div>
    </div>
  )
}
