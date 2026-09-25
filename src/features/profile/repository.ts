import type { SiteProfile, SaveSiteProfileInput } from './domain'

export interface ProfileRepository {
  get(): Promise<SiteProfile | null>
  save(input: SaveSiteProfileInput): Promise<SiteProfile>
}
