import { eq } from 'drizzle-orm'
import { siteSettings } from '@/db/schema'
import type { SaveSiteSettingsInput, SiteSettings } from '@/features/settings/domain'
import type { SettingsRepository } from '@/features/settings/repository'
import type { DrizzleExecutor } from './executor'
import { translateDatabaseErrors } from './errors'

function mapSettings(row: typeof siteSettings.$inferSelect): SiteSettings {
  return { ...row, singletonKey: 'default' }
}

export function createSettingsRepository(db: DrizzleExecutor): SettingsRepository {
  return {
    async get() {
      const [row] = await db
        .select()
        .from(siteSettings)
        .where(eq(siteSettings.singletonKey, 'default'))
      return row ? mapSettings(row) : null
    },
    async save(input: SaveSiteSettingsInput) {
      return translateDatabaseErrors(async () => {
        const [row] = await db
          .insert(siteSettings)
          .values({
            singletonKey: 'default',
            siteName: input.siteName,
            siteDescription: input.siteDescription ?? null,
            defaultSeoTitle: input.defaultSeoTitle ?? null,
            defaultSeoDescription: input.defaultSeoDescription ?? null,
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: siteSettings.singletonKey,
            set: {
              siteName: input.siteName,
              siteDescription: input.siteDescription ?? null,
              defaultSeoTitle: input.defaultSeoTitle ?? null,
              defaultSeoDescription: input.defaultSeoDescription ?? null,
              updatedAt: new Date(),
            },
          })
          .returning()
        if (!row) throw new Error('Settings upsert returned no row')
        return mapSettings(row)
      })
    },
  }
}
