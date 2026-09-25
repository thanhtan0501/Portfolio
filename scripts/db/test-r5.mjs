import { spawnSync } from 'node:child_process'

for (const name of ['DATABASE_URL', 'DATABASE_MIGRATION_URL']) {
  if (!process.env[name]) {
    console.error(`${name} is required for test:db.`)
    process.exit(1)
  }
}

const result = spawnSync(
  'pnpm',
  ['exec', 'vitest', 'run', 'src/infrastructure/drizzle/r5.integration.test.ts'],
  {
    env: { ...process.env, R5_DB_TEST: '1' },
    stdio: 'inherit',
  },
)

process.exit(result.status ?? 1)
