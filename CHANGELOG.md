# Changelog

All notable changes to **FieldScribe** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/);
versioning follows [SemVer](https://semver.org/) (see `VERSIONING.md`).

## [Unreleased]

Work toward **v2.0.0 — Modular, ENA-native FieldScribe**. See
`releases/v2.0.0.md` for the full roadmap. In brief:

### Unified specimen flow (latest)
- Collapsed the separate single-specimen and population paths into **one
  "Specimen sampling" flow** (path picker is now just *Specimen sampling* +
  *eDNA / environmental* [coming soon]). "Pooled" removed entirely.
- **Two-level model: individuals → tubes.** A shared species + collection-event
  block, then 1..N individuals (each its own SPECIMEN_ID, sex, life stage), each
  split into 1..N tubes (tube ID, collector sample ID, organism part, purpose).
  A single reference-genome specimen = one individual with many tubes; a
  population = many individuals with one tube each.
- **Purpose-routed manifest export** (one row per tube): `REFERENCE_GENOME`
  (incl. Hi-C) rows → `fieldscribe-ERGA-DToL-manifest-<date>.csv`; all other
  purposes → `fieldscribe-PopGenomics-manifest-<date>.csv` (José's BGE-ERGA
  PopGenomics manifest). Identical 91-column header; only non-empty classes
  download.
- **Taxonomy auto-lookup**: typing a scientific name fetches the NCBI `TAXON_ID`
  (+ common name) from the ENA taxonomy REST and the ranked lineage
  (phylum, class, order, family, genus) from GBIF, filling only empty fields
  (manual edits never clobbered). Online-only with graceful offline/failure
  fallback. (Backlog #11.)
- **Field-friendly locations**: type location levels with a slash
  ("Sweden / Uppsala / Fyrisån"); converted to the manifest's required pipes on
  export. Added a **collection / institution name** field for zoo/garden/culture
  specimens, appended to `COLLECTION_LOCATION`.

### Branding, wording & field UX (latest)
- Applied the **SciLifeLab visual identity** (ported from the repo v2.0.0): teal /
  lime / grape palette, branded header logo, a partner footer (SciLifeLab,
  Uppsala University, ERGA, BGE+, EU "Co-funded by"), and Lato / Lora fonts.
- Footer now credits the app as *"an original contribution of the Planetary
  Biology Strategic Area at SciLifeLab."*
- Header tagline changed to **"Field sample metadata, made easy"** (no longer
  Planetary-Biology/ERGA-specific — the app outgrew that).
- **Camera barcode scanning on the Sample ID** across all paths (specimen Base
  ID and eDNA sample alias; the tube barcode already scanned).
- Reliable CSS hover tooltips on info icons (replaced the flaky native `title`);
  ENVO field tips are now field-specific with an example term.

### Hosting + wording (latest)
- Renamed the specimen "Save session" button to **"Save specimen"** and added a note
  clarifying data is stored in the browser on the device (nothing sent to a server);
  export generates the submission files. (Save ≠ export.)
- Added **SciLifeLab Serve packaging**: `Dockerfile` (nginx-unprivileged, runs as
  uid 1000, listens on 8080), `nginx.conf`, `start-script.sh`, `.dockerignore`, and
  `SERVE_DEPLOY.md`. Static image, no backend; Serve storage = None.

### eDNA — 10 ENA environments (latest)
- Expanded the eDNA path from 2 to **10 environments**, each mapped to its live
  ENA checklist with exact field labels, units, mandatory flags and controlled
  vocabularies (pulled from ENA): **Water** (ERC000024), **Soil** (ERC000022),
  **Sediment** (ERC000021), **Air** (ERC000012), **Microbial biofilm**
  (ERC000019), **Plant associated** (ERC000020), **Wastewater sludge**
  (ERC000023), **Miscellaneous environment** (ERC000025), **Marine microalgae**
  (ERC000043), **Ancient DNA / sedaDNA** (ERC000059).
- Environment picker (dropdown, grouped: GSC MIxS environmental + specialised);
  each field carries an explicit on-site / desk-lab **stage** so the form shows
  only field-relevant items on site and defers the rest. Configs in
  `schema/mixs-*.json`.
- Reconciled the earlier water/soil "curated guesses" to the exact ENA fields —
  the ENA TSV now validates cleanly, per checklist.

### eDNA / environmental path
- Activated the **eDNA path** with a **Water / Soil** environment toggle. Form is
  driven by curated MIxS configs (`schema/mixs-water.json`, `schema/mixs-soil.json`):
  mandatory + field-only-essential fields under **Capture on site**, sequencing/
  desk fields under **Add later**, optional measurements collapsed.
- ENVO context fields use a suggestion datalist; metagenome `tax_id` look-up via
  ENA; GPS/date reused from the specimen flow. Flat samples (one filter = one
  record), no specimen→tube nesting.
- **Export → ENA TSV** per environment (`Checklist` / field-name / `#units` rows
  then samples), one file per environment present. Specimen ERGA/PopGenomics/BOLD
  exports unaffected.

### Planned — Added
- **Path picker on open**: choose a workflow rather than one flat form.
- **Specimen → tube data model**: enter specimen-level metadata once, then add
  1..N tubes; each tube carries its own tube ID, collector sample ID, organism
  part, and intended application.
- **Optional later-stage modules**, fillable by different people at different
  times against a shared sample: *preservation*, *wet lab*, *vouchering*,
  *sequencing*.
- **Inline guidance** drawn from the ERGA SOP (tooltips, smart defaults,
  controlled-vocabulary dropdowns) so the SOP need not be read separately.

### Planned — Changed (schema-breaking → MAJOR bump)
- CSV export columns align to the **canonical ERGA manifest v2.5.1 schema** (91
  columns, exact names + controlled vocabularies), so field CSVs merge into the
  manifest by row-stacking and key-join rather than manual re-mapping. Schema is
  an embedded, swappable config (`schema/manifest-2.5.1.json`) so future ERGA
  releases (2.5.2+) are a config update, not a rewrite.

### Delivered in this pass
- Opening **path-picker** (single-specimen active; eDNA & pooled "coming soon").
- **Single-specimen path**: specimen block → tube loop (one-per-tube / split),
  per-tube tube ID + auto collector sample ID + multi-select organism part +
  purpose (incl. UI-only Hi-C → REFERENCE_GENOME).
- Progressive disclosure (transect, original-location); offline LocalStorage;
  91-column ERGA-aligned CSV export; `APP_VERSION 2.0.0`.
- **Camera barcode scanner** on the tube ID field (html5-qrcode); scans when
  online, falls back to manual entry offline.
- **Multi-standard export**: ERGA is reference-genome-only, so FieldScribe now
  exports to the standard the purpose dictates. Added **BOLD / iBOL** export
  (Specimen Template v3.0) — a four-sheet `.xlsx` (Voucher Info, Taxonomy,
  Specimen Details, Collection Data), one record per tube, with vocab/date/
  location mapping; falls back to sectioned CSV offline. Added optional
  Phylum / Class / Institution-storing capture (BOLD needs Phylum). Schema +
  mapping in `schema/bold-template-3.0.json`. eDNA → ENA MIxS planned next.

### Planned — Deferred / not in v2.0.0
- Full pooled/population path (lighter ENA-checklist route) — scoped after the
  single-specimen and eDNA paths.

## [1.0.0] — 2025
Initial public release. See `releases/v1.0.0.md`.

### Added
- Mobile-first, offline-capable field data collection (LocalStorage).
- Two sample categories: **organism/specimen** and **environmental sample**.
- Organism fields: kingdom-based life stages & tissue types, scientific/common
  name, NCBI TaxID, sex.
- Environmental fields: water/soil/sediment/air filters/Malaise traps, method,
  volume, salinity, dissolved oxygen, turbidity.
- GPS capture with accuracy, altitude/depth, habitat, temperature, pH, notes.
- Auto-fill collector & "use last location"; required-vs-optional fields.
- CSV export for analysis and database import.

[Unreleased]: https://github.com/OlgaVP-PB/FieldScribe/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/OlgaVP-PB/FieldScribe/releases/tag/v1.0.0
