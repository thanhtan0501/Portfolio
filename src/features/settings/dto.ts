import type { SiteSettings } from './domain'

export type PublicSiteSettingsDto = Readonly<{
  siteName: string
  siteDescription: string | null
  defaultSeoTitle: string | null
  defaultSeoDescription: string | null
  updatedAt: string
}>

export function toPublicSiteSettingsDto(settings: SiteSettings): PublicSiteSettingsDto {
  return {
    siteName: settings.siteName,
    siteDescription: settings.siteDescription,
    defaultSeoTitle: settings.defaultSeoTitle,
    defaultSeoDescription: settings.defaultSeoDescription,
    updatedAt: settings.updatedAt.toISOString(),
  }
}
