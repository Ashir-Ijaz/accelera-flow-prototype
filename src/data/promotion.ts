export const instagramPlacements = [
  {
    id: 'story-24',
    title: '24-hour Instagram Story',
    detail: 'A story that lives for a day, then comes down.',
  },
  {
    id: 'feed-24',
    title: '24-hour Feed Post',
    detail: 'A feed post that is taken down after twenty-four hours.',
  },
  {
    id: 'reel',
    title: 'Reel Post',
    detail: 'A reel on the Instagram grid and Reels surface.',
  },
  {
    id: 'feed-permanent',
    title: 'Permanent Feed Post',
    detail: 'A feed post that stays on the profile.',
  },
] as const

export type InstagramPlacementId = (typeof instagramPlacements)[number]['id']

export const promotionCopy = {
  picker: {
    kicker: 'Promotion',
    title: 'Put a brand in front of an audience already watching.',
    body: 'Choose YouTube or Instagram. Tell us the brief. We reply by email with pricing, charges, and whether the slot fits.',
  },
  youtube: {
    kicker: 'YouTube promotion',
    title: 'Write the brief for the next slot on the channel.',
    body: 'This is not a generic enquiry. Tell us what the viewer should watch, how long the placement should run, and what they should do when it ends. We reply by email with pricing.',
  },
  instagram: {
    kicker: 'Instagram promotion',
    title: 'Tap the surfaces. We price the mix.',
    body: 'Story, a day on the feed, a reel, or a post that stays. Select one or several. We reply by email with charges for each.',
  },
  confirm:
    'You will receive an email with the pricing, charges, and the other details for this request.',
} as const
