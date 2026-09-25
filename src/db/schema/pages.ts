import { sql } from 'drizzle-orm'
import { check, jsonb, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { contentStatus } from './enums'
import { portfolioSchema } from './namespace'

export const pages = portfolioSchema.table(
  'pages',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    key: text('key').notNull().unique(),
    title: text('title').notNull(),
    content: jsonb('content').$type<unknown>().notNull(),
    status: contentStatus('status').notNull().default('draft'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    keyNotEmpty: check('pages_key_not_empty', sql`${table.key} <> ''`),
    publishedRequiresDate: check(
      'pages_published_requires_date',
      sql`${table.status} <> 'published' OR ${table.publishedAt} IS NOT NULL`,
    ),
  }),
)
