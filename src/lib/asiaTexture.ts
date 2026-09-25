import { ASIA_MAP } from '../data/asiaMap'
import { globeTextureSrc } from './globeTexture'

let cached: string | null = null

/** Crops the world texture to an Asia-forward frame. */
export function asiaTextureSrc() {
  if (cached) return cached
  if (typeof document === 'undefined') {
    cached = ''
    return cached
  }

  const world = new Image()
  // Synchronous path: draw from an offscreen world canvas instead of waiting on Image
  const source = globeTextureSrc()
  if (!source) {
    cached = ''
    return cached
  }

  const canvas = document.createElement('canvas')
  canvas.width = ASIA_MAP.width
  canvas.height = ASIA_MAP.height
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) {
    cached = ''
    return cached
  }

  // Fill ocean first so letterboxing stays dark
  ctx.fillStyle = '#0c0f15'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Load world data URL into an image for cropping
  // Using a temporary Image synchronously only works if already decoded — decode via draw after load in callers.
  // For first paint we still decode asynchronously and cache.
  world.src = source
  // If browser has it cached from data URL, complete may already be true
  const paint = () => {
    const { x, y, w, h } = ASIA_MAP.crop
    ctx.drawImage(world, x, y, w, h, 0, 0, canvas.width, canvas.height)
    // Soft vignette so avatars read clearly (Goodwork-like stage)
    const glow = ctx.createRadialGradient(
      canvas.width * 0.55,
      canvas.height * 0.48,
      canvas.width * 0.12,
      canvas.width * 0.5,
      canvas.height * 0.5,
      canvas.width * 0.62,
    )
    glow.addColorStop(0, 'rgba(255,106,0,0.08)')
    glow.addColorStop(0.55, 'transparent')
    glow.addColorStop(1, 'rgba(12,10,11,0.55)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    cached = canvas.toDataURL('image/png')
  }

  if (world.complete) {
    paint()
    return cached ?? ''
  }

  // Fallback empty until async decode; PresenceSection will set when ready
  world.onload = () => {
    paint()
  }
  return ''
}

export function loadAsiaTexture(): Promise<string> {
  if (cached) return Promise.resolve(cached)
  return new Promise((resolve) => {
    const world = new Image()
    const source = globeTextureSrc()
    if (!source) {
      resolve('')
      return
    }
    world.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = ASIA_MAP.width
      canvas.height = ASIA_MAP.height
      const ctx = canvas.getContext('2d', { alpha: false })
      if (!ctx) {
        resolve('')
        return
      }
      ctx.fillStyle = '#0c0f15'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const { x, y, w, h } = ASIA_MAP.crop
      ctx.drawImage(world, x, y, w, h, 0, 0, canvas.width, canvas.height)
      const glow = ctx.createRadialGradient(
        canvas.width * 0.55,
        canvas.height * 0.48,
        canvas.width * 0.12,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.62,
      )
      glow.addColorStop(0, 'rgba(255,106,0,0.1)')
      glow.addColorStop(0.5, 'transparent')
      glow.addColorStop(1, 'rgba(12,10,11,0.58)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      cached = canvas.toDataURL('image/png')
      resolve(cached)
    }
    world.onerror = () => resolve('')
    world.src = source
  })
}
