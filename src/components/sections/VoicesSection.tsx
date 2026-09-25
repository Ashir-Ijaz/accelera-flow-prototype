import { voiceThemes } from '../../data/voices'
import { SectionHeading } from '../layout/SectionHeading'
import { VoiceQuote } from '../ui/VoiceQuote'
import { DragStrip } from '../ui/DragStrip'
import { Reveal } from '../animation/Reveal'

export function VoicesSection() {
  return (
    <section className="section" aria-labelledby="voices-title">
      <div className="section__inner">
        <SectionHeading kicker="Voices" title="The people stay behind the work." />
      </div>
      <Reveal>
        <DragStrip ariaLabel="Team stories" className="voice-strip">
          {voiceThemes.map((voice, index) => (
            <div key={voice.id} className="voice-strip__item">
              <VoiceQuote voice={voice} index={index} />
            </div>
          ))}
        </DragStrip>
      </Reveal>
    </section>
  )
}
