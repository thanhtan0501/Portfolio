import type { HTMLAttributes } from 'react'

export function VisuallyHidden({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`ds-visually-hidden ${className ?? ''}`.trim()} {...props} />
}
