import { useEffect } from 'react'

export function useLockedBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const previousOverflow = document.body.style.overflow
    const previousPadding = document.body.style.paddingRight
    const scrollBar = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollBar > 0) {
      document.body.style.paddingRight = `${scrollBar}px`
    }

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPadding
    }
  }, [locked])
}
