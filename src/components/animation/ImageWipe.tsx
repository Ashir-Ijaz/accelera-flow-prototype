import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const ease = [0.33, 1, 0.32, 1] as const
const easeSoft = [0.4, 0, 0.2, 1] as const

export type WipeDirection = 'left' | 'right' | 'up'

type ImageWipeProps = {
  children: ReactNode
  className?: string
  direction?: WipeDirection
  delay?: number
  accent?: boolean
}

const mediaHidden: Record<WipeDirection, string> = {
  left: 'inset(0 105% 0 0)',
  right: 'inset(0 0 0 105%)',
  up: 'inset(105% 0 0 0)',
}

const veilHidden: Record<WipeDirection, string> = {
  left: 'inset(0 0 0 0)',
  right: 'inset(0 0 0 0)',
  up: 'inset(0 0 0 0)',
}

const veilGone: Record<WipeDirection, string> = {
  left: 'inset(0 0 0 100%)',
  right: 'inset(0 100% 0 0)',
  up: 'inset(0 0 100% 0)',
}

const shown = 'inset(0% 0% 0% 0%)'

const bladeMotion: Record<WipeDirection, { x: string | string[]; y: string | string[] }> = {
  left: { x: ['-8%', '108%'], y: '0%' },
  right: { x: ['108%', '-8%'], y: '0%' },
  up: { x: '0%', y: ['108%', '-8%'] },
}

/**
 * Layered cinematic wipe: ember veil peels, media opens, amber blade sweeps.
 * Outer shell stays unclipped so in-view detection always works.
 */
export function ImageWipe({
  children,
  className = '',
  direction = 'left',
  delay = 0,
  accent = true,
}: ImageWipeProps) {
  const reduced = usePrefersReducedMotion()
  const shellRef = useRef<HTMLDivElement>(null)
  // Wait until the image is well into the viewport — not the first peek from the bottom
  const inView = useInView(shellRef, {
    once: true,
    amount: 0.42,
    margin: '0px 0px -18% 0px',
  })

  if (reduced) {
    return <div className={`image-wipe ${className}`.trim()}>{children}</div>
  }

  return (
    <div ref={shellRef} className={`image-wipe image-wipe--${direction}${accent ? ' is-accent' : ''} ${className}`.trim()}>
      {/* Stage wash — brief ember flash as reveal starts */}
      <motion.div
        className="image-wipe__wash"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: inView ? [0, 0.45, 0] : 0 }}
        transition={{ duration: 0.95, delay: delay + 0.06, times: [0, 0.32, 1], ease }}
      />

      <motion.div
        className="image-wipe__frame"
        initial={false}
        animate={{ clipPath: inView ? shown : mediaHidden[direction] }}
        transition={{ duration: 1.25, delay: delay + 0.12, ease }}
      >
        <motion.div
          className="image-wipe__media"
          initial={false}
          animate={{
            scale: inView ? 1 : 1.1,
            filter: inView ? 'brightness(1) saturate(1)' : 'brightness(0.72) saturate(0.85)',
          }}
          transition={{ duration: 1.4, delay: delay + 0.12, ease: easeSoft }}
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Solid veil peels off just ahead of the media */}
      <motion.div
        className="image-wipe__veil"
        aria-hidden="true"
        initial={false}
        animate={{ clipPath: inView ? veilGone[direction] : veilHidden[direction] }}
        transition={{ duration: 1.15, delay: delay + 0.04, ease }}
      />

      {accent ? (
        <>
          <motion.span
            className="image-wipe__blade"
            aria-hidden="true"
            initial={false}
            animate={
              inView
                ? { ...bladeMotion[direction], opacity: [0, 1, 1, 0] }
                : { opacity: 0, x: direction === 'right' ? '108%' : '-8%', y: direction === 'up' ? '108%' : '0%' }
            }
            transition={{ duration: 1.15, delay: delay + 0.1, times: [0, 0.14, 0.74, 1], ease }}
          />
          <motion.span
            className="image-wipe__glow"
            aria-hidden="true"
            initial={false}
            animate={{ opacity: inView ? [0, 0.75, 0] : 0, scale: inView ? [0.65, 1.1, 1.28] : 0.65 }}
            transition={{ duration: 1.05, delay: delay + 0.14, times: [0, 0.38, 1], ease }}
          />
        </>
      ) : null}
    </div>
  )
}
