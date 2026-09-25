import postgres from 'postgres'

const url = process.env.DATABASE_MIGRATION_URL

if (!url) {
  console.error('DATABASE_MIGRATION_URL is required for db:verify.')
  process.exit(1)
}

const expectedTables = [
  'admin_users',
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

const expectedEnums = {
  admin_role: ['owner', 'editor'],
  content_status: ['draft', 'published', 'archived'],
  media_mode: ['collage', 'slider', 'gallery'],
}

const expectedChecks = [
  'footer_links_label_not_empty',
  'footer_links_url_not_empty',
  'footer_links_icon_key_not_empty',
  'footer_links_sort_order_non_negative',
  'media_path_not_empty',
  'media_filename_not_empty',
  'media_mime_type_not_empty',
  'media_size_non_negative',
  'media_width_positive',
  'media_height_positive',
  'pages_key_not_empty',
  'pages_published_requires_date',
  'post_media_sort_order_non_negative',
  'posts_slug_not_empty',
  'project_media_sort_order_non_negative',
  'project_relations_not_self',
  'project_relations_sort_order_non_negative',
  'project_technologies_sort_order_non_negative',
  'projects_slug_not_empty',
  'projects_period_order',
  'site_profile_singleton_only',
  'site_settings_singleton_only',
  'technologies_slug_not_empty',
  'technologies_name_not_empty',
  'technologies_sort_order_non_negative',
]

const expectedForeignKeys = {
  admin_users_user_id_users_id_fk: 'c',
  post_media_post_id_posts_id_fk: 'c',
  post_media_media_id_media_id_fk: 'r',
  posts_og_media_id_media_id_fk: 'n',
  project_media_project_id_projects_id_fk: 'c',
  project_media_media_id_media_id_fk: 'r',
  project_relations_project_id_projects_id_fk: 'c',
  project_relations_related_project_id_projects_id_fk: 'c',
  project_technologies_project_id_projects_id_fk: 'c',
  project_technologies_technology_id_technologies_id_fk: 'r',
  projects_og_media_id_media_id_fk: 'n',
  site_profile_avatar_media_id_media_id_fk: 'n',
  site_profile_banner_media_id_media_id_fk: 'n',
}

const expectedIndexes = [
  'footer_links_sort_order_idx',
  'posts_status_published_at_idx',
  'projects_status_published_at_idx',
]

const sql = postgres(url, { max: 1, prepare: false })

function assertNoMissing(actual, expected, label) {
  const missing = expected.filter(value => !actual.includes(value))
  if (missing.length > 0) {
    throw new Error(`missing ${label}: ${missing.join(', ')}`)
  }
}

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
  assertNoMissing(actualTables, expectedTables, 'portfolio tables')

  const extraTables = actualTables.filter(table => !expectedTables.includes(table))
  if (extraTables.length > 0) {
    throw new Error(`unexpected portfolio tables: ${extraTables.join(', ')}`)
  }

  const enumRows = await sql`
    SELECT t.typname, e.enumlabel
    FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    JOIN pg_enum e ON e.enumtypid = t.oid
    WHERE n.nspname = 'portfolio'
    ORDER BY t.typname, e.enumsortorder
  `
  for (const [enumName, expectedValues] of Object.entries(expectedEnums)) {
    const actualValues = enumRows.filter(row => row.typname === enumName).map(row => row.enumlabel)
    if (JSON.stringify(actualValues) !== JSON.stringify(expectedValues)) {
      throw new Error(`unexpected values for ${enumName}`)
    }
  }

  const constraints = await sql`
    SELECT conname, contype, confdeltype, n_ref.nspname AS referenced_schema, ref.relname AS referenced_table
    FROM pg_constraint c
    JOIN pg_namespace n ON n.oid = c.connamespace
    LEFT JOIN pg_class ref ON ref.oid = c.confrelid
    LEFT JOIN pg_namespace n_ref ON n_ref.oid = ref.relnamespace
    WHERE n.nspname = 'portfolio'
  `
  const constraintNames = constraints.map(row => row.conname)
  assertNoMissing(constraintNames, expectedChecks, 'check constraints')
  assertNoMissing(constraintNames, Object.keys(expectedForeignKeys), 'foreign keys')

  for (const [constraintName, expectedDeleteAction] of Object.entries(expectedForeignKeys)) {
    const constraint = constraints.find(row => row.conname === constraintName)
    if (constraint?.confdeltype !== expectedDeleteAction) {
      throw new Error(`unexpected delete action for ${constraintName}`)
    }
  }
  const adminForeignKey = constraints.find(row => row.conname === 'admin_users_user_id_users_id_fk')
  if (
    adminForeignKey?.referenced_schema !== 'auth' ||
    adminForeignKey?.referenced_table !== 'users'
  ) {
    throw new Error('admin_users.user_id must reference auth.users')
  }

  const indexes = await sql`
    SELECT indexname
    FROM pg_indexes
    WHERE schemaname = 'portfolio'
  `
  assertNoMissing(
    indexes.map(row => row.indexname),
    expectedIndexes,
    'explicit indexes',
  )

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

  const policies = await sql`
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'portfolio'
  `
  if (policies.length > 0) {
    throw new Error(
      `unexpected portfolio policies: ${policies.map(row => row.policyname).join(', ')}`,
    )
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

  const sequencePrivileges = await sql`
    SELECT c.relname AS sequence_name, roles.role_name
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    CROSS JOIN (VALUES ('anon'::name), ('authenticated'::name)) AS roles(role_name)
    WHERE n.nspname = 'portfolio'
      AND c.relkind = 'S'
      AND has_sequence_privilege(roles.role_name, c.oid, 'USAGE')
  `
  if (sequencePrivileges.length > 0) {
    throw new Error('browser roles have portfolio sequence privileges')
  }

  const defaultPrivileges = await sql`
    SELECT d.defaclobjtype, grantee.rolname AS grantee, acl.privilege_type
    FROM pg_default_acl d
    JOIN pg_namespace n ON n.oid = d.defaclnamespace
    CROSS JOIN LATERAL aclexplode(d.defaclacl) acl
    JOIN pg_roles grantee ON grantee.oid = acl.grantee
    WHERE n.nspname = 'portfolio'
      AND grantee.rolname IN ('anon', 'authenticated')
  `
  if (defaultPrivileges.length > 0) {
    throw new Error('browser roles have portfolio default privileges')
  }

  const counts = await sql`
    SELECT 'admin_users' AS table_name, count(*)::int AS count FROM portfolio.admin_users
    UNION ALL
    SELECT 'site_profile' AS table_name, count(*)::int AS count FROM portfolio.site_profile
    UNION ALL SELECT 'site_settings', count(*)::int FROM portfolio.site_settings
    UNION ALL SELECT 'pages', count(*)::int FROM portfolio.pages
    UNION ALL SELECT 'technologies', count(*)::int FROM portfolio.technologies
    UNION ALL SELECT 'projects', count(*)::int FROM portfolio.projects
    UNION ALL SELECT 'posts', count(*)::int FROM portfolio.posts
    UNION ALL SELECT 'media', count(*)::int FROM portfolio.media
    UNION ALL SELECT 'footer_links', count(*)::int FROM portfolio.footer_links
  `
  const populated = counts.filter(row => Number(row.count) !== 0)
  if (populated.length > 0) {
    throw new Error(`unexpected seeded content: ${populated.map(row => row.table_name).join(', ')}`)
  }

  const [migrationTable] = await sql`
    SELECT to_regclass('drizzle.__drizzle_migrations') IS NOT NULL AS exists
  `
  if (!migrationTable?.exists) {
    throw new Error('Drizzle migration table is missing')
  }

  console.log(
    `db:verify OK (${expectedTables.length} tables, enums/constraints/indexes verified, RLS enabled, browser roles denied, content tables empty)`,
  )
} finally {
  await sql.end({ timeout: 5 })
}
