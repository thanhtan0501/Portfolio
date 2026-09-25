# Portfolio V2

Portfolio V2 is a deliberate rebuild of a personal developer portfolio.

## Current status

Current refactor phase: **R3 — Supabase PostgreSQL + Drizzle data foundation**.

The active branch contains only the foundation runtime. The V1 visual system and content behavior remain available through the `portfolio-v1-final` Git tag and the audit in `docs/codebase-audit/`.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS 4
- Zod environment validation
- Drizzle ORM + postgres.js
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
pnpm check
```

Database commands require the server-only `DATABASE_URL` and
`DATABASE_MIGRATION_URL` values from `.env.example`. R3 has no database-backed
pages yet, so ordinary builds remain offline-safe.

## Roadmap

The locked roadmap and phase handoffs are in [`docs/refactor/`](docs/refactor/). R3 defines the database foundation only; authentication, CMS, storage, and public Portfolio data rendering belong to later phases.
