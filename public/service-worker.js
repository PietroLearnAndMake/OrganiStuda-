const CACHE_NAME = 'organistuda-cache-v4';
const DYNAMIC_CACHE = 'organistuda-dynamic-v4';
const QUESTION_CACHE = 'organistuda-questions-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-48.png',
  '/icon-72.png',
  '/icon-96.png',
  '/icon-144.png',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => {
        console.log('[Service Worker] Caching App Shell');
        return cache.addAll(urlsToCache);
      }),
      caches.open(QUESTION_CACHE).then(cache => {
        console.log('[Service Worker] Initialized Question Cache');
      })
    ])
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE && cacheName !== QUESTION_CACHE) {
            console.log('[Service Worker] Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Skip non-GET requests
  if (req.method !== 'GET') {
    return;
  }

  // Cache-first for static assets
  if (url.origin === location.origin && 
      (req.url.includes('/assets/') || req.url.includes('.png') || req.url.includes('.json') || req.url.includes('.css'))) {
    event.respondWith(cacheFirst(req));
  } 
  // Network-first for API calls and dynamic content
  else if (url.pathname.includes('/api/') || url.pathname.includes('/share')) {
    event.respondWith(networkFirst(req));
  }
  // Stale-while-revalidate for HTML pages
  else if (req.headers.get('accept').includes('text/html')) {
    event.respondWith(staleWhileRevalidate(req));
  }
  // Default: network-first
  else {
    event.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  if (cached) {
    return cached;
  }
  
  try {
    const res = await fetch(req);
    if (res && res.status === 200) {
      cache.put(req, res.clone());
    }
    return res;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error);
    return new Response('Offline - Resource not available', { status: 503 });
  }
}

async function networkFirst(req) {
  const cache = await caches.open(DYNAMIC_CACHE);
  try {
    const res = await fetch(req);
    if (res && res.status === 200 && res.type === 'basic') {
      cache.put(req, res.clone());
    }
    return res;
  } catch (error) {
    console.log('[Service Worker] Network failed, using cache:', req.url);
    const cached = await cache.match(req);
    return cached || caches.match('/index.html');
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(req);
  
  const fetchPromise = fetch(req).then(res => {
    if (res && res.status === 200) {
      cache.put(req, res.clone());
    }
    return res;
  }).catch(() => cached || caches.match('/index.html'));

  return cached || fetchPromise;
}

// Handle Share Target
self.addEventListener('fetch', event => {
  if (event.request.method === 'POST' && event.request.url.includes('/share')) {
    event.respondWith(handleShare(event.request));
  }
});

async function handleShare(req) {
  const formData = await req.formData();
  const title = formData.get('title') || '';
  const text = formData.get('text') || '';
  const url = formData.get('url') || '';

  // Armazenar dados compartilhados no IndexedDB ou localStorage
  const sharedData = { title, text, url, timestamp: Date.now() };
  
  // Notificar o cliente
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'SHARED_DATA',
      data: sharedData
    });
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Push Notifications
self.addEventListener('push', event => {
  let data = { 
    title: 'OrganiStuda', 
    body: 'Hora de estudar! 📚',
    icon: '/icon-192.png'
  };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    tag: 'organistuda-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'open',
        title: 'Abrir'
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        for (let client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

// Background Sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  } else if (event.tag === 'sync-questions') {
    event.waitUntil(syncQuestions());
  }
});

async function syncProgress() {
  console.log('[Service Worker] Syncing user progress...');
  try {
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_PROGRESS',
        status: 'syncing'
      });
    });
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
  }
}

async function syncQuestions() {
  console.log('[Service Worker] Syncing questions...');
  // Implementar lógica de sincronização de questões
}

// Periodic Sync
self.addEventListener('periodicsync', event => {
  if (event.tag === 'periodic-sync-progress') {
    event.waitUntil(syncProgress());
  } else if (event.tag === 'periodic-notification') {
    event.waitUntil(sendPeriodicNotification());
  }
});

async function sendPeriodicNotification() {
  console.log('[Service Worker] Sending periodic notification...');
  const options = {
    body: 'Continue seus estudos! 🚀',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'organistuda-periodic'
  };

  return self.registration.showNotification('OrganiStuda', options);
}
