import { env } from '@/lib/env/shared'

export const siteConfig = {
  name: 'Portfolio V2',
  description: 'A clean foundation for Portfolio V2.',
  url: env.NEXT_PUBLIC_SITE_URL,
} as const
