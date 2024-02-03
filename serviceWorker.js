const ToMar24 = "dev-tomar24-site-v1";
const assets = [
  "/",
  "/index.html",
  "/js/style.css",
  "/js/main.js",
  "/js/argument.js",
  "/js/puzzle.js",
  "/js/puzzles.js",
  "/serviceWorker.js",
  "/js/stats.js",
  "/js/style.css",
  "/icons/ToMar24144.png"
];
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(ToMar24).then(cache => {
      cache.addAll(assets);
    })
  );
});
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});