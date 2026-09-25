import { z } from 'zod'
import { parseSharedEnv } from './shared'

const postgresUrl = z
  .string()
  .url()
  .refine(value => value.startsWith('postgres://') || value.startsWith('postgresql://'), {
    message: 'Expected a PostgreSQL connection URL',
  })

const serverEnvSchema = z.object({
  DATABASE_URL: postgresUrl,
  DATABASE_MIGRATION_URL: postgresUrl,
})

export type ServerEnv = ReturnType<typeof parseServerEnv>

export function parseServerEnv(input: Record<string, string | undefined> = process.env) {
  return {
    ...parseSharedEnv(input),
    ...serverEnvSchema.parse({
      DATABASE_URL: input.DATABASE_URL,
      DATABASE_MIGRATION_URL: input.DATABASE_MIGRATION_URL,
    }),
  }
}

export function getServerEnv() {
  return parseServerEnv()
}
