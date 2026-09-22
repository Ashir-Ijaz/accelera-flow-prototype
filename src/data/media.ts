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
  'instagram-page-management': media.ember,
  'content-creation': media.film,
  'dm-management': media.signal,
  'cold-outreach': media.structure,
  clipping: media.stage,
}

export const voiceMedia: Record<string, string> = {
  studying: media.night,
  skills: media.film,
  growth: media.ember,
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

export const resultMedia: Record<string, string> = {
  'owned-instagram': media.ember,
  'owned-youtube': media.film,
  'client-instagram': media.stage,
  'client-youtube': media.signal,
}
