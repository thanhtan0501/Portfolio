import type { Technology } from './domain'

export type TechnologyDto = Readonly<{
  id: string
  slug: string
  name: string
  category: string | null
  sortOrder: number
  updatedAt: string
}>

export function toTechnologyDto(technology: Technology): TechnologyDto {
  return { ...technology, updatedAt: technology.updatedAt.toISOString() }
}
