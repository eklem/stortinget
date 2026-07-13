console.log('Service Worker: Hello world without an event listener!')

/* ### BroadcastChannel connections */
const broadcastMeta = new BroadcastChannel('meta_app_serviceworker')

/* ### get Sessions, how to activate it can be figured out later. Check if new day or day past thisSession etc. */
const getSessions = function (url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      console.log('fetched data:')
      console.log(JSON.stringify(data))
      broadcastMeta.postMessage(JSON.stringify(data))
    })
    .catch((error) => {
      console.dir(error)
    })
}

console.log('after')

/* ### Receiving messages */
broadcastMeta.onmessage = (message) => {
  console.log('service-worker.js receiving message:');
  console.log(message);
  console.log('Henter sesjoner fra stortinget med getSessions()');
  getSessions('https://data.stortinget.no/eksport/sesjoner?format=json')
}

/* ### Messages error */
broadcastMeta.onmessageerror = (error) => {
  console.log('onMessageError: something happened?:');
  console.log(error);
}

/* ### skip waiting for next cycle to upgrade service worker */

self.addEventListener("install", (event) => {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting()

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil()
})
