import { sql } from 'drizzle-orm'
import { check, integer, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { projects } from './projects'
import { portfolioSchema } from './namespace'

export const projectRelations = portfolioSchema.table(
  'project_relations',
  {
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    relatedProjectId: uuid('related_project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  table => ({
    primaryKey: primaryKey({ columns: [table.projectId, table.relatedProjectId] }),
    notSelf: check(
      'project_relations_not_self',
      sql`${table.projectId} <> ${table.relatedProjectId}`,
    ),
    sortOrderNonNegative: check(
      'project_relations_sort_order_non_negative',
      sql`${table.sortOrder} >= 0`,
    ),
  }),
)
