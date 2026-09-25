import { getTableName } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { adminRole, adminUsers } from './admin-users'

describe('admin identity schema contract', () => {
  it('defines the locked admin roles', () => {
    expect(adminRole.enumValues).toEqual(['owner', 'editor'])
  })

  it('defines admin_users under the private portfolio namespace', () => {
    expect(getTableName(adminUsers)).toBe('admin_users')
    expect(adminUsers.userId.name).toBe('user_id')
    expect(adminUsers.active.name).toBe('active')
  })
})
