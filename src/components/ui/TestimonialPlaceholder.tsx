import type { VoiceTheme } from '../../types'
import { voiceMedia, media } from '../../data/media'
import { DummyImage } from './DummyImage'

type TestimonialPlaceholderProps = {
  voice: VoiceTheme
  focused?: boolean
}

export function TestimonialPlaceholder({ voice, focused = false }: TestimonialPlaceholderProps) {
  return (
    <article className={`voice-card${focused ? ' is-focus' : ''}`}>
      <div className="voice-card__shot">
        <DummyImage src={voiceMedia[voice.id] ?? media.night} alt="" />
      </div>
      <div>
        <p className="placeholder-kicker">{voice.kicker}</p>
        <h3>{voice.title}</h3>
      </div>
    </article>
  )
}
