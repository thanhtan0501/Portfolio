import { sql } from 'drizzle-orm'
import { check, integer, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { portfolioSchema } from './namespace'

export const technologies = portfolioSchema.table(
  'technologies',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    category: text('category'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    slugNotEmpty: check('technologies_slug_not_empty', sql`${table.slug} <> ''`),
    nameNotEmpty: check('technologies_name_not_empty', sql`${table.name} <> ''`),
    sortOrderNonNegative: check(
      'technologies_sort_order_non_negative',
      sql`${table.sortOrder} >= 0`,
    ),
  }),
)
