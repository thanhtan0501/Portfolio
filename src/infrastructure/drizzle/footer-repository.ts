import { asc, count, desc, eq } from 'drizzle-orm'
import { footerLinks } from '@/db/schema'
import { normalizePageRequest, type PageRequest } from '@/application/pagination'
import type { FooterLink } from '@/features/footer/domain'
import type { FooterRepository } from '@/features/footer/repository'
import type { DrizzleExecutor } from './executor'

function mapFooterLink(row: typeof footerLinks.$inferSelect): FooterLink {
  return { ...row }
}

export function createFooterRepository(db: DrizzleExecutor): FooterRepository {
  return {
    async listVisible() {
      const rows = await db
        .select()
        .from(footerLinks)
        .where(eq(footerLinks.visible, true))
        .orderBy(asc(footerLinks.sortOrder), asc(footerLinks.label), asc(footerLinks.id))
      return rows.map(mapFooterLink)
    },
    async listAdmin(input: PageRequest) {
      const request = normalizePageRequest(input)
      const [totalRow] = await db.select({ count: count() }).from(footerLinks)
      const rows = await db
        .select()
        .from(footerLinks)
        .orderBy(asc(footerLinks.sortOrder), desc(footerLinks.updatedAt), desc(footerLinks.id))
        .limit(request.limit)
        .offset(request.offset)
      return { total: Number(totalRow?.count ?? 0), items: rows.map(mapFooterLink) }
    },
  }
}
