import Image from 'next/image'
import type { CSSProperties } from 'react'

export type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps {
  src?: string
  alt: string
  fallback: string
  size?: AvatarSize
  className?: string
}

const sizeClass: Record<AvatarSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-20 w-20',
}

export function Avatar({ src, alt, fallback, size = 'md', className }: AvatarProps) {
  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-portfolio-surface-3 text-portfolio-text-primary ${sizeClass[size]} ${className ?? ''}`.trim()}
      style={{ '--avatar-size': '100%' } as CSSProperties}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 48px, 80px"
          className="object-cover"
        />
      ) : (
        <span aria-hidden="true" className="type-small font-bold">
          {fallback}
        </span>
      )}
    </span>
  )
}
