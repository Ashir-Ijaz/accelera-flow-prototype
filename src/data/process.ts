import type { ProcessStage } from '../types'

export const processStages: ProcessStage[] = [
  {
    id: 'discover',
    index: '01',
    title: 'Discover',
    sentence: 'Listen to the idea, the audience and the constraint before anything is made.',
    icon: 'search',
  },
  {
    id: 'plan',
    index: '02',
    title: 'Plan',
    sentence: 'Shape a publishing path that the team can actually sustain.',
    icon: 'map',
  },
  {
    id: 'create',
    index: '03',
    title: 'Create',
    sentence: 'Write, design and edit faceless work with people behind every frame.',
    icon: 'pen-tool',
  },
  {
    id: 'publish',
    index: '04',
    title: 'Publish',
    sentence: 'Release across the channels that already belong to the system.',
    icon: 'radio',
  },
  {
    id: 'engage',
    index: '05',
    title: 'Engage',
    sentence: 'Answer, qualify and keep the conversation moving in brand voice.',
    icon: 'messages',
  },
  {
    id: 'grow',
    index: '06',
    title: 'Grow',
    sentence: 'Return to what is working and open the next opportunity behind the scenes.',
    icon: 'sprout',
  },
]
