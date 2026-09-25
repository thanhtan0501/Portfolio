import { toMediaDto, type MediaDto } from '../media/dto'
import type { SiteProfile } from './domain'

export type PublicSiteProfileDto = Readonly<{
  id: string
  name: string
  headline: string | null
  bio: unknown | null
  birthday: string | null
  location: string | null
  avatar: MediaDto | null
  banner: MediaDto | null
  updatedAt: string
}>

export function toPublicSiteProfileDto(profile: SiteProfile): PublicSiteProfileDto {
  return {
    id: profile.id,
    name: profile.name,
    headline: profile.headline,
    bio: profile.bio,
    birthday: profile.birthday,
    location: profile.location,
    avatar: profile.avatarMedia ? toMediaDto(profile.avatarMedia) : null,
    banner: profile.bannerMedia ? toMediaDto(profile.bannerMedia) : null,
    updatedAt: profile.updatedAt.toISOString(),
  }
}
