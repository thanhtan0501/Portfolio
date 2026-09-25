# R0 legacy media inventory

## Status

```text
media_inventory_status: blocked
```

No legacy database/API credentials or installed application dependencies were available in the inspected workspace. No media was downloaded and no live storage API was queried.

## Exact fields to collect when export access is available

The read-only inventory should derive values from `.legacy-export/media.json` and report:

```text
total media records
total known bytes
MIME breakdown
image count
video count
audio count
PDF count
missing URL count
broken/unresolvable record count
largest objects
legacy storage hosts
```

`known` means a numeric `filesize` exists in an exported record. `unknown` means the field is absent or null. `estimated` must not be used unless an external measurement is explicitly recorded. R0 contains no fabricated counts, byte totals, or host totals.

## Inventory tooling

Run after a sanitized export exists:

```bash
npx ts-node scripts/legacy/analyze-media.ts
```

The script reads metadata only; it does not download or probe each media URL.

## Storage inputs already known from source

- Payload media and codes use a GCS adapter configuration.
- Static URL is hard-coded to the `portfolio-database-bucket` hostname in collection config.
- Local storage is not disabled.
- UI uses GCS/remote URLs through custom/unoptimized image paths and raw media elements.
- `path.resolve(__dirname, '/media')` and `/codes` are absolute root paths, not project-relative paths.

These are implementation facts, not a recommendation to migrate storage in R0.

