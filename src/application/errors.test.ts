import { describe, expect, it } from 'vitest'
import { ConflictError, NotFoundError, ValidationError } from './errors'

describe('application errors', () => {
  it('exposes stable codes without leaking driver details', () => {
    expect(new NotFoundError('Project').code).toBe('not_found')
    expect(new ConflictError('Project slug already exists').status).toBe(409)
    expect(new ValidationError('Invalid input').code).toBe('validation')
  })
})
