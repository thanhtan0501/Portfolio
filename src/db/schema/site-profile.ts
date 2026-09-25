import { sql } from 'drizzle-orm'
import { check, date, jsonb, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { media } from './media'
import { portfolioSchema } from './namespace'

export const siteProfile = portfolioSchema.table(
  'site_profile',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    singletonKey: text('singleton_key').notNull().default('default').unique(),
    name: text('name').notNull(),
    headline: text('headline'),
    bio: jsonb('bio').$type<unknown>(),
    birthday: date('birthday', { mode: 'string' }),
    location: text('location'),
    avatarMediaId: uuid('avatar_media_id').references(() => media.id, { onDelete: 'set null' }),
    bannerMediaId: uuid('banner_media_id').references(() => media.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    singletonOnly: check('site_profile_singleton_only', sql`${table.singletonKey} = 'default'`),
  }),
)
