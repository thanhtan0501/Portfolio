import { check, integer, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { projects } from './projects'
import { portfolioSchema } from './namespace'
import { technologies } from './technologies'

export const projectTechnologies = portfolioSchema.table(
  'project_technologies',
  {
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    technologyId: uuid('technology_id')
      .notNull()
      .references(() => technologies.id, { onDelete: 'restrict' }),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  table => ({
    primaryKey: primaryKey({ columns: [table.projectId, table.technologyId] }),
    sortOrderNonNegative: check(
      'project_technologies_sort_order_non_negative',
      sql`${table.sortOrder} >= 0`,
    ),
  }),
)
