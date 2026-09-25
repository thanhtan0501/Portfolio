import fs from 'node:fs'
import path from 'node:path'

const directory = path.join(process.cwd(), '.legacy-export')
const expected = ['metadata', 'users', 'media', 'codes', 'pages', 'projects', 'feeds', 'footer']
const forbidden = /^(password|hash|salt|resetPasswordToken|resetPasswordExpiration|loginAttempts|lockUntil|private_key|client_email|secret|token)$/i
const violations: string[] = []

const walk = (value: unknown, location: string) => {
  if (Array.isArray(value)) {
    value.forEach((child, index) => walk(child, `${location}[${index}]`))
    return
  }
  if (!value || typeof value !== 'object') return

  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (forbidden.test(key)) violations.push(`${location}.${key}`)
    walk(child, `${location}.${key}`)
  }
}

for (const name of expected) {
  const file = path.join(directory, `${name}.json`)
  if (!fs.existsSync(file)) {
    violations.push(`missing ${name}.json`)
    continue
  }

  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'))
    walk(data, name)
  } catch (error) {
    violations.push(`${name}.json is not valid JSON: ${error instanceof Error ? error.message : String(error)}`)
  }
}

if (violations.length > 0) {
  console.error('Legacy export verification failed:')
  violations.forEach(violation => console.error(`- ${violation}`))
  process.exit(1)
}

console.log('Legacy export structure is present and contains no forbidden auth/secret field names.')

