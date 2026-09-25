import type { ComponentProps } from 'react'
import { PandaLogo } from './panda-logo'

export function PandaWatermark({ className, ...props }: ComponentProps<typeof PandaLogo>) {
  return (
    <PandaLogo
      aria-hidden="true"
      className={`panda-watermark ${className ?? ''}`.trim()}
      {...props}
    />
  )
}
