import { z } from 'zod'

const sharedEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
})

export type SharedEnv = z.infer<typeof sharedEnvSchema>

export function parseSharedEnv(input: Record<string, string | undefined> = process.env): SharedEnv {
  return sharedEnvSchema.parse({
    NEXT_PUBLIC_SITE_URL: input.NEXT_PUBLIC_SITE_URL,
  })
}

export const env = parseSharedEnv()
