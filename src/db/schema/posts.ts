import { sql } from 'drizzle-orm'
import { check, index, jsonb, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { contentStatus, mediaMode } from './enums'
import { media } from './media'
import { portfolioSchema } from './namespace'

export const posts = portfolioSchema.table(
  'posts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title'),
    excerpt: text('excerpt'),
    content: jsonb('content').$type<unknown>().notNull(),
    status: contentStatus('status').notNull().default('draft'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    mediaMode: mediaMode('media_mode').notNull().default('collage'),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    ogMediaId: uuid('og_media_id').references(() => media.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    slugNotEmpty: check('posts_slug_not_empty', sql`${table.slug} <> ''`),
    statusPublishedIndex: index('posts_status_published_at_idx').on(
      table.status,
      table.publishedAt,
    ),
  }),
)
