// Service worker: rede primeiro (atualiza sozinho com internet), cache como reserva offline.
// Ao publicar uma versão nova, troque o número aqui, em version.json e em APP_VERSION no index.html.
var CACHE = 'contador-calorias-1.0.0';
var FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', function(e){ self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); })); });
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.endsWith('version.json')) return;
  e.respondWith(fetch(e.request).then(function(r){
    if (r && r.ok){ var copy = r.clone(); caches.open(CACHE).then(function(c){ c.put(e.request, copy); }); }
    return r;
  }).catch(function(){ return caches.match(e.request, {ignoreSearch:true}).then(function(m){ return m || caches.match('index.html'); }); }));
});
