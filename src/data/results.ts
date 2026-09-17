import type { ResultPlaceholder } from '../types'

export const resultPlaceholders: ResultPlaceholder[] = [
  {
    id: 'owned-instagram',
    category: 'instagram',
    label: 'Owned Instagram result',
    metricFocus: ['Views', 'Followers gained', 'Accounts reached', 'Reporting period'],
  },
  {
    id: 'owned-youtube',
    category: 'youtube',
    label: 'Owned YouTube result',
    metricFocus: ['Views', 'Subscribers gained', 'Watch time', 'Reporting period'],
  },
  {
    id: 'client-instagram',
    category: 'client',
    label: 'Selected client result — Instagram',
    metricFocus: ['Views', 'Followers gained', 'Accounts reached', 'Reporting period'],
  },
  {
    id: 'client-youtube',
    category: 'client',
    label: 'Selected client result — YouTube',
    metricFocus: ['Views', 'Subscribers gained', 'Watch time', 'Reporting period'],
  },
]
