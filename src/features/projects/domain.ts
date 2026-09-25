import type { Media } from '../media/domain'
import type { ContentStatus, MediaMode, OpaqueContent } from '../shared/domain'
import type { Technology } from '../technologies/domain'

export type RelatedProject = Readonly<{
  id: string
  slug: string
  title: string
  status: ContentStatus
  publishedAt: Date | null
}>

export type ProjectMediaItem = Readonly<{
  media: Media
  sortOrder: number
}>

export type ProjectSummary = Readonly<{
  id: string
  slug: string
  title: string
  summary: OpaqueContent | null
  role: string | null
  domain: string | null
  periodStart: string | null
  periodEnd: string | null
  status: ContentStatus
  publishedAt: Date | null
  githubUrl: string | null
  demoUrl: string | null
  mediaMode: MediaMode
  ogMedia: Media | null
  technologies: Technology[]
  media: ProjectMediaItem[]
  relatedProjects: RelatedProject[]
  createdAt: Date
  updatedAt: Date
}>

export type Project = ProjectSummary &
  Readonly<{
    content: OpaqueContent | null
  }>
