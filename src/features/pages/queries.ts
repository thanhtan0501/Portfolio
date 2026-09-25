import type { PageRequest } from '@/application/pagination'
import { toPublicPageDto, type PublicPageDto } from './dto'
import type { PageRepository } from './repository'

export async function getPublishedPage(
  repository: PageRepository,
  key: string,
  now?: Date,
): Promise<PublicPageDto | null> {
  const page = await repository.findPublishedByKey(key, now)
  return page ? toPublicPageDto(page) : null
}

export async function listAdminPages(repository: PageRepository, request: PageRequest) {
  return repository.listAdmin(request)
}
