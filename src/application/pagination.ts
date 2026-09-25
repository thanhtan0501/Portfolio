export type PageRequest = Readonly<{
  limit: number
  offset: number
}>

export type PageResult<T> = Readonly<{
  items: T[]
  total: number
}>

const DEFAULT_LIMIT = 20
const MAX_LIMIT = 100

export function normalizePageRequest(input?: Partial<PageRequest>): PageRequest {
  const rawLimit = input?.limit
  const rawOffset = input?.offset
  const limit = Number.isFinite(rawLimit) ? Math.trunc(rawLimit as number) : DEFAULT_LIMIT
  const offset = Number.isFinite(rawOffset) ? Math.trunc(rawOffset as number) : 0

  return {
    limit: Math.min(Math.max(limit, 1), MAX_LIMIT),
    offset: Math.max(offset, 0),
  }
}

export const paginationLimits = {
  default: DEFAULT_LIMIT,
  maximum: MAX_LIMIT,
} as const
