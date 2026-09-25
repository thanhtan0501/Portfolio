import { ConflictError } from '@/application/errors'

export async function translateDatabaseErrors<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === '23505') {
      throw new ConflictError('A record with the same unique value already exists')
    }
    throw error
  }
}
