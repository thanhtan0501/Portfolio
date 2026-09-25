import type { ReactNode } from 'react'
import { AdminShell } from '@/components/admin/admin-shell'
import { requireAdmin } from '@/lib/auth/admin'

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const identity = await requireAdmin()

  return (
    <>
      <AdminShell identity={identity} />
      {children}
    </>
  )
}
