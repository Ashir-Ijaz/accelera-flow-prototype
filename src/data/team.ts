import { media } from './media'

export type TeamMember = {
  id: string
  name: string
  role: string
  desk: string
  focus: string
  visual: string
}

export const teamMembers: TeamMember[] = [
  {
    id: 'aoun',
    name: 'Aoun Muhammad',
    role: 'Founder',
    desk: 'Pakistan / United Kingdom',
    focus: 'The studio, the brands, and the people behind them.',
    visual: media.board,
  },
  {
    id: 'hira',
    name: 'Hira',
    role: 'Script & research',
    desk: 'Karachi',
    focus: 'Turns raw ideas into language the brands can stand on.',
    visual: media.night,
  },
  {
    id: 'daniyal',
    name: 'Daniyal',
    role: 'Design',
    desk: 'Lahore',
    focus: 'Keeps every frame in the charcoal and ember system.',
    visual: media.structure,
  },
  {
    id: 'sana',
    name: 'Sana',
    role: 'Short-form video',
    desk: 'Karachi',
    focus: 'Cuts for attention without putting a face in front of the work.',
    visual: media.film,
  },
  {
    id: 'bilal',
    name: 'Bilal',
    role: 'Publishing',
    desk: 'London',
    focus: 'Gets finished work onto the channels it belongs on.',
    visual: media.ember,
  },
  {
    id: 'amna',
    name: 'Amna',
    role: 'Community',
    desk: 'Manila',
    focus: 'Holds the comments, the tone, and the room around each brand.',
    visual: media.signal,
  },
  {
    id: 'yusuf',
    name: 'Yusuf',
    role: 'Conversations',
    desk: 'Lagos',
    focus: 'Turns inbound messages into the next useful step.',
    visual: media.pulse,
  },
  {
    id: 'noor',
    name: 'Noor',
    role: 'Growth',
    desk: 'São Paulo',
    focus: 'Looks for the next audience without inflating the story.',
    visual: media.stage,
  },
]
