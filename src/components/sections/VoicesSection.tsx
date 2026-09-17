import { voiceThemes } from '../../data/voices'
import { SectionHeading } from '../layout/SectionHeading'
import { TestimonialPlaceholder } from '../ui/TestimonialPlaceholder'
import { DragStrip } from '../ui/DragStrip'
import { Reveal } from '../animation/Reveal'

export function VoicesSection() {
  return (
    <section className="section" aria-labelledby="voices-title">
      <div className="section__inner">
        <SectionHeading kicker="Voices" title="The people stay behind the work." />
      </div>
      <Reveal>
        <DragStrip ariaLabel="Team story placeholders" className="voice-strip">
          {voiceThemes.map((voice) => (
            <div key={voice.id} className="voice-strip__item">
              <TestimonialPlaceholder voice={voice} focused />
            </div>
          ))}
        </DragStrip>
      </Reveal>
    </section>
  )
}
