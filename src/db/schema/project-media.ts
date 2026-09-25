import { sql } from 'drizzle-orm'
import { check, integer, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { media } from './media'
import { portfolioSchema } from './namespace'
import { projects } from './projects'

export const projectMedia = portfolioSchema.table(
  'project_media',
  {
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    mediaId: uuid('media_id')
      .notNull()
      .references(() => media.id, { onDelete: 'restrict' }),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  table => ({
    primaryKey: primaryKey({ columns: [table.projectId, table.mediaId] }),
    sortOrderNonNegative: check(
      'project_media_sort_order_non_negative',
      sql`${table.sortOrder} >= 0`,
    ),
  }),
)
