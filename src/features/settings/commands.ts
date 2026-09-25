import { z } from 'zod'
import { ValidationError } from '@/application/errors'
import type { TransactionManager } from '@/application/transaction'
import { toPublicSiteSettingsDto, type PublicSiteSettingsDto } from './dto'

const settingsInput = z.object({
  siteName: z.string().trim().min(1).max(200),
  siteDescription: z.string().trim().max(1000).nullable().optional(),
  defaultSeoTitle: z.string().trim().max(200).nullable().optional(),
  defaultSeoDescription: z.string().trim().max(1000).nullable().optional(),
})

export async function saveSiteSettings(
  transaction: TransactionManager,
  input: unknown,
): Promise<PublicSiteSettingsDto> {
  const parsed = settingsInput.safeParse(input)
  if (!parsed.success) throw new ValidationError('Invalid site settings')
  const settings = await transaction.run(repositories => repositories.settings.save(parsed.data))
  return toPublicSiteSettingsDto(settings)
}
