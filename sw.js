/*
 * FieldScribe service worker.
 *
 * Makes the app open offline once it has been loaded with a connection.
 * Bump VERSION on every release: it names the cache, so a new version
 * automatically discards the old cached app instead of leaving people stuck
 * on a stale copy. Keep VERSION equal to APP_VERSION in index.html.
 */
const VERSION = '2.2.0';
const CACHE = 'fieldscribe-v' + VERSION;

// Local app shell - precached on install so the app opens with no network.
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-maskable-512.png',
  './assets/apple-touch-icon.png'
];

// Cross-origin hosts we are willing to cache at runtime (fonts + the two CDN
// libraries). Data APIs (ENA, GBIF) are deliberately NOT here: they are
// online-only lookups and must never be served stale.
const RUNTIME_HOSTS = [
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }

  const isDocument =
    req.mode === 'navigate' ||
    (url.origin === self.location.origin &&
      (url.pathname.endsWith('/') || url.pathname.endsWith('/index.html')));

  // App document: network-first, fall back to cache. Online users always get
  // the latest index.html; offline users get the last cached copy.
  if (isDocument) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Same-origin static assets (icons, manifest): cache-first.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }))
    );
    return;
  }

  // Whitelisted CDNs / fonts: cache-first, tolerate opaque responses.
  if (RUNTIME_HOSTS.indexOf(url.host) !== -1) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Everything else (ENA, GBIF, etc.): straight to the network.
});
