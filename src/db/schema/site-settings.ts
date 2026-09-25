import { sql } from 'drizzle-orm'
import { check, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { portfolioSchema } from './namespace'

export const siteSettings = portfolioSchema.table(
  'site_settings',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    singletonKey: text('singleton_key').notNull().default('default').unique(),
    siteName: text('site_name').notNull(),
    siteDescription: text('site_description'),
    defaultSeoTitle: text('default_seo_title'),
    defaultSeoDescription: text('default_seo_description'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    singletonOnly: check('site_settings_singleton_only', sql`${table.singletonKey} = 'default'`),
  }),
)
