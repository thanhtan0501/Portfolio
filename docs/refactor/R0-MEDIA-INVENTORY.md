# R0 legacy media inventory

## Status

```text
media_inventory_status: partial
```

The Payload/Mongo media-record export remains unavailable, but the configured GCS bucket was queried for object metadata without downloading media. This produces a complete current bucket-object inventory, not a complete Payload relationship inventory.

## Observed GCS object inventory

Source: `gs://portfolio-database-bucket`, queried `2026-09-25` via `gcloud storage ls --recursive --long` and the public GCS JSON metadata endpoint. No object bodies were downloaded.

| Measure | Observed value |
|---|---:|
| Payload media records | unknown |
| GCS objects | 16 |
| Known bytes | 13,609,139 bytes (12.98 MiB) |
| Image objects | 15 |
| Video objects | 0 |
| Audio objects | 0 |
| PDF objects | 0 |
| HTML objects | 1 (`index.html`) |
| Missing URL count in Payload records | unknown |
| Broken/unresolvable Payload records | unknown |
| Duplicate object names | 0 observed |
| Duplicate Payload URLs | unknown |
| Storage host/bucket | `storage.googleapis.com` / `portfolio-database-bucket` |
| Legacy path pattern | flat bucket root; no prefix observed |

### MIME distribution

| MIME | Count | Bytes |
|---|---:|---:|
| `image/png` | 6 | 6,369,455 |
| `image/jpeg` | 9 | 7,225,796 |
| `text/html` | 1 | 13,888 |

### Largest observed objects

```text
2,423,271  image/png   --project-pinterest.png
2,180,984  image/jpeg  avatar.jpg
1,503,620  image/png   --project-commerce-1.png
1,079,204  image/png   --project-pinterest-2.png
942,524    image/jpeg  z5197556691385_7324da6c7767715f12ff83b31d88b8fa.jpg
801,179    image/jpeg  z5197555902045_f93d04c8b2bec0891154a510b28b43c9.jpg
793,010    image/png   picrew.png
729,123    image/jpeg  about-image.jpg
710,038    image/jpeg  z5197556188307_2609f80b1327a279d05188575ba61632.jpg
607,730    image/jpeg  1.jpg
```

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

## Supabase Storage suitability

```text
SUITABLE
```

The observed bucket footprint is only 13.61 MB across 16 objects, with no observed video/audio/PDF objects. This conclusion is bounded by the unavailable Payload media-record export and does not account for future growth, versioning, or unlisted private objects.
