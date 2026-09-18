import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { SmoothScrollProvider } from './components/animation/SmoothScrollProvider'
import { LogoPreloader } from './components/animation/LogoPreloader'
import { AppShell } from './components/layout/AppShell'
import { RouteErrorBoundary } from './components/layout/RouteErrorBoundary'
import { routerBasename } from './lib/paths'

const HomePage = lazy(() => import('./pages/HomePage'))
const BrandsPage = lazy(() => import('./pages/BrandsPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ResultsPage = lazy(() => import('./pages/ResultsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PromotePage = lazy(() => import('./pages/PromotePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

void import('./pages/HomePage')

function RouteFallback() {
  return <div className="page-hero">Loading the next path…</div>
}

function AppRoutes() {
  const location = useLocation()
  return (
    <RouteErrorBoundary resetKey={location.pathname}>
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/promote" element={<PromotePage />} />
          <Route path="/promote/:platform" element={<PromotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </RouteErrorBoundary>
  )
}

function SiteRouter({ children }: { children: ReactNode }) {
  const basename = routerBasename()
  if (basename) {
    return <HashRouter>{children}</HashRouter>
  }
  return <BrowserRouter>{children}</BrowserRouter>
}

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 1000)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <SiteRouter>
      {ready ? (
        <SmoothScrollProvider>
          <AppShell>
            <AppRoutes />
          </AppShell>
        </SmoothScrollProvider>
      ) : (
        <LogoPreloader />
      )}
    </SiteRouter>
  )
}
