import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, Volume2, VolumeX } from 'lucide-react'
import { companyFacts } from '../../data/company'
import { inboxEmail, inboxReady } from '../../data/inbox'
import { navItems } from '../../data/navigation'
import { useLenisInstance } from '../../hooks/useLenisInstance'
import { useUiSound } from '../../hooks/useUiSound'
import { BrandLogo } from '../ui/BrandLogo'
import { MagneticButton } from '../animation/MagneticButton'

export function Footer() {
  const lenis = useLenisInstance()
  const { enabled, toggle } = useUiSound()
  const [newsletter, setNewsletter] = useState<'idle' | 'done'>('idle')
  const year = new Date().getFullYear()
  const studioEmail = inboxEmail()

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
        <div className="footer__brand">
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
          </div>
        </div>
        <div>
          <h2>Promotion</h2>
          <div className="footer__platforms">
            <Link to="/promote">All platforms</Link>
            <Link to="/promote/instagram">Instagram</Link>
            <Link to="/promote/youtube">YouTube</Link>
          </div>
          <h2>Newsletter prototype</h2>
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
          {studioEmail ? (
            <p className="note">
              <a href={`mailto:${studioEmail}`}>{studioEmail}</a>
            </p>
          ) : (
            <p className="note">{inboxReady() ? 'Studio inbox is connected for forms.' : 'Business email to be added'}</p>
          )}
        </div>
      </div>
      <div className="footer__base">
        <p>© {year} Accelera Flow LTD. All rights reserved.</p>
        <div className="footer__base-actions">
          <button
            type="button"
            className={`sound-toggle${enabled ? ' is-on' : ''}`}
            onClick={toggle}
            aria-pressed={enabled}
            aria-label={enabled ? 'Mute UI sounds' : 'Enable UI sounds'}
          >
            {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{enabled ? 'Sound on' : 'Sound off'}</span>
          </button>
          <button type="button" className="back-to-top" onClick={toTop}>
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
