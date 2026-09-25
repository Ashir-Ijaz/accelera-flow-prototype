import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { navItems, primaryCta, promoteCta, COMPANY_NAME } from '../../data/navigation'
import { useLockedBody } from '../../hooks/useLockedBody'
import { useLenisInstance } from '../../hooks/useLenisInstance'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { MagneticButton } from '../animation/MagneticButton'
import { BrandLogo } from '../ui/BrandLogo'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const location = useLocation()
  const lenis = useLenisInstance()
  const reduced = usePrefersReducedMotion()
  useLockedBody(open)

  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  useEffect(() => {
    if (lenis) {
      if (open) lenis.stop()
      else lenis.start()
    }
  }, [open, lenis])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fullscreen-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.28, ease }}
        >
          {!reduced ? (
            <>
              <motion.div
                className="fullscreen-nav__veil"
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0% 0)' }}
                exit={{ clipPath: 'inset(0 0 100% 0)' }}
                transition={{ duration: 0.7, ease }}
              />
              <motion.span
                className="fullscreen-nav__blade"
                aria-hidden="true"
                initial={{ y: '-20%', opacity: 0 }}
                animate={{ y: ['-20%', '120%'], opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, times: [0, 0.15, 0.7, 1], ease, delay: 0.05 }}
              />
              <motion.div
                className="fullscreen-nav__glow"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: [0, 0.7, 0.25], scale: [0.7, 1.05, 1.2] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, times: [0, 0.4, 1], ease, delay: 0.12 }}
              />
            </>
          ) : (
            <div className="fullscreen-nav__veil" />
          )}

          <div className="fullscreen-nav__inner">
            <div className="fullscreen-nav__top">
              <BrandLogo />
              <button type="button" className="fullscreen-nav__close" onClick={onClose} aria-label="Close menu">
                <X size={18} />
                <span>Close</span>
              </button>
            </div>

            <nav className="fullscreen-nav__links" aria-label="Primary">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  className="fullscreen-nav__row"
                  initial={reduced ? false : { y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduced ? undefined : { y: '40%', opacity: 0 }}
                  transition={{ duration: 0.62, delay: reduced ? 0 : 0.18 + index * 0.055, ease }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `fullscreen-nav__link${isActive ? ' is-active' : ''}`}
                    onClick={onClose}
                    end={item.path === '/'}
                  >
                    <span className="fullscreen-nav__label">{item.label}</span>
                    <span className="fullscreen-nav__hint" aria-hidden="true">
                      Open
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="fullscreen-nav__foot"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : 0.45, ease }}
            >
              <p className="fullscreen-nav__mark">{COMPANY_NAME}</p>
              <div className="fullscreen-nav__ctas">
                <MagneticButton to={promoteCta.path} className="btn btn--promote fullscreen-nav__cta">
                  {promoteCta.label}
                </MagneticButton>
                <MagneticButton to={primaryCta.path} className="btn btn--primary fullscreen-nav__cta">
                  {primaryCta.label}
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
