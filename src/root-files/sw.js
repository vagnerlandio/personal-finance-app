// we'll version our cache (and learn how to delete caches in
// some other post)
const cacheName = 'v1::static';

self.addEventListener('install', e => {
  // once the SW is installed, go ahead and fetch the resources
  // to make this work offline
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        '/css/materialize.min.css',
        '/css/style.css',
        '/js/materialize.min.js',
        '/js/jquery-3.3.1.min.js',
        '/js/script.js',
        '/img/icon-32.png',
        '/img/icon-192.png',
        '/manifest.json',
        '/js/about.js',
        '/js/categories.js',
        '/js/accounts.js',
        '/js/index.js',
        '/js/settings.js',
        '/js/transactions.js',
        '/css/about.css',
        '/css/categories.css',
        '/css/accounts.css',
        '/css/index.css',
        '/css/settings.css',
        '/css/transactions.css',
        '/about.html',
        '/categories.html',
        '/accounts.html',
        '/index.html',
        '/settings.html',
        '/transactions.html',
        '/index.html?launcher=true'
        /*
          DEAR READER,
          ADD A LIST OF YOUR ASSETS THAT
          YOU WANT TO WORK WHEN OFFLINE
          TO THIS ARRAY OF URLS
        */
      ]).then(() => self.skipWaiting());
    })
  );
});

// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
  event.respondWith(
    // ensure we check the *right* cache to match against
    caches.open(cacheName).then(cache => {
      return cache.match(event.request).then(res => {
        return res || fetch(event.request)
      });
    })
  );
});
