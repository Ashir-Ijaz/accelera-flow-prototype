import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useMagnetic } from '../../hooks/useMagnetic'

type MagneticButtonProps = {
  to?: string
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  strength?: number
  scale?: number
}

export function MagneticButton({
  to,
  href,
  onClick,
  children,
  className = 'btn btn--primary',
  type = 'button',
  disabled,
  strength = 22,
  scale = 1.05,
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion()
  const { ref, onPointerMove, onPointerLeave } = useMagnetic<HTMLElement>({
    strength: reduced ? 0 : strength,
    scale: reduced ? 1 : scale,
    ease: 0.18,
    enabled: !reduced && !disabled,
  })
  const classNames = `${className} magnetic magnetic--btn`

  if (to) {
    return (
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>}
        to={to}
        className={classNames}
        onClick={onClick}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <span className="magnetic__label">{children}</span>
      </Link>
    )
  }

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classNames}
        onClick={onClick}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="magnetic__label">{children}</span>
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <span className="magnetic__label">{children}</span>
    </button>
  )
}
