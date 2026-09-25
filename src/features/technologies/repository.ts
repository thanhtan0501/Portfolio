import type { Technology, UpsertTechnologyInput } from './domain'

export interface TechnologyRepository {
  listOrdered(): Promise<Technology[]>
  findBySlug(slug: string): Promise<Technology | null>
  findByIds(ids: readonly string[]): Promise<Technology[]>
  upsert(input: UpsertTechnologyInput): Promise<Technology>
}
