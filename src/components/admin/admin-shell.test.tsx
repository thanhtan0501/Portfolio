import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AdminShell } from './admin-shell'

vi.mock('@/app/admin/login/actions', () => ({
  logout: vi.fn(),
}))

describe('admin shell', () => {
  it('shows safe admin identity and disabled future modules', () => {
    render(
      <AdminShell identity={{ userId: 'user-1', email: 'owner@example.com', role: 'owner' }} />,
    )

    expect(screen.getByText('owner@example.com')).toBeTruthy()
    expect(screen.getByText('owner')).toBeTruthy()
    expect(screen.getByText('Projects').getAttribute('aria-disabled')).toBe('true')
    expect(screen.getByRole('button', { name: 'Log out' })).toBeTruthy()
  })
})
