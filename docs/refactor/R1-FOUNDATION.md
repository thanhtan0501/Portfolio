# R1 foundation

## Status

R1 is the current phase. The implementation commit is `feda2c7` (`chore(v2): replace legacy runtime with Next.js 16 foundation`).

R1 establishes a minimal, reproducible Next.js App Router runtime. It intentionally does not implement the public Portfolio, design system, data layer, authentication, CMS, or legacy migration.

## Selected versions

| Area | Exact version/policy |
|---|---|
| Node.js | `24.19.0` locally; `.nvmrc` contains `24`; package engine is `>=24.0.0 <25` |
| pnpm | `11.1.0`, pinned by `packageManager` |
| Next.js | `16.3.6`, Active LTS at selection time |
| React / React DOM | `19.3.0` |
| TypeScript | `5.9.3` |
| Tailwind CSS | `4.3.3` |
| Zod | `4.3.3` |
| ESLint | `9.39.5`, compatible with the selected Next ESLint config |
| eslint-config-next | `16.3.6` |
| Vitest | `5.0.1` |
| Prettier | `3.9.9` |
| PostCSS | `8.5.28` |

All package versions are exact in `package.json` and resolved in `pnpm-lock.yaml`. No dependency uses the `latest` range.

## Project structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
└── lib/
    ├── env/
    │   ├── shared.test.ts
    │   └── shared.ts
    └── site/
        └── config.ts
```

The root layout is a Server Component with `lang="en"`, metadata, a semantic body, and no client provider. The home page and not-found page are deliberately minimal foundation proofs.

## Runtime model

The runtime is the standard Next server only:

```text
next dev
next build
next start
```

There is no Express entrypoint, custom Node server, Payload bootstrap, database connection, CMS route, client state provider, or public API integration. Next 16 uses Turbopack through its normal defaults. `next.config.ts` contains only `reactStrictMode`, `typedRoutes`, and `agentRules: false` to prevent Next from generating forbidden project-local agent instruction files.

## Package policy

Production dependencies are limited to `next`, `react`, `react-dom`, and `zod`. Build/tooling dependencies provide Tailwind 4 PostCSS integration, strict TypeScript, ESLint, Prettier, and Vitest. No Supabase, Drizzle, database, auth, CMS, rich-editor, email, state-management, UI-kit, animation, or media packages are installed.

`pnpm-workspace.yaml` allowlists the `unrs-resolver` postinstall because pnpm 11 otherwise blocks the native resolver build. This is the only dependency build script permitted by the current install.

## TypeScript policy

`tsconfig.json` enables strict mode, `noUncheckedIndexedAccess`, `noFallthroughCasesInSwitch`, and `noImplicitOverride`. JavaScript is disabled, module resolution uses the bundler strategy, and `@/*` maps to `src/*`. No new application-level `any`, `@ts-ignore`, or `@ts-expect-error` was introduced.

## Styling foundation

`src/app/globals.css` imports Tailwind 4 through `@import 'tailwindcss'` and contains only box sizing, body baseline, fallback colors, and system typography. `postcss.config.mjs` uses the official `@tailwindcss/postcss` plugin. V1 tokens, color hierarchy, typography scale, panda/space visuals, galleries, and animations were intentionally removed from active runtime code; R2 owns their formal reconstruction.

## Environment pattern

`.env.example` contains only `NEXT_PUBLIC_SITE_URL`. `src/lib/env/shared.ts` validates it with Zod and defaults to `http://localhost:3000` for local/build viability when no `.env.local` exists. No future Supabase, database, auth, email, or storage variables were reserved.

`src/lib/site/config.ts` contains only foundation metadata: name, description, and URL. It does not contain profile, project, social, technology, or CMS content.

## Testing and quality

Vitest runs three meaningful environment-parser tests covering the default, valid override, and invalid URL cases. ESLint uses the current flat configuration with `eslint-config-next` and direct CLI execution. Prettier is deterministic and ignores generated/legacy documentation artifacts.

The quality command is:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm format:check && pnpm build
```

## Legacy removals

R1 removed the active Payload/Mongo/Express foundation, including Payload config/types/collections/globals, custom servers, cloud-storage mocks, Redux/redux-persist, V1 routes/components/styles, legacy scripts, the Payload starter config, GitHub Pages workflow, old Tailwind v3 config, and the old package dependency graph. `tests/fixtures/legacy/`, `docs/codebase-audit/`, and `docs/refactor/` remain as evidence/reference artifacts. The existing public favicon is retained as a harmless static file but is not imported by the foundation.

No `legacy/` source folder was created and no V1 source tree was copied into V2. V1 remains available through `portfolio-v1-final`; see `V1-REFERENCE.md`.

## Intentional R1 limitations

- The public Portfolio UI is not rebuilt.
- No design tokens or V1 visual styles are active.
- No database, Supabase, Drizzle, authentication, CMS, rich text, media, contact, or content migration exists.
- Legacy content recovery remains optional and is not required for any V2 phase.
- The unresolved historical GCP-key revocation remains documented as an external residual security item; V2 has no GCS dependency.

## Why the foundation is intentionally small

- No custom Express server: Next's supported runtime is sufficient for the empty foundation and avoids the V1 process coupling.
- No client state library: no mutable cross-route application state exists yet.
- No database or CMS: R3-R7 own data/content architecture after the foundation is stable.
- No design migration: R2/R8 own visual reconstruction against the V1 tag and audit.
