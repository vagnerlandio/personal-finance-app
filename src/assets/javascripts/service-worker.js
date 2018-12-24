// we'll version our cache (and learn how to delete caches in
// some other post)
const cacheVersion = 7;

self.addEventListener('install', e => {
  // once the SW is installed, go ahead and fetch the resources
  // to make this work offline
  e.waitUntil(
    caches.open('static::v' + cacheVersion).then(cache => {
      return cache.addAll(arquivos).then(() => {
        caches.delete('static::v' + (cacheVersion - 1));
        self.skipWaiting();
      });
    })
  );
});

// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
  event.respondWith(
    // ensure we check the *right* cache to match against
    caches.open('static::v' + cacheVersion).then(cache => {
      return cache.match(event.request).then(res => {
        return res || fetch(event.request);
      });
    })
  );
});

let arquivos = [
  '/',

  // IMAGES
  '/img/icon-32.png',
  '/img/icon-192.png',
  '/img/icon-512.png',

  // MANIFEST
  '/manifest.json',

  // JAVASCRIPT
  '/js/about.js',
  '/js/accounts.js',
  '/js/categories.js',
  '/js/idbstore.js',
  '/js/index.js',
  '/js/jquery-3.3.1.min.js',
  '/js/jquery.maskMoney.min.js',
  '/js/materialize.min.js',
  '/js/script.js',
  '/js/settings.js',
  '/js/transactions.js',

  // CSS
  '/css/about.css',
  '/css/accounts.css',
  '/css/categories.css',
  '/css/index.css',
  '/css/settings.css',
  '/css/style.min.css',
  '/css/transactions.css',

  // HTML
  '/about.html',
  '/accounts.html',
  '/categories.html',
  '/index.html',
  '/settings.html',
  '/transactions.html',
  '/index.html?launcher=true',

  // JSONS
  '/default_categories.json',
  /*
    DEAR READER,
    ADD A LIST OF YOUR ASSETS THAT
    YOU WANT TO WORK WHEN OFFLINE
    TO THIS ARRAY OF URLS
  */
];
