import { getDatabase } from '@/db/client'
import type { TransactionManager } from '@/application/transaction'
import { createRepositories } from './create-repositories'

export function createTransactionManager(): TransactionManager {
  return {
    async run(operation) {
      return getDatabase().transaction(async transaction =>
        operation(createRepositories(transaction)),
      )
    },
  }
}
