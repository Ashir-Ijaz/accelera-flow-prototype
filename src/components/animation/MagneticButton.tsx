import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type MagneticButtonProps = {
  to?: string
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

function tiltTowardPointer(event: ReactPointerEvent<HTMLElement>, strength: number) {
  const node = event.currentTarget
  const rect = node.getBoundingClientRect()
  const x = event.clientX - rect.left - rect.width / 2
  const y = event.clientY - rect.top - rect.height / 2
  node.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`
}

function resetTilt(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.transform = 'translate(0px, 0px)'
}

export function MagneticButton({
  to,
  href,
  onClick,
  children,
  className = 'btn btn--primary',
  type = 'button',
  disabled,
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion()
  const strength = reduced ? 0 : 14
  const classNames = `${className} magnetic`
  const onMove = reduced
    ? undefined
    : (event: ReactPointerEvent<HTMLElement>) => tiltTowardPointer(event, strength)
  const onLeave = resetTilt

  if (to) {
    return (
      <Link to={to} className={classNames} onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </button>
  )
}
