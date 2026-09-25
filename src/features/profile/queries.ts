import type { ProfileRepository } from './repository'
import { toPublicSiteProfileDto, type PublicSiteProfileDto } from './dto'

export async function getPublicProfile(
  repository: ProfileRepository,
): Promise<PublicSiteProfileDto | null> {
  const profile = await repository.get()
  return profile ? toPublicSiteProfileDto(profile) : null
}
