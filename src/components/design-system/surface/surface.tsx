import type { HTMLAttributes } from 'react'

export type SurfaceVariant = 'default' | 'elevated' | 'interactive'

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant
}

const variantClass: Record<SurfaceVariant, string> = {
  default: 'ds-surface',
  elevated: 'ds-surface ds-surface-elevated',
  interactive: 'ds-surface ds-surface-interactive motion-interactive',
}

export function Surface({ variant = 'default', className, ...props }: SurfaceProps) {
  return <div className={`${variantClass[variant]} ${className ?? ''}`.trim()} {...props} />
}
