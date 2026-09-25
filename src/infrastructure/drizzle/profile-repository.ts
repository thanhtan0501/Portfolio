import { eq, inArray } from 'drizzle-orm'
import { media, siteProfile } from '@/db/schema'
import type { SaveSiteProfileInput, SiteProfile } from '@/features/profile/domain'
import type { ProfileRepository } from '@/features/profile/repository'
import type { DrizzleExecutor } from './executor'

function mapProfile(
  row: typeof siteProfile.$inferSelect,
  mediaRows: (typeof media.$inferSelect)[],
): SiteProfile {
  const byId = new Map(mediaRows.map(item => [item.id, item]))
  return {
    id: row.id,
    singletonKey: 'default',
    name: row.name,
    headline: row.headline,
    bio: row.bio,
    birthday: row.birthday,
    location: row.location,
    avatarMedia: row.avatarMediaId ? (byId.get(row.avatarMediaId) ?? null) : null,
    bannerMedia: row.bannerMediaId ? (byId.get(row.bannerMediaId) ?? null) : null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }
}

export function createProfileRepository(db: DrizzleExecutor): ProfileRepository {
  return {
    async get() {
      const [row] = await db
        .select()
        .from(siteProfile)
        .where(eq(siteProfile.singletonKey, 'default'))
      if (!row) return null
      const ids = [row.avatarMediaId, row.bannerMediaId].filter((id): id is string => Boolean(id))
      const mediaRows = ids.length
        ? await db.select().from(media).where(inArray(media.id, ids))
        : []
      return mapProfile(row, mediaRows)
    },
    async save(input: SaveSiteProfileInput) {
      const [row] = await db
        .insert(siteProfile)
        .values({
          singletonKey: 'default',
          name: input.name,
          headline: input.headline ?? null,
          bio: input.bio ?? null,
          birthday: input.birthday ?? null,
          location: input.location ?? null,
          avatarMediaId: input.avatarMediaId ?? null,
          bannerMediaId: input.bannerMediaId ?? null,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: siteProfile.singletonKey,
          set: {
            name: input.name,
            headline: input.headline ?? null,
            bio: input.bio ?? null,
            birthday: input.birthday ?? null,
            location: input.location ?? null,
            avatarMediaId: input.avatarMediaId ?? null,
            bannerMediaId: input.bannerMediaId ?? null,
            updatedAt: new Date(),
          },
        })
        .returning()
      if (!row) throw new Error('Profile upsert returned no row')
      const ids = [row.avatarMediaId, row.bannerMediaId].filter((id): id is string => Boolean(id))
      const mediaRows = ids.length
        ? await db.select().from(media).where(inArray(media.id, ids))
        : []
      return mapProfile(row, mediaRows)
    },
  }
}
