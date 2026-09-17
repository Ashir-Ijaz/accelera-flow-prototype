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

export const channelMedia: Record<string, string> = {
  'wealth-whizz': media.ember,
  neuromatrix: media.signal,
  anonhabit: media.night,
  'reboot-with-ash': media.pulse,
  guidetechpro: media.board,
  cyzmify: media.flow,
  iquickfixer: media.structure,
}

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

export const resultMedia: Record<string, string> = {
  'owned-instagram': media.ember,
  'owned-youtube': media.film,
  'client-instagram': media.stage,
  'client-youtube': media.signal,
}
