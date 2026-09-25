import { getTableName } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { contentStatus, mediaMode } from './enums'
import {
  footerLinks,
  media,
  pages,
  postMedia,
  posts,
  projectMedia,
  projectRelations,
  projectTechnologies,
  projects,
  siteProfile,
  siteSettings,
  technologies,
} from './index'

describe('portfolio schema contract', () => {
  it('defines the locked status and media-mode values', () => {
    expect(contentStatus.enumValues).toEqual(['draft', 'published', 'archived'])
    expect(mediaMode.enumValues).toEqual(['collage', 'slider', 'gallery'])
  })

  it('exports every R3 application table under the portfolio namespace', () => {
    expect(
      [
        siteProfile,
        siteSettings,
        media,
        pages,
        technologies,
        projects,
        projectTechnologies,
        projectRelations,
        projectMedia,
        posts,
        postMedia,
        footerLinks,
      ].map(getTableName),
    ).toEqual([
      'site_profile',
      'site_settings',
      'media',
      'pages',
      'technologies',
      'projects',
      'project_technologies',
      'project_relations',
      'project_media',
      'posts',
      'post_media',
      'footer_links',
    ])
  })
})
