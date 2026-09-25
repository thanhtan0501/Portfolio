'use client'

import { useActionState } from 'react'
import { Button } from '@/components/design-system/button/button'
import { login } from './actions'

type LoginState = { error?: string }

async function submitLogin(_state: LoginState, formData: FormData): Promise<LoginState> {
  return (await login(formData)) ?? {}
}

export function LoginForm({ message }: { message?: string }) {
  const [state, action, pending] = useActionState(submitLogin, {})

  return (
    <form action={action} className="grid gap-5" noValidate>
      {message ? (
        <p className="rounded-portfolio-md border border-portfolio-surface-3 bg-portfolio-surface-2 p-3 text-portfolio-text-secondary">
          {message}
        </p>
      ) : null}
      {state.error ? (
        <p
          role="alert"
          className="rounded-portfolio-md border border-portfolio-surface-3 bg-portfolio-surface-2 p-3 text-portfolio-text-secondary"
        >
          {state.error}
        </p>
      ) : null}
      <label className="grid gap-2 type-small" htmlFor="email">
        Email
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="focus-ring min-h-10 rounded-portfolio-md border border-portfolio-surface-3 bg-portfolio-surface-1 px-3 text-portfolio-text-primary"
        />
      </label>
      <label className="grid gap-2 type-small" htmlFor="password">
        Password
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="focus-ring min-h-10 rounded-portfolio-md border border-portfolio-surface-3 bg-portfolio-surface-1 px-3 text-portfolio-text-primary"
        />
      </label>
      <Button type="submit" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
