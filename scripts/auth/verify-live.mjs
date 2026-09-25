import postgres from 'postgres'
import { createClient } from '@supabase/supabase-js'

const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'DATABASE_MIGRATION_URL',
  'R4_TEST_EMAIL',
  'R4_TEST_PASSWORD',
]
const missing = required.filter(name => !process.env[name])

if (missing.length > 0) {
  console.error(`Missing environment variables: ${missing.join(', ')}`)
  process.exit(1)
}

const auth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
)
const sql = postgres(process.env.DATABASE_MIGRATION_URL, { max: 1, prepare: false })
let userId

function pass(name) {
  console.log(`${name}=PASS`)
}

try {
  const signIn = await auth.auth.signInWithPassword({
    email: process.env.R4_TEST_EMAIL,
    password: process.env.R4_TEST_PASSWORD,
  })
  if (signIn.error || !signIn.data.user) throw new Error('Supabase password login failed')
  userId = signIn.data.user.id
  pass('password_login')

  const currentUser = await auth.auth.getUser()
  if (currentUser.error || currentUser.data.user?.id !== userId) {
    throw new Error('authoritative getUser validation failed')
  }
  pass('get_user')

  await sql`delete from portfolio.admin_users where user_id = ${userId}`
  const [missingAdmin] =
    await sql`select count(*)::int as count from portfolio.admin_users where user_id = ${userId}`
  if (missingAdmin.count !== 0) throw new Error('non-admin state could not be established')
  pass('non_admin_state')

  for (const role of ['owner', 'editor']) {
    await sql`insert into portfolio.admin_users (user_id, role, active) values (${userId}, ${role}, true)`
    const [admin] =
      await sql`select role, active from portfolio.admin_users where user_id = ${userId}`
    if (admin.role !== role || admin.active !== true) throw new Error(`${role} state failed`)
    pass(`${role}_state`)
    await sql`delete from portfolio.admin_users where user_id = ${userId}`
  }

  await sql`insert into portfolio.admin_users (user_id, role, active) values (${userId}, 'owner', false)`
  const [inactive] = await sql`select active from portfolio.admin_users where user_id = ${userId}`
  if (inactive.active !== false) throw new Error('inactive state failed')
  pass('inactive_state')
  await sql`delete from portfolio.admin_users where user_id = ${userId}`

  const signupProbe = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  )
  const signup = await signupProbe.auth.signUp({
    email: `r4-signup-probe-${crypto.randomUUID()}@example.invalid`,
    password: `Probe-${crypto.randomUUID()}!`,
  })
  if (!signup.error || signup.data.user) throw new Error('public signup is still enabled')
  pass('public_signup_disabled')

  const signOut = await auth.auth.signOut()
  if (signOut.error) throw new Error('Supabase signOut failed')
  const afterLogout = await auth.auth.getUser()
  if (afterLogout.data.user) throw new Error('session remained after signOut')
  pass('logout')
} finally {
  if (userId) await sql`delete from portfolio.admin_users where user_id = ${userId}`
  await sql.end({ timeout: 5 })
}
