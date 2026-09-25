import { sql } from 'drizzle-orm'
import { check, boolean, index, integer, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { portfolioSchema } from './namespace'

export const footerLinks = portfolioSchema.table(
  'footer_links',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    label: text('label').notNull(),
    url: text('url').notNull(),
    iconKey: text('icon_key').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
    visible: boolean('visible').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    labelNotEmpty: check('footer_links_label_not_empty', sql`${table.label} <> ''`),
    urlNotEmpty: check('footer_links_url_not_empty', sql`${table.url} <> ''`),
    iconKeyNotEmpty: check('footer_links_icon_key_not_empty', sql`${table.iconKey} <> ''`),
    sortOrderNonNegative: check(
      'footer_links_sort_order_non_negative',
      sql`${table.sortOrder} >= 0`,
    ),
    sortOrderIndex: index('footer_links_sort_order_idx').on(table.sortOrder),
  }),
)
