export type SiteSettings = Readonly<{
  id: string
  singletonKey: 'default'
  siteName: string
  siteDescription: string | null
  defaultSeoTitle: string | null
  defaultSeoDescription: string | null
  createdAt: Date
  updatedAt: Date
}>

export type SaveSiteSettingsInput = Readonly<{
  siteName: string
  siteDescription?: string | null
  defaultSeoTitle?: string | null
  defaultSeoDescription?: string | null
}>
