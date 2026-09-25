import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const ease = [0.22, 1, 0.36, 1] as const

type MaskTitleProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
}

/** Word-by-word mask reveal for section / page titles. */
export function MaskTitle({ text, as = 'h2', className = '', delay = 0 }: MaskTitleProps) {
  const reduced = usePrefersReducedMotion()
  const Tag = as
  const parts = text.split(/(\s+)/)

  if (reduced) {
    return <Tag className={className || undefined}>{text}</Tag>
  }

  return (
    <Tag className={`mask-title${className ? ` ${className}` : ''}`}>
      {parts.map((part, index) => {
        if (/^\s+$/.test(part)) {
          return <span key={`s-${index}`}>{part}</span>
        }
        return (
          <span key={`w-${index}`} className="mask-title__word">
            <motion.span
              className="mask-title__inner"
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{
                duration: 0.62,
                delay: delay + index * 0.028,
                ease,
              }}
            >
              {part}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}
