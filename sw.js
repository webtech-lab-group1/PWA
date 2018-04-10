self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open('RestoMapp').then(cache => {
      return cache.addAll([
        `/`,
        `/index.html?timestamp=${timeStamp}`,
        `/style.css?timestamp=${timeStamp}`,
        `/script.js?timestamp=${timeStamp}`,
        `/map/zoom15.bmp?timestamp=${timeStamp}`,
        `/dragscroll.js?timestamp=${timeStamp}`,
        `/Content/Restaurant.json?timestamp=${timeStamp}`,
        `/manifest.json?timestamp=${timeStamp}`,
        `images/icons/icon-144x144.png?timestamp=${timeStamp}`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(response => {
      return response || fetch(event.request);
    })
  );
});