import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  schemaFilter: ['portfolio'],
  dbCredentials: {
    // Generation/checking only need a syntactically valid placeholder. Migration
    // is guarded by scripts/db/migrate.mjs and requires the real env value.
    url: process.env.DATABASE_MIGRATION_URL ?? 'postgresql://localhost:5432/portfolio_v2',
  },
  strict: true,
  verbose: true,
})
