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
  console.log('app.js gjør en fetch() mot api.stortinget.no')
});
