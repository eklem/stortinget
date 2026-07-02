console.log('Service Worker: Hello world without an event listener!')

/* ### BroadcastChannel connection */
const bc = new BroadcastChannel('eklem.github.io/stortinget')

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
      bc.postMessage(JSON.stringify(data))
    })
    .catch((error) => {
      console.dir(error)
    })
}

console.log('after')

/* ### Receiving messages */
bc.onmessage = (event) => {
  console.log('service-worker.js receiving message:');
  console.log(event);
  console.log('Henter sesjoner fra stortinget med getSessions()');
  getSessions('https://data.stortinget.no/eksport/sesjoner?format=json')
}