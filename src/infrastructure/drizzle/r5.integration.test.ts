import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

vi.mock('server-only', () => ({}))

import { getDatabase, getSql } from '@/db/client'
import {
  footerLinks,
  media,
  postMedia,
  posts,
  projectMedia,
  projectRelations,
  projectTechnologies,
  projects,
  technologies,
} from '@/db/schema'
import { createRepositories } from './create-repositories'
import { createTransactionManager } from './transaction-manager'

const shouldRun = process.env.R5_DB_TEST === '1'
const prefix = `__r5_test__${randomUUID()}`

async function cleanupTestRows() {
  if (!shouldRun) return
  const sql = getSql()
  const testPattern = '__r5_test__%'
  await sql`DELETE FROM portfolio.project_media WHERE project_id IN (SELECT id FROM portfolio.projects WHERE slug LIKE ${testPattern})`
  await sql`DELETE FROM portfolio.project_relations WHERE project_id IN (SELECT id FROM portfolio.projects WHERE slug LIKE ${testPattern}) OR related_project_id IN (SELECT id FROM portfolio.projects WHERE slug LIKE ${testPattern})`
  await sql`DELETE FROM portfolio.project_technologies WHERE project_id IN (SELECT id FROM portfolio.projects WHERE slug LIKE ${testPattern})`
  await sql`DELETE FROM portfolio.post_media WHERE post_id IN (SELECT id FROM portfolio.posts WHERE slug LIKE ${testPattern})`
  await sql`DELETE FROM portfolio.projects WHERE slug LIKE ${testPattern}`
  await sql`DELETE FROM portfolio.posts WHERE slug LIKE ${testPattern}`
  await sql`DELETE FROM portfolio.footer_links WHERE label LIKE ${testPattern}`
  await sql`DELETE FROM portfolio.media WHERE path LIKE ${testPattern}`
  await sql`DELETE FROM portfolio.technologies WHERE slug LIKE ${testPattern}`
}

beforeAll(cleanupTestRows, 30_000)
afterAll(async () => {
  await cleanupTestRows()
  if (shouldRun) await getSql().end({ timeout: 5 })
}, 30_000)

