import { teamMedia } from './media'

export type TeamMember = {
  id: string
  name: string
  role?: string
  visual: string
}

export const teamMembers: TeamMember[] = [
  { id: 'aoun', name: 'Aoun Muhammad', role: 'Founder', visual: teamMedia.aoun },
  { id: 'eisha', name: 'Eisha', visual: teamMedia.eisha },
  { id: 'fatima', name: 'Fatima', visual: teamMedia.fatima },
  { id: 'hafsa', name: 'Hafsa', visual: teamMedia.hafsa },
  { id: 'ibrahim', name: 'Ibrahim', visual: teamMedia.ibrahim },
  { id: 'komel', name: 'Komel', visual: teamMedia.komel },
  { id: 'rafay', name: 'Rafay', visual: teamMedia.rafay },
  { id: 'saliha', name: 'Saliha', visual: teamMedia.saliha },
  { id: 'urooba', name: 'Urooba', visual: teamMedia.urooba },
]
