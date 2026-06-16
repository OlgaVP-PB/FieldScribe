# Versioning & Release Process — FieldScribe

FieldScribe follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`)
and keeps a human-readable changelog in the style of
[Keep a Changelog](https://keepachangelog.com/).

## What the numbers mean here

Because FieldScribe is a single-file, offline-capable web app whose **output is a
CSV destined for ENA / the ERGA manifest**, we version against *data
compatibility*, not just code:

| Bump | When | Examples |
|------|------|----------|
| **MAJOR** (`x.0.0`) | A change that alters the **exported data schema** or how existing saved samples are interpreted — anything a downstream pipeline or a returning user must adapt to. | Switching CSV headers to canonical ERGA column names; introducing the specimen→tube data model; removing/renaming a field. |
| **MINOR** (`1.x.0`) | New capability that is **backwards-compatible** — old CSVs still validate, old saved samples still open. | Adding a new optional module (preservation, vouchering); adding a new sample path (eDNA); new optional fields. |
| **PATCH** (`1.0.x`) | Fixes and polish with **no schema impact**. | GPS accuracy display fix, dropdown typo, layout tweak, controlled-vocabulary correction. |

When in doubt, ask: *"Does a returning collector or a downstream pipeline have to
change anything?"* Yes → MAJOR. New but optional → MINOR. Invisible → PATCH.

## The in-app version string

The running app must show its own version, because users keep cached copies on
their phones and "which version am I on?" is otherwise unanswerable offline.

In `index.html`, keep a single source of truth near the top of the script:

```js
const APP_VERSION = "2.0.0";   // <-- bump here on every release
```

…and render it in the footer:

```html
<footer>FieldScribe v<span id="appVersion"></span></footer>
<script>document.getElementById('appVersion').textContent = APP_VERSION;</script>
```

`APP_VERSION` must always match the latest entry in `CHANGELOG.md` and the Git tag.

## Cutting a release

1. Move items from `[Unreleased]` in `CHANGELOG.md` into a new dated version
   section.
2. Bump `APP_VERSION` in `index.html` to match.
3. Add or finalise the matching note in `releases/vX.Y.Z.md`.
4. Commit: `git commit -am "Release vX.Y.Z"`.
5. Tag: `git tag -a vX.Y.Z -m "FieldScribe vX.Y.Z"` then `git push --tags`.
6. On GitHub → **Releases → Draft a new release**, choose the tag, and paste the
   contents of `releases/vX.Y.Z.md` as the release body.

## Files

- `CHANGELOG.md` — the running, aggregated history (every version, newest first).
- `releases/vX.Y.Z.md` — the standalone, user-facing note for one release, written
  for collectors and partners (the GitHub Release body). Emphasises **what
  improved** and **what is now more modular**.
- `VERSIONING.md` — this document (the rules).
