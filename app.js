/* ### ########################################################### ### */
/* ### Modules                                                     ### */

import { html, reactive } from 'https://esm.sh/@arrow-js/core'

/* ### ########################################################### ### */
/* ### BroadcastChannel init.                                      ### */

const broadcastMeta = new BroadcastChannel('meta_app_serviceworker')

/* ### ########################################################### ### */
/* ### Service worker registration                                 ### */

if ("serviceWorker" in navigator) {
  // Register a service worker hosted at the root of the
  navigator.serviceWorker.register(window.location.origin + window.location.pathname + 'sw.js', { 
    type: 'module',
    scope: window.location.origin + window.location.pathname
  })
  .then (
    (registration) => {
      console.log("Service worker registration succeeded:", registration)
    },
    (error) => {
      console.error(`Service worker registration failed: ${error}`)
    },
  )
} else {
  console.error("Service workers are not supported.")
}


/* ### ########################################################### ### */
/* ### Mottak av meldinger fra app.js                              ### */

broadcastMeta.onmessage = (message) => {
  console.log('app.js receiving message:')
  console.log(message.data)
}

broadcastMeta.onmessageerror = (error) => {
  console.log('onMessageError: something happened:')
  console.log(error)
}


/* ### Fetch button action */
// const buttonFetch = document.querySelector('button#fetch')

// buttonFetch.addEventListener("click", (event) => {
//   console.log('Sender fetch-spørring til sw.js med fetch()')
//   fetch(window.location.origin + window.location.pathname + '?apiFetch={"url": "https://data.stortinget.no/eksport/sesjoner?format=json"}')
//   // Når API-spørring er mottatt, så må noe info lagres i localstorage
// })

/* ### Search button action */
const searchField = document.getElementById('search')

searchField.addEventListener('keyup', (event) => {
  const query = document.getElementById('search').value
  console.log('query: "' + query + '"')
  console.log('App.js trying to send message to service worker after text input: ' + query)
  fetch(window.location.origin + window.location.pathname + 'API?query={"query": "' + query + '"}')
})