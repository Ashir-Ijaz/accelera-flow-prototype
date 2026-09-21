import { LOGO_ALT, LOGO_SRC } from '../../data/navigation'

type BrandLogoProps = {
  className?: string
}

export function BrandLogo({ className = 'brand-logo' }: BrandLogoProps) {
  return (
    <span className="brand-mark">
      <img src={LOGO_SRC} alt={LOGO_ALT} className={className} width={468} height={250} />
    </span>
  )
}
