import { toFooterLinkDto, type FooterLinkDto } from './dto'
import type { FooterRepository } from './repository'

export async function listPublicFooterLinks(
  repository: FooterRepository,
): Promise<FooterLinkDto[]> {
  const links = await repository.listVisible()
  return links.map(toFooterLinkDto)
}