describe.skipIf(!shouldRun)('R5 Drizzle repository contracts', () => {
  it('filters publication state and batch-loads relations without leaving rows', async () => {
    const db = getDatabase()
    const now = new Date('2026-09-25T12:00:00.000Z')
    const mainSlug = `${prefix}-main`
    const relatedSlug = `${prefix}-related`
    const draftSlug = `${prefix}-draft`
    const futureSlug = `${prefix}-future`
    const postSlug = `${prefix}-post`

    const rollback = new Error('R5 test rollback')
    await expect(
      db.transaction(async tx => {
        const [technologyA, technologyB] = await tx
          .insert(technologies)
          .values([
            { slug: `${prefix}-z`, name: 'Zed', sortOrder: 20 },
            { slug: `${prefix}-a`, name: 'Alpha', sortOrder: 10 },
          ])
          .returning()
        const insertedMedia = await tx
          .insert(media)
          .values([
            {
              provider: 'test',
              path: `${prefix}/main.webp`,
              filename: 'main.webp',
              mimeType: 'image/webp',
              sizeBytes: 10,
            },
            {
              provider: 'test',
              path: `${prefix}/post.webp`,
              filename: 'post.webp',
              mimeType: 'image/webp',
              sizeBytes: 11,
            },
          ])
          .returning()
        const mainMedia = insertedMedia[0]!
        const postImage = insertedMedia[1]!
        const [related] = await tx
          .insert(projects)
          .values({
            slug: relatedSlug,
            title: 'Related',
            status: 'published',
            publishedAt: new Date('2026-09-20T00:00:00.000Z'),
            updatedAt: new Date('2026-09-20T00:00:00.000Z'),
          })
          .returning()
        if (!related) throw new Error('R5 test fixture insert failed: related project')
        const [main] = await tx
          .insert(projects)
          .values({
            slug: mainSlug,
            title: 'Main',
            summary: { kind: 'opaque' },
            content: { kind: 'opaque-detail' },
            status: 'published',
            publishedAt: new Date('2026-09-24T00:00:00.000Z'),
            ogMediaId: mainMedia.id,
            updatedAt: new Date('2026-09-24T00:00:00.000Z'),
          })
          .returning()
        if (!main) throw new Error('R5 test fixture insert failed: main project')
        await tx.insert(projects).values([
          {
            slug: draftSlug,
            title: 'Draft',
            status: 'draft',
            updatedAt: new Date('2026-09-22T00:00:00.000Z'),
          },
          {
            slug: futureSlug,
            title: 'Future',
            status: 'published',
            publishedAt: new Date('2026-10-01T00:00:00.000Z'),
            updatedAt: new Date('2026-09-23T00:00:00.000Z'),
          },
        ])
        await tx.insert(projectTechnologies).values([
          { projectId: main.id, technologyId: technologyA!.id, sortOrder: 2 },
          { projectId: main.id, technologyId: technologyB!.id, sortOrder: 1 },
        ])
        await tx
          .insert(projectMedia)
          .values({ projectId: main.id, mediaId: mainMedia.id, sortOrder: 0 })
        await tx.insert(projectRelations).values({
          projectId: main.id,
          relatedProjectId: related.id,
          sortOrder: 0,
        })
        const [post] = await tx
          .insert(posts)
          .values({
            slug: postSlug,
            title: 'Post',
            content: { kind: 'opaque' },
            status: 'published',
            publishedAt: new Date('2026-09-23T00:00:00.000Z'),
            ogMediaId: postImage.id,
          })
          .returning()
        if (!post) throw new Error('R5 test fixture insert failed: post')
        await tx.insert(postMedia).values({ postId: post.id, mediaId: postImage.id, sortOrder: 0 })
        await tx.insert(footerLinks).values([
          {
            label: `${prefix}-visible`,
            url: 'https://example.com',
            iconKey: 'link',
            sortOrder: 0,
            visible: true,
          },
          {
            label: `${prefix}-hidden`,
            url: 'https://example.com/hidden',
            iconKey: 'link',
            sortOrder: 1,
            visible: false,
          },
        ])

        const repositories = createRepositories(tx)
        const published = await repositories.projects.listPublished({ limit: 10, offset: 0 }, now)
        expect(published.items.map(item => item.slug)).toEqual([mainSlug, relatedSlug])

        const mainProject = await repositories.projects.findPublishedBySlug(mainSlug, now)
        expect(mainProject?.technologies.map(item => item.slug)).toEqual([
          `${prefix}-a`,
          `${prefix}-z`,
        ])
        expect(mainProject?.media).toHaveLength(1)
        expect(mainProject?.relatedProjects.map(item => item.slug)).toEqual([relatedSlug])
        await expect(repositories.projects.findPublishedBySlug(futureSlug, now)).resolves.toBeNull()

        const admin = await repositories.projects.listAdmin({ limit: 10, offset: 0 })
        expect(admin.items.map(item => item.slug)).toEqual([
          mainSlug,
          futureSlug,
          draftSlug,
          relatedSlug,
        ])

        const publishedPosts = await repositories.posts.listPublished({ limit: 10, offset: 0 }, now)
        expect(publishedPosts.items.map(item => item.slug)).toEqual([postSlug])
        expect(publishedPosts.items[0]?.media).toHaveLength(1)
        await expect(repositories.footer.listVisible()).resolves.toHaveLength(1)
        await expect(repositories.technologies.listOrdered()).resolves.toMatchObject([
          { slug: `${prefix}-a` },
          { slug: `${prefix}-z` },
        ])

        throw rollback
      }),
    ).rejects.toBe(rollback)
  }, 30_000)

  it('rolls back failed application transactions and commits successful writes', async () => {
    const transaction = createTransactionManager()
    const slug = `${prefix}-transaction`
    await expect(
      transaction.run(async repositories => {
        await repositories.technologies.upsert({ slug, name: 'Temporary' })
        throw new Error('intentional rollback')
      }),
    ).rejects.toThrow('intentional rollback')
    await expect(
      createRepositories(getDatabase()).technologies.findBySlug(slug),
    ).resolves.toBeNull()

    await transaction.run(repositories =>
      repositories.technologies.upsert({ slug, name: 'Temporary' }),
    )
    await expect(
      createRepositories(getDatabase()).technologies.findBySlug(slug),
    ).resolves.toMatchObject({ slug })
    await getSql()`DELETE FROM portfolio.technologies WHERE slug = ${slug}`
  }, 30_000)
})
