self.addEventListener('install', function() {
  console.log('Service Worker: Installed');
});

self.addEventListener('activate', function() {
  console.log('Service Worker: Activated');
});

self.addEventListener('fetch', function() {
  // Empty fetch handler is enough to pass some PWA requirements
});
