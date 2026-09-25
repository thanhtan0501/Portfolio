import postgres from 'postgres'

const url = process.env.DATABASE_URL

if (!url) {
  console.error('DATABASE_URL is required for db:ping.')
  process.exit(1)
}

const sql = postgres(url, { max: 1, prepare: false })

try {
  await sql`SELECT 1`
  console.log('db:ping OK')
} finally {
  await sql.end({ timeout: 5 })
}
