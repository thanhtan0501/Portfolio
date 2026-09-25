import type { AdminIdentity } from '@/lib/auth/admin'
import { logout } from '@/app/admin/login/actions'
import { Badge, Button, Surface } from '@/components/design-system'

const futureModules = [
  'Profile',
  'Pages',
  'Projects',
  'Posts',
  'Media',
  'Technologies',
  'Footer',
  'Settings',
]

export function AdminShell({ identity }: { identity: AdminIdentity }) {
  return (
    <div className="grid min-h-screen gap-6 p-4 sm:grid-cols-[15rem_1fr] sm:p-6">
      <aside className="grid content-start gap-6">
        <div className="grid gap-1">
          <p className="type-meta text-portfolio-text-muted">Portfolio V2</p>
          <h1 className="type-heading">Portfolio CMS</h1>
        </div>
        <nav aria-label="CMS navigation" className="grid gap-2">
          <span className="rounded-portfolio-md bg-portfolio-surface-3 px-3 py-2 type-small text-portfolio-text-primary">
            Dashboard
          </span>
          {futureModules.map(module => (
            <span
              key={module}
              aria-disabled="true"
              className="rounded-portfolio-md px-3 py-2 type-small text-portfolio-text-subtle"
            >
              {module}
            </span>
          ))}
        </nav>
        <Surface className="grid gap-3 p-4">
          <div className="grid gap-1">
            <span className="type-caption text-portfolio-text-muted">Signed in as</span>
            <span className="break-all type-small text-portfolio-text-primary">
              {identity.email ?? 'Authenticated administrator'}
            </span>
            <Badge className="w-fit">{identity.role}</Badge>
          </div>
          <form action={logout}>
            <Button type="submit" variant="ghost" className="w-full">
              Log out
            </Button>
          </form>
        </Surface>
      </aside>
      <main className="grid content-start gap-6">
        <header className="grid gap-2">
          <p className="type-meta text-portfolio-text-muted">Dashboard</p>
          <h2 className="type-display">CMS foundation ready</h2>
          <p className="type-body text-portfolio-text-secondary">
            Authentication and admin authorization are active. Content modules will be added in
            later roadmap phases.
          </p>
        </header>
        <Surface variant="elevated" className="grid gap-3 p-6">
          <h3 className="type-heading">Next steps</h3>
          <p className="type-small text-portfolio-text-secondary">
            Profile, pages, projects, posts, media, technologies, footer, and settings remain
            intentionally disabled.
          </p>
        </Surface>
      </main>
    </div>
  )
}
