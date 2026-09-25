import 'server-only'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { getDatabase } from '@/db/client'
import { adminUsers } from '@/db/schema'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export type AdminRole = 'owner' | 'editor'

export type AdminIdentity = {
  userId: string
  email: string | null
  role: AdminRole
}

export type AdminAccess =
  | { status: 'unauthenticated' }
  | { status: 'unauthorized' }
  | { status: 'inactive' }
  | { status: 'authorized'; identity: AdminIdentity }

export async function getAdminAccess(): Promise<AdminAccess> {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return { status: 'unauthenticated' }
  }

  const [admin] = await getDatabase()
    .select({ role: adminUsers.role, active: adminUsers.active })
    .from(adminUsers)
    .where(eq(adminUsers.userId, user.id))

  if (!admin) {
    return { status: 'unauthorized' }
  }

  if (!admin.active) {
    return { status: 'inactive' }
  }

  return {
    status: 'authorized',
    identity: {
      userId: user.id,
      email: user.email ?? null,
      role: admin.role,
    },
  }
}

export async function requireAdmin(): Promise<AdminIdentity> {
  const access = await getAdminAccess()

  if (access.status === 'authorized') {
    return access.identity
  }

  redirect('/admin/login')
}
