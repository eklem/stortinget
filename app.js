/* ### BroadcastChannel connections */
const broadcastMeta = new BroadcastChannel('meta_app_serviceworker')

console.log('First try to regirster service worker:')
/* ### Service worker registration */
if ("serviceWorker" in navigator) {
  // Register a service worker hosted at the root of the
  navigator.serviceWorker.register(window.location.origin + window.location.pathname + 'sw.js', { scope: window.location.origin + window.location.pathname}).then (
    (registration) => {
      console.log("Service worker registration succeeded:", registration);
    },
    (error) => {
      console.error(`Service worker registration failed: ${error}`)
    },
  );
} else {
  console.error("Service workers are not supported.");
}

/* ### get Sessions, how to activate it can be figured out later. Check if new day or day past thisSession etc. */
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

console.log('Then hello app module!')


/* ### Receiving messages */
broadcastMeta.onmessage = (message) => {
  console.log('app.js receiving message:');
  console.log(message.data);
}

/* ### Messages error */
broadcastMeta.onmessageerror = (error) => {
  console.log('onMessageError: something happened:');
  console.log(error);
}


/* ### Fetch button action */
const buttonFetch = document.querySelector('button#fetch');

buttonFetch.addEventListener("click", (event) => {
  console.log('Henter sesjoner fra Stortinget med getSessions()')
  getSessions('https://data.stortinget.no/eksport/sesjoner?format=json')
  // Når API-spørring er mottatt, så må noe info lagres i localstorage
})

/* ### Search button action */
const searchField = document.getElementById('search')

searchField.addEventListener('keyup', (event) => {
  const query = document.getElementById('search').value
  console.log('App.js trying to send message to service worker after text input: ' + query)
  broadcastMeta.postMessage('Søketerm sendes fra app.js: ' + query)
})