import { asset } from '../lib/paths'

const V = 12

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
  finalCta: `${asset('/media/final-cta.webp')}?v=1`,
  brandsEcosystem: `${asset('/media/brands-ecosystem.webp')}?v=${V}`,
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
    src: `${asset(`/media/real/brands/${name}.webp`)}?v=${V}`,
    card: `${asset(`/media/real/brands/${name}-place-card.webp`)}?v=${V}`,
    stage: `${asset(`/media/real/brands/${homePoster ? `${name}-home` : name}.webp`)}?v=${V}`,
    width: 1600,
    height: 900,
  }
}

function namedBanner(base: string, placeCard: string): BrandBanner {
  return {
    src: `${asset(`/media/real/brands/${base}.webp`)}?v=${V}`,
    card: `${asset(`/media/real/brands/${placeCard}.webp`)}?v=${V}`,
    stage: `${asset(`/media/real/brands/${base}.webp`)}?v=${V}`,
    width: 1600,
    height: 900,
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
  guideTechPro: banner('guidetechpro', true),
  iQuickFixer: banner('iquickfixer', true),
  xenThoughts: banner('xen-thoughts'),
  fallback: banner('fallback', true),
  wealthWhizzFb: namedBanner('wealth-whizz-fb', 'wealth-whizz-fb-place-card'),
  neuromatrixFb: namedBanner('neuromatrix-fb', 'neuromatrix-fb-place-card'),
} as const

export const channelBanners: Record<string, BrandBanner> = {
  'wealth-whizz': brandBanners.wealthWhizz,
  'wifi-imoney': brandBanners.wifiMoney,
  'mindset-thoughts-life': brandBanners.mindsetThoughts,
  'xen-thoughts': brandBanners.xenThoughts,
  neuromatrix: brandBanners.neuromatrix,
  anonhabit: brandBanners.anonhabit,
  'reboot-with-ash': brandBanners.rebootWithAsh,
  guidetechpro: brandBanners.guideTechPro,
  cyzmify: brandBanners.cyzmify,
  iquickfixer: brandBanners.iQuickFixer,
  'neuromatrix-tiktok': brandBanners.neuromatrix,
  'wealth-whizz-tiktok': brandBanners.wealthWhizz,
  'facebook-one': brandBanners.wealthWhizzFb,
  'facebook-two': brandBanners.neuromatrixFb,
}

export const channelMedia: Record<string, string> = Object.fromEntries(
  Object.entries(channelBanners).map(([id, item]) => [id, item.src]),
)

export const serviceMedia: Record<string, string> = {
  'instagram-page-management': `${asset('/media/real/services/instagram-page.webp')}?v=10`,
  'content-creation': `${asset('/media/real/services/content-creation.webp')}?v=5`,
  'dm-management': `${asset('/media/real/services/dm-management.webp')}?v=11`,
  'cold-outreach': `${asset('/media/real/services/cold-outreach.webp')}?v=5`,
  clipping: `${asset('/media/real/services/clipping.webp')}?v=11`,
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
  sprintMillionaires: `${asset('/media/real/results/IMG_0230.webp')}?v=3`,
  followersThirty: `${asset('/media/real/results/IMG_0446.webp')}?v=3`,
  followersSeven: `${asset('/media/real/results/IMG_0471.webp')}?v=3`,
  sprintReach: `${asset('/media/real/results/IMG_0672.webp')}?v=3`,
  vyriumReach: `${asset('/media/real/results/IMG_6940-page.webp')}?v=3`,
  vyriumViews: `${asset('/media/real/results/IMG_7073-page.webp')}?v=3`,
  millionairesLuxuries: `${asset('/media/real/results/IMG_7090.webp')}?v=3`,
  dashboardJul: `${asset('/media/real/results/IMG_8431.webp')}?v=3`,
  growthAug: `${asset('/media/real/results/IMG_9249-page.webp')}?v=3`,
  theluxuriousdoze: `${asset('/media/real/results/IMG_9943.webp')}?v=3`,
  luxedoze: `${asset('/media/real/results/IMG_9944.webp')}?v=3`,
  ytViewsA: `${asset('/media/real/results/yt-01.webp')}?v=3`,
  ytViewsB: `${asset('/media/real/results/yt-02.webp')}?v=3`,
  ytViewsC: `${asset('/media/real/results/yt-03.webp')}?v=3`,
  ytSubsJune: `${asset('/media/real/results/yt-04.webp')}?v=3`,
  ytChannelNinety: `${asset('/media/real/results/yt-05.webp')}?v=3`,
  ytViewsD: `${asset('/media/real/results/yt-06.webp')}?v=3`,
} as const
