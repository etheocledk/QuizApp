const CACHE_NAME = 'quiz-app-v1'; 
const urlsToCache = [
  '/', 
  '/quiz', 
  '/src/assets/main.css', 
  '/questions.json', 
];

// Événement d'installation pour mettre en cache les ressources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching resources');
      return cache.addAll(urlsToCache);
    })
  );
});

// Événement `fetch` pour servir des ressources depuis le cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; 
      }
      return fetch(event.request); 
    })
  );
});

// Événement d'activation pour gérer le nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]; 
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); 
          }
        })
      );
    })
  );
});
