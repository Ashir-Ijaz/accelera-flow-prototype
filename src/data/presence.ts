export type PresenceDesk = {
  id: string
  city: string
  region: string
  focus: string
  lng: number
  lat: number
  label: 'left' | 'right'
  people: { name: string; role: string }[]
}

export const presenceDesks: PresenceDesk[] = [
  {
    id: 'karachi',
    city: 'Karachi',
    region: 'Pakistan',
    focus: 'Studio production and the daily flow of the brands.',
    lng: 67.0,
    lat: 24.86,
    label: 'left',
    people: [
      { name: 'Aoun Muhammad', role: 'Founder' },
      { name: 'Hira', role: 'Script & research' },
      { name: 'Sana', role: 'Short-form video' },
    ],
  },
  {
    id: 'lahore',
    city: 'Lahore',
    region: 'Pakistan',
    focus: 'Script, design and editorial desks.',
    lng: 74.36,
    lat: 31.52,
    label: 'right',
    people: [{ name: 'Daniyal', role: 'Design' }],
  },
  {
    id: 'london',
    city: 'London',
    region: 'United Kingdom',
    focus: 'Registered company base, 2025.',
    lng: -0.13,
    lat: 51.51,
    label: 'left',
    people: [{ name: 'Bilal', role: 'Publishing' }],
  },
  {
    id: 'lagos',
    city: 'Lagos',
    region: 'Nigeria',
    focus: 'Student desk for conversations and community.',
    lng: 3.38,
    lat: 6.52,
    label: 'right',
    people: [{ name: 'Yusuf', role: 'Conversations' }],
  },
  {
    id: 'manila',
    city: 'Manila',
    region: 'Philippines',
    focus: 'Student desk for publishing and short-form.',
    lng: 120.98,
    lat: 14.6,
    label: 'left',
    people: [{ name: 'Amna', role: 'Community' }],
  },
  {
    id: 'sao-paulo',
    city: 'São Paulo',
    region: 'Brazil',
    focus: 'Student desk for growth and outreach.',
    lng: -46.63,
    lat: -23.55,
    label: 'right',
    people: [{ name: 'Noor', role: 'Growth' }],
  },
]
