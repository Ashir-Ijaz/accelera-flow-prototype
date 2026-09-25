import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'af-ui-sound'

type UiSoundContextValue = {
  enabled: boolean
  toggle: () => void
  playWhoosh: () => void
  playTick: () => void
}

const UiSoundContext = createContext<UiSoundContextValue | null>(null)

function readEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function makeWhoosh(ctx: AudioContext) {
  const duration = 0.28
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(180, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + duration)
  filter.type = 'lowpass'
  filter.frequency.value = 420
  gain.gain.setValueAtTime(0.0001, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 0.04)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + duration)
}

function makeTick(ctx: AudioContext) {
  const duration = 0.08
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(640, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + duration)
  gain.gain.setValueAtTime(0.0001, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.028, ctx.currentTime + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + duration)
}

export function UiSoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(readEnabled)
  const ctxRef = useRef<AudioContext | null>(null)

  const ensureCtx = useCallback(async () => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
    }
    if (ctxRef.current.state === 'suspended') {
      await ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const playWhoosh = useCallback(() => {
    if (!enabled) return
    void ensureCtx().then((ctx) => makeWhoosh(ctx))
  }, [enabled, ensureCtx])

  const playTick = useCallback(() => {
    if (!enabled) return
    void ensureCtx().then((ctx) => makeTick(ctx))
  }, [enabled, ensureCtx])

  const value = useMemo(
    () => ({ enabled, toggle, playWhoosh, playTick }),
    [enabled, toggle, playWhoosh, playTick],
  )

  return <UiSoundContext.Provider value={value}>{children}</UiSoundContext.Provider>
}

export function useUiSound() {
  const ctx = useContext(UiSoundContext)
  if (!ctx) {
    return {
      enabled: false,
      toggle: () => undefined,
      playWhoosh: () => undefined,
      playTick: () => undefined,
    }
  }
  return ctx
}
