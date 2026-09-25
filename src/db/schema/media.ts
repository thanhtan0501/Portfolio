import { sql } from 'drizzle-orm'
import { check, text, timestamp, integer, uuid } from 'drizzle-orm/pg-core'
import { portfolioSchema } from './namespace'

export const media = portfolioSchema.table(
  'media',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    provider: text('provider').notNull(),
    bucket: text('bucket'),
    path: text('path').notNull(),
    filename: text('filename').notNull(),
    mimeType: text('mime_type').notNull(),
    sizeBytes: integer('size_bytes').notNull(),
    width: integer('width'),
    height: integer('height'),
    alt: text('alt'),
    caption: text('caption'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    pathNotEmpty: check('media_path_not_empty', sql`${table.path} <> ''`),
    filenameNotEmpty: check('media_filename_not_empty', sql`${table.filename} <> ''`),
    mimeTypeNotEmpty: check('media_mime_type_not_empty', sql`${table.mimeType} <> ''`),
    sizeNonNegative: check('media_size_non_negative', sql`${table.sizeBytes} >= 0`),
    widthPositive: check('media_width_positive', sql`${table.width} IS NULL OR ${table.width} > 0`),
    heightPositive: check(
      'media_height_positive',
      sql`${table.height} IS NULL OR ${table.height} > 0`,
    ),
  }),
)
