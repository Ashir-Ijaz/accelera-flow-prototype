import { pageMeta } from '../data/meta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { ContactForm } from '../components/ui/ContactForm'
import { PageHero } from '../components/layout/PageHero'

export default function ContactPage() {
  useDocumentMeta(pageMeta.contact)

  return (
    <PageHero
      kicker="Contact"
      title="Start a project"
      body="Prototype form. Saved in this browser only."
      asideLabel="Enquiry"
      tone="ember"
    >
      <ContactForm />
    </PageHero>
  )
}
