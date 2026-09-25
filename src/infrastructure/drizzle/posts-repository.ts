import { and, asc, count, desc, eq, inArray, lte } from 'drizzle-orm'
import { media, postMedia, posts } from '@/db/schema'
import { normalizePageRequest } from '@/application/pagination'
import type { Media } from '@/features/media/domain'
import type { Post, PostMediaItem } from '@/features/posts/domain'
import type { PostRepository } from '@/features/posts/repository'
import type { ContentStatus } from '@/features/shared/domain'
import type { DrizzleExecutor } from './executor'

type PostRow = typeof posts.$inferSelect
type PostHydrationRow = Omit<PostRow, 'content'> & { content?: unknown | null }

function mapMedia(row: typeof media.$inferSelect): Media {
  return { ...row }
}

function mapPost(row: PostHydrationRow, mediaItems: PostMediaItem[], ogMedia: Media | null): Post {
  return { ...row, content: row.content ?? null, media: mediaItems, ogMedia }
}

async function hydrate(db: DrizzleExecutor, rows: PostHydrationRow[]): Promise<Post[]> {
  if (rows.length === 0) return []
  const postIds = rows.map(row => row.id)
  const relationRows = await db
    .select({ postId: postMedia.postId, sortOrder: postMedia.sortOrder, media })
    .from(postMedia)
    .innerJoin(media, eq(postMedia.mediaId, media.id))
    .where(inArray(postMedia.postId, postIds))
    .orderBy(asc(postMedia.sortOrder), asc(postMedia.mediaId))
  const mediaIds = [
    ...rows.map(row => row.ogMediaId),
    ...relationRows.map(row => row.media.id),
  ].filter((id): id is string => Boolean(id))
  const ogRows = mediaIds.length
    ? await db.select().from(media).where(inArray(media.id, mediaIds))
    : []
  const mediaById = new Map(ogRows.map(row => [row.id, mapMedia(row)]))
  return rows.map(row =>
    mapPost(
      row,
      relationRows
        .filter(item => item.postId === row.id)
        .map(item => ({ media: mapMedia(item.media), sortOrder: item.sortOrder })),
      row.ogMediaId ? (mediaById.get(row.ogMediaId) ?? null) : null,
    ),
  )
}

export function createPostRepository(db: DrizzleExecutor): PostRepository {
  const summaryFields = {
    id: posts.id,
    slug: posts.slug,
    title: posts.title,
    excerpt: posts.excerpt,
    status: posts.status,
    publishedAt: posts.publishedAt,
    mediaMode: posts.mediaMode,
    seoTitle: posts.seoTitle,
    seoDescription: posts.seoDescription,
    ogMediaId: posts.ogMediaId,
    createdAt: posts.createdAt,
    updatedAt: posts.updatedAt,
  }

  return {
    async listPublished(request, now = new Date()) {
      const page = normalizePageRequest(request)
      const where = and(eq(posts.status, 'published'), lte(posts.publishedAt, now))
      const [totalRow, rows] = await Promise.all([
        db.select({ count: count() }).from(posts).where(where),
        db
          .select(summaryFields)
          .from(posts)
          .where(where)
          .orderBy(desc(posts.publishedAt), desc(posts.id))
          .limit(page.limit)
          .offset(page.offset),
      ])
      return { total: Number(totalRow[0]?.count ?? 0), items: await hydrate(db, rows) }
    },

    async findPublishedBySlug(slug, now = new Date()) {
      const [row] = await db
        .select()
        .from(posts)
        .where(
          and(eq(posts.slug, slug), eq(posts.status, 'published'), lte(posts.publishedAt, now)),
        )
      const [post] = await hydrate(db, row ? [row] : [])
      return post ?? null
    },

    async findById(id) {
      const [row] = await db.select().from(posts).where(eq(posts.id, id))
      const [post] = await hydrate(db, row ? [row] : [])
      return post ?? null
    },

    async findBySlug(slug) {
      const [row] = await db.select().from(posts).where(eq(posts.slug, slug))
      const [post] = await hydrate(db, row ? [row] : [])
      return post ?? null
    },

    async listAdmin(request, status?: ContentStatus) {
      const page = normalizePageRequest(request)
      const where = status ? eq(posts.status, status) : undefined
      const [totalRow, rows] = await Promise.all([
        db.select({ count: count() }).from(posts).where(where),
        db
          .select(summaryFields)
          .from(posts)
          .where(where)
          .orderBy(desc(posts.updatedAt), desc(posts.id))
          .limit(page.limit)
          .offset(page.offset),
      ])
      return { total: Number(totalRow[0]?.count ?? 0), items: await hydrate(db, rows) }
    },
  }
}
