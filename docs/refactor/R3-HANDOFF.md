# R3 Handoff — Supabase PostgreSQL + Drizzle

## Status

```text
R3: PARTIAL
R4 readiness: NOT READY FOR R4
SUPABASE_CLOUD_STATUS=BLOCKED_AUTH
```

The local R3 foundation is complete. The approved Supabase Free project could
not be provisioned or reached because no authenticated Supabase CLI/API session
or database credentials were available. The migration is generated and checked,
but it has not been applied. This is the only current R4 gate blocker.

## Git

- Branch: `refactor/v2`
- R2 starting HEAD verified: `950968f`
- R3 implementation commit: `c36f87d9a455cb426b4efeff051533c36c21a112`
- V1 reference remains `portfolio-v1-final` at sanitized commit
  `8e969466898a6c3ec61843e5783d841c9a117ae4`.
- Pre-existing user-owned files remain unmodified and unstaged.

## Exact versions

- Node policy: `>=24.0.0 <25`
- pnpm: `11.1.0`
- Next.js: `16.3.6`
- React: `19.3.0`
- TypeScript: `5.9.3`
- Drizzle ORM: `0.45.3`
- Drizzle Kit: `0.31.11`
- postgres.js: `3.4.9`

## Database foundation

- Schema: `portfolio`
- Tables: 12
- Enums: `content_status`, `media_mode`
- Migration: `drizzle/0000_chemical_squadron_sinister.sql`
- Runtime client: `src/db/client.ts`
- Migration config: `drizzle.config.ts`
- Runtime connection intent: Supavisor transaction mode, port 6543,
  `prepare: false`, `max: 1`.
- Migration connection intent: separate direct PostgreSQL URL, port 5432.
- Browser Data API: not used.
- Client-component database access: none.

## Security state

- `portfolio` is separate from `public`.
- Migration SQL revokes `anon`/`authenticated` schema and table privileges.
- Migration SQL revokes corresponding default privileges.
- RLS is enabled on every application table in the migration.
- No permissive browser policies are created.
- Cloud grants/RLS are not verified because the migration has not run.

## Local verification

Passed:

- `pnpm db:generate`
- `pnpm db:check`
- focused env and schema tests
- `pnpm typecheck`
- `pnpm check` (lint, typecheck, tests, format, build)
- `pnpm install --frozen-lockfile`
- `pnpm audit --prod` (no known production vulnerabilities)
- runtime smoke: `/` 200, `/design-system` 200, missing route 404

Dependency warning:

- Full `pnpm audit` reports one moderate dev-only advisory in transitive
  `esbuild` under `drizzle-kit`; no production dependency is affected. It is
  recorded rather than hidden because the dependency is migration tooling.

Pending cloud verification:

- `pnpm db:migrate` — requires `DATABASE_MIGRATION_URL` and an approved
  Supabase database.
- `pnpm db:ping` — requires `DATABASE_URL`.
- `pnpm db:verify` — requires `DATABASE_MIGRATION_URL`.

The normal Next.js build remains offline-safe because no current page imports the
database client.

## Files added or changed

- `src/db/client.ts`
- `src/db/schema/` and schema tests
- `drizzle.config.ts`
- `drizzle/` initial SQL migration and metadata
- `scripts/db/migrate.mjs`
- `scripts/db/ping.mjs`
- `scripts/db/verify.mjs`
- `src/lib/env/server.ts` and its tests
- `.env.example`
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`
- `README.md`
- `docs/refactor/ROADMAP_LOCK.md`
- `docs/refactor/R3-DATABASE.md`
- this handoff

No R2 design-system source was intentionally changed. No R4 work was started:
there is no Supabase Auth, Storage, CMS, admin identity, repository layer, or
public database-backed rendering.

## Required owner action before R4

Provide an authenticated Supabase project context or database credentials for
the approved Free development project, set the two server-only variables locally
without committing them, then run and record:

```text
pnpm db:migrate
pnpm db:ping
pnpm db:verify
```

After those checks pass, R3 can be closed and R4 can begin. Do not add
`@supabase/supabase-js` or authentication code as part of this verification.
