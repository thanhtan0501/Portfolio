import type { RepositorySet } from '@/application/repositories'
import type { DrizzleExecutor } from './executor'
import { createFooterRepository } from './footer-repository'
import { createMediaRepository } from './media-repository'
import { createPageRepository } from './pages-repository'
import { createPostRepository } from './posts-repository'
import { createProfileRepository } from './profile-repository'
import { createProjectRepository } from './projects-repository'
import { createSettingsRepository } from './settings-repository'
import { createTechnologyRepository } from './technologies-repository'

export function createRepositories(db: DrizzleExecutor): RepositorySet {
  return {
    profile: createProfileRepository(db),
    settings: createSettingsRepository(db),
    pages: createPageRepository(db),
    projects: createProjectRepository(db),
    posts: createPostRepository(db),
    technologies: createTechnologyRepository(db),
    media: createMediaRepository(db),
    footer: createFooterRepository(db),
  }
}
