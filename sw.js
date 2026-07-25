console.log('Service Worker: Hello world without an event listener!')

/* ### BroadcastChannel connections */
const broadcastMeta = new BroadcastChannel('meta_app_serviceworker')

console.log('after')

/* ### skip waiting for next cycle to upgrade service worker */
self.addEventListener('install', (event) => {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting()

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil()

  // Her kan jeg slå av "loading"-ikon på forsiden.
})

self.addEventListener('stateChange', (event) => {
  console.log('State chage: ' + event)
})

/* ### Receiving messages */
broadcastMeta.addEventListener('message', (event) => {
  console.log(event)
  console.log('sw.js receiving message:' + event.data)
  broadcastMeta.postMessage('søketermer mottatt, og nå "returnert"')
})

/* ### Messages error */
broadcastMeta.addEventListener('messageerror', (error) => {
  console.log('onMessageError: something happened in sw.js?:');
  console.log(error);
})

/* ### Fetch listener */
self.addEventListener('fetch', function (event) {
  let request = event.request
  console.log('fetch eventlistener: ')
  console.dir(request)
  
  // // Network first for local files
  // if (request.headers.get('Accept').includes('image') || request.headers.get('Accept').includes('text/html') || request.headers.get('Accept').includes('text/css') || request.headers.get('Accept').includes('font/woff2')) {
  //   console.log('hello file cached')
  //   event.respondWith(
  //     fetch(request).then(function (response) {
  //       return response;
  //     }).catch(function (error) {
  //       return caches.match(request).then(function (response) {
  //         return response;
  //       })
  //     })
  //   )
  // }
})
