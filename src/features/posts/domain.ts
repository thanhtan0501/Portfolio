import type { Media } from '../media/domain'
import type { ContentStatus, MediaMode, OpaqueContent } from '../shared/domain'

export type PostMediaItem = Readonly<{
  media: Media
  sortOrder: number
}>

export type PostSummary = Readonly<{
  id: string
  slug: string
  title: string | null
  excerpt: string | null
  content: OpaqueContent
  status: ContentStatus
  publishedAt: Date | null
  mediaMode: MediaMode
  seoTitle: string | null
  seoDescription: string | null
  ogMedia: Media | null
  media: PostMediaItem[]
  createdAt: Date
  updatedAt: Date
}>

export type Post = PostSummary
