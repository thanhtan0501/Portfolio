import fs from 'node:fs'
import path from 'node:path'

const directory = path.join(process.cwd(), '.legacy-export')
const files = ['users', 'media', 'codes', 'pages', 'projects', 'feeds', 'footer']

const readJson = (name: string) => JSON.parse(fs.readFileSync(path.join(directory, `${name}.json`), 'utf8'))

const keysOf = (value: unknown) =>
  value && typeof value === 'object' && !Array.isArray(value) ? Object.keys(value as object).sort() : []

if (!fs.existsSync(path.join(directory, 'metadata.json'))) {
  console.error('No .legacy-export/metadata.json found. Run the read-only exporter first.')
  process.exit(1)
}

for (const name of files) {
  const data = readJson(name)
  const records = Array.isArray(data) ? data : [data]
  const keyCounts = new Map<string, number>()

  for (const record of records) {
    for (const key of keysOf(record)) keyCounts.set(key, (keyCounts.get(key) ?? 0) + 1)
  }

  const keySummary = [...keyCounts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, count]) => `${key}:${count}`)
    .join(', ')

  console.log(`${name}: records=${Array.isArray(data) ? data.length : 1}; fields=${keySummary || 'none'}`)
}
