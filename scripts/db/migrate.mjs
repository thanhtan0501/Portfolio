import { spawn } from 'node:child_process'

if (!process.env.DATABASE_MIGRATION_URL) {
  console.error('DATABASE_MIGRATION_URL is required for db:migrate.')
  process.exit(1)
}

const command = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const child = spawn(command, ['exec', 'drizzle-kit', 'migrate'], {
  env: process.env,
  stdio: 'inherit',
})

child.on('exit', code => process.exit(code ?? 1))
