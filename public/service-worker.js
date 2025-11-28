// public/service-worker.js

const CACHE_NAME = "ccl-precache-v1";
const RUNTIME_CACHE = "ccl-runtime-cache";

// Pre-cache essential assets (shell)
const PRECACHE_ASSETS = [
  "/",                  //corresponds to app/page.tsx in production
  "/offline.html",            
  "/globals.css",             
  "/favicon.png",             
  "/apple-icon.png",          
  "/assets/ccl.logo.png",     
  "/assets/ccl.logo.jpg",     
  "/assets/ccl.logo.svg",     
  "/assets/ccl.logo.webp",    
  "/_next/static/*",          
];

// Assets to cache at runtime (first visit)
const RUNTIME_ASSETS = [
  "/assets/images/",          
  "/assets/icons/",           
];

// Install event: cache pre-cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

// Activate event: clean old caches
self.addEventListener("activate", (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event: respond with cache or network
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Navigation requests (HTML)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/offline.html"))
    );
    return;
  }

  // Runtime caching for images & icons
  if (RUNTIME_ASSETS.some(url => event.request.url.includes(url))) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request).then((response) => {
          return caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // Fallback for everything else
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => cachedResponse || fetch(event.request))
  );
});
