# R0 security containment

## Incident summary

`gcs-credentials.json` was a tracked Google Cloud service-account JSON file. Secret-safe inspection confirmed that it is a `service_account` credential containing a PEM-looking `private_key`, `client_email`, and project metadata. The secret value is not reproduced here.

Treat the credential as compromised because it was committed to Git history and the repository has a configured remote.

Safe metadata recovered from the historical JSON: project `portfolio-413003`, service account `portfolio-cloud-storage@portfolio-413003.iam.gserviceaccount.com`, and compromised key ID `05ef08102e2ba75e2d594b3ae4b5b545c930be3c`. No private-key material is reproduced.

Affected file: `gcs-credentials.json`

Historical introduction: commit `c0318725c06e186cee1482abfc077f674accc38b`

Active-tree status: removed from `refactor/v2`
Current V2 ignore status: credential patterns added to `.gitignore`

## External action status

`GCP_KEY_REVOCATION=BLOCKED_EXTERNAL_AUTH`

The configured `gcloud` account was authenticated as `bttthanh0501@gmail.com`, but it lacked `iam.serviceAccountKeys.list`, `iam.serviceAccountKeys.delete`, project IAM-policy access, and Cloud Logging read access. A direct delete attempt for the exact compromised key was denied. The key is therefore **not revoked or verified revoked**.

**SECURITY EXTERNAL ACTION REQUIRED.**

An authorized Google Cloud administrator must:

1. identify the service account from the credential metadata without pasting it into source control;
2. disable/revoke the exposed key immediately;
3. issue a new key only if key-based auth is still required, preferably replacing file-based credentials with the deployment provider’s secret manager/workload identity;
4. review IAM bindings and remove permissions not required for the portfolio’s media/code bucket;
5. verify bucket-level and object-level public access policy;
6. review Cloud Audit Logs from the first commit date through the revocation time for unexpected token use, object reads, writes, deletes, ACL changes, and IAM changes;
7. record the provider-side incident/change ID outside this repository.

Do not mark the key revoked until the administrator verifies the provider state.

## IAM review checklist

- [ ] service account identity confirmed;
- [ ] exposed key disabled/deleted;
- [ ] active replacement credential uses least privilege;
- [ ] bucket access limited to required media/code operations;
- [ ] no project-owner/editor role assigned to the runtime account;
- [ ] public reads are intentional and writes/deletes are not public;
- [ ] service account user/token-creator grants reviewed;
- [ ] audit log review completed and retained.

## Repository/history status

```text
active_credential_removed: yes
credential_patterns_ignored: yes
secret_values_exposed_in_R0_docs_or_output: no
external_cloud_revocation: not_verified
history_cleanup_status: completed_locally
remote_history_rewritten: yes
force_push: yes (master used force-with-lease)
```

The local history purge removed `gcs-credentials.json` from all active local branches, the recreated `portfolio-v1-final` tag, and the rewritten safety stash. The old audited V1 SHA was `ccd5bb1903b7800791491c8064568fab764765d5`; the sanitized V1 SHA is `8e969466898a6c3ec61843e5783d841c9a117ae4`. An offline pre-purge bundle was created before rewriting. The configured remote still requires the authorized sanitized push.

## History-cleaning result and verification

The authorized local procedure completed with `git-filter-repo --path gcs-credentials.json --invert-paths` after creating an offline bundle and preserving the dirty user-owned files in a stash. The stash was restored and dropped after rewriting.

```bash
git log --all -- gcs-credentials.json                  # no output
git rev-list --objects --all                           # no credential path
git grep -I -l -E 'BEGIN PRIVATE KEY|"private_key"[[:space:]]*:|"type"[[:space:]]*:[[:space:]]*"service_account"' $(git rev-list --all) -- .
git fsck --full --no-reflogs
```

The reachable-history indicator scan returned no matches locally and after fetching the rewritten remote refs. `gitleaks` and `trufflehog` were not installed, so no third-party scanner was run. All other clones and CI credentials must be refreshed after the history rewrite.

## Additional findings

- `.env` is ignored and no `.env` file was present during the inspected run.
- `NEXT_PUBLIC_DATA_API_URL` is a browser-visible configuration value; it is not a secret but is undocumented in `.env.example`.
- EmailJS service/template/public-key values are client-visible by design, but the contact flow lacks anti-spam controls.
- `Footer` injects CMS-provided SVG code with `dangerouslySetInnerHTML`; this remains a separate stored-XSS risk.
- `Media` explicitly permits public read/create/update/delete in `src/collections/Media.ts`; this requires live unauthenticated access verification.
- `gcloud storage ls --recursive --long gs://portfolio-database-bucket` succeeded for object metadata, but this does not prove the compromised service-account key is revoked.
