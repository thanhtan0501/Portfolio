import { VisuallyHidden } from '../visually-hidden/visually-hidden'

export interface SpinnerProps {
  label?: string
  className?: string
}

export function Spinner({ label = 'Loading', className }: SpinnerProps) {
  return (
    <span role="status" aria-live="polite" className={className}>
      <span aria-hidden="true" className="ds-spinner motion-decorative" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  )
}
