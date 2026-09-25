import postgres from 'postgres'

const url = process.env.DATABASE_MIGRATION_URL

if (!url) {
  console.error('DATABASE_MIGRATION_URL is required for db:verify.')
  process.exit(1)
}

const expectedTables = [
  'site_profile',
  'site_settings',
  'media',
  'pages',
  'technologies',
  'projects',
  'project_technologies',
  'project_relations',
  'project_media',
  'posts',
  'post_media',
  'footer_links',
]

const sql = postgres(url, { max: 1, prepare: false })

try {
  const [namespace] = await sql`
    SELECT to_regnamespace('portfolio') IS NOT NULL AS exists
  `

  if (!namespace?.exists) {
    throw new Error('portfolio schema is missing')
  }

  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'portfolio'
      AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `
  const actualTables = tables.map(row => row.table_name)
  const missingTables = expectedTables.filter(table => !actualTables.includes(table))

  if (missingTables.length > 0) {
    throw new Error(`missing portfolio tables: ${missingTables.join(', ')}`)
  }

  const [enums] = await sql`
    SELECT
      EXISTS (
        SELECT 1 FROM pg_type t
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE n.nspname = 'portfolio' AND t.typname = 'content_status'
      ) AS content_status_exists,
      EXISTS (
        SELECT 1 FROM pg_type t
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE n.nspname = 'portfolio' AND t.typname = 'media_mode'
      ) AS media_mode_exists
  `

  if (!enums?.content_status_exists || !enums?.media_mode_exists) {
    throw new Error('one or more portfolio enums are missing')
  }

  const rls = await sql`
    SELECT c.relname AS table_name
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'portfolio'
      AND c.relkind = 'r'
      AND c.relrowsecurity = false
  `

  if (rls.length > 0) {
    throw new Error(`RLS is disabled on: ${rls.map(row => row.table_name).join(', ')}`)
  }

  const [schemaPrivileges] = await sql`
    SELECT
      has_schema_privilege('anon', 'portfolio', 'USAGE') AS anon_schema_usage,
      has_schema_privilege('authenticated', 'portfolio', 'USAGE') AS authenticated_schema_usage
  `

  if (schemaPrivileges?.anon_schema_usage || schemaPrivileges?.authenticated_schema_usage) {
    throw new Error('browser roles have portfolio schema usage')
  }

  const privileges = await sql`
    SELECT table_name, grantee, privilege_type
    FROM information_schema.role_table_grants
    WHERE table_schema = 'portfolio'
      AND grantee IN ('anon', 'authenticated')
  `

  if (privileges.length > 0) {
    throw new Error('browser roles have portfolio table privileges')
  }

  const [migrationTable] = await sql`
    SELECT to_regclass('__drizzle_migrations') IS NOT NULL AS exists
  `

  if (!migrationTable?.exists) {
    throw new Error('Drizzle migration table is missing')
  }

  console.log(`db:verify OK (${expectedTables.length} tables, RLS enabled, browser roles denied)`)
} finally {
  await sql.end({ timeout: 5 })
}
