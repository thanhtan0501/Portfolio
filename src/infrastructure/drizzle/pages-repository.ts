import { and, count, desc, eq, lte } from 'drizzle-orm'
import { pages } from '@/db/schema'
import { normalizePageRequest, type PageRequest } from '@/application/pagination'
import type { Page } from '@/features/pages/domain'
import type { PageRepository } from '@/features/pages/repository'
import type { DrizzleExecutor } from './executor'

function mapPage(row: typeof pages.$inferSelect): Page {
  return { ...row }
}

export function createPageRepository(db: DrizzleExecutor): PageRepository {
  return {
    async findByKey(key) {
      const [row] = await db.select().from(pages).where(eq(pages.key, key))
      return row ? mapPage(row) : null
    },
    async findPublishedByKey(key, now = new Date()) {
      const [row] = await db
        .select()
        .from(pages)
        .where(and(eq(pages.key, key), eq(pages.status, 'published'), lte(pages.publishedAt, now)))
      return row ? mapPage(row) : null
    },
    async listAdmin(input: PageRequest) {
      const request = normalizePageRequest(input)
      const [totalRow] = await db.select({ count: count() }).from(pages)
      const rows = await db
        .select()
        .from(pages)
        .orderBy(desc(pages.updatedAt), desc(pages.id))
        .limit(request.limit)
        .offset(request.offset)
      return { total: Number(totalRow?.count ?? 0), items: rows.map(mapPage) }
    },
  }
}
