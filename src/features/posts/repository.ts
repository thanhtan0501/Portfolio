import type { PageRequest, PageResult } from '@/application/pagination'
import type { ContentStatus } from '../shared/domain'
import type { Post, PostSummary } from './domain'

export interface PostRepository {
  listPublished(request: PageRequest, now?: Date): Promise<PageResult<PostSummary>>
  findPublishedBySlug(slug: string, now?: Date): Promise<Post | null>
  findById(id: string): Promise<Post | null>
  findBySlug(slug: string): Promise<Post | null>
  listAdmin(request: PageRequest, status?: ContentStatus): Promise<PageResult<PostSummary>>
}
