import { useEffect, useState } from 'react'
import { BrandLogo } from '../ui/BrandLogo'

export function LogoPreloader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const started = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - started) / 900) * 100))
      setProgress(next)
      if (next < 100) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="preloader" role="status" aria-live="polite">
      <div className="preloader__content">
        <div className="preloader__mark">
          <div className={`preloader__mask${progress > 8 ? ' is-open' : ''}`}>
            <BrandLogo className="brand-logo brand-logo--preloader" />
          </div>
          <div className={`preloader__sweep${progress > 18 ? ' is-run' : ''}`} aria-hidden="true" />
        </div>
      </div>
      <div className="preloader__progress">
        <span>{progress.toString().padStart(3, '0')}</span>
        <div className="preloader__line" aria-hidden="true">
          <i style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
