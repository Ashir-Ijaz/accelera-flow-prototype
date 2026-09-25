import { CatmullRomCurve3, Vector3 } from 'three'
import { channels } from '../../data/channels'
import { carouselVisual, chipMatchesScreen, contentScreenLabels } from '../../data/flowStages'

export { carouselVisual, chipMatchesScreen }

export type MutableProgress = {
  value: number
}

/**
 * Staggered gallery: alternating height + lateral offset + clear depth steps
 * so consecutive cards rarely share the same silhouette from camera.
 */
export const contentScreens = [
  { label: contentScreenLabels[0], position: [-2.9, 1.35, 0.0] as const, size: [2.3, 1.38] as const },
  { label: contentScreenLabels[1], position: [-0.85, 2.15, -1.85] as const, size: [2.2, 1.32] as const },
  { label: contentScreenLabels[2], position: [1.35, 0.55, -3.5] as const, size: [2.2, 1.32] as const },
  { label: contentScreenLabels[3], position: [3.05, 1.7, -2.0] as const, size: [2.35, 1.41] as const },
  { label: contentScreenLabels[4], position: [3.35, 0.7, 0.15] as const, size: [2.2, 1.32] as const },
  { label: contentScreenLabels[5], position: [2.15, 1.95, 2.15] as const, size: [2.2, 1.32] as const },
  { label: contentScreenLabels[6], position: [0.45, 0.65, 3.95] as const, size: [2.2, 1.32] as const },
  { label: contentScreenLabels[7], position: [-1.35, 1.75, 5.55] as const, size: [2.25, 1.35] as const },
  { label: contentScreenLabels[8], position: [-2.55, 0.7, 7.15] as const, size: [2.15, 1.29] as const },
  { label: contentScreenLabels[9], position: [-2.75, 1.85, 8.85] as const, size: [2.2, 1.32] as const },
  { label: contentScreenLabels[10], position: [-1.55, 0.85, 10.45] as const, size: [2.15, 1.29] as const },
  { label: contentScreenLabels[11], position: [0.15, 1.95, 11.85] as const, size: [2.2, 1.32] as const },
  { label: contentScreenLabels[12], position: [1.75, 0.95, 13.05] as const, size: [2.15, 1.29] as const },
  { label: contentScreenLabels[13], position: [2.85, 1.85, 14.15] as const, size: [2.2, 1.32] as const },
  { label: contentScreenLabels[14], position: [3.15, 1.15, 15.25] as const, size: [2.25, 1.35] as const },
]

/** Dock point under each card — where the spine passes */
export function cardDock(index: number) {
  const s = contentScreens[Math.max(0, Math.min(contentScreens.length - 1, index))]
  return new Vector3(s.position[0], s.position[1] - s.size[1] * 0.5 - 0.18, s.position[2])
}

/** Cinematic fly-through — same energy, tuned to the staggered gallery */
export function createCameraPath() {
  return new CatmullRomCurve3(
    [
      new Vector3(0.15, 3.75, 21.0),
      new Vector3(-4.4, 2.7, 11.4),
      new Vector3(-4.9, 1.75, 3.6),
      new Vector3(-2.2, 1.25, -2.8),
      new Vector3(1.35, 2.2, -4.0),
      new Vector3(3.9, 1.85, -0.15),
      new Vector3(3.15, 1.4, 3.7),
      new Vector3(0.55, 1.6, 7.3),
      new Vector3(-2.35, 2.3, 10.7),
      new Vector3(-0.7, 2.95, 14.9),
      new Vector3(0.25, 5.2, 20.0),
    ],
    false,
    'catmullrom',
    0.2,
  )
}

export function createLookPath() {
  return new CatmullRomCurve3(
    [
      new Vector3(0.05, 0.95, 1.1),
      ...contentScreens.map((s) => new Vector3(s.position[0], s.position[1] + 0.08, s.position[2])),
      new Vector3(0.2, 1.0, 4.0),
    ],
    false,
    'catmullrom',
    0.22,
  )
}

export const openingCameraPosition = [0.15, 3.75, 21.0] as const

export function activeCardLook(progress: number, out: Vector3) {
  const visual = carouselVisual(progress)
  const last = contentScreens.length - 1
  const i0 = Math.min(last, Math.max(0, Math.floor(visual.focus)))
  const i1 = Math.min(last, i0 + 1)
  const m = visual.focus - i0
  const a = contentScreens[i0].position
  const b = contentScreens[i1].position
  out.set(
    a[0] + (b[0] - a[0]) * m,
    a[1] + (b[1] - a[1]) * m + 0.08,
    a[2] + (b[2] - a[2]) * m,
  )
  return out
}

/**
 * Single clean spine through card docks — smooth tension, no zig-zag clutter.
 */
export function createCardLinkCurve() {
  const n = contentScreens.length
  const docks = Array.from({ length: n }, (_, i) => cardDock(i))
  return new CatmullRomCurve3(
    [
      docks[0].clone().add(new Vector3(0, -0.25, -2.8)),
      ...docks,
      docks[n - 1].clone().add(new Vector3(0, -0.2, 3.0)),
    ],
    false,
    'catmullrom',
    0.5,
  )
}

/**
 * Clean companion ribbons — same smooth spine language, spaced offsets.
 * Returns several so the scene can pick a balanced set.
 */
export function createFlowCurves() {
  const spine = createCardLinkCurve()
  const makeOffset = (lateral: number, lift: number, scaleX = 1, phase = 0) => {
    const steps = 24
    const pts: Vector3[] = []
    for (let i = 0; i <= steps; i += 1) {
      const u = i / steps
      const p = spine.getPoint(u)
      const t = spine.getTangent(u)
      const side = new Vector3(-t.z, 0, t.x)
      if (side.lengthSq() > 0.0001) side.normalize()
      else side.set(1, 0, 0)
      const wave = Math.sin(u * Math.PI * 2 + phase) * 0.18
      pts.push(new Vector3(
        p.x * scaleX + side.x * (lateral + wave),
        p.y + lift,
        p.z + side.z * (lateral + wave),
      ))
    }
    return new CatmullRomCurve3(pts, false, 'catmullrom', 0.48)
  }

  return [
    makeOffset(-1.55, 0.35, 1, 0.2),   // left parallel
    makeOffset(1.65, -0.25, 1, 1.1),  // right parallel
    makeOffset(0.15, -1.55, 0.7, 0.6), // soft underglow
    makeOffset(-2.4, 1.1, 1.05, 2.0),  // high outer left
    makeOffset(2.5, 0.85, 1.05, 2.6),  // high outer right
  ]
}

export const channelScreens = channels.map((channel, index) => {
  const angle = (index / channels.length) * Math.PI * 2
  return {
    label: channel.name,
    platform: channel.platform,
    position: [Math.cos(angle) * 8.4, Math.sin(angle * 1.4) * 2.5, 1.8 + Math.sin(angle) * 3.8] as const,
  }
})
