# R0 legacy data contract

## Status

```text
legacy_export_status: blocked
```

The export design and read-only tooling are present, but a live Payload/MongoDB connection was unavailable. No production content was exported and no credentials were changed.

## V1 → future V2 meaning

| V1 concept | Future migration meaning |
|---|---|
| `Users` first/public profile | `site_profile` |
| `Pages` / About | `pages` |
| `Projects` | `projects` |
| `Feeds` | `posts` |
| `Media` | `media` |
| `Codes` / Banner | profile/banner media concept |
| `Footer` global | `footer_links` |
| static `Technologies` config | `technologies` |
| `relatedProjects` relationship | project relationship edges |

R3 owns the future database implementation. This document records meaning only; it does not define SQL tables or migrations.

## Payload/Slate-specific shapes

- `description`, `detail`, `richText`, and feed `detail` are Payload Slate JSON arrays.
- Upload nodes contain Payload media objects under `value` and may carry `url`, `mimeType`, `description`, and dimensions.
- Project/feed image arrays contain rows shaped like `{ image: Media, id? }`.
- Relationships may be IDs or depth-expanded objects depending on request depth.
- `relatedProjects` is a self-relationship and must preserve graph edges without assuming depth-expanded payloads are canonical.
- Feed `custom` is a radio string: `0` Default, `1` Slides, `2` Gallery.

## Identifier and relationship migration inputs

- Preserve every Mongo/Payload `id` as `legacy_id` in the migration input.
- User avatar references `media`; user banner references `codes`.
- Project/feed embedded image rows reference `media`.
- Project `relatedProjects` references other project IDs or expanded objects.
- Footer is a singleton global with an array of social items.
- Pages/About and Users/Profile are consumed as first records today; export must preserve all records so an explicit singleton decision can be made later.

## Public export allowlist

`export-legacy.ts` intentionally excludes auth fields and private operational fields. User exports include only public profile fields: `id`, `name`, `description`, `birthday`, `location`, `avatar`, `code`, and timestamps. Passwords, hashes, salts, reset tokens, login state, emails, and secrets are not exported.

Other collections are filtered to content/media fields only. Export metadata contains counts and timestamps, never environment values or credential material.

## Unknowns requiring investigation

- actual document counts and current content;
- current first-user/first-page records;
- whether drafts are present and how they are exposed by current REST queries;
- exact Slate node variants in production;
- broken or expired GCS URLs;
- media object sizes and storage hosts;
- whether any legacy content contains private personal information requiring fixture redaction.
