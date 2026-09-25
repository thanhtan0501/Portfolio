import 'server-only'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { getServerEnv } from '@/lib/env/server'
import * as schema from './schema'

function createResources() {
  const { DATABASE_URL } = getServerEnv()
  const sql = postgres(DATABASE_URL, {
    max: 1,
    prepare: false,
  })

  return {
    sql,
    db: drizzle(sql, { schema }),
  }
}

type DatabaseResources = ReturnType<typeof createResources>

const globalForDatabase = globalThis as typeof globalThis & {
  portfolioDatabase?: DatabaseResources
}

let productionResources: DatabaseResources | undefined

function resources() {
  if (process.env.NODE_ENV === 'production') {
    productionResources ??= createResources()
    return productionResources
  }

  globalForDatabase.portfolioDatabase ??= createResources()
  return globalForDatabase.portfolioDatabase
}

export function getDatabase() {
  return resources().db
}

export function getSql() {
  return resources().sql
}
