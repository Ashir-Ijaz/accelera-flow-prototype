import { motion } from 'framer-motion'
import type { VoiceTheme } from '../../types'
import { useMagnetic } from '../../hooks/useMagnetic'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const ease = [0.22, 1, 0.36, 1] as const

type VoiceQuoteProps = {
  voice: VoiceTheme
  index?: number
}

export function VoiceQuote({ voice, index = 0 }: VoiceQuoteProps) {
  const reduced = usePrefersReducedMotion()
  const { ref, onPointerMove, onPointerLeave } = useMagnetic<HTMLDivElement>({
    strength: 10,
    tilt: true,
    tiltStrength: 4.5,
    scale: 1.015,
    ease: 0.14,
    enabled: !reduced,
  })

  return (
    <motion.div
      ref={ref}
      className="voice-quote magnetic-card"
      role="article"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.3), ease }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <span className="voice-quote__mark" aria-hidden="true">
        “
      </span>
      <div className="voice-quote__glow" aria-hidden="true" />
      <p className="voice-quote__kicker">{voice.kicker}</p>
      <h3 className="voice-quote__theme">{voice.theme}</h3>
      <blockquote className="voice-quote__body">{voice.body}</blockquote>
      <footer className="voice-quote__foot">
        <span className="voice-quote__rule" aria-hidden="true" />
        <cite className="voice-quote__name">{voice.title}</cite>
      </footer>
    </motion.div>
  )
}
