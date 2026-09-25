import type { RepositorySet } from './repositories'

export interface TransactionManager {
  run<T>(operation: (repositories: RepositorySet) => Promise<T>): Promise<T>
}
