import NextLink from 'next/link'
import type { Route } from 'next'
import type { AnchorHTMLAttributes } from 'react'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  external?: boolean
}

const classNameForLink = (className?: string) =>
  `focus-ring motion-interactive text-portfolio-accent underline-offset-4 hover:text-portfolio-accent-hover hover:underline ${className ?? ''}`.trim()

export function Link({ href, external = false, target, rel, className, ...props }: LinkProps) {
  const resolvedRel = target === '_blank' ? (rel ?? 'noopener noreferrer') : rel
  const resolvedClassName = classNameForLink(className)

  if (external) {
    return (
      <a href={href} target={target} rel={resolvedRel} className={resolvedClassName} {...props} />
    )
  }

  return (
    <NextLink
      href={href as Route}
      className={resolvedClassName}
      target={target}
      rel={resolvedRel}
      {...props}
    />
  )
}
