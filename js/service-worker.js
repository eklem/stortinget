console.log('Service Worker: Hello world without an event listener!')

/* ### get Sessions, how to activate it can be figured out later. Check if new day or day past thisSession etc. */
const getSessions = function () {
  fetch('https://data.stortinget.no/eksport/sesjoner?format=json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      console.log('fetched data:')
      console.log(JSON.stringify(data))
    })
    .catch((error) => {
      console.dir(error)
    })
}

console.log('after')

addEventListener('activate', function (event) {
  console.log('Service Worker: Hello world!')
  fetch('https://data.stortinget.no/eksport/sesjoner?format=json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      console.log('fetched data inside event listener:')
      console.log(JSON.stringify(data))
    })
    .catch((error) => {
      console.dir(error)
    })
  getSesssions()
})
