'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getAdminAccess } from '@/lib/auth/admin'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(1024),
})

const invalidCredentials = 'Invalid email or password.'

export async function login(formData: FormData): Promise<{ error: string } | void> {
  const parsed = loginSchema.safeParse({
    email: typeof formData.get('email') === 'string' ? formData.get('email') : '',
    password: typeof formData.get('password') === 'string' ? formData.get('password') : '',
  })

  if (!parsed.success) {
    return { error: invalidCredentials }
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    return { error: invalidCredentials }
  }

  const access = await getAdminAccess()
  if (access.status !== 'authorized') {
    await supabase.auth.signOut()
    return { error: 'This account is not authorized to access the CMS.' }
  }

  redirect('/admin')
}

export async function logout(): Promise<never> {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
