# R4 — Supabase Auth + Secure Custom CMS Shell

## Approved design

R4 adds Supabase email/password authentication and a minimal protected CMS
shell. Supabase Auth owns credentials and cookie sessions; `portfolio.admin_users`
owns CMS authorization. The browser never receives service-role credentials or
direct database access.

## Boundaries

- Next.js 16 `src/proxy.ts` refreshes SSR sessions with Supabase `getClaims()`.
- Proxy does not query `portfolio.admin_users` and is not the final authorization
  boundary.
- Server authorization calls `auth.getUser()` and then queries
  `portfolio.admin_users` by `user_id` and `active`.
- `user_metadata`, email allowlists, and the Postgres `authenticated` role are
  never authorization sources.
- `admin_users.user_id` references `auth.users.id` with `ON DELETE CASCADE`.
- `admin_users` remains private: RLS enabled, no browser policies, and no
  `anon`/`authenticated` table privileges.

## Runtime pieces

- `src/lib/env/client.ts` validates the public Supabase URL and publishable key.
- `src/lib/supabase/server.ts` creates the cookie-aware Server Component,
  Server Action, and Route Handler client.
- `src/lib/supabase/proxy.ts` preserves refreshed cookies and calls
  `getClaims()` for `/admin` session refresh.
- `src/lib/auth/admin.ts` exposes safe `getAdminAccess()` and `requireAdmin()`;
  it returns no session or token internals.
- `/admin/login` uses a Server Action and a small client form with generic
  credential errors.
- `/admin` uses a protected server layout and R2 primitives only.

## Auth behavior

- Email/password sign-in only; no signup, OAuth, magic link, password reset, or
  MFA in R4.
- A valid Auth user without an active `admin_users` row is denied and signed out
  after login.
- `owner` and `editor` both access the shell; content permissions are deferred.
- Logout calls Supabase `signOut()` and redirects to `/admin/login`.
- Admin routes are `noindex, nofollow`.

## Verification

The implementation uses `@supabase/ssr` 0.12.7 and `@supabase/supabase-js`
2.117.1. Hosted Auth was verified on the Free `portfolio-v2-dev` project with
email/password enabled, public signup disabled, anonymous sign-ins disabled,
and no OAuth providers enabled.

The R4 migration adds `portfolio.admin_role` and `portfolio.admin_users`, with
an `ON DELETE CASCADE` foreign key to `auth.users`. The migration was applied
twice, and `db:verify` confirmed 13 private Portfolio tables, RLS on every
table, no browser policies, and denied `anon`/`authenticated` privileges.

Unit coverage verifies unauthenticated, non-admin, inactive, owner, and editor
authorization outcomes. Live verification confirmed `/admin/login` renders,
unauthenticated `/admin` redirects, a non-admin is denied and signed out, an
active owner and editor reach the shell, an inactive admin is denied, logout
returns to `/admin/login`, public signup is rejected, and deleting a temporary
Auth user removes its `admin_users` row through the database cascade.

The reproducible `pnpm auth:verify` script accepts temporary credentials only
through the shell environment. It never creates Auth users, stores credentials,
or requires a service-role key in application runtime; temporary user
bootstrap/deletion is an external test-harness operation and was cleaned up.

Password reset, MFA, OAuth, Storage, content CRUD, repositories, and rich
editing remain intentionally outside R4.
