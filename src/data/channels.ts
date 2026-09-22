import type { Channel, ChannelPlatform } from '../types'

export const platformLabels: Record<ChannelPlatform, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  facebook: 'Facebook',
}

export const channels: Channel[] = [
  {
    id: 'wealth-whizz',
    name: 'Wealth Whizz',
    platform: 'instagram',
    url: 'https://www.instagram.com/wealth.whizz/',
    blurb: 'Owned Instagram brand inside the Accelera Flow system.',
    featured: true,
  },
  {
    id: 'wifi-imoney',
    name: 'WiFi Money',
    platform: 'instagram',
    url: 'https://www.instagram.com/wifiimoney_/',
    blurb: 'Owned Instagram brand inside the Accelera Flow system.',
  },
  {
    id: 'mindset-thoughts-life',
    name: 'Mindset Thoughts Life',
    platform: 'instagram',
    url: 'https://www.instagram.com/mindsethoughtslife/',
    blurb: 'Owned Instagram brand built around mindset and daily thought.',
  },
  {
    id: 'xen-thoughts',
    name: 'Xen Thoughts',
    platform: 'instagram',
    url: 'https://www.instagram.com/xenthoughts/',
    blurb: 'Owned Instagram brand for short-form thought and reels.',
  },
  {
    id: 'neuromatrix',
    name: 'Neuromatrix',
    platform: 'instagram',
    url: 'https://www.instagram.com/neuromatrix_/',
    blurb: 'Owned Instagram brand focused on ideas in motion.',
  },
  {
    id: 'reboot-with-ash',
    name: 'Reboot with Ash',
    platform: 'instagram',
    url: 'https://www.instagram.com/rebootwithash/',
    blurb: 'Owned Instagram brand inside the same creative system.',
  },
  {
    id: 'anonhabit',
    name: 'Anonhabit',
    platform: 'instagram',
    url: 'https://www.instagram.com/anonhabit/',
    blurb: 'Owned Instagram brand built around faceless storytelling.',
  },
  {
    id: 'cyzmify',
    name: 'Cyzmify',
    platform: 'youtube',
    url: 'https://www.youtube.com/@cyzmify',
    blurb: 'Owned YouTube channel inside the publishing system.',
  },
  {
    id: 'guidetechpro',
    name: 'GuideTechPro',
    platform: 'youtube',
    url: 'https://www.youtube.com/@GuideTechPro',
    blurb: 'Owned YouTube channel produced through Accelera Flow.',
  },
  {
    id: 'iquickfixer',
    name: 'iQuickFixer',
    platform: 'youtube',
    url: 'https://www.youtube.com/@iquickfixer',
    blurb: 'Owned YouTube channel created behind the scenes.',
  },
  {
    id: 'neuromatrix-tiktok',
    name: 'Neuromatrix',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@neuromatrix_',
    blurb: 'Owned TikTok page for Neuromatrix.',
  },
  {
    id: 'wealth-whizz-tiktok',
    name: 'Wealth Whizz',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@wealth.whizzz',
    blurb: 'Owned TikTok page for Wealth Whizz.',
  },
  {
    id: 'facebook-one',
    name: 'Wealth Whizz',
    platform: 'facebook',
    url: 'https://www.facebook.com/people/WealthWhiz/61581303301740/',
    blurb: 'Owned Facebook page for Wealth Whizz.',
  },
  {
    id: 'facebook-two',
    name: 'Neuromatrix',
    platform: 'facebook',
    url: 'https://www.facebook.com/people/Neuromatrix/61589587954092/',
    blurb: 'Owned Facebook page for Neuromatrix.',
  },
]

export const featuredChannel = channels.find((channel) => channel.featured) ?? channels[0]!

export const platformOrder: ChannelPlatform[] = ['instagram', 'youtube', 'tiktok', 'facebook']

export function channelsForPlatform(platform: ChannelPlatform) {
  return channels.filter((channel) => channel.platform === platform)
}
