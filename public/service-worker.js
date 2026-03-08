// ══════════════════════════════════════════════════════════════════════
// OrganiStuda — Service Worker
// Funcionamento 100% local e offline
// Nenhum dado é enviado para servidores externos
// ══════════════════════════════════════════════════════════════════════

const CACHE_NAME = 'organistuda-v3.5.7'; // Versão atualizada
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-48.png',
  '/icon-72.png',
  '/icon-96.png',
  '/icon-144.png',
  '/icon-192.png',
  '/icon-512.png',
  '/assets/index.css',
  '/assets/index.js'
];

// ── Instalação: cachear assets estáticos ──────────────────────────────
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ── Ativação: remover caches antigos ─────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
    ])
  );
});

// ── Fetch: cache-first para assets, network-first para HTML ──────────
self.addEventListener('fetch', event => {
  const req = event.request;

  // Ignorar requisições não-GET
  if (req.method !== 'GET') return;

  // Ignorar requisições para outros domínios (não cachear dados externos)
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Assets estáticos: cache-first
  if (
    req.url.includes('/assets/') ||
    req.url.match(/\.(png|jpg|jpeg|svg|ico|woff|woff2|ttf|css)$/)
  ) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // HTML e JS: cache-first com atualização em background (stale-while-revalidate)
  event.respondWith(staleWhileRevalidate(req));
});

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  
  const fetchPromise = fetch(req).then(networkResponse => {
    if (networkResponse && networkResponse.status === 200) {
      cache.put(req, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => null);

  return cached || fetchPromise;
}

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;

  try {
    const res = await fetch(req);
    if (res && res.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, res.clone());
    }
    return res;
  } catch {
    return new Response('Recurso não disponível offline', { status: 503 });
  }
}

async function networkFirstWithFallback(req) {
  try {
    const res = await fetch(req);
    if (res && res.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, res.clone());
    }
    return res;
  } catch {
    const cached = await caches.match(req);
    return cached || caches.match('/index.html');
  }
}
