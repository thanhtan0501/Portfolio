import type { SaveSiteSettingsInput, SiteSettings } from './domain'

export interface SettingsRepository {
  get(): Promise<SiteSettings | null>
  save(input: SaveSiteSettingsInput): Promise<SiteSettings>
}
