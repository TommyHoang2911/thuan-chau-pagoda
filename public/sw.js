// ── SERVICE WORKER – Chùa Thuận Châu PWA ──────────────────
const CACHE = 'chua-thuan-chau-v1';
const OFFLINE_ASSETS = [
  '/', '/index.html',
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&family=Be+Vietnam+Pro:wght@400;500;600&display=swap'
];

// Install: pre-cache shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(OFFLINE_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for API, cache-first for assets
self.addEventListener('fetch', e => {
  if (e.request.url.includes('firestore.googleapis.com')) return; // skip Firestore
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// Push notifications (FCM)
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || 'Chùa Thuận Châu';
  const opts = {
    body: data.body || 'Có thông báo mới từ chùa.',
    icon: 'icon-192.png',
    badge: 'icon-96.png',
    data: { url: data.url || '/' },
    actions: [
      { action: 'view', title: 'Xem ngay' },
      { action: 'close', title: 'Đóng' }
    ]
  };
  e.waitUntil(self.registration.showNotification(title, opts));
});

// Notification click
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'close') return;
  e.waitUntil(
    clients.matchAll({ type:'window' }).then(ws => {
      for (const w of ws) {
        if (w.url.includes(self.location.origin) && 'focus' in w) return w.focus();
      }
      return clients.openWindow(e.notification.data.url || '/');
    })
  );
});
