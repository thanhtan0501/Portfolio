# R4 Handoff — Supabase Auth + Secure CMS Shell

## Status

```text
R4: COMPLETE
R5 readiness: READY FOR R5
```

R4 is closed. R5 has not started.

## Git

- Branch: `refactor/v2`
- R3 baseline remains available in Git history.
- R4 changes are committed separately from the R3 baseline.
- Pre-existing user-owned untracked files were preserved.

## Dependencies

```text
@supabase/ssr: 0.12.7
@supabase/supabase-js: 2.117.1
```

No deprecated Supabase Auth helper package or alternate auth framework was
added. No service-role or secret key is an application runtime dependency.

## Supabase Auth configuration

- Project: `portfolio-v2-dev`
- Region: Singapore (`ap-southeast-1`)
- Plan: Free
- Email/password sign-in: enabled
- Public signup: disabled and live-probed as rejected
- Anonymous sign-ins: disabled
- OAuth providers: none enabled

Public client configuration is validated through
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Real
values remain only in ignored local environment storage.

## SSR/session architecture

- `src/proxy.ts` delegates only to `updateSession()`.
- `src/lib/supabase/proxy.ts` uses `getClaims()` for session refresh and
  forwards refreshed cookies.
- Proxy does not query `admin_users`.
- `src/lib/auth/admin.ts` uses authoritative `getUser()` and then queries
  `portfolio.admin_users` by Auth user UUID.
- `requireAdmin()` is the protected server boundary for `/admin` and future
  Server Actions.
- `getSession()`, email allowlists, `user_metadata`, and browser-role
  authorization are not used.

## Database migration and security

- Migration `drizzle/0001_condemned_tusk.sql` adds `portfolio.admin_role` and
  `portfolio.admin_users`.
- `admin_users.user_id` references `auth.users.id ON DELETE CASCADE`.
- The migration was applied successfully and reapplied safely.
- `pnpm db:verify` confirms 13 Portfolio tables, the enum, the FK, RLS on all
  Portfolio tables, no Portfolio policies, and denied `anon`/
  `authenticated` schema/table/sequence privileges.

## Routes and behavior

- `/admin/login` is a noindex/nofollow email/password login page.
- `/admin` is protected by a server layout calling `requireAdmin()`.
- Login uses a Server Action, generic credential errors, and signs out a
  successfully authenticated non-admin/inactive account before denial.
- Logout uses Supabase `signOut()` and redirects to `/admin/login`.
- The shell shows safe identity data, role, Dashboard, disabled future modules,
  and logout. It does not implement content CRUD or content counts.

## Verification evidence

Unit tests cover unauthenticated, non-admin, inactive, owner, editor, login
validation/failure, unauthorized sign-out, proxy `getClaims()`/cookie
forwarding, logout, and shell identity behavior.

Live verification against `portfolio-v2-dev` confirmed:

```text
password_login=PASS
get_user=PASS
non_admin_state=PASS
owner_state=PASS
editor_state=PASS
inactive_state=PASS
public_signup_disabled=PASS
logout=PASS
temporary Auth user deletion=PASS
admin_users cascade cleanup=PASS
```

Browser smoke checks also confirmed unauthenticated `/admin` redirects to
`/admin/login`, `/admin/login` renders, owner/editor sessions reach `/admin`,
inactive sessions are denied, and logout returns to the login route.

## Quality gate

The R4 handoff requires and was verified with the repository quality commands:

```text
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm format:check
pnpm build
pnpm check
pnpm db:check
pnpm db:ping
pnpm db:verify
pnpm audit --prod
pnpm audit
```

Any remaining non-production advisory is recorded with the final command
output; it does not change the R4 scope. `pnpm audit --prod` reports no known
vulnerabilities. Full `pnpm audit` reports one moderate development-only
`esbuild` advisory reachable through `drizzle-kit`; no stable compatible R4
upgrade was applied solely to silence it.

## Deliberate non-scope

R4 does not implement Supabase Storage, media upload, content CRUD, rich-text
editing, revision history, repositories, application services, public
Portfolio data rendering, password reset, MFA, OAuth, rate limiting, or R5.

## R5 readiness

```text
READY FOR R5
```

The next authorized phase may establish application/domain/data boundaries.
