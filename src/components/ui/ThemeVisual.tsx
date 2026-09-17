export type VisualTone = 'flow' | 'ember' | 'signal' | 'night' | 'board' | 'pulse'

type ThemeVisualProps = {
  tone?: VisualTone
  className?: string
}

export function ThemeVisual({ tone = 'flow', className = '' }: ThemeVisualProps) {
  return <div className={`theme-visual theme-visual--${tone} ${className}`.trim()} aria-hidden="true" />
}
