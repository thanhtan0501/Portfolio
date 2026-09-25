import { and, asc, count, desc, eq, inArray, lte } from 'drizzle-orm'
import { aliasedTable } from 'drizzle-orm/alias'
import {
  media,
  projectMedia,
  projectRelations,
  projectTechnologies,
  projects,
  technologies,
} from '@/db/schema'
import { normalizePageRequest } from '@/application/pagination'
import type { Media } from '@/features/media/domain'
import type { Project, ProjectMediaItem, RelatedProject } from '@/features/projects/domain'
import type { ProjectRepository } from '@/features/projects/repository'
import type { ContentStatus } from '@/features/shared/domain'
import type { Technology } from '@/features/technologies/domain'
import type { DrizzleExecutor } from './executor'

type ProjectRow = typeof projects.$inferSelect
type ProjectHydrationRow = Omit<ProjectRow, 'content'> & { content?: unknown | null }
type RelationData = {
  ogMedia: Media | null
  technologies: Technology[]
  media: ProjectMediaItem[]
  relatedProjects: RelatedProject[]
}

function mapMedia(row: typeof media.$inferSelect): Media {
  return { ...row }
}

function mapTechnology(row: typeof technologies.$inferSelect): Technology {
  return { ...row }
}

function mapProject(row: ProjectHydrationRow, data: RelationData): Project {
  return {
    ...row,
    content: row.content ?? null,
    ...data,
  }
}

async function loadRelationData(
  db: DrizzleExecutor,
  rows: ProjectHydrationRow[],
  publicOnly: boolean,
  now: Date,
): Promise<Map<string, RelationData>> {
  if (rows.length === 0) return new Map()

  const projectIds = rows.map(row => row.id)
  const relationMediaRows = await db
    .select({
      projectId: projectMedia.projectId,
      mediaId: projectMedia.mediaId,
      sortOrder: projectMedia.sortOrder,
      media: media,
    })
    .from(projectMedia)
    .innerJoin(media, eq(projectMedia.mediaId, media.id))
    .where(inArray(projectMedia.projectId, projectIds))
    .orderBy(asc(projectMedia.sortOrder), asc(projectMedia.mediaId))

  const technologyRows = await db
    .select({
      projectId: projectTechnologies.projectId,
      technology: technologies,
    })
    .from(projectTechnologies)
    .innerJoin(technologies, eq(projectTechnologies.technologyId, technologies.id))
    .where(inArray(projectTechnologies.projectId, projectIds))
    .orderBy(asc(projectTechnologies.sortOrder), asc(technologies.name), asc(technologies.id))

  const relatedProjects = aliasedTable(projects, 'related_projects')
  const relationConditions = [inArray(projectRelations.projectId, projectIds)]
  if (publicOnly) {
    relationConditions.push(
      eq(relatedProjects.status, 'published'),
      lte(relatedProjects.publishedAt, now),
    )
  }
  const relationRows = await db
    .select({
      projectId: projectRelations.projectId,
      related: relatedProjects,
    })
    .from(projectRelations)
    .innerJoin(relatedProjects, eq(projectRelations.relatedProjectId, relatedProjects.id))
    .where(and(...relationConditions))
    .orderBy(asc(projectRelations.sortOrder), asc(relatedProjects.id))

  const mediaIds = [
    ...rows.map(row => row.ogMediaId),
    ...relationMediaRows.map(row => row.mediaId),
  ].filter((id): id is string => Boolean(id))
  const ogMediaRows = mediaIds.length
    ? await db.select().from(media).where(inArray(media.id, mediaIds))
    : []
  const mediaById = new Map(ogMediaRows.map(row => [row.id, mapMedia(row)]))
  const data = new Map<string, RelationData>()

  for (const row of rows) {
    data.set(row.id, {
      ogMedia: row.ogMediaId ? (mediaById.get(row.ogMediaId) ?? null) : null,
      technologies: technologyRows
        .filter(item => item.projectId === row.id)
        .map(item => mapTechnology(item.technology)),
      media: relationMediaRows
        .filter(item => item.projectId === row.id)
        .map(item => ({ media: mapMedia(item.media), sortOrder: item.sortOrder })),
      relatedProjects: relationRows
        .filter(item => item.projectId === row.id)
        .map(item => ({
          id: item.related.id,
          slug: item.related.slug,
          title: item.related.title,
          status: item.related.status,
          publishedAt: item.related.publishedAt,
        })),
    })
  }

  return data
}

async function hydrate(
  db: DrizzleExecutor,
  rows: ProjectHydrationRow[],
  publicOnly: boolean,
  now: Date,
): Promise<Project[]> {
  const relationData = await loadRelationData(db, rows, publicOnly, now)
  return rows.map(row =>
    mapProject(
      row,
      relationData.get(row.id) ?? {
        ogMedia: null,
        technologies: [],
        media: [],
        relatedProjects: [],
      },
    ),
  )
}

export function createProjectRepository(db: DrizzleExecutor): ProjectRepository {
  const summaryFields = {
    id: projects.id,
    slug: projects.slug,
    title: projects.title,
    summary: projects.summary,
    role: projects.role,
    domain: projects.domain,
    periodStart: projects.periodStart,
    periodEnd: projects.periodEnd,
    status: projects.status,
    publishedAt: projects.publishedAt,
    githubUrl: projects.githubUrl,
    demoUrl: projects.demoUrl,
    mediaMode: projects.mediaMode,
    seoTitle: projects.seoTitle,
    seoDescription: projects.seoDescription,
    ogMediaId: projects.ogMediaId,
    createdAt: projects.createdAt,
    updatedAt: projects.updatedAt,
  }

  return {
    async listPublished(request, now = new Date()) {
      const page = normalizePageRequest(request)
      const where = and(eq(projects.status, 'published'), lte(projects.publishedAt, now))
      const [totalRow, rows] = await Promise.all([
        db.select({ count: count() }).from(projects).where(where),
        db
          .select(summaryFields)
          .from(projects)
          .where(where)
          .orderBy(desc(projects.publishedAt), desc(projects.id))
          .limit(page.limit)
          .offset(page.offset),
      ])
      const items = await hydrate(db, rows, true, now)
      return { total: Number(totalRow[0]?.count ?? 0), items }
    },

    async findPublishedBySlug(slug, now = new Date()) {
      const [row] = await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.slug, slug),
            eq(projects.status, 'published'),
            lte(projects.publishedAt, now),
          ),
        )
      const [project] = await hydrate(db, row ? [row] : [], true, now)
      return project ?? null
    },

    async findById(id) {
      const [row] = await db.select().from(projects).where(eq(projects.id, id))
      const [project] = await hydrate(db, row ? [row] : [], false, new Date())
      return project ?? null
    },

    async findBySlug(slug) {
      const [row] = await db.select().from(projects).where(eq(projects.slug, slug))
      const [project] = await hydrate(db, row ? [row] : [], false, new Date())
      return project ?? null
    },

    async listAdmin(request, status?: ContentStatus) {
      const page = normalizePageRequest(request)
      const where = status ? eq(projects.status, status) : undefined
      const [totalRow, rows] = await Promise.all([
        db.select({ count: count() }).from(projects).where(where),
        db
          .select(summaryFields)
          .from(projects)
          .where(where)
          .orderBy(desc(projects.updatedAt), desc(projects.id))
          .limit(page.limit)
          .offset(page.offset),
      ])
      const items = await hydrate(db, rows, false, new Date())
      return { total: Number(totalRow[0]?.count ?? 0), items }
    },
  }
}
