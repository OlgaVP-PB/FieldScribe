# ✍️ FieldScribe v2.0.0

**Field metadata capture that exports straight into the ERGA/DToL sample manifest.**

Mobile-first field-metadata capture that exports straight into the ERGA/DToL, BGE-ERGA PopGenomics, and BOLD manifests. Built for SciLifeLab (Planetary Biology Strategic Area) & ERGA/BGE.
FieldScribe v2.0.0 is a single self-contained `index.html` — no backend, no build step, no login — whose CSV export is aligned
to the **ERGA Sample Manifest v2.5.1** so that field sheets merge into the manifest with no manual re-mapping.

> **Live (v2):** https://olgavp-pb.github.io/FieldScribe/ · **Repo:**
> https://github.com/OlgaVP-PB/FieldScribe

---

## Why this exists

Researchers find the full 91-column manifest intimidating and rarely read the
SOP. FieldScribe's goal is to *be* the SOP: show only the fields relevant to
what the user is doing, embed the guidance inline, use controlled-vocabulary
dropdowns and smart defaults, and emit a CSV that already speaks the manifest's
language. ENA is the universal endpoint; the ERGA manifest is the broker
template that feeds it via COPO — so FieldScribe keeps a lean field core and
exposes ERGA depth only when needed.

## What v2.0.0 does (this release)

- **Path picker on launch** — *Single specimen* (reference genome / RNA-seq /
  resequencing) is active; *eDNA / environmental* and *Pooled / population* are
  stubbed as "coming soon".
- **Specimen → tube model** — specimen-level metadata entered once, then 1..N
  tubes. Toggle between *one specimen per tube* and *one specimen split across
  several tubes* (e.g. a fish divided into 15 barcoded tubes). On export, one
  specimen fans out into one manifest **row per tube**: the shared block copied
  down, per-tube fields varying.
- **Per-tube fields** — `TUBE_OR_WELL_ID` (camera barcode scanner, with manual
  fallback offline), auto-numbered `COLLECTOR_SAMPLE_ID` (`<baseID>-01`, `-02`…,
  editable), multi-select `ORGANISM_PART` (the full 73-term v2.5.1 ontology with
  definitions on hover), and `PURPOSE_OF_SPECIMEN`.
- **Progressive disclosure** — transect coordinates and zoo/garden/culture
  origin blocks stay hidden until toggled on.
- **Offline** — specimens persist in LocalStorage; export CSV when convenient.
- **ERGA-aligned export** — header row is exactly the 91 canonical v2.5.1
  columns, in order; unfilled downstream fields are left blank (or
  `NOT_PROVIDED`/`NOT_COLLECTED` where the SOP expects it); `SYMBIONT` defaults
  to `TARGET`.

## How the manifest schema is wired in

The canonical schema lives in `schema/manifest-2.5.1.json` (91 columns, 24
controlled vocabularies, 73 organism-part definitions) and is **embedded inline**
in the app as a swappable config (`MANIFEST_SCHEMA`, `MANIFEST_VERSION`). Moving
to a new manifest release (2.5.2+) is a re-extract into that one object, not a
rewrite. Columns and vocabularies are never hardcoded elsewhere.

## Merge model

- **Stacking** — pool field CSVs from many collectors: same headers, concatenate
  rows.
- **Widening** — add later lab/voucher modules to a sample: join on
  `COLLECTOR_SAMPLE_ID` (the key the collector controls; `SPECIMEN_ID`,
  `GAL_SAMPLE_ID` etc. are assigned later by the GAL).

## Where we'd love your feedback, Felix 🙏

1. **Hi-C** — `PURPOSE_OF_SPECIMEN` has no Hi-C term, so the app offers a UI-only
   "Hi-C" choice that exports as `REFERENCE_GENOME` + a note in
   `OTHER_INFORMATION`. Would ERGA consider adding a formal Hi-C term?
2. **COPO ingest** — does a CSV with exactly the v2.5.1 columns drop cleanly into
   COPO / the manifest wizard, or are there gotchas (encoding, the multi-value
   `ORGANISM_PART` pipe convention, the new `*_PERMITS_FILENAME` fields)?
3. **Specimen→tube fan-out** — is one row per tube with a shared
   `SPECIMEN_ID` the representation you'd expect?
4. **Field-stage minimal set** — anything field-only we're not capturing that
   should be caught on site.

## Roadmap

- eDNA / environmental path (ENA MIxS-style checklist; filter type, pore size,
  volume filtered, buffer).
- Pooled / population path (lighter ENA-checklist route).
- Later-stage modules: preservation, wet lab, vouchering, sequencing — filled by
  different people at different times against the shared sample, with
  `NOT_PROVIDED` defaults updatable in COPO.

## Files in this package

| File | What it is |
|------|------------|
| `index.html` | The whole app — open in any modern browser. |
| `schema/manifest-2.5.1.json` | Canonical ERGA v2.5.1 schema the app speaks. |
| `README.md` | This file. |
| `CHANGELOG.md` | Version history (Keep a Changelog). |
| `VERSIONING.md` | Versioning scheme and release process. |
| `releases/v1.0.0.md`, `releases/v2.0.0.md` | Per-release notes / design brief. |

## Try it

Open `index.html` in a browser (the camera scanner needs HTTPS or `localhost`
and camera permission). Pick *Single specimen*, add a specimen, add one or more
tubes, then **Export CSV** to see the manifest-shaped output.

---
*Lead & design: Olga Vinnere Pettersson (SciLifeLab Planetary Biology, Uppsala
University). Built with AI assistance. Targets ERGA Sample Manifest v2.5.1.*
