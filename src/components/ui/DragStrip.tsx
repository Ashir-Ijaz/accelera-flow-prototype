import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useDragScroll } from '../../hooks/useDragScroll'

type DragStripProps = {
  children: ReactNode
  ariaLabel: string
  className?: string
}

export function DragStrip({ children, ariaLabel, className = '' }: DragStripProps) {
  const ref = useRef<HTMLDivElement>(null)
  useDragScroll(ref)

  return (
    <div
      ref={ref}
      className={`drag-strip ${className}`.trim()}
      aria-label={ariaLabel}
      role="region"
    >
      {children}
    </div>
  )
}
