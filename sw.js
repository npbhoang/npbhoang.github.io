/* ---------------------------------------------------------------------------
   Self-destroying service worker.

   The previous Gatsby site used gatsby-plugin-offline, which registered a
   service worker at /sw.js. That worker keeps serving the old cached app to
   returning visitors — showing a stale page, firing the old Google Analytics
   tracker, and throwing "The result of this StaticQuery could not be fetched."

   This replacement unregisters that worker, deletes its caches, and reloads any
   open tabs so visitors fall through to the current static site. Once every
   client has updated, this worker is gone too. Nothing on the new site
   registers a service worker, so no fresh worker takes its place.
   --------------------------------------------------------------------------- */

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    (async function () {
      // Unregister this (and thereby the old Gatsby) service worker.
      await self.registration.unregister();

      // Drop every Cache Storage bucket left behind by the old site.
      if (self.caches && self.caches.keys) {
        var keys = await self.caches.keys();
        await Promise.all(keys.map(function (k) { return self.caches.delete(k); }));
      }

      // Force any open tabs to reload from the network (the live static site).
      var clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(function (client) {
        if ('navigate' in client) client.navigate(client.url);
      });
    })()
  );
});
