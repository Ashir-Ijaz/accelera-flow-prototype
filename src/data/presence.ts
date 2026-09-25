import { teamMedia } from './media'

export type PresencePerson = {
  id: string
  name: string
  /** Placeholder until real titles are supplied */
  role: string
  visual: string
}

/**
 * Real Accelera Flow team — roles are temporary placeholders.
 */
export const presencePeople: PresencePerson[] = [
  { id: 'aoun', name: 'Aoun Muhammad', role: 'Founder', visual: teamMedia.aoun },
  { id: 'eisha', name: 'Eisha', role: 'Content Lead', visual: teamMedia.eisha },
  { id: 'fatima', name: 'Fatima', role: 'Social Manager', visual: teamMedia.fatima },
  { id: 'hafsa', name: 'Hafsa', role: 'Design Lead', visual: teamMedia.hafsa },
  { id: 'ibrahim', name: 'Ibrahim', role: 'Outreach Lead', visual: teamMedia.ibrahim },
  { id: 'komel', name: 'Komel', role: 'DM Ops', visual: teamMedia.komel },
  { id: 'rafay', name: 'Rafay', role: 'Studio Producer', visual: teamMedia.rafay },
  { id: 'saliha', name: 'Saliha', role: 'Clipping Editor', visual: teamMedia.saliha },
  { id: 'urooba', name: 'Urooba', role: 'Sales Support', visual: teamMedia.urooba },
]
