import { toMediaDto, type MediaDto } from '../media/dto'
import { toTechnologyDto, type TechnologyDto } from '../technologies/dto'
import type { Project, ProjectMediaItem, ProjectSummary, RelatedProject } from './domain'

type ProjectBaseDto = Readonly<{
  id: string
  slug: string
  title: string
  summary: unknown | null
  role: string | null
  domain: string | null
  periodStart: string | null
  periodEnd: string | null
  mediaMode: ProjectSummary['mediaMode']
  githubUrl: string | null
  demoUrl: string | null
  ogMedia: MediaDto | null
  technologies: TechnologyDto[]
  media: ReadonlyArray<Readonly<{ media: MediaDto; sortOrder: number }>>
  relatedProjects: ReadonlyArray<
    Readonly<{
      id: string
      slug: string
      title: string
      publishedAt: string | null
    }>
  >
  publishedAt: string | null
  updatedAt: string
}>

export type PublicProjectSummaryDto = Omit<ProjectBaseDto, 'publishedAt'> &
  Readonly<{ publishedAt: string }>
export type PublicProjectDetailDto = PublicProjectSummaryDto & Readonly<{ content: unknown | null }>
export type AdminProjectSummaryDto = ProjectBaseDto &
  Readonly<{
    status: ProjectSummary['status']
    createdAt: string
  }>
export type AdminProjectDto = AdminProjectSummaryDto & Readonly<{ content: unknown | null }>

function mediaItems(items: ProjectMediaItem[]) {
  return items.map(item => ({ media: toMediaDto(item.media), sortOrder: item.sortOrder }))
}

function relatedProjects(projects: RelatedProject[]) {
  return projects.map(project => ({
    id: project.id,
    slug: project.slug,
    title: project.title,
    publishedAt: project.publishedAt?.toISOString() ?? null,
  }))
}

function base(project: ProjectSummary): ProjectBaseDto {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    role: project.role,
    domain: project.domain,
    periodStart: project.periodStart,
    periodEnd: project.periodEnd,
    mediaMode: project.mediaMode,
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl,
    ogMedia: project.ogMedia ? toMediaDto(project.ogMedia) : null,
    technologies: project.technologies.map(toTechnologyDto),
    media: mediaItems(project.media),
    relatedProjects: relatedProjects(project.relatedProjects),
    publishedAt: project.publishedAt?.toISOString() ?? null,
    updatedAt: project.updatedAt.toISOString(),
  }
}

export function toPublicProjectSummaryDto(project: ProjectSummary): PublicProjectSummaryDto {
  if (!project.publishedAt) throw new Error('Public project must have publishedAt')
  return { ...base(project), publishedAt: project.publishedAt.toISOString() }
}

export function toPublicProjectDetailDto(project: Project): PublicProjectDetailDto {
  if (!project.publishedAt) throw new Error('Public project must have publishedAt')
  return {
    ...base(project),
    publishedAt: project.publishedAt.toISOString(),
    content: project.content,
  }
}

export function toAdminProjectSummaryDto(project: ProjectSummary): AdminProjectSummaryDto {
  return {
    ...base(project),
    status: project.status,
    createdAt: project.createdAt.toISOString(),
  }
}

export function toAdminProjectDto(project: Project): AdminProjectDto {
  return {
    ...toAdminProjectSummaryDto(project),
    content: project.content,
  }
}
