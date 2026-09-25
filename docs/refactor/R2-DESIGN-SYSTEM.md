# Portfolio V2 R2 design system

## Scope

R2 formalizes the protected Portfolio V1 visual language into typed, native React/CSS primitives. It does not build public pages, content/data models, Supabase, PostgreSQL, Drizzle, authentication, CMS, or rich editing.

The internal showcase is served at `/__design-system`. Next.js reserves leading-underscore folders as private App Router folders, so the implementation is `src/app/design-system/page.tsx` with a rewrite in `next.config.ts`. The requested URL is preserved without a private-folder collision.

## Evidence

Canonical V1: `portfolio-v1-final` -> `8e969466898a6c3ec61843e5783d841c9a117ae4`.

Direct V1 evidence: `src/app/app.css`, `tailwind.config.js`, `src/app/layout.tsx`, `src/assets/icon.tsx`, `src/styles/panda.css`, `src/styles/stars.css`, `src/app/_components/Nav/index.tsx`, `src/app/_components/TabNav/index.tsx`, `src/app/_components/Header/Description.tsx`, and `src/app/_components/Card/index.tsx`.

Supporting audit: `docs/codebase-audit/04-design-system.md`, `05-visual-identity.md`, `06-responsive-behavior.md`, `07-component-inventory.md`, `14-animation-system.md`, `17-accessibility.md`, `26-preservation-map.md`, and `27-refactor-contract.md`.

## Preserved from V1

- dark charcoal canvas and gray surface progression;
- bright-to-muted gray text hierarchy;
- blue `#2f81f7` accent/focus/link language;
- 824px feature width and approximately 86% reading width;
- Inter and the V1 fluid clamp scale;
- quiet rounded surfaces and shallow depth;
- panda logo/watermark, moon, astronaut bear, and current-color metadata icons;
- narrow, centered, mobile-first composition.

## Token mapping

| V1 source | V2 semantic token | Value / purpose |
| --- | --- | --- |
| `--gray-10` / `background` | `--color-canvas` | `#16191d`, dark charcoal canvas |
| `--gray-9` / `surface-1` | `--color-surface-1` | `#212529`, first card surface |
| `--gray-8` / `surface-2` | `--color-surface-2` | `#343a40`, elevated surface |
| `--gray-7` / `surface-3` | `--color-surface-3` | `#495057`, controls and metadata surfaces |
| `--gray-1` / `text-1` | `--color-text-primary` | `#f1f3f5`, primary text |
| `--gray-3` / `text-2` | `--color-text-secondary` | `#dee2e6`, secondary text |
| `--gray-5` / `text-3` | `--color-text-muted` | `#adb5bd`, quiet metadata |
| `--gray-6` / `text-4` | `--color-text-subtle` | `#868e96`, subdued labels |
| `brandstroke` | `--color-accent` / `--color-focus-ring` | `hsl(217.17 100% 51.57%)`, `#2f81f7` |
| `surface-alpha` | `--color-surface-overlay` | `rgb(22 25 29 / 65%)` |
| `--radius` | `--radius-lg` | `0.5rem`; V1-derived `sm`/`md` retained |
| `--width` | `--layout-feature-width` | `824px` |
| `.w-content` | `--layout-reading-ratio` | `0.86`, about `708.6px` at feature width |

The full V1 gray source scale and exact clamp values remain in `src/styles/tokens.css`. Tailwind 4 `@theme inline` aliases use the `portfolio-` prefix; CSS variables are the semantic source of truth.

## Typography

`src/app/layout.tsx` retains V1 `next/font/google` Inter loading through `--font-inter`. Exact V1 clamp steps are ported:

