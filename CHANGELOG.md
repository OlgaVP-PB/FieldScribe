# Changelog

All notable changes to **FieldScribe** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/);
versioning follows [SemVer](https://semver.org/) (see `VERSIONING.md`).

## [2.1.0] - 2026-08-28

Environmental sampling arrives, the specimen flow is unified, and the app is
branded and packaged for hosting. See `releases/v2.1.0.md`.

### Added
- **eDNA / environmental path with 10 ENA checklists.** A new
  environmental-sample path that exports an ENA-ready TSV per checklist. Each of
  the ten environments maps to its live ENA checklist with exact labels, units,
  mandatory flags and controlled vocabularies: Water (ERC000024), Soil
  (ERC000022), Sediment (ERC000021), Air (ERC000012), Microbial biofilm
  (ERC000019), Plant associated (ERC000020), Wastewater sludge (ERC000023),
  Miscellaneous environment (ERC000025), Marine microalgae (ERC000043), and
  Ancient DNA / sedaDNA (ERC000059). Configs live in `schema/mixs-*.json`.
- **On-site vs desk/lab staging** on every eDNA field, so the field form shows
  only what must be recorded on site (GPS, date, depth or elevation, the ENVO
  context triple, and the field essentials) and defers the metagenome ID,
  project, and sequencing fields. ENVO fields offer suggestion lists; the
  metagenome `tax_id` has a lookup.
- **SciLifeLab Serve packaging**: `Dockerfile` (nginx-unprivileged, runs as uid
  1000 on port 8080), `nginx.conf`, `start-script.sh`, `.dockerignore`, and
  `SERVE_DEPLOY.md`. The app is fully client-side (LocalStorage) with no backend,
  so Serve storage is None.
- **SciLifeLab visual identity**: teal / lime / grape palette, a branded header
  logo, a partner footer (SciLifeLab, Uppsala University, ERGA, BGE+, EU
  "Co-funded by"), and Lato / Lora fonts. The footer credits the app as an
  original contribution of the Planetary Biology Strategic Area at SciLifeLab.
- **Camera barcode scanning on the Sample ID** across all paths (specimen base
  ID and eDNA sample alias; the tube barcode already scanned).
- **Taxonomy auto-lookup** in the specimen flow: typing a scientific name
  fetches the NCBI TAXON_ID and common name from ENA and the ranked lineage
  from GBIF, filling only empty fields.

### Changed
- **Unified specimen flow.** The separate single-specimen and population paths
  are collapsed into one *Specimen sampling* flow built on a two-level
  individuals-to-tubes model; "pooled" is removed. Export is purpose-routed, one
  row per tube: reference-genome rows go to the ERGA / DToL manifest and all
  other purposes go to the PopGenomics manifest, sharing an identical 91-column
  header.
- **Field-friendly locations**: slash-separated levels ("Sweden / Uppsala /
  Fyrisån") are converted to the manifest's required pipes on export; added a
  collection / institution field for zoo, garden, or culture specimens.
- Renamed the specimen **"Save session" button to "Save specimen"**, with a note
  that data is stored in the browser on the device (Save is not the same as
  export).
- Header tagline is now **"Field sample metadata, made easy"**.
- Made the eDNA **optional on-site measurements** section clearly tappable: a
  bordered banner with a field count and an always-visible preview of what is
  inside, so fields like Depth are not missed.

### Fixed
- Reconciled the earlier water and soil "curated guesses" to the exact ENA
  fields, so the ENA TSV now validates per checklist with the `#units` row
  aligned 1:1.
- Reliable CSS hover tooltips on info icons (replacing the flaky native
  `title`); ENVO tips are field-specific with an example term.

## [2.0.0] - 2026

First modular rebuild. See `releases/v2.0.0.md`.

### Added
- Opening **path picker** (single-specimen active; eDNA and pooled flagged as
  coming next).
- **Specimen-to-tube data model**: enter specimen-level metadata once, then add
  1..N tubes, each with its own tube ID, auto collector sample ID, organism
  part, and purpose.
- **91-column ERGA-aligned CSV export** (canonical manifest schema, held as a
  swappable config in `schema/manifest-2.5.1.json`).
- **BOLD / iBOL export** (Specimen Template v3.0): a four-sheet `.xlsx` with
  vocabulary, date, and location mapping, plus a sectioned-CSV fallback offline.
  Schema in `schema/bold-template-3.0.json`.
- **Camera barcode scanner** on the tube ID field (html5-qrcode), with manual
  entry as an offline fallback.

## [1.0.0] - 2025
Initial public release. See `releases/v1.0.0.md`.

### Added
- Mobile-first, offline-capable field data collection (LocalStorage).
- Two sample categories: **organism/specimen** and **environmental sample**.
- Organism fields: kingdom-based life stages and tissue types, scientific and
  common name, NCBI TaxID, sex.
- Environmental fields: water, soil, sediment, air filters, Malaise traps,
  method, volume, salinity, dissolved oxygen, turbidity.
- GPS capture with accuracy, altitude/depth, habitat, temperature, pH, notes.
- Auto-fill collector and "use last location"; required-versus-optional fields.
- CSV export for analysis and database import.

[2.1.0]: https://github.com/OlgaVP-PB/FieldScribe/releases/tag/v2.1.0
[2.0.0]: https://github.com/OlgaVP-PB/FieldScribe/releases/tag/v2.0.0
[1.0.0]: https://github.com/OlgaVP-PB/FieldScribe/releases/tag/v1.0.0
