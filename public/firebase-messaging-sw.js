// Firebase Messaging Service Worker
// Xử lý push notification khi app đang background hoặc đóng

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            '__VITE_FIREBASE_API_KEY__',
  authDomain:        '__VITE_FIREBASE_AUTH_DOMAIN__',
  projectId:         '__VITE_FIREBASE_PROJECT_ID__',
  storageBucket:     '__VITE_FIREBASE_STORAGE_BUCKET__',
  messagingSenderId: '__VITE_FIREBASE_MESSAGING_SENDER_ID__',
  appId:             '__VITE_FIREBASE_APP_ID__',
});

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage(payload => {
  const { title, body, icon, image, clickAction } = payload.notification ?? {};
  const data = payload.data ?? {};

  self.registration.showNotification(title ?? 'Chùa Thuận Châu', {
    body:    body    ?? 'Có thông báo mới từ chùa.',
    icon:    icon    ?? '/thuan-chau-pagoda/icon-192.png',
    badge:              '/thuan-chau-pagoda/icon-96.png',
    image:   image,
    data: { url: data.url ?? clickAction ?? '/thuan-chau-pagoda/' },
    actions: [
      { action: 'open',  title: 'Xem ngay' },
      { action: 'close', title: 'Đóng'     },
    ],
    requireInteraction: false,
  });
});

// Notification click → mở app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'close') return;

  const url = e.notification.data?.url ?? '/thuan-chau-pagoda/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => {
      for (const w of ws) {
        if (w.url.includes('thuan-chau-pagoda') && 'focus' in w) {
          return w.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
