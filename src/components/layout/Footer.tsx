import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { companyFacts } from '../../data/company'
import { navItems } from '../../data/navigation'
import { useLenisInstance } from '../../hooks/useLenisInstance'
import { BrandLogo } from '../ui/BrandLogo'
import { MagneticButton } from '../animation/MagneticButton'

export function Footer() {
  const lenis = useLenisInstance()
  const [newsletter, setNewsletter] = useState<'idle' | 'done'>('idle')
  const year = new Date().getFullYear()

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.1 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNewsletter('done')
  }

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <Link to="/" aria-label="Accelera Flow LTD home">
            <BrandLogo className="brand-logo brand-logo--footer" />
          </Link>
          <p className="footer__desc">{companyFacts.shortDescription}</p>
        </div>
        <div>
          <h2>Explore</h2>
          <div className="footer__links">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
            <Link to="/promote">Promotion</Link>
          </div>
        </div>
        <div>
          <h2>Platforms</h2>
          <div className="footer__platforms">
            <Link to="/promote/instagram">Instagram</Link>
            <Link to="/promote/youtube">YouTube</Link>
          </div>
          <h2 style={{ marginTop: '1.4rem' }}>Newsletter prototype</h2>
          {newsletter === 'idle' ? (
            <form className="newsletter" onSubmit={onNewsletter}>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input id="newsletter-email" type="email" name="email" required placeholder="Email address" />
              <MagneticButton type="submit">Join</MagneticButton>
            </form>
          ) : (
            <p className="note">
              This prototype newsletter does not send externally. No list was updated.
            </p>
          )}
          <p className="note">Business email to be added</p>
        </div>
      </div>
      <div className="footer__base">
        <p>
          © {year} Accelera Flow LTD. All rights reserved.
        </p>
        <button type="button" className="back-to-top" onClick={toTop}>
          Back to top <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  )
}
