import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { navItems, primaryCta, promoteCta } from '../../data/navigation'
import { useLockedBody } from '../../hooks/useLockedBody'
import { useLenisInstance } from '../../hooks/useLenisInstance'
import { MagneticButton } from '../animation/MagneticButton'
import { BrandLogo } from '../ui/BrandLogo'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const location = useLocation()
  const lenis = useLenisInstance()
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
          className="mobile-menu"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="mobile-menu__top">
            <BrandLogo />
            <button type="button" className="mobile-menu__close" onClick={onClose} aria-label="Close menu">
              <X size={18} />
            </button>
          </div>
          <nav className="mobile-menu__links" aria-label="Mobile">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08 + index * 0.05, duration: 0.4 }}
              >
                <NavLink to={item.path} className="mobile-menu__link" onClick={onClose}>
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <div className="mobile-menu__ctas">
            <MagneticButton to={promoteCta.path} className="btn btn--promote mobile-menu__cta">
              {promoteCta.label}
            </MagneticButton>
            <MagneticButton to={primaryCta.path} className="btn btn--primary mobile-menu__cta">
              {primaryCta.label}
            </MagneticButton>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
