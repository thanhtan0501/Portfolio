# Portfolio V2

Portfolio V2 is a deliberate rebuild of a personal developer portfolio.

## Current status

Current refactor phase: **R1 — Next.js 16 clean foundation**.

The active branch contains only the foundation runtime. The V1 visual system and content behavior remain available through the `portfolio-v1-final` Git tag and the audit in `docs/codebase-audit/`.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS 4
- Zod environment validation
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
pnpm check
```

## Roadmap

The locked roadmap and phase handoffs are in [`docs/refactor/`](docs/refactor/). R2 owns design-system formalization; R1 intentionally does not rebuild the public Portfolio UI.
