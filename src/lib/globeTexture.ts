import { countryPaths, graticule, lakePaths, landTone, WORLD_MAP } from '../data/worldMap'

let cached: string | null = null

export function globeTextureSrc() {
  if (cached) return cached
  const canvas = document.createElement('canvas')
  canvas.width = WORLD_MAP.width
  canvas.height = WORLD_MAP.height
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) {
    cached = ''
    return cached
  }

  ctx.fillStyle = '#10141c'
  ctx.fillRect(0, 0, WORLD_MAP.width, WORLD_MAP.height)

  ctx.lineJoin = 'round'
  for (const line of graticule()) {
    const path = new Path2D(line.d)
    ctx.strokeStyle = line.major ? 'rgba(255,148,0,0.16)' : 'rgba(245,243,241,0.05)'
    ctx.lineWidth = line.major ? 0.8 : 0.6
    ctx.stroke(path)
  }

  ctx.lineWidth = 0.85
  ctx.lineJoin = 'round'
  for (const country of countryPaths) {
    try {
      const path = new Path2D(country.d)
      ctx.fillStyle = landTone(country.tone)
      ctx.strokeStyle = 'rgba(18,16,17,0.55)'
      ctx.fill(path)
      ctx.stroke(path)
    } catch {
      /* skip a broken country outline rather than blanking the globe */
    }
  }

  ctx.fillStyle = '#0d1118'
  ctx.strokeStyle = 'rgba(18,16,17,0.35)'
  ctx.lineWidth = 0.4
  for (const d of lakePaths) {
    const path = new Path2D(d)
    ctx.fill(path)
    ctx.stroke(path)
  }

  cached = canvas.toDataURL('image/png')
  return cached
}
