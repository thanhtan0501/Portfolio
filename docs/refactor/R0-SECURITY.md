# R0 security containment

## Incident summary

`gcs-credentials.json` was a tracked Google Cloud service-account JSON file. Secret-safe inspection confirmed that it is a `service_account` credential containing a PEM-looking `private_key`, `client_email`, and project metadata. The secret value is not reproduced here.

Treat the credential as compromised because it was committed to Git history and the repository has a configured remote.

Affected file: `gcs-credentials.json`

Historical introduction: commit `c0318725c06e186cee1482abfc077f674accc38b`

Active-tree status: removed from `refactor/v2`
Current V2 ignore status: credential patterns added to `.gitignore`

## External action required

**EXTERNAL ACTION REQUIRED — not performed or verified in this R0 run.**

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
history_cleanup_status: prepared
remote_history_rewritten: no
force_push: no
```

Deleting the file from the working tree does not remove it from `portfolio-v1-final`, `master`, `origin/master`, or prior Git objects. The local tag intentionally preserves the V1 recovery point, so it also preserves the compromised historical commit until an authorized history procedure is approved.

## Preferred history-cleaning procedure

Do not run this procedure against the shared checkout or remote without explicit authorization. Make an offline mirror backup first.

```bash
git clone --mirror git@github.com:thanhtan0501/Portfolio.git Portfolio-history-cleanup.git
cd Portfolio-history-cleanup.git
git bundle create ../portfolio-before-history-cleanup.bundle --all
git filter-repo --path gcs-credentials.json --invert-paths
git fsck --full --no-reflogs
git log --all -- gcs-credentials.json
git push --force --all origin
git push --force --tags origin
```

The exact remote/tag policy must be approved before the force-push step. Afterward, all clones and CI credentials must be refreshed, and the provider key must still be independently verified as revoked. If the local V1 tag must remain as a forensic reference, preserve it outside the cleaned remote namespace rather than re-publishing a tag that points to the secret-containing history.

## Additional findings

- `.env` is ignored and no `.env` file was present during the inspected run.
- `NEXT_PUBLIC_DATA_API_URL` is a browser-visible configuration value; it is not a secret but is undocumented in `.env.example`.
- EmailJS service/template/public-key values are client-visible by design, but the contact flow lacks anti-spam controls.
- `Footer` injects CMS-provided SVG code with `dangerouslySetInnerHTML`; this remains a separate stored-XSS risk.
- `Media` explicitly permits public read/create/update/delete in `src/collections/Media.ts`; this requires live unauthenticated access verification.
