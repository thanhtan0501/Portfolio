# R3 Handoff — Supabase PostgreSQL + Drizzle

## Status

```text
R3: COMPLETE
R4 readiness: READY FOR R4
SUPABASE_CLOUD_STATUS=VERIFIED
```

R3 is closed. The checked-in migration is applied and verified against the
approved Supabase Free development project. No R4 implementation was started.

## Git

- Branch: `refactor/v2`
- R2 starting HEAD: `950968f`
- R3 implementation baseline: `c36f87d9a455cb426b4efeff051533c36c21a112`
- V1 reference: `portfolio-v1-final` at sanitized commit
  `8e969466898a6c3ec61843e5783d841c9a117ae4`
- R3 closure changes: database verifier hardening, Supabase CLI temp-file
  ignores, and this verification documentation.
- Pre-existing user-owned files remain preserved and unstaged.

## Supabase cloud

- Project: `portfolio-v2-dev`
- Project ref: `ijlhbalfercqijanocfg`
- Region: `ap-southeast-1` (Southeast Asia/Singapore)
- Plan: Free; no paid compute, IPv4 add-on, or paid backup enabled.
- No credentials, passwords, tokens, or connection URLs are recorded here.

## Exact versions

- Node policy: `>=24.0.0 <25`
- pnpm: `11.1.0`
- Next.js: `16.3.6`
- React: `19.3.0`
- TypeScript: `5.9.3`
- Drizzle ORM: `0.45.3`
- Drizzle Kit: `0.31.11`
- postgres.js: `3.4.9`

## Connections

- Runtime `DATABASE_URL`: Supavisor transaction mode, port 6543; verified by
  `db:ping`. The client uses `prepare: false` and `max: 1`.
- Migration `DATABASE_MIGRATION_URL`: Supavisor session mode, port 5432;
  verified by migration and read-only catalog checks. The direct IPv6 endpoint
  was not resolvable from this execution environment, so session mode was used
  as the documented migration fallback without purchasing IPv4 support.

## Migration and database verification

- Initial `pnpm db:migrate`: PASS.
- Second `pnpm db:migrate`: PASS; already-applied objects were skipped safely.
- `pnpm db:check`: PASS.
- Schema: `portfolio`.
- Tables: 12 expected application tables, with no unexpected portfolio tables.
- Enums: `content_status` and `media_mode`, with expected labels.
- Constraints/FKs/indexes: verified against PostgreSQL catalogs.
- RLS: enabled on all 12 application tables.
- Policies: zero portfolio policies; no browser-facing policy exists.
- `anon`: no portfolio schema/table/sequence privileges.
- `authenticated`: no portfolio schema/table/sequence privileges.
- Default privileges: browser-role table/sequence/function privileges revoked.
- Content tables: empty; no portfolio content was seeded.
- Constraint smoke tests: PASS for negative ordering, self-relations, invalid
  project dates, and published pages without `published_at`; all tests were
  transaction-scoped and rolled back.

## Quality verification

- `pnpm install --frozen-lockfile`: PASS.
- `pnpm lint`: PASS.
- `pnpm typecheck`: PASS.
- `pnpm test`: PASS (4 files, 10 tests).
- `pnpm format:check`: PASS.
- `pnpm build`: PASS.
- `pnpm db:generate`: PASS; no schema changes.
- `pnpm db:ping`: PASS.
- `pnpm db:verify`: PASS.
- `pnpm audit --prod`: PASS; no production vulnerabilities.
- Full `pnpm audit`: one moderate development-only `esbuild` advisory through
  `drizzle-kit`; it does not affect production dependencies and was not hidden
  with an unstable upgrade.

## Scope confirmation

R3 contains no Supabase Auth, Supabase Storage, CMS, admin route, repository or
application-service layer, contact flow, or public database-backed page. The
Next.js build remains offline-safe because current pages do not import or query
the database client.

## R4 readiness

```text
READY FOR R4
```

R4 may begin in a separate instruction. This handoff does not authorize R4
implementation.
