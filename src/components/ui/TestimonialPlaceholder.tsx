import type { VoiceTheme } from '../../types'

type TestimonialPlaceholderProps = {
  voice: VoiceTheme
  focused?: boolean
}

export function TestimonialPlaceholder({ voice, focused = false }: TestimonialPlaceholderProps) {
  return (
    <article className={`voice-card${focused ? ' is-focus' : ''}`}>
      <p className="placeholder-kicker">{voice.kicker}</p>
      <h3>{voice.title}</h3>
      <span className="voice-card__rule" aria-hidden="true" />
      <p>{voice.theme}</p>
      <p>{voice.body}</p>
    </article>
  )
}
