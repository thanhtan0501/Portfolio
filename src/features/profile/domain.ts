import type { Media } from '../media/domain'
import type { OpaqueContent } from '../shared/domain'

export type SiteProfile = Readonly<{
  id: string
  singletonKey: 'default'
  name: string
  headline: string | null
  bio: OpaqueContent | null
  birthday: string | null
  location: string | null
  avatarMedia: Media | null
  bannerMedia: Media | null
  createdAt: Date
  updatedAt: Date
}>

export type SaveSiteProfileInput = Readonly<{
  name: string
  headline?: string | null
  bio?: OpaqueContent | null
  birthday?: string | null
  location?: string | null
  avatarMediaId?: string | null
  bannerMediaId?: string | null
}>
