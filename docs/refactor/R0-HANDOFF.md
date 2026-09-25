# R0 handoff

## Status

```text
R0: PARTIAL
```

Repository-side history remediation and the GCS bucket-object inventory are complete. R0 remains partial because the Google Cloud key cannot be revoked with the available IAM permissions, the remote push is pending, CMS/Mongo content export is unavailable, and screenshot persistence is unavailable.

## Git

- Pre-purge V1 SHA: `ccd5bb1903b7800791491c8064568fab764765d5`.
- Sanitized V1 SHA: `8e969466898a6c3ec61843e5783d841c9a117ae4`.
- V1 tag: `portfolio-v1-final`, recreated as an annotated tag at the sanitized V1 SHA; remote push pending.
- V2 branch: `refactor/v2`, current working branch at `dd5f05000a99dd67e612fd6f423747156c707ba9`.
- Dirty/clean state: dirty by design. Pre-existing `.gitignore` graft rule, `.DS_Store`, `.ignore`, and untracked `docs/codebase-audit/` were preserved and restored after the rewrite.
- Offline pre-purge bundle created; no reset or clean was used. Sanitized remote push is pending.

## Security

- Credential removed from current V2 tree: yes, `gcs-credentials.json`.
- Credential file ignored: yes; credential/private-key patterns added to `.gitignore`.
- Google Cloud credential externally revoked: **blocked by missing IAM permissions; EXTERNAL ACTION REQUIRED**.
- Git-history cleanup: `completed_locally`; active local refs and recreated V1 tag no longer reach the credential filename or safe private-key indicators.
- Remote history cleanup: pending sanitized force-with-lease push.
- Additional findings: public media writes/deletes are explicitly enabled; footer SVG HTML is injected; user/auth-shaped data crosses into client/persisted state. See `R0-SECURITY.md`.
- Secret values printed or copied into R0 output: no.

## Visual baseline

- Status: `blocked`.
- Routes specified: `/`, `/about`, `/projects`, `/projects/<representative-project-id>`, `/contact`, `/404`.
- Viewports specified: `375x812`, `768x1024`, `1440x1000`.
- Interaction states specified: active tab, project hover, gallery, slider, modal, contact validation/submitting, 404 initial.
- Capture blocker: live V1 was inspected, but no browser screenshot persistence/viewport control was available; no screenshots are claimed.

## Legacy data

- Export: `blocked` — Render API timed out, Vercel API probes returned 404, and no legacy DB/API credentials were available.
- Counts: unknown; no fabricated CMS values.
- Sanitized fixture status: available as seven synthetic shape fixtures under `tests/fixtures/legacy/`; real-shape replacement is blocked.
- Read-only scripts: created under `scripts/legacy/`; they are not executed against a live system in R0.

## Media

- Inventory: `partial` — current GCS object metadata captured; Payload media relationships unavailable.
- Total known size: 13,609,139 bytes across 16 GCS objects.
- Storage recommendation: `SUITABLE` based on observed footprint, bounded by unavailable CMS records/future growth.

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

1. Authorized Google Cloud administrator must revoke/rotate the exposed key and review IAM/audit logs; current user account lacks the required IAM permissions.
2. Push sanitized `master`, `refactor/v2`, and `portfolio-v1-final` refs, then verify the remote.
3. Legacy export needs a working, authorized Payload/MongoDB runtime or API credentials.
4. Exact visual screenshots need a browser/screenshot surface with viewport control and workspace persistence.

## R1 readiness

```text
NOT READY FOR R1
```

R1 is blocked by the unresolved compromised credential/revocation and pending remote sanitization gates. CMS export and visual capture remain R0 evidence gaps. No R1 implementation was started.
