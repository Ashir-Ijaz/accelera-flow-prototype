import { LOGO_ALT, LOGO_SRC } from '../../data/navigation'

type BrandLogoProps = {
  className?: string
}

export function BrandLogo({ className = 'brand-logo' }: BrandLogoProps) {
  return <img src={LOGO_SRC} alt={LOGO_ALT} className={className} width={320} height={96} />
}
