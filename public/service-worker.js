const CACHE_NAME = "ccl-precache-v4";
const RUNTIME_CACHE = "ccl-runtime-cache";

// Pre-cache landing page + essential assets
const PRECACHE_ASSETS = [
  "/",               // Landing page (Home + ContactSection)
  //"/index.html",     // Ensure index file is cached
  "/offline.html",
  "/favicon.png",
  "/apple-icon.png",
];

// Install event: pre-cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
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

// Fetch event
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Handle navigation requests (HTML)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // NEVER overwrite landing page
          if (url.pathname === "/" || url.pathname.endsWith("index.html")) {
            return response;
          }

          return caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(async () => {
          // 1. Try exact match
          const cachedPage = await caches.match(event.request);
          if (cachedPage) return cachedPage;

          // 2. Always serve landing page if offline
          const cachedLanding = await caches.match("/") || await caches.match("/index.html");
          if (cachedLanding) return cachedLanding;

          // 3. Fallback
          return caches.match("/offline.html");
        })
    );
    return;
  }

  // Runtime caching: images, JS, CSS
  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/_next/") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css")
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request)
          .then((response) =>
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            })
          )
          .catch(() => caches.match(event.request)); // fallback to cache if offline
      })
    );
    return;
  }

  // Default network-first fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Allow skip waiting for updates
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});
