import { normalizePageRequest, type PageRequest, type PageResult } from '@/application/pagination'
import {
  toAdminPostDto,
  toAdminPostSummaryDto,
  toPublicPostDetailDto,
  toPublicPostSummaryDto,
  type AdminPostSummaryDto,
  type PublicPostDetailDto,
  type PublicPostSummaryDto,
} from './dto'
import type { PostRepository } from './repository'

export async function listPublishedPosts(
  repository: PostRepository,
  request?: PageRequest,
  now?: Date,
): Promise<PageResult<PublicPostSummaryDto>> {
  const result = await repository.listPublished(normalizePageRequest(request), now)
  return { total: result.total, items: result.items.map(toPublicPostSummaryDto) }
}

export async function getPublishedPost(
  repository: PostRepository,
  slug: string,
  now?: Date,
): Promise<PublicPostDetailDto | null> {
  const post = await repository.findPublishedBySlug(slug, now)
  return post ? toPublicPostDetailDto(post) : null
}

export async function getAdminPost(repository: PostRepository, id: string) {
  const post = await repository.findById(id)
  return post ? toAdminPostDto(post) : null
}

export async function listAdminPosts(
  repository: PostRepository,
  request?: PageRequest,
): Promise<PageResult<AdminPostSummaryDto>> {
  const result = await repository.listAdmin(normalizePageRequest(request))
  return {
    total: result.total,
    items: result.items.map(toAdminPostSummaryDto),
  }
}
