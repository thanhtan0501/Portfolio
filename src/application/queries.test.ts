import { describe, expect, it } from 'vitest'
import { getPublicProfile } from '@/features/profile/queries'
import type { ProfileRepository } from '@/features/profile/repository'

describe('application queries', () => {
  it('maps domain dates to serializable public DTOs', async () => {
    const repository: ProfileRepository = {
      get: async () => ({
        id: 'profile-1',
        singletonKey: 'default',
        name: 'Thanh',
        headline: null,
        bio: { type: 'opaque' },
        birthday: null,
        location: null,
        avatarMedia: null,
        bannerMedia: null,
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
        updatedAt: new Date('2026-01-02T00:00:00.000Z'),
      }),
      save: async input => ({
        id: 'profile-1',
        singletonKey: 'default',
        name: input.name,
        headline: input.headline ?? null,
        bio: input.bio ?? null,
        birthday: input.birthday ?? null,
        location: input.location ?? null,
        avatarMedia: null,
        bannerMedia: null,
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
        updatedAt: new Date('2026-01-02T00:00:00.000Z'),
      }),
    }

    await expect(getPublicProfile(repository)).resolves.toMatchObject({
      name: 'Thanh',
      updatedAt: '2026-01-02T00:00:00.000Z',
    })
  })
})
