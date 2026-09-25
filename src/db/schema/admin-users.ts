import { authUsers } from 'drizzle-orm/supabase'
import { boolean, timestamp, uuid } from 'drizzle-orm/pg-core'
import { portfolioSchema } from './namespace'

export const adminRole = portfolioSchema.enum('admin_role', ['owner', 'editor'])

export const adminUsers = portfolioSchema.table('admin_users', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  role: adminRole('role').notNull(),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
