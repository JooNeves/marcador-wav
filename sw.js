/* Marcador WAV — service worker: cache-first para a app, para funcionar sem rede. */
var CACHE = 'marcador-wav-v8';
var ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ return k === CACHE ? null : caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;
  var url = new URL(req.url);
  if(url.origin === self.location.origin){
    // app própria: cache primeiro, rede em segundo, e actualiza a cache em silêncio
    e.respondWith(caches.match(req).then(function(hit){
      var net = fetch(req).then(function(res){
        if(res && res.ok) caches.open(CACHE).then(function(c){ c.put(req, res.clone()); });
        return res;
      })['catch'](function(){ return hit; });
      return hit || net;
    }));
  } else {
    // tipos de letra e afins: rede primeiro, cache como reserva
    e.respondWith(fetch(req).then(function(res){
      if(res && (res.ok || res.type === 'opaque')){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); });
      }
      return res;
    })['catch'](function(){ return caches.match(req); }));
  }
});
