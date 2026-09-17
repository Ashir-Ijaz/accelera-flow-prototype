import { useEffect } from 'react'
import type { RefObject } from 'react'

export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current
    if (!node) return

    let dragging = false
    let moved = false
    let startX = 0
    let startLeft = 0

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      dragging = true
      moved = false
      startX = event.clientX
      startLeft = node.scrollLeft
      node.classList.add('is-dragging')
      node.setPointerCapture(event.pointerId)
    }

    const onMove = (event: PointerEvent) => {
      if (!dragging) return
      const dx = event.clientX - startX
      if (Math.abs(dx) > 6) moved = true
      node.scrollLeft = startLeft - dx
    }

    const onUp = (event: PointerEvent) => {
      if (!dragging) return
      dragging = false
      node.classList.remove('is-dragging')
      if (node.hasPointerCapture(event.pointerId)) node.releasePointerCapture(event.pointerId)
    }

    const onClick = (event: MouseEvent) => {
      if (!moved) return
      event.preventDefault()
      event.stopPropagation()
      moved = false
    }

    node.addEventListener('pointerdown', onDown)
    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerup', onUp)
    node.addEventListener('pointercancel', onUp)
    node.addEventListener('click', onClick, true)

    return () => {
      node.removeEventListener('pointerdown', onDown)
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerup', onUp)
      node.removeEventListener('pointercancel', onUp)
      node.removeEventListener('click', onClick, true)
    }
  }, [ref])
}
