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
    people: [{ name: 'Aoun Muhammad', role: 'Founder' }],
  },
  {
    id: 'lahore',
    city: 'Lahore',
    region: 'Pakistan',
    focus: 'A Pakistan desk for the work.',
    lng: 74.36,
    lat: 31.52,
    label: 'right',
    people: [],
  },
  {
    id: 'london',
    city: 'London',
    region: 'United Kingdom',
    focus: 'Registered company base, 2025.',
    lng: -0.13,
    lat: 51.51,
    label: 'left',
    people: [],
  },
  {
    id: 'lagos',
    city: 'Lagos',
    region: 'Nigeria',
    focus: 'A student desk for the work.',
    lng: 3.38,
    lat: 6.52,
    label: 'right',
    people: [],
  },
  {
    id: 'manila',
    city: 'Manila',
    region: 'Philippines',
    focus: 'A student desk for the work.',
    lng: 120.98,
    lat: 14.6,
    label: 'left',
    people: [],
  },
  {
    id: 'sao-paulo',
    city: 'São Paulo',
    region: 'Brazil',
    focus: 'A student desk for the work.',
    lng: -46.63,
    lat: -23.55,
    label: 'right',
    people: [],
  },
]
