// sw.js

const CACHE_NAME = 'my-cache-v1'; // Name your cache
const URLs_TO_CACHE = [
  '/', // Home page
  '/index.html', // Index page (add more if needed)
  './css/styles.css', // CSS file
  './js/main.js', // JavaScript file
   // Example image, add other images you need
];

// Install event - caching assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching essential files');
      return cache.addAll(URLs_TO_CACHE);
    })
  );
});

// Fetch event - serving cached files if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If cache has the request, return it, else fetch from network
      return cachedResponse || fetch(event.request);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