```text
--step--2: clamp(0.69rem, calc(0.66rem + 0.18vw), 0.8rem)
--step--1: clamp(0.83rem, calc(0.78rem + 0.29vw), 1rem)
--step-0:  clamp(1rem, calc(0.91rem + 0.43vw), 1.25rem)
--step-1:  clamp(1.2rem, calc(1.07rem + 0.63vw), 1.56rem)
--step-2:  clamp(1.44rem, calc(1.26rem + 0.89vw), 1.95rem)
--step-3:  clamp(1.73rem, calc(1.48rem + 1.24vw), 2.44rem)
--step-4:  clamp(2.07rem, calc(1.73rem + 1.7vw), 3.05rem)
--step-5:  clamp(2.49rem, calc(2.03rem + 2.31vw), 3.82rem)
--step-6: clamp(2.99rem, calc(2.37rem + 3.1vw), 4.77rem)
--step-7: clamp(3.58rem, calc(2.76rem + 4.13vw), 5.96rem)
--step-8: clamp(4.3rem, calc(3.2rem + 5.48vw), 7.45rem)
--step-9: clamp(5.16rem, calc(3.72rem + 7.22vw), 9.31rem)
```

Semantic roles are `type-display`, `type-title`, `type-heading`, `type-subheading`, `type-body`, `type-small`, `type-meta`, `type-caption`, and `type-code` in `src/styles/typography.css`.

## Layout and responsive contract

`FeatureContainer` and `ReadingContainer` centralize the 824px/86% V1 contract. They are centered and width-safe on mobile. The system remains mobile-first, narrow, single-column, and compatible with horizontally scrolling future tabs. The V1 custom `2xl = 1400px` breakpoint is not reintroduced because no R2 primitive needs it.

## Primitive inventory

- `Surface`: default, elevated, and interactive roles.
- `Button`: native semantics, disabled state, variants, focus-visible styling.
- `IconButton`: requires an API-level accessible `label`.
- `Link`: internal Next link or explicit external anchor; never opens a new tab implicitly.
- `Badge`: restrained rounded technology/tag surface.
- `Avatar`: generic Next Image or typed fallback.
- `Dialog`: native `<dialog>`, Escape/cancel, backdrop click, focus return, title/description, scroll-safe content.
- `Spinner`: instance-safe status indicator with visually hidden label.
- `VisuallyHidden`: accessible-only content helper.

No external UI kit, class composition dependency, or variant library was added.

## Brand and icon strategy

Exact V1 SVG functions from `src/assets/icon.tsx` were split into tree-shakeable modules: `PandaLogo` from `LogoIcon1`, `PandaWatermark` as a behavior wrapper, `Moon` from `MoonIcon`, and `AstroBear` from `AstroBearIcon`. Calendar, GitHub, link, and location icons are independent modules. They use `currentColor` where the V1 icon was color-driven and default to decorative `aria-hidden` semantics. Intrinsic illustration colors remain inside brand artwork because they are part of the protected SVGs.

## Motion and accessibility

`src/styles/motion.css` defines fast/normal/slow durations and easing curves. Decorative animation and spinner motion are reduced under `prefers-reduced-motion: reduce`; interactive feedback remains visible. R2 also adds a consistent focus-visible accent ring, selectable content, native controls, named icon buttons, semantic dialog behavior, assistive status text, and no global loader ID. V1’s global `user-select: none` is intentionally not carried over.

## Intentional differences and limitations

- V1 Tailwind v3 aliases are replaced by Tailwind 4 CSS-first tokens.
- Unused/incoherent template tokens are not carried forward.
- MUI modal, GSAP random utility, and global spinner ID are replaced with native/CSS foundations.
- Negative-z-index panda behavior is replaced by a pointer-transparent fixed watermark that can be mounted below a controlled content layer.
- The showcase is noindexed and is not a public Portfolio composition.
- Browser screenshot capture was attempted but no browser connector was available; no screenshot artifacts are claimed. Build and HTTP smoke checks passed.
- Remote avatar hosts need explicit Next image configuration when a future data phase supplies real media URLs.
- The dialog is a focused primitive, not a full media viewer.
