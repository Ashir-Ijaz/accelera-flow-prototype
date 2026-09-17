import { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { navItems, primaryCta } from '../../data/navigation'
import { BrandLogo } from '../ui/BrandLogo'
import { MagneticButton } from '../animation/MagneticButton'
import { MobileMenu } from './MobileMenu'

export function Navigation() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const closeMenu = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`nav${compact ? ' is-compact' : ''}`}>
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
          <MagneticButton to={primaryCta.path} className="btn btn--primary nav__cta">
            {primaryCta.label}
          </MagneticButton>
          <button
            type="button"
            className="nav__menu-btn"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={closeMenu} />
    </>
  )
}
