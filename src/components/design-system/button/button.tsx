import { forwardRef, type ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'default' | 'ghost' | 'subtle'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantClass: Record<ButtonVariant, string> = {
  default:
    'border border-transparent bg-portfolio-surface-3 text-portfolio-text-primary shadow-sm hover:bg-portfolio-surface-hover',
  ghost:
    'border border-transparent bg-transparent text-portfolio-text-secondary hover:bg-portfolio-surface-3',
  subtle:
    'border border-portfolio-surface-3 bg-portfolio-surface-2 text-portfolio-text-primary hover:border-portfolio-text-muted',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'default', className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`motion-interactive focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-portfolio-md px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${variantClass[variant]} ${className ?? ''}`.trim()}
      {...props}
    />
  )
})
