import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const forbidden =
  /(?:@\/db|drizzle-orm|postgres|@supabase\/|(?:from|import) ['"]next\/|from ['"]react)/

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap(name => {
    const path = join(directory, name)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return path.endsWith('.ts') || path.endsWith('.tsx') ? [path] : []
  })
}

describe('application import boundary', () => {
  it('keeps domain/application modules independent of infrastructure', () => {
    const roots = [join(process.cwd(), 'src/application'), join(process.cwd(), 'src/features')]
    const violations = roots
      .flatMap(sourceFiles)
      .filter(path => !path.endsWith('.test.ts') && !path.endsWith('.test.tsx'))
      .flatMap(path => {
        const matches = readFileSync(path, 'utf8').match(forbidden) ?? []
        return matches.map(match => `${path}: ${match}`)
      })

    expect(violations).toEqual([])
  })
})
