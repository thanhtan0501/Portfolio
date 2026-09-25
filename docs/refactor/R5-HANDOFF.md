# R5 Handoff — Application / Domain / Data Boundaries

## Status

```text
R5: COMPLETE
R6 readiness: READY FOR R6
```

R6 has not started.

## Git

- Branch: `refactor/v2`
- R0–R4 history remains available.
- R5 changes are limited to application contracts, feature types/queries,
  Drizzle adapters, tests, documentation, and the test command.
- Pre-existing user-owned untracked files were preserved and not staged.

## Architecture delivered

- Framework-independent domain models for Profile, Settings, Pages, Projects,
  Posts, Technologies, Media, and Footer.
- Public/admin DTO boundaries with ISO timestamps and provider-neutral media.
- Feature-specific repository interfaces; no generic base repository.
- Drizzle adapters for all eight feature areas.
- Explicit repository composition and a Drizzle-backed transaction manager.
- Typed application errors and centralized pagination normalization.
- Static import-boundary test preventing application/domain imports of database,
  framework, and Supabase modules.

## Existing dependency versions used

```text
drizzle-orm: 0.45.3
drizzle-kit: 0.31.11
postgres: 3.4.9
zod: existing R1/R3 dependency
vitest: existing R1 dependency
```

## Data behavior verified

- Public pages/projects/posts exclude drafts, archived rows, and future
  publication dates.
- Project/post lists omit full opaque content from SQL selections.
- Project/post detail reads load their opaque content and ordered media.
- Project technologies, media, related projects, and post media are batch
  loaded; no per-item relation query loop exists.
- Footer public reads enforce `visible = true`.
- Ordering is deterministic and pagination is clamped centrally.
- DTOs do not expose Drizzle rows or invent media URLs.

## Transactions and writes

`saveSiteSettings()` and `upsertTechnology()` are the intentionally narrow R5
write proofs. Both validate input with Zod and return DTOs. Live verification
proves failed transaction rollback and successful transaction persistence; the
successful temporary row is removed immediately and the test suite performs a
prefix-based cleanup pass.

## Verification

```text
pnpm install --frozen-lockfile       PASS
pnpm lint                            PASS
pnpm typecheck                       PASS
pnpm test                            PASS (unit suite; live DB suite skipped)
pnpm format:check                    PASS
pnpm build                           PASS
pnpm check                           PASS
pnpm db:check                        PASS
pnpm db:ping                         PASS
pnpm db:verify                       PASS
pnpm test:db                         PASS (2 live integration tests)
pnpm audit --prod                    PASS / no production vulnerabilities
pnpm audit                           one moderate dev-only esbuild advisory via drizzle-kit; no stable compatible upgrade applied
```

The live checks used the existing `portfolio-v2-dev` Supabase Free project.
The database remained schema-only after the tests: no test-prefix records were
left behind and no owner content was modified.

## Schema and dependency scope

No R5 migration or database schema change was required. No production or
development dependency was added; existing Zod, Drizzle, postgres.js, and
Vitest are sufficient.

## Explicit non-scope

```text
Rich Content: not started
Supabase Storage: not started
Media upload/URLs: not started
CMS CRUD UI: not started
Public Portfolio rendering: unchanged
Caching/revalidation: not started
Revisions/audit logs: not started
R6 work: not started
```

R4 authentication remains the separate `requireAdmin()` boundary. R5
repositories do not query Supabase Auth and do not authorize callers.

## R6 readiness

```text
READY FOR R6
```

R6 can replace the opaque JSONB content policy with canonical rich-content
types and add the StorageProvider boundary without rewriting the repository
direction established here.
