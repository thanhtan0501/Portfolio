import type { ReactNode } from 'react'

export function ReadingContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`reading-container ${className ?? ''}`.trim()}>{children}</div>
}
