const CACHE_NAME = 'english-learning-app-v1';
// This list includes all your essential files.
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    'https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&display=swap'
];

// Install the service worker and cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Serve cached files when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                // Not in cache - fetch from network
                return fetch(event.request);
            }
        )
    );
});

// Update cache when new service worker is activated
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
