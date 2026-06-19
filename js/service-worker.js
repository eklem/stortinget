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
      console.log(JSON.stringify(data))
      document.getElementById('sesjoner').innerHTML= JSON.stringify(data, false , 2)
      return(data)
    })
    .catch((error) => {
      const span = document.createElement("span")
      document.getElementById('sesjoner').innerHTML= `Error: ${error.message}`
    })
}

self.addEventListener('activated', function (event) {
  console.log('Service Worker: Hello world!')
  getSesssions()
})
