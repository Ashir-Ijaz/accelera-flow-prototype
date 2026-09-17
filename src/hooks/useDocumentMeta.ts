import { useEffect } from 'react'
import type { PageMeta } from '../types'

export function useDocumentMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title

    const setMeta = (selector: string, attr: string, value: string) => {
      const node = document.head.querySelector(selector)
      if (node) node.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
  }, [title, description])
}
