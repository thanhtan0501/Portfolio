/**
 * Read-only Portfolio V1 exporter.
 *
 * It only calls Payload find/findGlobal operations and writes a sanitized
 * snapshot to .legacy-export/. It never creates, updates, deletes, or exports
 * auth/security fields.
 */
import fs from 'node:fs/promises'
import path from 'node:path'

import { getPayloadClient } from '../../src/getPayload'

const root = process.cwd()
const outputDir = path.join(root, '.legacy-export')
const pageSize = 100

const fields: Record<string, string[]> = {
  users: ['id', 'name', 'description', 'birthday', 'location', 'avatar', 'code', 'createdAt', 'updatedAt'],
  media: [
    'id',
    'alt',
    'description',
    'url',
    'filename',
    'mimeType',
    'filesize',
    'width',
    'height',
    'sizes',
    'createdAt',
    'updatedAt',
  ],
  codes: ['id', 'title', 'code', 'url', 'filename', 'mimeType', 'filesize', 'width', 'height', 'createdAt', 'updatedAt'],
  pages: ['id', 'title', 'richText', 'createdAt', 'updatedAt'],
  projects: [
    'id',
    'title',
    'description',
    'detail',
    'images',
    'publishedAt',
    'link_code',
    'link_demo',
    'technologies',
    'relatedProjects',
    'createdAt',
    'updatedAt',
    '_status',
  ],
  feeds: ['id', 'detail', 'images', 'publishedAt', 'custom', 'createdAt', 'updatedAt', '_status'],
}

const forbidden = new Set([
  'password',
  'hash',
  'salt',
  'resetPasswordToken',
  'resetPasswordExpiration',
  'loginAttempts',
  'lockUntil',
  'private_key',
  'client_email',
  'secret',
  'token',
])

const sanitizeNested = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(sanitizeNested)
  if (!value || typeof value !== 'object') return value

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !forbidden.has(key))
      .map(([key, child]) => [key, sanitizeNested(child)]),
  )
}

const pickPublicFields = (record: Record<string, unknown>, names: string[]) =>
  Object.fromEntries(
    names
      .filter(name => name in record && !forbidden.has(name))
      .map(name => [name, sanitizeNested(record[name])]),
  )

const findAll = async (payload: any, collection: string) => {
  const documents: Record<string, unknown>[] = []
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    const result = await payload.find({
      collection,
      depth: 2,
      limit: pageSize,
      page,
    })
    documents.push(...(result.docs ?? []))
    hasNextPage = Boolean(result.hasNextPage)
    page += 1
  }

  return documents
}

const writeJson = async (name: string, value: unknown) => {
  await fs.writeFile(path.join(outputDir, name), `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

const run = async () => {
  await fs.mkdir(outputDir, { recursive: true })
  const payload = await getPayloadClient()
  const counts: Record<string, number> = {}

  for (const collection of Object.keys(fields)) {
    const records = await findAll(payload, collection)
    counts[collection] = records.length
    await writeJson(`${collection}.json`, records.map(record => pickPublicFields(record, fields[collection])))
  }

  const footer = await payload.findGlobal({ slug: 'footer', depth: 2 })
  await writeJson('footer.json', sanitizeNested(footer))
  counts.footer = Array.isArray(footer?.SocialItem) ? footer.SocialItem.length : 0

  await writeJson('metadata.json', {
    exportedAt: new Date().toISOString(),
    source: 'Portfolio V1',
    collections: counts,
    excludedFields: [...forbidden],
  })

  console.log(`Wrote sanitized legacy snapshot to ${path.relative(root, outputDir)}`)
  console.log(`Exported ${Object.values(counts).reduce((sum, count) => sum + count, 0)} records/rows.`)
}

run().catch(error => {
  console.error('Legacy export failed without changing the legacy system.')
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})

