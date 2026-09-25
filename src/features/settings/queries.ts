import type { PublicSiteSettingsDto } from './dto'
import { toPublicSiteSettingsDto } from './dto'
import type { SettingsRepository } from './repository'

export async function getPublicSiteSettings(
  repository: SettingsRepository,
): Promise<PublicSiteSettingsDto | null> {
  const settings = await repository.get()
  return settings ? toPublicSiteSettingsDto(settings) : null
}
