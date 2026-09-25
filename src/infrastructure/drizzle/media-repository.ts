import { eq, inArray } from 'drizzle-orm'
import { media } from '@/db/schema'
import type { DrizzleExecutor } from './executor'
import type { Media } from '@/features/media/domain'
import type { MediaRepository } from '@/features/media/repository'

export function mapMediaRow(row: typeof media.$inferSelect): Media {
  return { ...row }
}

export function createMediaRepository(db: DrizzleExecutor): MediaRepository {
  return {
    async findById(id) {
      const [row] = await db.select().from(media).where(eq(media.id, id))
      return row ? mapMediaRow(row) : null
    },
    async findByIds(ids) {
      if (ids.length === 0) return []
      const rows = await db.select().from(media).where(inArray(media.id, ids))
      return rows.map(mapMediaRow)
    },
  }
}
