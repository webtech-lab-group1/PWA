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

let CACHE = 'cache';

self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromCache(evt.request));
});
function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
          `/`,
          `/index.html`,
          `/style.css`,
          `/script.js`,
          `/map/zoom15.bmp`,
          `/dragscroll.js`,
          `/Content/Restaurant.json`,
          `/manifest.json`,
          `images/icons/icon-144x144.png`
        ]);
    });
}

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
});
function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}
