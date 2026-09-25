import type { PageRequest, PageResult } from '@/application/pagination'
import type { FooterLink } from './domain'

export interface FooterRepository {
  listVisible(): Promise<FooterLink[]>
  listAdmin(request: PageRequest): Promise<PageResult<FooterLink>>
}
