// Stuart's Checklist — Service Worker
// Handles background push notifications so alarms fire even when the tab is suspended.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// When a notification is clicked, focus the app window (or open it)
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length) return list[0].focus();
      return self.clients.openWindow('/');
    })
  );
});
