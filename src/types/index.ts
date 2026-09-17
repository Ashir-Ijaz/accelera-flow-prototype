export type NavItem = {
  label: string
  path: string
}

export type ChannelPlatform = 'instagram' | 'youtube'

export type Channel = {
  id: string
  name: string
  platform: ChannelPlatform
  url: string
  blurb: string
  featured?: boolean
}

export type ServiceId =
  | 'instagram-page-management'
  | 'content-creation'
  | 'dm-management'
  | 'cold-outreach'
  | 'clipping'
  | 'multiple'

export type Service = {
  id: Exclude<ServiceId, 'multiple'>
  title: string
  summary: string
  description: string
  suitableFor: string[]
  deliverables: string[]
}

export type ProcessStage = {
  id: string
  index: string
  title: string
  sentence: string
  icon: 'search' | 'map' | 'pen-tool' | 'radio' | 'messages' | 'sprout'
}

export type CompanyValue = {
  id: string
  title: string
  description: string
}

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export type FlowStageKey =
  | 'arrival'
  | 'idea'
  | 'create'
  | 'publish'
  | 'engage'
  | 'opportunity'
  | 'resolution'

export type StageAlignment =
  | 'left'
  | 'upper-left'
  | 'lower-left'
  | 'right'
  | 'right-centre'
  | 'centre'

export type FlowStage = {
  key: FlowStageKey
  index: number
  from: number
  to: number
  kicker: string
  title: string
  body: string
  alignment: StageAlignment
  boards: string[]
}

export type PageMeta = {
  title: string
  description: string
}

export type VoiceTheme = {
  id: string
  kicker: string
  title: string
  theme: string
  body: string
}

export type ResultPlaceholder = {
  id: string
  category: 'instagram' | 'youtube' | 'client'
  label: string
  metricFocus: string[]
}
