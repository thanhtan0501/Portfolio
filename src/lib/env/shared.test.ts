import { describe, expect, it } from 'vitest'

import { parseSharedEnv } from './shared'

describe('shared environment', () => {
  it('uses the local site URL when no override is provided', () => {
    expect(parseSharedEnv({}).NEXT_PUBLIC_SITE_URL).toBe('http://localhost:3000')
  })

  it('accepts a valid public site URL', () => {
    expect(parseSharedEnv({ NEXT_PUBLIC_SITE_URL: 'https://portfolio.example' })).toEqual({
      NEXT_PUBLIC_SITE_URL: 'https://portfolio.example',
    })
  })

  it('rejects an invalid public site URL', () => {
    expect(() => parseSharedEnv({ NEXT_PUBLIC_SITE_URL: 'not-a-url' })).toThrow()
  })
})
