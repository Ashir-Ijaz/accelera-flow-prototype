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

export function boardFocusFromProgress(stage: FlowStage, progress: number) {
  const boards = stage.boards.slice(0, 4)
  if (boards.length <= 1) return 0
  const span = Math.max(0.0001, stage.to - stage.from)
  const local = Math.min(0.999, Math.max(0, (progress - stage.from) / span))
  return Math.min(boards.length - 1, Math.floor(local * boards.length))
}

export const contentScreenLabels = [
  'Idea',
  'Script',
  'Design',
  'Short-form video',
  'Publishing',
  'Community',
  'DM conversation',
  'Growth',
  'Opportunity',
] as const
