import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Surface } from '@/components/design-system/surface/surface'
import { getAdminAccess } from '@/lib/auth/admin'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'CMS login',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const access = await getAdminAccess()

  if (access.status === 'authorized') {
    redirect('/admin')
  }

  const message =
    access.status === 'unauthorized' || access.status === 'inactive'
      ? 'This account is not authorized to access the CMS.'
      : undefined

  return (
    <main className="grid min-h-screen place-items-center px-4 py-12">
      <Surface variant="elevated" className="w-full max-w-md p-6">
        <header className="mb-6 grid gap-2">
          <p className="type-meta text-portfolio-text-muted">Portfolio V2 / CMS</p>
          <h1 className="type-title">Sign in</h1>
          <p className="type-small text-portfolio-text-secondary">
            Administrative access only. Public account registration is disabled.
          </p>
        </header>
        <LoginForm message={message} />
      </Surface>
    </main>
  )
}
