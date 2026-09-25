import { NextRequest } from 'next/server'
import { describe, expect, it, vi } from 'vitest'
import { config, proxy } from './proxy'

const updateSession = vi.hoisted(() => vi.fn(async () => new Response(null, { status: 200 })))

vi.mock('@/lib/supabase/proxy', () => ({ updateSession }))

describe('Next.js Proxy entrypoint', () => {
  it('only matches admin routes and delegates session handling', async () => {
    expect(config.matcher).toContain('/admin/:path*')

    await proxy(new NextRequest('http://localhost/admin'))
    expect(updateSession).toHaveBeenCalledOnce()
  })
})
