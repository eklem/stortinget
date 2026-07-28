console.log('Service Worker: Hello world without an event listener!')

/* ### BroadcastChannel connections */
const broadcastMeta = new BroadcastChannel('meta_app_serviceworker')


/* ### skip waiting for next cycle to upgrade service worker */
self.addEventListener('install', (event) => {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting()

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil()

  // Her kan jeg slå av "loading"-ikon på forsiden.
})

/* ### Make sure the clients use this service worker */
self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// /* ### Receiving messages */
// broadcastMeta.addEventListener('message', (event) => {
//   console.log(event)
//   console.log('sw.js receiving message:' + event.data)
//   broadcastMeta.postMessage('søketermer mottatt, og nå "returnert"')
// })

/* ### Messages error */
broadcastMeta.addEventListener('messageerror', (error) => {
  console.log('onMessageError: something happened in sw.js?:');
  console.log(error);
})

/* ### ########################################################### ### */
/* ### URL regexes                                                 ### */
const switchRegex = /(?<=\/#)\w*(?=={)/
const objectRegex = /{.*}$/

/* ### ########################################################### ### */
/* ### Fetch listener + control switch                             ### */

self.addEventListener('fetch', function (event) {
  const request = event.request
  const url = decodeURI(request.url)
  console.log('url: ' + url)
  let command = switchRegex.exec(url)
  command = command[0]
  console.log('command: ' + command)
  let urlJson = (objectRegex.exec(url))
  urlJson = urlJson[0]
  console.log(urlJson)
  urlJson = JSON.parse(urlJson)
  
  console.log('### sw.js: fetch eventlistener: ' + url)
  switch (command) {
    case 'apiFetch':
      console.log('Hent JSON fra api.stortinget.no')
      broadcastMeta.postMessage('### sw -> app: apiFetch: ' + urlJson)
      break
    case 'query':
      console.log('Gjør et søk på: ' + urlJson.query)
      broadcastMeta.postMessage('### sw -> app: query: ' + urlJson.query)
      break
    default:
      console.log('Andre filer');
  }
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


