import { WORLD_MAP, projectDesk } from './worldMap'

/** Asia framing for the Presence map (Pakistan → Philippines belt). */
export const ASIA_BOUNDS = {
  lngMin: 52,
  lngMax: 142,
  latMin: -6,
  latMax: 48,
} as const

const PAD = 28

const nw = projectDesk(ASIA_BOUNDS.lngMin, ASIA_BOUNDS.latMax)
const se = projectDesk(ASIA_BOUNDS.lngMax, ASIA_BOUNDS.latMin)

export const ASIA_MAP = {
  width: 1200,
  height: 720,
  crop: {
    x: Math.max(0, nw.x - PAD),
    y: Math.max(0, nw.y - PAD),
    w: Math.min(WORLD_MAP.width, se.x + PAD) - Math.max(0, nw.x - PAD),
    h: Math.min(WORLD_MAP.height, se.y + PAD) - Math.max(0, nw.y - PAD),
  },
} as const

/** Project a desk into percent coords inside the Asia crop (0–100). */
export function projectAsiaPercent(lng: number, lat: number) {
  const point = projectDesk(lng, lat)
  return {
    x: ((point.x - ASIA_MAP.crop.x) / ASIA_MAP.crop.w) * 100,
    y: ((point.y - ASIA_MAP.crop.y) / ASIA_MAP.crop.h) * 100,
  }
}
