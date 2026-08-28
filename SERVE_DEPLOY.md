# Deploy FieldScribe on SciLifeLab Serve

FieldScribe is a static, client-side app (no backend, no server-side data). These
files package it as a Docker image that meets Serve's requirements:
- runs as a **non-root user, uid 1000**
- listens on **port 8080** (inside Serve's allowed 3000–9999 range)
- has a **start-up script at the WORKDIR** (`/app/start-script.sh`)
- base image **nginxinc/nginx-unprivileged:alpine** (as the Serve team suggested)

Files: `Dockerfile`, `nginx.conf`, `start-script.sh`, `.dockerignore`.

## Build and test locally
```bash
cd path/to/FieldScribe
docker build --platform linux/amd64 -t <dockerhub-username>/fieldscribe:v2.1.0 .
docker run --rm -p 8080:8080 <dockerhub-username>/fieldscribe:v2.1.0
# open http://localhost:8080  → the app should load
```

## Publish the image (public — Serve refetches it regularly)
```bash
docker login --username=<dockerhub-username>
docker push <dockerhub-username>/fieldscribe:v2.1.0
```
(Or automate via GitHub Actions → GitHub Container Registry; the Serve team has an
example workflow.)

## Create the app on Serve
Serve → your project → Create → **Custom app**, then:
- **Port:** `8080`
- **Image:** `<dockerhub-username>/fieldscribe:v2.1.0` (each new version needs a NEW unique tag)
- **Mount path / Storage:** **None** — FieldScribe stores nothing server-side (all data
  lives in the user's browser via LocalStorage; export produces the files)
- **Permission:** `Link` while under review, `Public` once ready
- **Source code URL:** https://github.com/OlgaVP-PB/FieldScribe

## Notes
- To update: build with a **new tag** (e.g. `v2.1.1`), push, then change the tag in
  the app's Settings → Image and press Update. Reusing a tag will not update.
- The image includes only `index.html` (the app is fully self-contained; schemas are
  embedded), served by nginx. No database, no user accounts — matches Serve policy.
