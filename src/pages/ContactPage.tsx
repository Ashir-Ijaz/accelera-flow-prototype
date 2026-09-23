import { pageMeta } from '../data/meta'
import { inboxReady } from '../data/inbox'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { ContactForm } from '../components/ui/ContactForm'
import { PageHero } from '../components/layout/PageHero'
import { MagneticButton } from '../components/animation/MagneticButton'

export default function ContactPage() {
  useDocumentMeta(pageMeta.contact)

  return (
    <PageHero
      kicker="Contact"
      title="Start a project"
      body={
        inboxReady()
          ? 'Tell us what you want to grow. We reply by email with the next details.'
          : 'Tell us what you want to grow. Submissions stay on this device until a studio inbox email is added.'
      }
      asideLabel="Enquiry"
      tone="ember"
    >
      <ContactForm />
      <div className="contact-aside">
        <p>Need a placement on YouTube or Instagram instead?</p>
        <div className="stage-copy__actions">
          <MagneticButton to="/promote" className="btn btn--promote">
            Promotion
          </MagneticButton>
          <MagneticButton to="/about" className="btn btn--ghost">
            Apply for a desk
          </MagneticButton>
        </div>
      </div>
    </PageHero>
  )
}
