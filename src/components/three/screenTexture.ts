import { useEffect, useMemo, useRef } from 'react'
import { SRGBColorSpace, CanvasTexture, LinearFilter } from 'three'

const palette = ['#FF6A00', '#F04400', '#FF9400']
const WIDTH = 512
const HEIGHT = 320

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
  ctx.font = '700 22px Manrope, sans-serif'
  ctx.fillText(kicker.toUpperCase(), 36, 68)

  ctx.fillStyle = '#FFF6EE'
  ctx.font = '700 48px "Space Grotesk", sans-serif'
  wrapText(ctx, label, 36, 128, WIDTH - 80, 54)

  ctx.fillStyle = 'rgba(255,148,0,0.55)'
  ctx.fillRect(36, HEIGHT - 48, 160, 6)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 4
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

export function useScreenTexture(label: string, kicker?: string) {
  const texture = useMemo(() => createScreenTexture(label, kicker), [kicker, label])
  const ref = useRef(texture)

  useEffect(() => {
    const current = ref.current
    return () => current.dispose()
  }, [texture])

  return { texture }
}
