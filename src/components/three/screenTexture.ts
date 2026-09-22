import { useEffect, useMemo, useRef } from 'react'
import { SRGBColorSpace, CanvasTexture, LinearFilter } from 'three'

const palette = ['#FF6A00', '#F04400', '#FF9400']
const WIDTH = 256
const HEIGHT = 160

export function createScreenTexture(label: string, kicker = 'Flow') {
  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const ctx = canvas.getContext('2d')
  if (!ctx) return new CanvasTexture(canvas)

  ctx.fillStyle = '#2a1810'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
  const wash = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT)
  wash.addColorStop(0, '#4a1c08')
  wash.addColorStop(0.45, '#21110c')
  wash.addColorStop(1, '#3a1406')
  ctx.fillStyle = wash
  ctx.fillRect(16, 16, WIDTH - 32, HEIGHT - 32)

  const accent = palette[label.length % palette.length] ?? '#FF6A00'
  ctx.fillStyle = accent
  ctx.fillRect(16, 16, WIDTH - 32, 14)

  ctx.fillStyle = '#FFB14A'
  ctx.font = '700 14px Manrope, sans-serif'
  ctx.fillText(kicker.toUpperCase(), 22, 40)

  ctx.fillStyle = '#FFF6EE'
  ctx.font = '700 28px "Space Grotesk", sans-serif'
  wrapText(ctx, label, 22, 72, WIDTH - 44, 30)

  ctx.fillStyle = 'rgba(255,148,0,0.55)'
  ctx.fillRect(36, HEIGHT - 48, 160, 6)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 1
  texture.generateMipmaps = false
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  return texture
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(' ')
  let line = ''
  let offset = 0
  for (const word of words) {
    const test = `${line}${word} `
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y + offset)
      line = `${word} `
      offset += lineHeight
    } else {
      line = test
    }
  }
  ctx.fillText(line, x, y + offset)
}

export function createHaloTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return new CanvasTexture(canvas)
  const glow = ctx.createRadialGradient(size / 2, size / 2, size * 0.16, size / 2, size / 2, size * 0.5)
  glow.addColorStop(0, 'rgba(255, 177, 74, 0)')
  glow.addColorStop(0.34, 'rgba(255, 177, 74, 0)')
  glow.addColorStop(0.46, 'rgba(255, 177, 74, 0.35)')
  glow.addColorStop(0.58, 'rgba(255, 148, 0, 0.95)')
  glow.addColorStop(0.72, 'rgba(255, 106, 0, 0.5)')
  glow.addColorStop(1, 'rgba(240, 68, 0, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, size, size)
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.generateMipmaps = false
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  return texture
}

export function useScreenTexture(label: string, kicker?: string) {
  const texture = useMemo(() => createScreenTexture(label, kicker), [kicker, label])
  const ref = useRef(texture)

  useEffect(() => {
    const current = ref.current
    return () => current.dispose()
  }, [texture])

  return { texture }
}
