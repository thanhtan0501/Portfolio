import type { Page } from './domain'

export type PublicPageDto = Readonly<{
  id: string
  key: string
  title: string
  content: unknown
  seoTitle: string | null
  seoDescription: string | null
  publishedAt: string
  updatedAt: string
}>

export function toPublicPageDto(page: Page): PublicPageDto {
  if (!page.publishedAt) throw new Error('Published page must have publishedAt')
  return {
    id: page.id,
    key: page.key,
    title: page.title,
    content: page.content,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    publishedAt: page.publishedAt.toISOString(),
    updatedAt: page.updatedAt.toISOString(),
  }
}
