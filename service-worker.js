'use strict';

var cacheVersion = 2;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v6').then(function(cache) {
      return cache.addAll([
          'offline.html'
          
      ]);
    })
  );
});


this.addEventListener('activate', function(event) {
  var cacheWhitelist = ['v6'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log("Cache gelöscht");
          return caches.delete(key);
        }
      }));
    })
  );
});