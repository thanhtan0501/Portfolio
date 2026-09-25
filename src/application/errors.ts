export type ApplicationErrorCode = 'not_found' | 'conflict' | 'validation'

export class ApplicationError extends Error {
  constructor(
    message: string,
    readonly code: ApplicationErrorCode,
    readonly status: number,
  ) {
    super(message)
    this.name = 'ApplicationError'
  }
}

export class NotFoundError extends ApplicationError {
  constructor(entity: string) {
    super(`${entity} not found`, 'not_found', 404)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends ApplicationError {
  constructor(message: string) {
    super(message, 'conflict', 409)
    this.name = 'ConflictError'
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string) {
    super(message, 'validation', 400)
    this.name = 'ValidationError'
  }
}
