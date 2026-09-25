import type { PageRequest, PageResult } from '@/application/pagination'
import type { Page } from './domain'

export interface PageRepository {
  findByKey(key: string): Promise<Page | null>
  findPublishedByKey(key: string, now?: Date): Promise<Page | null>
  listAdmin(request: PageRequest): Promise<PageResult<Page>>
}
