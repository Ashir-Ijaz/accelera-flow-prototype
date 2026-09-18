import { companyFacts } from '../data/company'
import { companyValues } from '../data/values'
import { voiceThemes } from '../data/voices'
import { pageMeta } from '../data/meta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { TestimonialPlaceholder } from '../components/ui/TestimonialPlaceholder'
import { MagneticButton } from '../components/animation/MagneticButton'
import { OriginSection } from '../components/sections/OriginSection'
import { PresenceSection } from '../components/sections/PresenceSection'
import { FounderSection } from '../components/sections/FounderSection'
import { JobsSection } from '../components/sections/JobsSection'
import { PageHero } from '../components/layout/PageHero'
import { Reveal } from '../components/animation/Reveal'

export default function AboutPage() {
  useDocumentMeta(pageMeta.about)

  return (
    <div>
      <PageHero
        kicker="About"
        title="The people behind the work."
        body={companyFacts.shortDescription}
        asideLabel="Studio"
        tone="night"
      />
      <OriginSection />
      <PresenceSection />
      <FounderSection />
      <JobsSection />
      <section className="section">
        <div className="section__inner">
          <p className="section-heading__kicker">Model</p>
          <h2>How the studio holds together.</h2>
          <Reveal className="values-grid">
            {companyValues.map((value) => (
              <article key={value.id} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="section__inner">
          <p className="section-heading__kicker">Voices</p>
          <h2>Themes behind the work</h2>
          <Reveal className="voices__track">
            {voiceThemes.map((voice) => (
              <TestimonialPlaceholder key={voice.id} voice={voice} focused />
            ))}
          </Reveal>
          <div className="split page-close">
            <p>See the brands, or start a project.</p>
            <div className="stage-copy__actions">
              <MagneticButton to="/brands" className="btn btn--ghost">
                Explore brands
              </MagneticButton>
              <MagneticButton to="/contact">Start a project</MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
