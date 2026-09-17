import { createContext, useContext } from 'react'

export type LenisApi = {
  scrollTo: (value: number, options?: { immediate?: boolean; duration?: number }) => void
  stop: () => void
  start: () => void
}

export const LenisContext = createContext<LenisApi | null>(null)

export function useLenisInstance() {
  return useContext(LenisContext)
}
