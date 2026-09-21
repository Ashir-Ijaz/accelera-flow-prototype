import { asset } from '../lib/paths'
import type { NavItem } from '../types'

export const LOGO_SRC = asset('/brand/accelera-flow-mark.png')
export const LOGO_ALT = 'Accelera Flow LTD'

export const COMPANY_NAME = 'Accelera Flow LTD'

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Brands', path: '/brands' },
  { label: 'Services', path: '/services' },
  { label: 'Results', path: '/results' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export const primaryCta = {
  label: 'Start a project',
  path: '/contact',
}

export const promoteCta = {
  label: 'Promotion',
  path: '/promote',
}
