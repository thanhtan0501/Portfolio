import type { HTMLAttributes } from 'react'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center rounded-portfolio-pill bg-portfolio-surface-3 px-2 py-1 type-caption font-semibold text-portfolio-text-primary ${className ?? ''}`.trim()}
      {...props}
    />
  )
}
