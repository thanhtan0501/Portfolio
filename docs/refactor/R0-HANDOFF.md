# R0 handoff

## Status

```text
R0: PARTIAL
```

The locally achievable freeze and repository-side containment work is complete. External key revocation, Git history rewrite, live legacy export, exact media inventory, and screenshot capture remain unavailable or require explicit external authorization/runtime access.

## Git

- Baseline SHA: `ccd5bb1903b7800791491c8064568fab764765d5`.
- V1 tag: `portfolio-v1-final`, local annotated tag at the baseline SHA; not pushed.
- V2 branch: `refactor/v2`, current working branch.
- Dirty/clean state: dirty by design. Pre-existing `.gitignore` graft rule, `.DS_Store`, `.ignore`, and untracked `docs/codebase-audit/` were preserved. R0 adds refactor docs/tooling and removes the active credential.
- No reset, clean, force-push, or remote mutation was performed.

## Security

- Credential removed from current V2 tree: yes, `gcs-credentials.json`.
- Credential file ignored: yes; credential/private-key patterns added to `.gitignore`.
- Google Cloud credential externally revoked: **not verified; EXTERNAL ACTION REQUIRED**.
- Git-history cleanup: `prepared`; historical secret remains in V1 Git history and local tag until separately authorized.
- Additional findings: public media writes/deletes are explicitly enabled; footer SVG HTML is injected; user/auth-shaped data crosses into client/persisted state. See `R0-SECURITY.md`.
- Secret values printed or copied into R0 output: no.

## Visual baseline

- Status: `blocked`.
- Routes specified: `/`, `/about`, `/projects`, `/projects/<representative-project-id>`, `/contact`, `/404`.
- Viewports specified: `375x812`, `768x1024`, `1440x1000`.
- Interaction states specified: active tab, project hover, gallery, slider, modal, contact validation/submitting, 404 initial.
- Capture blocker: no browser surface or screenshot persistence/viewport control was available without installing tooling; no screenshots are claimed.

## Legacy data

- Export: `blocked` — no local runtime dependencies or legacy DB/API credentials.
- Counts: unknown; no fabricated values.
- Sanitized fixture status: available as synthetic shape fixtures under `tests/fixtures/legacy/`; no production content is included.
- Read-only scripts: created under `scripts/legacy/`; they are not executed against a live system in R0.

## Media

- Inventory: `blocked` pending legacy export.
- Total known size: unknown.
- Storage recommendation input: not yet available; source-level facts and required fields are recorded in `R0-MEDIA-INVENTORY.md`.

## Files created

- `docs/refactor/ROADMAP_LOCK.md`
- `docs/refactor/R0-BASELINE.md`
- `docs/refactor/R0-SECURITY.md`
- `docs/refactor/R0-VISUAL-BASELINE.md`
- `docs/refactor/R0-LEGACY-DATA.md`
- `docs/refactor/R0-MEDIA-INVENTORY.md`
- `docs/refactor/R0-HANDOFF.md`
- `scripts/legacy/export-legacy.ts`
- `scripts/legacy/analyze-export.ts`
- `scripts/legacy/analyze-media.ts`
- `scripts/legacy/verify-export.ts`
- `tests/fixtures/legacy/*.json` synthetic fixtures

## Files modified

- `.gitignore` — R0 credential patterns were added; the pre-existing graft ignore rule was preserved.

## Files removed

- `gcs-credentials.json` from the active working tree only. Historical Git objects were not rewritten.

## Blockers

1. Authorized Google Cloud administrator must revoke/rotate the exposed key and review IAM/audit logs.
2. History cleanup needs explicit approval because it rewrites refs and requires coordinated remote force-push/clone refresh.
3. Legacy export needs a working, authorized Payload/MongoDB runtime or API credentials.
4. Exact visual screenshots need a browser/screenshot surface with viewport control and workspace persistence.

## R1 readiness

```text
NOT READY FOR R1
```

R1 is blocked by the unresolved compromised credential/revocation and history-remediation gates. Do not begin the V2 foundation until the external security owner records revocation/rotation and the history-cleanup decision is explicit. No R1 implementation was started.

