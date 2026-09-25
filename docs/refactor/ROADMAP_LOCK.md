# Portfolio V2 roadmap lock

Status: R2 CURRENT
R0 status: CLOSED_WITH_ACCEPTED_EXTERNAL_LIMITATIONS
Scope of this run: R2 only

## Locked roadmap

```text
R0  Freeze V1 + Security + Baseline                         CLOSED
R1  Next.js 16 clean foundation                            CLOSED
R2  Design System formalization                            CURRENT
R3  Supabase PostgreSQL + Drizzle
R4  Supabase Auth + Custom CMS shell
R5  Application/domain/data boundaries
R6  Rich Content + Media infrastructure
R7  Full Custom CMS
R8  Public Portfolio rewrite with visual parity
R9  Fresh Content Bootstrap + Optional Legacy Recovery
R10 Contact + Security hardening
R11 SEO + Accessibility + Performance
R12 Testing + CI/CD
R13 Production cutover + legacy removal
R14 Portfolio product/content evolution
```

## Locked final technology direction

```text
Next.js 16
React 19
TypeScript strict
Tailwind CSS 4
PostgreSQL/Supabase
Drizzle ORM
Supabase Auth
Supabase Storage
Custom CMS
Zod
Lexical-based content editor
Resend
Vitest
Testing Library
Playwright
GitHub Actions
pnpm
```

The final direction is context only during R0. No part of it is implemented here.

Architecture changes require explicit approval. In particular, R0 does not upgrade Next, install new architecture dependencies, change Payload architecture, migrate MongoDB, introduce Supabase/PostgreSQL/Drizzle/Auth/Storage, replace Redux, replace EmailJS, or redesign public UI.

## R0 closure and fresh-start amendment

The owner approved Portfolio V2 as a deliberate fresh rebuild. Legacy MongoDB, Payload, GCS, and the old production API are optional recovery inputs only and are not dependencies of Portfolio V2. No R1-R13 phase may depend on the unavailable legacy infrastructure.

```text
Legacy DB/cloud recovery: OPTIONAL
Legacy content migration: OPTIONAL ONLY
Legacy visual screenshots: NO LONGER A HARD R1 GATE
Canonical V1 source reference: portfolio-v1-final
Canonical current-state documentation: docs/codebase-audit/
```

```text
R0-R13 = refactor/re-platform
R14 = intentional portfolio evolution
```

## Protected V1 behavior

The dark charcoal/gray hierarchy, narrow centered composition, panda logo/watermark, fluid typography, rounded surfaces, profile header, tab rhythm, feed/project cards, CMS content concepts, collage/slider/gallery modes, image modal, media support, contact scene, and playful 404 remain protected throughout the roadmap.
