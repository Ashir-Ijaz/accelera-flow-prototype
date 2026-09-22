import type { FlowStage } from '../types'

export const flowStages: FlowStage[] = [
  {
    key: 'arrival',
    index: 0,
    from: 0,
    to: 0.14,
    kicker: 'Accelera Flow LTD',
    title: 'Content in motion. Opportunity in flow.',
    body: '',
    alignment: 'left',
    boards: ['Idea', 'Script', 'Design', 'Video'],
  },
  {
    key: 'idea',
    index: 1,
    from: 0.14,
    to: 0.29,
    kicker: '01 / Idea',
    title: 'A thought worth sharing.',
    body: '',
    alignment: 'left',
    boards: ['Idea'],
  },
  {
    key: 'create',
    index: 2,
    from: 0.29,
    to: 0.45,
    kicker: '02 / Create',
    title: 'Faceless craft. Real thinking.',
    body: '',
    alignment: 'right',
    boards: ['Script', 'Design', 'Short-form video'],
  },
  {
    key: 'publish',
    index: 3,
    from: 0.45,
    to: 0.61,
    kicker: '03 / Publish',
    title: 'One system. Seven channels.',
    body: '',
    alignment: 'left',
    boards: ['Publishing', 'Wealth Whizz', 'Neuromatrix', 'GuideTechPro'],
  },
  {
    key: 'engage',
    index: 4,
    from: 0.61,
    to: 0.79,
    kicker: '04 / Engage',
    title: 'Attention becomes conversation.',
    body: '',
    alignment: 'right',
    boards: ['Community', 'DM conversation', 'Growth'],
  },
  {
    key: 'opportunity',
    index: 5,
    from: 0.79,
    to: 0.92,
    kicker: '05 / Opportunity',
    title: 'Twelve students, behind the work.',
    body: '',
    alignment: 'left',
    boards: ['Opportunity', 'Skills', 'Study', 'Team'],
  },
  {
    key: 'resolution',
    index: 6,
    from: 0.92,
    to: 1,
    kicker: 'Flow complete',
    title: 'Let your next idea flow.',
    body: '',
    alignment: 'left',
    boards: ['Idea', 'Create', 'Publish', 'Engage'],
  },
]

export function stageFromProgress(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress))
  const match = flowStages.find((stage) => clamped >= stage.from && clamped < stage.to)
  return match ?? flowStages[flowStages.length - 1]
}

export const contentScreenLabels = [
  'Idea',
  'Script',
  'Design',
  'Short-form video',
  'Publishing',
  'Wealth Whizz',
  'Neuromatrix',
  'GuideTechPro',
  'Community',
  'DM conversation',
  'Growth',
  'Opportunity',
  'Skills',
  'Study',
  'Team',
] as const

const journeyHolds = [
  { from: 0, to: 0.29 },
  { from: 0.29, to: 0.343 },
  { from: 0.343, to: 0.396 },
  { from: 0.396, to: 0.45 },
  { from: 0.45, to: 0.49 },
  { from: 0.49, to: 0.53 },
  { from: 0.53, to: 0.57 },
  { from: 0.57, to: 0.61 },
  { from: 0.61, to: 0.67 },
  { from: 0.67, to: 0.73 },
  { from: 0.73, to: 0.79 },
  { from: 0.79, to: 0.823 },
  { from: 0.823, to: 0.856 },
  { from: 0.856, to: 0.889 },
  { from: 0.889, to: 1 },
] as const

export function screenAliases(screen: string) {
  if (screen === 'Short-form video' || screen === 'Video') return ['Video', 'Short-form video']
  if (screen === 'Publishing' || screen === 'Publish') return ['Publish', 'Publishing']
  if (screen === 'Community' || screen === 'Engage') return ['Engage', 'Community']
  return [screen]
}

export function chipMatchesScreen(board: string, screen: string) {
  return screenAliases(board).includes(screen) || screenAliases(screen).includes(board)
}

export function carouselVisual(progress: number) {
  const p = Math.min(0.9999, Math.max(0, progress))
  const last = contentScreenLabels.length - 1
  let index = last
  for (let i = 0; i < journeyHolds.length; i += 1) {
    if (p < journeyHolds[i].to) {
      index = i
      break
    }
  }

  const hold = journeyHolds[index]
  const local = (p - hold.from) / Math.max(0.0001, hold.to - hold.from)
  const slideStart = 0.7
  let focus = index
  if (local > slideStart && index < last) {
    focus = index + (local - slideStart) / (1 - slideStart)
  }

  return {
    focus,
    turn: index,
    index,
    next: Math.min(last, index + 1),
    mix: Math.max(0, focus - Math.floor(focus)),
    screen: contentScreenLabels[index],
  }
}

export function boardFocusFromProgress(stage: FlowStage, progress: number) {
  return boardFocusFromScreen(stage, screenFocusFromProgress(progress))
}

export function screenBlendFromProgress(progress: number) {
  const visual = carouselVisual(progress)
  return { index: visual.index, next: visual.next, mix: visual.mix, focus: visual.turn }
}

export function screenFocusFromProgress(progress: number) {
  return carouselVisual(progress).screen
}

export function boardFocusFromScreen(stage: FlowStage, screen: string) {
  return stage.boards.slice(0, 4).findIndex((board) => chipMatchesScreen(board, screen))
}
