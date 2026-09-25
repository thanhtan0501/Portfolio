import type { FooterRepository } from '@/features/footer/repository'
import type { MediaRepository } from '@/features/media/repository'
import type { PageRepository } from '@/features/pages/repository'
import type { PostRepository } from '@/features/posts/repository'
import type { ProfileRepository } from '@/features/profile/repository'
import type { ProjectRepository } from '@/features/projects/repository'
import type { SettingsRepository } from '@/features/settings/repository'
import type { TechnologyRepository } from '@/features/technologies/repository'

export type RepositorySet = Readonly<{
  profile: ProfileRepository
  settings: SettingsRepository
  pages: PageRepository
  projects: ProjectRepository
  posts: PostRepository
  technologies: TechnologyRepository
  media: MediaRepository
  footer: FooterRepository
}>
