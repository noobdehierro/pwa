self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("static-v1").then((cache) => {
      cache.addAll([
        "/",
        "/index.html",
        "/css/styles.css",
        "/js/app.js",
        "/js/jquery.com_jquery-3.7.0.min.js",
        "/js/jquery.validate.min.js",
        "https://cdn.jsdelivr.net/npm/sweetalert2@11",
        "/images/fondo.jpg",
        "/manifest.json",
        "/images/icon-48x48.png",
        "/images/icon-96x96.png",
        "/images/icon-192x192.png",
        "/images/icon-512x512.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log(e);
  console.log(e.request);
  e.respondWith(caches.match(e.request));
  // event.waitUntil(

  // );
});
