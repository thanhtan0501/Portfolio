import { toMediaDto, type MediaDto } from '../media/dto'
import type { Post, PostMediaItem, PostSummary } from './domain'

type PostBaseDto = Readonly<{
  id: string
  slug: string
  title: string | null
  excerpt: string | null
  mediaMode: PostSummary['mediaMode']
  seoTitle: string | null
  seoDescription: string | null
  ogMedia: MediaDto | null
  media: ReadonlyArray<Readonly<{ media: MediaDto; sortOrder: number }>>
  publishedAt: string | null
  updatedAt: string
}>

export type PublicPostSummaryDto = Omit<PostBaseDto, 'publishedAt'> &
  Readonly<{ publishedAt: string }>
export type PublicPostDetailDto = PublicPostSummaryDto & Readonly<{ content: unknown }>
export type AdminPostSummaryDto = PostBaseDto &
  Readonly<{ status: PostSummary['status']; createdAt: string }>
export type AdminPostDto = AdminPostSummaryDto & Readonly<{ content: unknown }>
function mediaItems(items: PostMediaItem[]) {
  return items.map(item => ({ media: toMediaDto(item.media), sortOrder: item.sortOrder }))
}

function base(post: PostSummary): PostBaseDto {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    mediaMode: post.mediaMode,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    ogMedia: post.ogMedia ? toMediaDto(post.ogMedia) : null,
    media: mediaItems(post.media),
    publishedAt: post.publishedAt?.toISOString() ?? null,
    updatedAt: post.updatedAt.toISOString(),
  }
}

export function toPublicPostSummaryDto(post: PostSummary): PublicPostSummaryDto {
  if (!post.publishedAt) throw new Error('Public post must have publishedAt')
  return { ...base(post), publishedAt: post.publishedAt.toISOString() }
}

export function toPublicPostDetailDto(post: Post): PublicPostDetailDto {
  if (!post.publishedAt) throw new Error('Public post must have publishedAt')
  return { ...base(post), publishedAt: post.publishedAt.toISOString(), content: post.content }
}

export function toAdminPostDto(post: Post): AdminPostDto {
  return { ...toAdminPostSummaryDto(post), content: post.content }
}

export function toAdminPostSummaryDto(post: PostSummary): AdminPostSummaryDto {
  return {
    ...base(post),
    status: post.status,
    createdAt: post.createdAt.toISOString(),
  }
}
