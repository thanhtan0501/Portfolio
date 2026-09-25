import { sql } from 'drizzle-orm'
import { check, integer, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { media } from './media'
import { portfolioSchema } from './namespace'
import { posts } from './posts'

export const postMedia = portfolioSchema.table(
  'post_media',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    mediaId: uuid('media_id')
      .notNull()
      .references(() => media.id, { onDelete: 'restrict' }),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  table => ({
    primaryKey: primaryKey({ columns: [table.postId, table.mediaId] }),
    sortOrderNonNegative: check('post_media_sort_order_non_negative', sql`${table.sortOrder} >= 0`),
  }),
)
