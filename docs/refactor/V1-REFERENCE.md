# Portfolio V1 canonical reference

## Canonical source

`portfolio-v1-final` is the sanitized annotated Git tag for the last Portfolio V1 source baseline. Its commit target is:

```text
8e969466898a6c3ec61843e5783d841c9a117ae4
```

The tag and `docs/codebase-audit/` are the canonical reference for V1 implementation, visual identity, responsive behavior, and business-visible behavior. V2 does not copy the V1 source tree into a `legacy/` directory.

## Retrieval examples

```bash
git show portfolio-v1-final:src/app/app.css
git show portfolio-v1-final:tailwind.config.js
git show portfolio-v1-final:src/assets/icon.tsx
git show portfolio-v1-final:src/app/_components/Card/index.tsx
```

## Audit references

- `docs/codebase-audit/04-design-system.md`
- `docs/codebase-audit/05-visual-identity.md`
- `docs/codebase-audit/06-responsive-behavior.md`
- `docs/codebase-audit/07-component-inventory.md`
- `docs/codebase-audit/26-preservation-map.md`
- `docs/codebase-audit/27-refactor-contract.md`

## R1 boundary

R1 removes the V1 runtime from the active branch and creates a minimal Next.js 16 foundation. R2/R8 may retrieve the V1 tag when reconstructing the protected visual language; R1 does not port V1 design tokens, components, assets, content, or runtime dependencies.
