console.log('Service Worker: Hello world without an event listener!')

/* ### BroadcastChannel connections */
const broadcastMetaAppSw = new BroadcastChannel('meta_app_serviceworker')
const broadcastMetaSwApp = new BroadcastChannel('meta_serviceworker_app')
const broadcastQueryAppSw = new BroadcastChannel('query_app_serviceworker')
const broadcastResultSwApp = new BroadcastChannel('result_serviceworke_app')

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
      broadcastMetaSwApp.postMessage(JSON.stringify(data))
    })
    .catch((error) => {
      console.dir(error)
    })
}

console.log('after')

/* ### Receiving messages */
broadcastMetaAppSw.onmessage = (event) => {
  console.log('service-worker.js receiving message:');
  console.log(event);
  console.log('Henter sesjoner fra stortinget med getSessions()');
  getSessions('https://data.stortinget.no/eksport/sesjoner?format=json')
}