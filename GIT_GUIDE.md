# FieldScribe — keeping versions in Git (n00b-friendly)

## The mental model
- **Nothing is ever lost.** Every commit is kept in history.
- **A tag = a permanent named snapshot** of the whole repo at a point in time.
  Tag `v1.0.0` now, and v1's exact code stays browsable/downloadable forever —
  even after you overwrite `index.html` with v2.
- **Tags** = frozen snapshots for reference. **Branches** = ongoing parallel
  work. For "save the first iteration for review", you want a **tag**.

Safe order: **tag v1 → upload v2 → tag v2.** Overwriting files is then fine.

## Recommended folder structure (keep it simple)
```
FieldScribe/
├── index.html        ← the LATEST app (GitHub Pages serves this at the root URL)
├── README.md
├── CHANGELOG.md      ← human-readable version history
├── VERSIONING.md
├── schema/           ← manifest-2.5.1.json, bold-template-3.0.json
└── releases/         ← per-version notes (v1.0.0.md, v2.0.0.md, …)
```
History/old versions live in **tags + releases**, not in extra folders.

---

## Step 1 — Snapshot v1 FIRST (do this before uploading anything)
This freezes the current (v1) code permanently. Zero risk.
1. Go to **https://github.com/OlgaVP-PB/FieldScribe**
2. Right side → **Releases** → **Draft a new release**
   (or: **Create a new release**)
3. **Choose a tag** → type `v1.0.0` → click **"Create new tag: v1.0.0 on publish"**
4. Target: **main** (the current code = v1)
5. Title: `FieldScribe v1.0.0`. Description: paste from `releases/v1.0.0.md` if you like.
6. **Publish release.**
✅ v1 is now permanently at: `https://github.com/OlgaVP-PB/FieldScribe/releases/tag/v1.0.0`
   (browse code, download .zip — always available).

## Step 2 — Upload v2 (overwrites index.html; that's OK now)
1. Repo home → **Add file → Upload files**
2. Drag in the new **`index.html`** (and optionally `README.md`, `CHANGELOG.md`,
   `VERSIONING.md`, `GIT_GUIDE.md`, `DEPLOY_and_share.md`, and the `schema/` +
   `releases/` folders).
3. Commit message: `FieldScribe v2.0.0` → **Commit changes.**
4. Wait ~1 min, hard-reload **https://olgavp-pb.github.io/FieldScribe/** (Cmd-Shift-R).

## Step 3 — Tag v2 too (keeps the habit consistent)
Repeat Step 1 with tag `v2.0.0`, description from `releases/v2.0.0.md`.

---

## Optional — make v1 RUNNABLE side-by-side
Only if you want both apps live at once (most don't need this — the tag is enough
to review/restore). 
1. Download the v1 `index.html` from the `v1.0.0` release.
2. In the repo: **Add file → Create new file**, name it
   `archive/v1/index.html`, paste v1's contents, commit.
3. v1 then runs at **https://olgavp-pb.github.io/FieldScribe/archive/v1/**
   while the root URL stays on the latest version.
Add a line to the root `README.md` pointing to it so people can find it.

---

## Going forward (the simple routine for each new version)
1. Update the app + bump `APP_VERSION` in `index.html` (see `VERSIONING.md`).
2. Move the changes into a dated section of `CHANGELOG.md`.
3. Commit/upload.
4. Draft a release with the matching tag (`v2.1.0`, etc.).
That's it — every version stays reviewable, and the root URL always shows latest.
