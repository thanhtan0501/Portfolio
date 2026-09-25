import { portfolioSchema } from './namespace'

export const contentStatus = portfolioSchema.enum('content_status', [
  'draft',
  'published',
  'archived',
])

export const mediaMode = portfolioSchema.enum('media_mode', ['collage', 'slider', 'gallery'])
