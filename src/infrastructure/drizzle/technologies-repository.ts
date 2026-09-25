import { asc, eq, inArray } from 'drizzle-orm'
import { technologies } from '@/db/schema'
import type { Technology, UpsertTechnologyInput } from '@/features/technologies/domain'
import type { TechnologyRepository } from '@/features/technologies/repository'
import type { DrizzleExecutor } from './executor'
import { translateDatabaseErrors } from './errors'

function mapTechnology(row: typeof technologies.$inferSelect): Technology {
  return { ...row }
}

export function createTechnologyRepository(db: DrizzleExecutor): TechnologyRepository {
  return {
    async listOrdered() {
      const rows = await db
        .select()
        .from(technologies)
        .orderBy(asc(technologies.sortOrder), asc(technologies.name), asc(technologies.id))
      return rows.map(mapTechnology)
    },
    async findBySlug(slug) {
      const [row] = await db.select().from(technologies).where(eq(technologies.slug, slug))
      return row ? mapTechnology(row) : null
    },
    async findByIds(ids) {
      if (ids.length === 0) return []
      const rows = await db.select().from(technologies).where(inArray(technologies.id, ids))
      return rows.map(mapTechnology)
    },
    async upsert(input: UpsertTechnologyInput) {
      return translateDatabaseErrors(async () => {
        const [row] = await db
          .insert(technologies)
          .values({
            slug: input.slug,
            name: input.name,
            category: input.category ?? null,
            sortOrder: input.sortOrder ?? 0,
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: technologies.slug,
            set: {
              name: input.name,
              category: input.category ?? null,
              sortOrder: input.sortOrder ?? 0,
              updatedAt: new Date(),
            },
          })
          .returning()
        if (!row) throw new Error('Technology upsert returned no row')
        return mapTechnology(row)
      })
    },
  }
}
