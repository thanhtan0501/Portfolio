import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getAdminAccess } from './admin'

vi.mock('server-only', () => ({}))

const { getUser, where, getDatabase } = vi.hoisted(() => {
  const getUser = vi.fn()
  const where = vi.fn()
  const from = vi.fn(() => ({ where }))
  const select = vi.fn(() => ({ from }))
  const getDatabase = vi.fn(() => ({ select }))

  return { getUser, where, getDatabase }
})

vi.mock('@/lib/supabase/server', () => ({
  createServerSupabaseClient: vi.fn(async () => ({ auth: { getUser } })),
}))

vi.mock('@/db/client', () => ({ getDatabase }))

describe('admin access', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    where.mockResolvedValue([])
  })

  it('rejects an unauthenticated request', async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: null })

    await expect(getAdminAccess()).resolves.toEqual({ status: 'unauthenticated' })
    expect(getDatabase).not.toHaveBeenCalled()
  })

  it('rejects an authenticated user without an admin row', async () => {
    getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'user@example.com' } },
      error: null,
    })

    await expect(getAdminAccess()).resolves.toEqual({ status: 'unauthorized' })
  })

  it('rejects an inactive admin', async () => {
    getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'user@example.com' } },
      error: null,
    })
    where.mockResolvedValue([{ role: 'owner', active: false }])

    await expect(getAdminAccess()).resolves.toEqual({ status: 'inactive' })
  })

  it.each(['owner', 'editor'] as const)('accepts an active %s admin', async role => {
    getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'user@example.com' } },
      error: null,
    })
    where.mockResolvedValue([{ role, active: true }])

    await expect(getAdminAccess()).resolves.toEqual({
      status: 'authorized',
      identity: { userId: 'user-1', email: 'user@example.com', role },
    })
  })
})
