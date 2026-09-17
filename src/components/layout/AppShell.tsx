import type { ReactNode } from 'react'
import { Navigation } from '../navigation/Navigation'
import { Footer } from './Footer'
import { PageTransition } from '../animation/PageTransition'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="page">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  )
}
