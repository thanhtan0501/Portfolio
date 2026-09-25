import 'server-only'

import type { PostgresJsDatabase, PostgresJsTransaction } from 'drizzle-orm/postgres-js'
import type { ExtractTablesWithRelations } from 'drizzle-orm/relations'
import * as schema from '@/db/schema'
import { getDatabase } from '@/db/client'

type DrizzleSchema = Pick<
  typeof schema,
  | 'adminUsers'
  | 'footerLinks'
  | 'media'
  | 'pages'
  | 'postMedia'
  | 'posts'
  | 'projectMedia'
  | 'projectRelations'
  | 'projectTechnologies'
  | 'projects'
  | 'siteProfile'
  | 'siteSettings'
  | 'technologies'
>

export type DrizzleDatabase = PostgresJsDatabase<DrizzleSchema>
export type DrizzleTransaction = PostgresJsTransaction<
  DrizzleSchema,
  ExtractTablesWithRelations<DrizzleSchema>
>
export type DrizzleExecutor = DrizzleDatabase | DrizzleTransaction

export function getDrizzleDatabase(): DrizzleDatabase {
  return getDatabase()
}
