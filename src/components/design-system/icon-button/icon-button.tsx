import { Button, type ButtonProps } from '../button/button'

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'aria-label'> {
  label: string
  children: React.ReactNode
}

export function IconButton({ label, children, ...props }: IconButtonProps) {
  return (
    <Button aria-label={label} className="aspect-square w-10 px-0" {...props}>
      {children}
    </Button>
  )
}
