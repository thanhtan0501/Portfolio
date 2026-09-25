import { describe, expect, it } from 'vitest'
import { ValidationError } from './errors'
import type { RepositorySet } from './repositories'
import type { TransactionManager } from './transaction'
import { saveSiteSettings } from '@/features/settings/commands'
import { upsertTechnology } from '@/features/technologies/commands'

describe('application commands', () => {
  it('rejects invalid write input before opening a transaction', async () => {
    let called = false
    const transaction: TransactionManager = {
      run: async operation => {
        called = true
        return operation({} as RepositorySet)
      },
    }

    await expect(saveSiteSettings(transaction, { siteName: '' })).rejects.toBeInstanceOf(
      ValidationError,
    )
    expect(called).toBe(false)
  })

  it('validates and returns a DTO from a fake repository', async () => {
    const transaction: TransactionManager = {
      run: async operation =>
        operation({
          settings: {
            save: async input => ({
              id: 'settings-1',
              singletonKey: 'default',
              ...input,
              siteDescription: input.siteDescription ?? null,
              defaultSeoTitle: input.defaultSeoTitle ?? null,
              defaultSeoDescription: input.defaultSeoDescription ?? null,
              createdAt: new Date('2026-01-01T00:00:00.000Z'),
              updatedAt: new Date('2026-01-02T00:00:00.000Z'),
            }),
          },
        } as RepositorySet),
    }

    await expect(
      saveSiteSettings(transaction, { siteName: 'Portfolio V2' }),
    ).resolves.toMatchObject({
      siteName: 'Portfolio V2',
      updatedAt: '2026-01-02T00:00:00.000Z',
    })
  })

  it('validates technology input before delegating to its repository', async () => {
    const transaction: TransactionManager = {
      run: async operation =>
        operation({
          technologies: {
            upsert: async input => ({
              id: 'technology-1',
              ...input,
              category: input.category ?? null,
              sortOrder: input.sortOrder ?? 0,
              createdAt: new Date('2026-01-01T00:00:00.000Z'),
              updatedAt: new Date('2026-01-02T00:00:00.000Z'),
            }),
          },
        } as RepositorySet),
    }

    await expect(
      upsertTechnology(transaction, { slug: 'typescript', name: 'TypeScript' }),
    ).resolves.toMatchObject({ slug: 'typescript', sortOrder: 0 })
  })
})
