import { describe, expect, it } from 'vitest'
import { parseServerEnv } from './server'

describe('server environment', () => {
  it('accepts both PostgreSQL connection URLs', () => {
    expect(
      parseServerEnv({
        DATABASE_URL: 'postgresql://runtime.example/portfolio',
        DATABASE_MIGRATION_URL: 'postgres://migration.example/portfolio',
      }),
    ).toMatchObject({
      DATABASE_URL: 'postgresql://runtime.example/portfolio',
      DATABASE_MIGRATION_URL: 'postgres://migration.example/portfolio',
    })
  })

  it('rejects missing database credentials', () => {
    expect(() => parseServerEnv({})).toThrow()
  })
})
