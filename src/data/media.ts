import { asset } from '../lib/paths'

export const media = {
  stage: asset('/media/stage.webp'),
  gradient: asset('/media/gradient.webp'),
  flow: asset('/media/flow.webp'),
  ember: asset('/media/ember.webp'),
  signal: asset('/media/signal.webp'),
  film: asset('/media/film.webp'),
  night: asset('/media/night.webp'),
  board: asset('/media/board.webp'),
  pulse: asset('/media/pulse.webp'),
  structure: asset('/media/structure.webp'),
} as const

export type BrandBanner = {
  src: string
  card: string
  stage: string
  width: number
  height: number
}

function banner(name: string, homePoster = false): BrandBanner {
  return {
    src: `${asset(`/media/real/brands/${name}.webp`)}?v=6`,
    card: `${asset(`/media/real/brands/${name}-place-card.webp`)}?v=6`,
    stage: `${asset(`/media/real/brands/${homePoster ? `${name}-home` : name}.webp`)}?v=6`,
    width: 1400,
    height: 933,
  }
}

export const brandBanners = {
  wealthWhizz: banner('wealth-whizz', true),
  wifiMoney: banner('wifi-money'),
  mindsetThoughts: banner('mindset-thoughts'),
  neuromatrix: banner('neuromatrix'),
  rebootWithAsh: banner('reboot-with-ash', true),
  anonhabit: banner('anonhabit', true),
  cyzmify: banner('cyzmify'),
  guideTechPro: banner('guidetechpro'),
  iQuickFixer: banner('iquickfixer'),
  fallback: banner('fallback', true),
} as const

export const channelBanners: Record<string, BrandBanner> = {
  'wealth-whizz': brandBanners.wealthWhizz,
  'wifi-imoney': brandBanners.wifiMoney,
  'mindset-thoughts-life': brandBanners.mindsetThoughts,
  'xen-thoughts': brandBanners.fallback,
  neuromatrix: brandBanners.neuromatrix,
  anonhabit: brandBanners.anonhabit,
  'reboot-with-ash': brandBanners.rebootWithAsh,
  guidetechpro: brandBanners.guideTechPro,
  cyzmify: brandBanners.cyzmify,
  iquickfixer: brandBanners.iQuickFixer,
  'neuromatrix-tiktok': brandBanners.neuromatrix,
  'wealth-whizz-tiktok': brandBanners.wealthWhizz,
  'facebook-one': brandBanners.wealthWhizz,
  'facebook-two': brandBanners.neuromatrix,
}

export const channelMedia: Record<string, string> = Object.fromEntries(
  Object.entries(channelBanners).map(([id, item]) => [id, item.src]),
)

export const serviceMedia: Record<string, string> = {
  'instagram-page-management': `${asset('/media/real/services/instagram-page.webp')}?v=3`,
  'content-creation': `${asset('/media/real/services/content-creation.webp')}?v=3`,
  'dm-management': `${asset('/media/real/services/dm-management.webp')}?v=3`,
  'cold-outreach': `${asset('/media/real/services/cold-outreach.webp')}?v=3`,
  clipping: `${asset('/media/real/services/clipping.webp')}?v=3`,
}

export const teamMedia = {
  aoun: `${asset('/media/real/team/aoun.webp')}?v=1`,
  eisha: `${asset('/media/real/team/eisha.webp')}?v=1`,
  fatima: `${asset('/media/real/team/fatima.webp')}?v=1`,
  hafsa: `${asset('/media/real/team/hafsa.webp')}?v=1`,
  ibrahim: `${asset('/media/real/team/ibrahim.webp')}?v=1`,
  komel: `${asset('/media/real/team/komel.webp')}?v=1`,
  rafay: `${asset('/media/real/team/rafay.webp')}?v=1`,
  saliha: `${asset('/media/real/team/saliha.webp')}?v=1`,
  urooba: `${asset('/media/real/team/urooba.webp')}?v=1`,
} as const

export const resultMedia = {
  sprintMillionaires: `${asset('/media/real/results/IMG_0230.webp')}?v=1`,
  followersThirty: `${asset('/media/real/results/IMG_0446.webp')}?v=1`,
  followersSeven: `${asset('/media/real/results/IMG_0471.webp')}?v=1`,
  sprintReach: `${asset('/media/real/results/IMG_0672.webp')}?v=1`,
  vyriumReach: `${asset('/media/real/results/IMG_6940-page.webp')}?v=2`,
  vyriumViews: `${asset('/media/real/results/IMG_7073-page.webp')}?v=2`,
  millionairesLuxuries: `${asset('/media/real/results/IMG_7090.webp')}?v=1`,
  dashboardJul: `${asset('/media/real/results/IMG_8431.webp')}?v=1`,
  growthAug: `${asset('/media/real/results/IMG_9249-page.webp')}?v=2`,
  theluxuriousdoze: `${asset('/media/real/results/IMG_9943.webp')}?v=1`,
  luxedoze: `${asset('/media/real/results/IMG_9944.webp')}?v=1`,
  ytViewsA: `${asset('/media/real/results/yt-01.webp')}?v=1`,
  ytViewsB: `${asset('/media/real/results/yt-02.webp')}?v=1`,
  ytViewsC: `${asset('/media/real/results/yt-03.webp')}?v=1`,
  ytSubsJune: `${asset('/media/real/results/yt-04.webp')}?v=1`,
  ytChannelNinety: `${asset('/media/real/results/yt-05.webp')}?v=1`,
  ytViewsD: `${asset('/media/real/results/yt-06.webp')}?v=1`,
} as const
