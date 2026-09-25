import { sql } from 'drizzle-orm'
import { check, date, index, jsonb, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { contentStatus, mediaMode } from './enums'
import { media } from './media'
import { portfolioSchema } from './namespace'

export const projects = portfolioSchema.table(
  'projects',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    summary: jsonb('summary').$type<unknown>(),
    content: jsonb('content').$type<unknown>(),
    role: text('role'),
    domain: text('domain'),
    periodStart: date('period_start', { mode: 'string' }),
    periodEnd: date('period_end', { mode: 'string' }),
    status: contentStatus('status').notNull().default('draft'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    githubUrl: text('github_url'),
    demoUrl: text('demo_url'),
    mediaMode: mediaMode('media_mode').notNull().default('collage'),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    ogMediaId: uuid('og_media_id').references(() => media.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    slugNotEmpty: check('projects_slug_not_empty', sql`${table.slug} <> ''`),
    periodOrder: check(
      'projects_period_order',
      sql`${table.periodEnd} IS NULL OR ${table.periodStart} IS NULL OR ${table.periodEnd} >= ${table.periodStart}`,
    ),
    statusPublishedIndex: index('projects_status_published_at_idx').on(
      table.status,
      table.publishedAt,
    ),
  }),
)
