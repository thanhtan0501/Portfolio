import type { ReactNode } from 'react'

export function FeatureContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`feature-container ${className ?? ''}`.trim()}>{children}</div>
}
