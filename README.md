# Portfolio V2

Portfolio V2 is a deliberate rebuild of a personal developer portfolio.

## Current status

Current refactor phase: **R4 — Supabase Auth + secure CMS shell**.

The active branch contains only the foundation runtime. The V1 visual system and content behavior remain available through the `portfolio-v1-final` Git tag and the audit in `docs/codebase-audit/`.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS 4
- Zod environment validation
- Drizzle ORM + postgres.js
- Supabase Auth SSR
- pnpm

Legacy Payload, MongoDB, Express, Redux, GCS, and EmailJS infrastructure is not part of the V2 foundation.

## Requirements

- Node.js 24 LTS
- pnpm version declared by `packageManager` in `package.json`

## Local setup

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

## Commands

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm test
pnpm format:check
pnpm db:generate
pnpm db:check
pnpm db:migrate
pnpm db:ping
pnpm db:verify
pnpm auth:verify
pnpm check
```

Database commands require the server-only `DATABASE_URL` and
`DATABASE_MIGRATION_URL` values from `.env.example`. Auth requires the public
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` values.
The temporary-credential-only `pnpm auth:verify` command is for live R4
verification and is not needed for ordinary development. R4 has no
database-backed Portfolio pages yet, so ordinary builds remain offline-safe.

The server-only Auth boundary uses Supabase SSR cookies and authoritative
`getUser()` validation against `portfolio.admin_users`. Visit
`http://localhost:3000/admin/login` only with an account explicitly provisioned
as an active admin; public signup is disabled.

## Roadmap

The locked roadmap and phase handoffs are in [`docs/refactor/`](docs/refactor/). R4 defines Auth, authorization, and the CMS shell only; content CRUD, Storage, rich editing, repositories, and public Portfolio data rendering belong to later phases.
