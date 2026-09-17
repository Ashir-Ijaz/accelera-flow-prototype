import worldMapPaths from './worldMapPaths.json'

export const WORLD_MAP = {
  width: 1120,
  height: 560,
} as const

export const countryPaths: { d: string; tone: number }[] = worldMapPaths.countryPaths
export const lakePaths: string[] = worldMapPaths.lakePaths

const LAND_TONES = ['#6f6768', '#5d5657', '#7a7273', '#655e5f', '#746c6d'] as const

export function landTone(tone: number) {
  return LAND_TONES[tone % LAND_TONES.length]
}

const LNG_MIN = -168
const LNG_MAX = 179
const LAT_MIN = -56
const LAT_MAX = 78
const PAD = 18

function miller(lng: number, lat: number) {
  const lambda = (lng * Math.PI) / 180
  const phi = (lat * Math.PI) / 180
  return {
    x: lambda,
    y: 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * phi)),
  }
}

const bounds = {
  minX: miller(LNG_MIN, 0).x,
  maxX: miller(LNG_MAX, 0).x,
  minY: miller(0, LAT_MIN).y,
  maxY: miller(0, LAT_MAX).y,
}

export function projectDesk(lng: number, lat: number) {
  const point = miller(lng, lat)
  return {
    x: PAD + ((point.x - bounds.minX) / (bounds.maxX - bounds.minX)) * (WORLD_MAP.width - PAD * 2),
    y: PAD + ((bounds.maxY - point.y) / (bounds.maxY - bounds.minY)) * (WORLD_MAP.height - PAD * 2),
  }
}

export function graticule() {
  const lines: { d: string; major: boolean }[] = []
  for (let lat = -40; lat <= 60; lat += 20) {
    const from = projectDesk(LNG_MIN, lat)
    const to = projectDesk(LNG_MAX, lat)
    lines.push({
      d: `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} L ${to.x.toFixed(1)} ${to.y.toFixed(1)}`,
      major: lat === 0,
    })
  }
  for (let lng = -150; lng <= 150; lng += 30) {
    const from = projectDesk(lng, LAT_MAX - 2)
    const to = projectDesk(lng, LAT_MIN + 2)
    lines.push({
      d: `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} L ${to.x.toFixed(1)} ${to.y.toFixed(1)}`,
      major: lng === 0,
    })
  }
  return lines
}
