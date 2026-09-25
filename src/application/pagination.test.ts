import { describe, expect, it } from 'vitest'
import { normalizePageRequest } from './pagination'

describe('pagination', () => {
  it('normalizes invalid values and caps the page size', () => {
    expect(normalizePageRequest({ limit: -2, offset: -10 })).toEqual({ limit: 1, offset: 0 })
    expect(normalizePageRequest({ limit: 1000, offset: 4 })).toEqual({ limit: 100, offset: 4 })
  })

  it('uses stable defaults', () => {
    expect(normalizePageRequest()).toEqual({ limit: 20, offset: 0 })
  })
})
