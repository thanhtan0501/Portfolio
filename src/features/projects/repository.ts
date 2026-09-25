import type { PageRequest, PageResult } from '@/application/pagination'
import type { ContentStatus } from '../shared/domain'
import type { Project, ProjectSummary } from './domain'

export interface ProjectRepository {
  listPublished(request: PageRequest, now?: Date): Promise<PageResult<ProjectSummary>>
  findPublishedBySlug(slug: string, now?: Date): Promise<Project | null>
  findById(id: string): Promise<Project | null>
  findBySlug(slug: string): Promise<Project | null>
  listAdmin(request: PageRequest, status?: ContentStatus): Promise<PageResult<ProjectSummary>>
}
