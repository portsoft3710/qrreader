//キャッシュ名。識別用
var cacheName = 'qr';

//キャッシュしたいファイルのリストを登録する
var filesToCache = [
   'index.html'
];

//ブラウザにインストールする
 self.addEventListener('install',function(event){
  event.waitUntil(
   caches.open(cacheName).then(function(cache){
        //return cache.addAll(filesToCache.map(url => new Request(url, {credentials: 'same-origin'})));
    })
   );
  });


//
self.addEventListener('activate',function(event){
    event.waitUntil(
    caches.keys().then(function(keyList){
      return Promise.all(keyList.map(function(key){
        if(key !== cacheName){
        return caches.delete(key);
         }
      }));
    })
   );
   return self.clients.claim();
});


//
self.addEventListener('fetch',function(event){
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
    }
    event.respondWith(
     caches.match(event.request).then(function(response){
     return response || fetch(event.request);

    })
   );
});
