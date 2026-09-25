import { beforeEach, describe, expect, it, vi } from 'vitest'
import { login, logout } from './actions'

const { signInWithPassword, signOut, getAdminAccess, redirect } = vi.hoisted(() => ({
  signInWithPassword: vi.fn(),
  signOut: vi.fn(),
  getAdminAccess: vi.fn(),
  redirect: vi.fn((destination: string): never => {
    throw new Error(`REDIRECT:${destination}`)
  }),
}))

vi.mock('server-only', () => ({}))
vi.mock('@/lib/supabase/server', () => ({
  createServerSupabaseClient: vi.fn(async () => ({ auth: { signInWithPassword, signOut } })),
}))
vi.mock('@/lib/auth/admin', () => ({ getAdminAccess }))
vi.mock('next/navigation', () => ({ redirect }))

function form(email: string, password: string) {
  const data = new FormData()
  data.set('email', email)
  data.set('password', password)
  return data
}

describe('admin login actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    signInWithPassword.mockResolvedValue({ error: null })
    signOut.mockResolvedValue({ error: null })
  })

  it('rejects invalid credentials before contacting Supabase', async () => {
    await expect(login(form('not-an-email', ''))).resolves.toEqual({
      error: 'Invalid email or password.',
    })
    expect(signInWithPassword).not.toHaveBeenCalled()
  })

  it('returns a generic error when Supabase rejects sign-in', async () => {
    signInWithPassword.mockResolvedValue({ error: new Error('credential detail') })

    await expect(login(form('admin@example.com', 'password'))).resolves.toEqual({
      error: 'Invalid email or password.',
    })
  })

  it('clears a valid but unauthorized Auth session', async () => {
    getAdminAccess.mockResolvedValue({ status: 'unauthorized' })

    await expect(login(form('user@example.com', 'password'))).resolves.toEqual({
      error: 'This account is not authorized to access the CMS.',
    })
    expect(signOut).toHaveBeenCalledOnce()
  })

  it('redirects an active admin to the CMS', async () => {
    getAdminAccess.mockResolvedValue({
      status: 'authorized',
      identity: { userId: 'user-1', email: 'admin@example.com', role: 'owner' },
    })

    await expect(login(form('admin@example.com', 'password'))).rejects.toThrow('REDIRECT:/admin')
  })

  it('signs out and redirects to the login page', async () => {
    await expect(logout()).rejects.toThrow('REDIRECT:/admin/login')
    expect(signOut).toHaveBeenCalledOnce()
  })
})
