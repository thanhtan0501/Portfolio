import type { FooterLink } from './domain'

export type FooterLinkDto = Readonly<{
  id: string
  label: string
  url: string
  iconKey: string
  sortOrder: number
}>

export function toFooterLinkDto(link: FooterLink): FooterLinkDto {
  return {
    id: link.id,
    label: link.label,
    url: link.url,
    iconKey: link.iconKey,
    sortOrder: link.sortOrder,
  }
}
