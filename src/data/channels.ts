import type { Channel } from '../types'

export const channels: Channel[] = [
  {
    id: 'wealth-whizz',
    name: 'Wealth Whizz',
    platform: 'instagram',
    url: 'https://www.instagram.com/wealth.whizz/',
    blurb: 'Owned Instagram brand inside the Accelera Flow system.',
    featured: true,
  },
  {
    id: 'neuromatrix',
    name: 'Neuromatrix',
    platform: 'instagram',
    url: 'https://www.instagram.com/neuromatrix_/',
    blurb: 'Owned Instagram brand focused on ideas in motion.',
  },
  {
    id: 'anonhabit',
    name: 'Anonhabit',
    platform: 'instagram',
    url: 'https://www.instagram.com/anonhabit/',
    blurb: 'Owned Instagram brand built around faceless storytelling.',
  },
  {
    id: 'reboot-with-ash',
    name: 'Reboot with Ash',
    platform: 'instagram',
    url: 'https://www.instagram.com/rebootwithash/',
    blurb: 'Owned Instagram brand inside the same creative system.',
  },
  {
    id: 'guidetechpro',
    name: 'GuideTechPro',
    platform: 'youtube',
    url: 'https://www.youtube.com/@GuideTechPro',
    blurb: 'Owned YouTube channel produced through Accelera Flow.',
  },
  {
    id: 'cyzmify',
    name: 'Cyzmify',
    platform: 'youtube',
    url: 'https://www.youtube.com/@cyzmify',
    blurb: 'Owned YouTube channel inside the publishing system.',
  },
  {
    id: 'iquickfixer',
    name: 'iQuickFixer',
    platform: 'youtube',
    url: 'https://www.youtube.com/@iquickfixer',
    blurb: 'Owned YouTube channel created behind the scenes.',
  },
]

export const featuredChannel = channels.find((channel) => channel.featured) ?? channels[0]!
