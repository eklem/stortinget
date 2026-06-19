console.log('Service Worker: Hello world without an event listener!')

self.addEventListener('activate', function (eveent) {
  console.log('Service Worker: Hello world!')
})
