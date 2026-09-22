import { CatmullRomCurve3, Vector3 } from 'three'
import { channels } from '../../data/channels'
import { carouselVisual, chipMatchesScreen, contentScreenLabels } from '../../data/flowStages'

export { carouselVisual, chipMatchesScreen }

export type MutableProgress = {
  value: number
}

export function createFlowCurves() {
  const ribbonA = new CatmullRomCurve3([
    new Vector3(-8.4, 2.4, -6.2),
    new Vector3(-5.2, 1.5, -2.1),
    new Vector3(-1.1, 0.7, 0.3),
    new Vector3(1.6, 1.9, 1.4),
    new Vector3(3.4, -0.5, 4.6),
    new Vector3(0.8, 1.1, 8.4),
  ], false, 'catmullrom', 0.35)

  const ribbonB = new CatmullRomCurve3([
    new Vector3(7.8, 2.6, -5.4),
    new Vector3(4.1, 0.9, -1.6),
    new Vector3(0.5, 0.15, 0.15),
    new Vector3(-2.6, 1.7, 3.4),
    new Vector3(-4.5, -0.7, 7.0),
  ], false, 'catmullrom', 0.32)

  const ribbonC = new CatmullRomCurve3([
    new Vector3(-6.2, -1.9, 2.2),
    new Vector3(-2.1, 0.5, 1.1),
    new Vector3(0.15, 2.35, 0),
    new Vector3(2.6, 0.15, 2.9),
    new Vector3(5.8, 1.8, 6.4),
  ], false, 'catmullrom', 0.3)

  const ribbonD = new CatmullRomCurve3([
    new Vector3(-9.2, 0.4, 4.8),
    new Vector3(-4.6, 2.8, 2.2),
    new Vector3(0.2, -0.8, 5.4),
    new Vector3(4.8, 2.4, 8.6),
    new Vector3(8.6, 0.2, 3.2),
  ], false, 'catmullrom', 0.34)

  const ribbonE = new CatmullRomCurve3([
    new Vector3(2.4, 3.6, -7.2),
    new Vector3(-1.8, 2.2, -3.4),
    new Vector3(-5.4, 0.4, 1.6),
    new Vector3(-1.2, -1.4, 6.8),
    new Vector3(3.6, 1.2, 11.2),
  ], false, 'catmullrom', 0.3)

  return [ribbonA, ribbonB, ribbonC, ribbonD, ribbonE]
}

export function createCameraPath() {
  return new CatmullRomCurve3(
    [
      new Vector3(0.22, 4.15, 24.5),
      new Vector3(-6.8, 2.6, 8.8),
      new Vector3(-7.4, 1.35, 0.6),
      new Vector3(-2.8, 0.7, -5.4),
      new Vector3(1.8, 2.4, -6.2),
      new Vector3(7.2, 1.5, -0.4),
      new Vector3(7.6, 0.55, 7.2),
      new Vector3(2.4, 2.8, 12.4),
      new Vector3(-4.2, 3.2, 14.6),
      new Vector3(0.25, 6.4, 22.5),
    ],
    false,
    'catmullrom',
    0.18,
  )
}

export function createLookPath() {
  return new CatmullRomCurve3(
    [
      new Vector3(0.1, 0.72, 1.2),
      new Vector3(-6.4, 1.15, -1.6),
      new Vector3(-3.2, 2.1, -3.8),
      new Vector3(-0.4, -0.2, -5.6),
      new Vector3(2.6, 1.4, -4.4),
      new Vector3(6.2, 1.9, 0.6),
      new Vector3(7.4, -0.05, 4.6),
      new Vector3(5.8, 0.55, 9.2),
      new Vector3(1.2, 2.6, 10.4),
      new Vector3(-4.6, 1.5, 11.8),
      new Vector3(0.1, 0.7, 4.2),
    ],
    false,
    'catmullrom',
    0.18,
  )
}

export const openingCameraPosition = [0.22, 4.15, 24.5] as const

export function createCardLinkCurve() {
  return new CatmullRomCurve3(
    contentScreens.map((screen) => new Vector3(screen.position[0], screen.position[1] - 0.55, screen.position[2])),
    false,
    'catmullrom',
    0.42,
  )
}

export const contentScreens = [
  { label: contentScreenLabels[0], position: [-6.4, 1.15, -1.6] as const, size: [2.2, 1.32] as const },
  { label: contentScreenLabels[1], position: [-3.2, 2.1, -3.8] as const, size: [2.1, 1.26] as const },
  { label: contentScreenLabels[2], position: [-0.4, -0.4, -5.6] as const, size: [2.05, 1.22] as const },
  { label: contentScreenLabels[3], position: [2.6, 1.4, -4.4] as const, size: [2.3, 1.38] as const },
  { label: contentScreenLabels[4], position: [6.2, 1.9, 0.6] as const, size: [2.1, 1.26] as const },
  { label: contentScreenLabels[5], position: [6.8, 1.1, 1.8] as const, size: [2.05, 1.22] as const },
  { label: contentScreenLabels[6], position: [7.1, 0.4, 3.1] as const, size: [2.05, 1.22] as const },
  { label: contentScreenLabels[7], position: [7.4, -0.2, 4.6] as const, size: [2.1, 1.26] as const },
  { label: contentScreenLabels[8], position: [6.6, 0.2, 6.8] as const, size: [2.0, 1.2] as const },
  { label: contentScreenLabels[9], position: [5.8, 0.55, 9.2] as const, size: [2.15, 1.3] as const },
  { label: contentScreenLabels[10], position: [1.2, 2.6, 10.4] as const, size: [1.95, 1.16] as const },
  { label: contentScreenLabels[11], position: [-4.6, 1.5, 11.8] as const, size: [2.1, 1.26] as const },
  { label: contentScreenLabels[12], position: [-5.2, 2.0, 13.2] as const, size: [2.0, 1.2] as const },
  { label: contentScreenLabels[13], position: [-3.8, 2.4, 14.6] as const, size: [2.05, 1.22] as const },
  { label: contentScreenLabels[14], position: [-1.2, 2.8, 15.4] as const, size: [2.1, 1.26] as const },
]

export const channelScreens = channels.map((channel, index) => {
  const angle = (index / channels.length) * Math.PI * 2
  return {
    label: channel.name,
    platform: channel.platform,
    position: [Math.cos(angle) * 5.8, Math.sin(angle * 1.4) * 1.85, 3.2 + Math.sin(angle) * 2.6] as const,
  }
})
