const ToMar24 = "dev-tomar24-site-v1";
const assets = [
  "/",
  "/index.html",
  "/serviceWorker.js",
  "/js/style.css",
  "/js/main.js",
  "/js/argument.js",
  "/js/puzzle.js",
  "/js/puzzles24.js",
  "/js/stats.js",
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
    caches.match(fetchEvent.request, {ignoreSearch: true}).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});