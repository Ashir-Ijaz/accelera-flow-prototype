import { useCallback, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type CoverflowProps<T> = {
  items: T[]
  getKey: (item: T) => string
  render: (item: T, active: boolean) => ReactNode
  ariaLabel: string
  activeIndex?: number
  onIndexChange?: (index: number) => void
}

function wrappedDelta(index: number, active: number, length: number) {
  let delta = index - active
  const half = length / 2
  if (delta > half) delta -= length
  if (delta < -half) delta += length
  return delta
}

export function Coverflow<T>({
  items,
  getKey,
  render,
  ariaLabel,
  activeIndex,
  onIndexChange,
}: CoverflowProps<T>) {
  const reduced = usePrefersReducedMotion()
  const [internal, setInternal] = useState(0)
  const drag = useRef({ on: false, x: 0 })
  const count = items.length
  const active = activeIndex ?? internal

  const setActive = useCallback(
    (index: number) => {
      if (count === 0) return
      const next = ((index % count) + count) % count
      onIndexChange?.(next)
      if (activeIndex === undefined) setInternal(next)
    },
    [activeIndex, count, onIndexChange],
  )

  const go = useCallback(
    (direction: -1 | 1) => {
      if (count === 0) return
      setActive(active + direction)
    },
    [active, count, setActive],
  )

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    }
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    drag.current = { on: true, x: event.clientX }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return
    const dx = event.clientX - drag.current.x
    drag.current.on = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (Math.abs(dx) < 36) return
    go(dx < 0 ? 1 : -1)
  }

  if (count === 0) return null

  return (
    <div className="coverflow" aria-label={ariaLabel} role="region">
      <div
        className="coverflow__stage"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {items.map((item, index) => {
          const delta = wrappedDelta(index, active, count)
          const slot = delta === 0 ? 'is-front' : delta === -1 ? 'is-prev' : delta === 1 ? 'is-next' : 'is-hidden'
          return (
            <div
              key={getKey(item)}
              className={`coverflow__item ${slot}${reduced ? ' is-static' : ''}`}
              aria-hidden={delta !== 0}
              onClickCapture={(event) => {
                if (delta === -1) {
                  event.preventDefault()
                  event.stopPropagation()
                  go(-1)
                }
                if (delta === 1) {
                  event.preventDefault()
                  event.stopPropagation()
                  go(1)
                }
              }}
            >
              {render(item, delta === 0)}
            </div>
          )
        })}
        <button
          type="button"
          className="coverflow__arrow coverflow__arrow--prev"
          aria-label="Previous"
          onClick={() => go(-1)}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <ChevronLeft size={26} strokeWidth={2.2} />
        </button>
        <button
          type="button"
          className="coverflow__arrow coverflow__arrow--next"
          aria-label="Next"
          onClick={() => go(1)}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <ChevronRight size={26} strokeWidth={2.2} />
        </button>
      </div>
      <div className="coverflow__dots" role="tablist" aria-label={`${ariaLabel} position`}>
        {items.map((item, index) => (
          <button
            key={getKey(item)}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={`coverflow__dot${index === active ? ' is-on' : ''}`}
            onClick={() => setActive(index)}
          >
            <span className="sr-only">Show card {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
