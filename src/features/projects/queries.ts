import { normalizePageRequest, type PageRequest, type PageResult } from '@/application/pagination'
import {
  toAdminProjectDto,
  toAdminProjectSummaryDto,
  toPublicProjectDetailDto,
  toPublicProjectSummaryDto,
  type AdminProjectDto,
  type AdminProjectSummaryDto,
  type PublicProjectDetailDto,
  type PublicProjectSummaryDto,
} from './dto'
import type { ProjectRepository } from './repository'

export async function listPublishedProjects(
  repository: ProjectRepository,
  request?: PageRequest,
  now?: Date,
): Promise<PageResult<PublicProjectSummaryDto>> {
  const result = await repository.listPublished(normalizePageRequest(request), now)
  return { total: result.total, items: result.items.map(toPublicProjectSummaryDto) }
}

export async function getPublishedProject(
  repository: ProjectRepository,
  slug: string,
  now?: Date,
): Promise<PublicProjectDetailDto | null> {
  const project = await repository.findPublishedBySlug(slug, now)
  return project ? toPublicProjectDetailDto(project) : null
}

export async function getAdminProject(
  repository: ProjectRepository,
  id: string,
): Promise<AdminProjectDto | null> {
  const project = await repository.findById(id)
  return project ? toAdminProjectDto(project) : null
}

export async function listAdminProjects(
  repository: ProjectRepository,
  request?: PageRequest,
): Promise<PageResult<AdminProjectSummaryDto>> {
  const result = await repository.listAdmin(normalizePageRequest(request))
  return {
    total: result.total,
    items: result.items.map(toAdminProjectSummaryDto),
  }
}
