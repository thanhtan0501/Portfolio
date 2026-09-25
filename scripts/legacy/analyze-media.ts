import fs from 'node:fs'
import path from 'node:path'

const file = path.join(process.cwd(), '.legacy-export', 'media.json')

if (!fs.existsSync(file)) {
  console.error('No .legacy-export/media.json found. Export legacy data before analyzing media.')
  process.exit(1)
}

const records = JSON.parse(fs.readFileSync(file, 'utf8')) as Array<Record<string, unknown>>
const mime = new Map<string, number>()
const hosts = new Map<string, number>()
let knownBytes = 0
let knownByteRecords = 0
let missingUrl = 0
let malformedUrl = 0

for (const record of records) {
  const type = typeof record.mimeType === 'string' && record.mimeType ? record.mimeType : 'unknown'
  mime.set(type, (mime.get(type) ?? 0) + 1)

  if (typeof record.filesize === 'number' && Number.isFinite(record.filesize)) {
    knownBytes += record.filesize
    knownByteRecords += 1
  }

  if (typeof record.url !== 'string' || record.url.length === 0) {
    missingUrl += 1
    continue
  }

  try {
    const host = new URL(record.url).host
    hosts.set(host, (hosts.get(host) ?? 0) + 1)
  } catch {
    malformedUrl += 1
  }
}

console.log(`total media records: ${records.length}`)
console.log(`known bytes: ${knownBytes} across ${knownByteRecords} records`)
console.log(`missing URL count: ${missingUrl}`)
console.log(`malformed URL count: ${malformedUrl}`)
console.log(`MIME breakdown: ${JSON.stringify(Object.fromEntries(mime))}`)
console.log(`storage hosts: ${JSON.stringify(Object.fromEntries(hosts))}`)
