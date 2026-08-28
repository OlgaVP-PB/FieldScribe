# FieldScribe v2.1.0

**Field sample metadata, made easy.**

FieldScribe is a mobile-first, offline-capable web app for recording biological
sample metadata in the field and exporting it in the exact shape each downstream
database expects. It is a single self-contained `index.html`: no backend, no
build step, no login. Built for the SciLifeLab Planetary Biology Strategic Area
(Uppsala University) in collaboration with ERGA.

> **Live:** https://olgavp-pb.github.io/FieldScribe/ ·
> **Repo:** https://github.com/OlgaVP-PB/FieldScribe

---

## Get it on your phone

Reading this on a desktop? Scan the code to open FieldScribe on your phone, then
save it to your home screen so it behaves like a normal app.

<img src="assets/fieldscribe-qr.png" alt="QR code to open FieldScribe" width="220">

Or open the link directly on the phone:
**https://olgavp-pb.github.io/FieldScribe/**

### Save it like an app (so you do not lose it)

There is no App Store download: FieldScribe runs in the browser and you "install"
it by adding it to your home screen. This gives you an icon that opens the app
full-screen. The first time you open it with a connection it saves a copy of
itself to your phone, so afterwards it launches and works even with no signal in
the field (your entered records are stored on the device too).

**iPhone / iPad (Safari)**
1. Open the link above in **Safari**.
2. Tap the **Share** button (the square with an arrow pointing up).
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**. A FieldScribe icon now sits on your home screen.

**Android (Chrome)**
1. Open the link above in **Chrome**.
2. Tap the **three-dot menu** (top right).
3. Tap **Add to Home screen** (or **Install app** if offered).
4. Tap **Add**. The icon appears with your other apps.

**Tip:** once the icon is added, always open FieldScribe from that icon. Your
saved records live in that app's own storage, so opening it the same way each
time keeps all your samples together. Grant **camera** permission the first time
if you want barcode scanning, and **location** permission for GPS capture.

---

## Why this exists

Downstream manifests and checklists are long and intimidating, and few people
read the SOP in the field. FieldScribe aims to *be* the SOP: it shows only the
fields relevant to what you are doing, embeds the guidance inline, uses
controlled-vocabulary lists and smart defaults, and exports a file that already
speaks the target database's language. ENA is the universal endpoint; FieldScribe
keeps a lean field core and exposes each standard's depth only when needed.

## What it does

FieldScribe opens on a **path picker** with two workflows.

### 1. Specimen sampling (organisms)

A shared species and collection-event block, then a two-level
**individuals to tubes** model: 1..N individuals (each with its own specimen ID,
sex, life stage), and under each, 1..N tubes (tube ID, collector sample ID,
organism part, purpose). A reference-genome specimen is simply one individual
with many tubes; a population is many individuals with one tube each.

Export is **purpose-routed**, one row per tube:

- Reference-genome tubes (including Hi-C) export to the **ERGA / DToL manifest**,
  aligned to the canonical **Sample Manifest v2.5.1** (91 columns, in order).
- All other purposes export to the **BGE-ERGA PopGenomics manifest** (identical
  91-column header).
- Both are written as **CSV and Excel (`.xlsx`)**, since COPO ingests xlsx.
- A **BOLD / iBOL** export (Specimen Template v3.0) is available for barcoding: a
  four-sheet `.xlsx` with vocabulary, date, and location mapping, plus a
  sectioned-CSV fallback offline.

Only non-empty classes download, so you get exactly the files your samples need.

### 2. eDNA / environmental

Captures environmental-sample metadata and exports an **ENA-ready TSV per
checklist**. Ten environments are supported, each mapped to its live ENA
checklist with exact labels, units, mandatory flags and controlled vocabularies:

- GSC MIxS environmental: Water (ERC000024), Soil (ERC000022), Sediment
  (ERC000021), Air (ERC000012), Microbial biofilm (ERC000019), Plant associated
  (ERC000020), Wastewater sludge (ERC000023), Miscellaneous environment
  (ERC000025)
- Specialised: Marine microalgae (ERC000043), Ancient DNA / sedaDNA (ERC000059)

Every field is tagged **on-site** or **desk/lab**, so the field form shows only
what must be recorded on site (GPS, date, depth or elevation, the ENVO context
triple, and the field essentials) and defers the metagenome ID, project, and
sequencing fields. ENVO fields offer suggestion lists and the metagenome
`tax_id` has a lookup. The optional on-site measurements are shown as a tappable
banner with a preview, so nothing gets missed.

## Shared features

- **Offline first**: records persist in the browser (LocalStorage); export when
  convenient. Nothing is sent to a server.
- **Camera barcode scanning** on every Sample ID (specimen base ID, eDNA sample
  alias, and the per-tube barcode), with manual entry as an offline fallback.
- **Taxonomy auto-lookup** on the specimen path: a scientific name fetches the
  NCBI taxon ID and common name from ENA and the ranked lineage from GBIF,
  filling only empty fields.
- **GPS and date** capture reused across paths; field-friendly slash-separated
  locations converted to the manifest's pipe convention on export.

## How the schemas are wired in

Every standard is an embedded, swappable config, so a new release of a checklist
or manifest is a re-extract into one object, not a rewrite:

- `schema/manifest-2.5.1.json` for the canonical ERGA v2.5.1 (91 columns,
  controlled vocabularies, organism-part definitions), shared by the ERGA/DToL
  and PopGenomics exports.
- `schema/bold-template-3.0.json` for the BOLD Specimen Template v3.0 mapping.
- `schema/mixs-*.json` for the ten ENA environmental checklists, generated from
  the live ENA definitions.

## Hosting

The app is fully client-side and can be opened straight from a file, served as a
static site (GitHub Pages), or hosted on **SciLifeLab Serve**. Serve packaging is
included: `Dockerfile` (nginx-unprivileged, uid 1000, port 8080), `nginx.conf`,
`start-script.sh`, `.dockerignore`, and `SERVE_DEPLOY.md`. There is no backend,
so Serve storage is None.

## Files in this package

| File | What it is |
|------|------------|
| `index.html` | The whole app; open in any modern browser. |
| `manifest.webmanifest`, `sw.js` | PWA manifest and service worker (installable, offline). |
| `schema/manifest-2.5.1.json` | Canonical ERGA v2.5.1 schema (specimen exports). |
| `schema/bold-template-3.0.json` | BOLD Specimen Template v3.0 mapping. |
| `schema/mixs-*.json` | The ten ENA environmental checklists. |
| `Dockerfile`, `nginx.conf`, `start-script.sh`, `.dockerignore` | SciLifeLab Serve packaging. |
| `SERVE_DEPLOY.md` | How to deploy on Serve. |
| `assets/fieldscribe-qr.png` | QR code to the live app. |
| `assets/icon-*.png`, `assets/apple-touch-icon.png` | App icons for install. |
| `README.md` | This file. |
| `CHANGELOG.md` | Version history (Keep a Changelog). |
| `VERSIONING.md` | Versioning scheme and release process. |
| `releases/*.md` | Per-release notes and design briefs. |

## Try it

Open `index.html` in a browser (the camera scanner needs HTTPS or `localhost`
plus camera permission). Pick a path, add a record, then export to see the
database-shaped output.

---
*Lead & design: Olga Vinnere Pettersson (SciLifeLab Planetary Biology, Uppsala
University). Built with AI assistance from Claude (Anthropic).*
