import { z } from 'zod'
import { ValidationError } from '@/application/errors'
import type { TransactionManager } from '@/application/transaction'
import { toTechnologyDto, type TechnologyDto } from './dto'

const technologyInput = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .max(100),
  name: z.string().trim().min(1).max(100),
  category: z.string().trim().max(100).nullable().optional(),
  sortOrder: z.number().int().min(0).max(10000).optional(),
})

export async function upsertTechnology(
  transaction: TransactionManager,
  input: unknown,
): Promise<TechnologyDto> {
  const parsed = technologyInput.safeParse(input)
  if (!parsed.success) throw new ValidationError('Invalid technology')
  const technology = await transaction.run(repositories =>
    repositories.technologies.upsert(parsed.data),
  )
  return toTechnologyDto(technology)
}
