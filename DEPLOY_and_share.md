# Publish FieldScribe v2 & share with José

## A. Put v2 online (GitHub Pages)

The live URL **https://olgavp-pb.github.io/FieldScribe/** already exists (serving v1).
Pushing the updated files updates it. Only `index.html` is required to run — the
schema is embedded — but uploading the rest gives José & Felix the context.

### Easiest — GitHub web UI (no tools)
1. Open **https://github.com/OlgaVP-PB/FieldScribe**
2. **Add file → Upload files**
3. Drag in the new **`index.html`** (and optionally `README.md`, `CHANGELOG.md`,
   `VERSIONING.md`, and the `schema/` + `releases/` folders). Uploading
   `index.html` over the old one replaces it.
4. **Commit changes** — message e.g. `FieldScribe v2.0.0`
5. Wait ~1 min, then hard-reload the live page (**Cmd-Shift-R**) to clear cache.

### If you prefer git / GitHub Desktop
Copy the updated files into your local clone of the repo, commit, push to `main`.

## B. The link to send José
**https://olgavp-pb.github.io/FieldScribe/**
(Not the `file://` path — the camera scanner, GPS, and taxonomy lookup only work
over https.)

## C. Note to José (copy-paste)

> Hi José — could you give FieldScribe v2 an independent test? It's a mobile-first
> field-metadata app that exports straight into the manifests: reference-genome
> samples → ERGA/DToL, everything else → **your BGE-ERGA PopGenomics manifest**,
> plus a BOLD/iBOL export. New since we spoke: one unified "individuals → tubes"
> flow (a single specimen = one individual with many tubes; a population = many
> individuals with one tube each, one manifest row per tube), and auto-fill of
> NCBI TaxID + GBIF lineage (phylum→genus) from a scientific name.
>
> Live: **https://olgavp-pb.github.io/FieldScribe/** — phone or desktop; all data
> stays in your browser, nothing is uploaded.
>
> Two things to watch: (1) use the link, not a downloaded file — the camera
> scanner, GPS and lookups need https; (2) if the TaxID lookup ever comes back
> empty it's most likely a CORS block on the ENA service — the GBIF lineage half
> should still fill. I'd especially value your read on whether the PopGenomics
> routing and the one-row-per-individual model match what you'd expect. Thanks!

## Quick sanity check after publishing
Open the live link, pick **Specimen sampling**, add one individual with a couple
of tubes, type a species name (e.g. *Salmo salar*) and confirm TaxID + lineage
fill, then **Export** and check the CSV columns. Done.
