import { NextRequest } from 'next/server'
import { describe, expect, it, vi } from 'vitest'
import { updateSession } from './proxy'

const { getClaims, createServerClient } = vi.hoisted(() => {
  const getClaims = vi.fn()
  const createServerClient = vi.fn(
    (
      _url: string,
      _key: string,
      options: {
        cookies: {
          setAll: (cookies: Array<{ name: string; value: string; options?: object }>) => void
        }
      },
    ) => {
      options.cookies.setAll([{ name: 'sb-test', value: 'refreshed', options: { path: '/' } }])
      return { auth: { getClaims } }
    },
  )

  return { getClaims, createServerClient }
})

vi.mock('@supabase/ssr', () => ({ createServerClient }))
vi.mock('@/lib/env/client', () => ({
  getClientEnv: () => ({
    NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test',
  }),
}))

describe('Supabase Proxy session refresh', () => {
  it('calls getClaims and preserves refreshed cookies on the response', async () => {
    getClaims.mockResolvedValue({ data: { claims: null }, error: null })

    const response = await updateSession(new NextRequest('http://localhost/admin'))

    expect(getClaims).toHaveBeenCalledOnce()
    expect(response.cookies.get('sb-test')?.value).toBe('refreshed')
    expect(createServerClient).toHaveBeenCalledOnce()
  })
})
