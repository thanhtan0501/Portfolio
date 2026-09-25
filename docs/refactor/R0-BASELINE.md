# R0 V1 baseline

## Git baseline

| Item | Value |
|---|---|
| Audited V1 commit before purge | `ccd5bb1903b7800791491c8064568fab764765d5` |
| Sanitized V1 commit | `8e969466898a6c3ec61843e5783d841c9a117ae4` |
| Baseline branch at start | `master` |
| V1 tag | `portfolio-v1-final` annotated tag recreated at the sanitized V1 commit |
| R0 working branch | `refactor/v2` at `dd5f05000a99dd67e612fd6f423747156c707ba9` |
| Remote | `origin` → `git@github.com:thanhtan0501/Portfolio.git` |
| Push performed during R0 finalization | Yes; sanitized `master` force-with-lease, `refactor/v2`, and `portfolio-v1-final` were synchronized and fetched back for verification |
| Destructive reset/clean | No; history purge used `git-filter-repo` after an offline bundle and stash preservation |

The working tree was not clean at R0 start. Pre-existing changes were preserved: `.gitignore` already contained an uncommitted `/graft/` ignore rule, `.DS_Store` and `.ignore` were untracked, and the previous `docs/codebase-audit/` deliverable was untracked. R0 changes are documented separately; these files were not discarded.

## Package/runtime metadata

- Package name: `payload-example-custom-server`.
- Package manager state: `package.json` is present; no `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml` is present.
- `node_modules` was absent during inspection; dependencies were not installed.
- Node version is not pinned by `.nvmrc`, `engines`, or a version manager file.
- Next: `^14.1.0`.
- React/React DOM: `^18.2.0`.
- TypeScript: `^5.3.3`.
- Payload: `latest`.
- Payload Mongo adapter/bundler/rich-text packages: partly `latest`.
- Express: `^4.17.1`.

## Current routes

```text
/
/about
/projects
/projects/[projectId]
/contact
/admin (Payload admin)
```

## CMS definitions

Collections: `users`, `media`, `projects`, `pages`, `codes`, `feeds`.

Global: `footer`.

## External providers

- MongoDB through `DATABASE_URI`.
- Google Cloud Storage through Payload cloud storage and `GCS_*` settings.
- EmailJS browser delivery for contact.
- Rest Countries browser request in the Payload location field.
- Vercel/Render/GCS hostnames appear in Next image/CORS configuration; live ownership is not established.

## Deployment evidence

The intended application scripts build Payload, compile the custom server, copy assets, and run `dist/server.js`. The committed GitHub Actions workflow instead runs `next build` and uploads `./out` for GitHub Pages. No current lockfile exists for its `npm ci` path. This mismatch is recorded, not repaired, in R0.

## Known build blockers recorded from audit

1. No committed package lock while CI uses `npm ci`.
2. `date-fns` is imported by `src/app/_components/FormatDate.tsx` but absent from `package.json`.
3. Payload packages use `latest`, so installs are not reproducible.
4. CI/static Pages assumptions conflict with the custom Express/Payload runtime and package build scripts.
5. `NEXT_PUBLIC_DATA_API_URL` and `NEXT_PUBLIC_SERVER_URL` are used but absent from `.env.example`.

R0 does not install dependencies or repair these blockers. They belong to R1.

## Source of truth

- V1 source: tag/commit above.
- Current-state audit: `docs/codebase-audit/`.
- R0 lock and handoff: `docs/refactor/`.
