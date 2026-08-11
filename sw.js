const CACHE_NAME = "cikuya-v2"; // ganti v2 biar cache lama ke-reset
const urlsToCache = [
  "./", 
  "./index.html", 
  "./manifest.json",
  "./anime-bg.png", 
  "./musik4.mp3", 
  "./icon-192.png", 
  "./icon-512.png"
  // "./qris.png" // tambahin kalo pake qris
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Biar cache lama kehapus pas update
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});