import { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navItems, primaryCta, promoteCta } from '../../data/navigation'
import { BrandLogo } from '../ui/BrandLogo'
import { MagneticButton } from '../animation/MagneticButton'
import { MobileMenu } from './MobileMenu'

export function Navigation() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const closeMenu = useCallback(() => setOpen(false), [])
  const toggleMenu = useCallback(() => setOpen((value) => !value), [])

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 1025px)').matches) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <header className={`nav${compact ? ' is-compact' : ''}${open ? ' is-menu-open' : ''}`}>
        <div className="nav__bar">
          <NavLink to="/" className="nav__logo" aria-label="Accelera Flow LTD home">
            <BrandLogo />
          </NavLink>
          <nav className="nav__links" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav__ctas">
            <MagneticButton to={promoteCta.path} className="btn btn--promote nav__cta">
              {promoteCta.label}
            </MagneticButton>
            <MagneticButton to={primaryCta.path} className="btn btn--primary nav__cta">
              {primaryCta.label}
            </MagneticButton>
          </div>
          <button
            type="button"
            className={`nav__menu-btn${open ? ' is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={toggleMenu}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={closeMenu} />
    </>
  )
}
