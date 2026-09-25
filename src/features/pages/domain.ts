import type { ContentStatus, OpaqueContent } from '../shared/domain'

export type Page = Readonly<{
  id: string
  key: string
  title: string
  content: OpaqueContent
  status: ContentStatus
  publishedAt: Date | null
  seoTitle: string | null
  seoDescription: string | null
  createdAt: Date
  updatedAt: Date
}>
