const CACHE_NAME = 'crud-pwa-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/vite.svg',
    '/src/main.jsx'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request)
                .then((res) => {
                    // optionally cache new requests
                    return res;
                })
                .catch(() => {
                    // fallback could go here
                });
        })
    );
});
