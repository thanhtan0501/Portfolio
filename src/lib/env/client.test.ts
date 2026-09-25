import { describe, expect, it } from 'vitest'
import { parseClientEnv } from './client'

describe('client environment', () => {
  it('accepts the public Supabase URL and publishable key', () => {
    expect(
      parseClientEnv({
        NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test',
      }),
    ).toEqual({
      NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test',
    })
  })

  it('rejects missing public Supabase configuration', () => {
    expect(() => parseClientEnv({})).toThrow()
  })
})
