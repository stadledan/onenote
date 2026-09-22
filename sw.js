/* Blattschnitt Service Worker – macht die App offline nutzbar.
   Cache-first für eigene Dateien und die CDN-Bibliotheken; Netz zuerst für index.html (damit Updates ankommen). */
const VERSION = 'blattschnitt-v1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
const LIBS = [
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdn.jsdelivr.net/npm/docx@9.7.1/dist/index.iife.js',
];
self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(CORE);
    // Bibliotheken einzeln, damit ein Fehler nicht die Installation blockiert
    await Promise.all(LIBS.map(u => c.add(new Request(u, { mode: 'cors' })).catch(() => c.add(new Request(u, { mode: 'no-cors' })).catch(() => {}))));
    self.skipWaiting();
  })());
});
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isLib = LIBS.includes(req.url);
  const isOwn = url.origin === self.location.origin;
  if (!isLib && !isOwn) return;
  if (isOwn && (url.pathname.endsWith('/') || url.pathname.endsWith('index.html'))) {
    // Netz zuerst, Cache als Fallback
    e.respondWith((async () => {
      try { const r = await fetch(req); const c = await caches.open(VERSION); c.put(req, r.clone()); return r; }
      catch (err) { return (await caches.match(req)) || (await caches.match('./index.html')); }
    })());
    return;
  }
  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    const r = await fetch(req);
    if (r && (r.ok || r.type === 'opaque')) { const c = await caches.open(VERSION); c.put(req, r.clone()); }
    return r;
  })());
});
