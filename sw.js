/* ### ########################################################### ### */
/* ### importing modules                                           ### */

import { del, set, get, update, entries, createStore } from './idb-keyval.js'

/* ### ########################################################### ### */
/* ### BroadcastChannel init.                                      ### */
const broadcastMeta = new BroadcastChannel('meta_app_serviceworker')


/* ### skip waiting for next cycle to upgrade service worker */
let coreAssets = [
	'./API'
]

self.addEventListener('install', (event) => {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting()

  // Cache core assets
	event.waitUntil(caches.open('app').then(function (cache) {
		for (let asset of coreAssets) {
			cache.add(new Request(asset))
      console.log('let asset...')
		}
    console.log('return cache: ' + cache)
		return cache;
	}))

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil()

  // Her kan jeg slå av "loading"-ikon på forsiden.
})

/* ### ########################################################### ### */
/* ### database-stuff                                              ### */

const currentTable = createStore('db-current', 'store-current')
const stortingetJson = createStore('db-stortinget-json', 'store-stortinget-json')

update('hello', (val) => val  = 'world5', stortingetJson);
// entries(stortingetJson).then((entries) => console.dir(entries))


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

/* ###  */
/* ### flytt til service worker ### */

/* ### ########################################################### ### */
/* ### get Sessions, how to activate it can be figured out later.  ### */
/* ### Check if new day or day past thisSession etc.               ### */
const getSessions = function (url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`)
      }
      return response.json()
    })
    .then((message) => {
      console.log('fetched message:')
      console.log(JSON.stringify(message))
    })
    .catch((error) => {
      console.dir(error)
    })
}

/* ### ########################################################### ### */
/* ### URL regexes for control switch                              ### */
// const commandUrl = /(\/API\?)/
const switchRegex = /(?<=\/API\?)\w*(?=={)/
const objectRegex = /{.*}$/
const cacheUrlRegex = /.*(?=\?)/

const getCommand = function (url) {
  let command = switchRegex.exec(url)
  command = command[0]
  return command
}

const getUrlJSON = function (url) {
  let urlJson = objectRegex.exec(url)
  urlJson = urlJson[0]
  urlJson = JSON.parse(urlJson)
  return urlJson
}

const getCacheUrl = function (url) {
  const cacheUrl = cacheUrlRegex.exec(url)
  console.log('### ######### cache url: ' + cacheUrl)
  return cacheUrl
}

/* ### ########################################################### ### */
/* ### Fetch listener + control switch                             ### */

self.addEventListener('fetch', function (event) {
  console.dir(event.request)
  const request = event.request
  const url = decodeURI(request.url)
  if (url.includes('API')) {
    let command = getCommand(url)
    let urlJson = getUrlJSON(url)
    let apiUrl = getCacheUrl(url)
    console.log('### Command: ' + command)
    console.log('### UrlJson: ' + JSON.stringify(urlJson))
    console.log('###  apiUrl: ' + apiUrl)
    console.log('### sw.js: fetch eventlistener: ' + url)
    switch (command) {
      case 'apiFetch':
        getSessions(urlJson.url)
        broadcastMeta.postMessage('### sw -> app: apiFetch: ' + urlJson)
        break
      case 'query':
        broadcastMeta.postMessage('### sw -> app: query: ' + urlJson.query)
        break
      default:
        console.log('Andre kommandoer');
    }

    // ### Fake response since the request is the point
    event.respondWith(
      (async () => {
        // Try to get the response from a cache.
        const cachedResponse = await caches.match(event.request);
        // Return it if we found one.
        if (cachedResponse) return cachedResponse;
        // If we didn't find a match in the cache, use the network.
        return new Response (null, { status: 204, url: './API' })
      })(),
    )
  }
})
