import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { Navigation } from '../navigation/Navigation'
import { Footer } from './Footer'
import { PageTransition } from '../animation/PageTransition'
import { LogoPreloader, shouldShowPreloader } from '../animation/LogoPreloader'
import { CursorSpotlight } from '../animation/CursorSpotlight'
import { FilmGrain } from '../animation/FilmGrain'
import { GlobalMagnetic } from '../animation/GlobalMagnetic'
import { UiSoundProvider } from '../../hooks/useUiSound'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [booting, setBooting] = useState(shouldShowPreloader)
  const finishBoot = useCallback(() => setBooting(false), [])

  useEffect(() => {
    const sync = () => {
      document.documentElement.dataset.fx =
        document.visibilityState === 'visible' ? 'run' : 'pause'
    }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  return (
    <UiSoundProvider>
      <div className={`shell${booting ? ' is-booting' : ''}`}>
        {booting ? <LogoPreloader onDone={finishBoot} /> : null}
        <FilmGrain />
        <CursorSpotlight />
        <GlobalMagnetic />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main" className="page">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </UiSoundProvider>
  )
}
