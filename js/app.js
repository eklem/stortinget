console.log('First try to regirster service worker.')

/* ### Service worker registration */
if ("serviceWorker" in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register("./js/service-worker.js").then(
    (registration) => {
      console.log("Service worker registration succeeded:", registration);
    },
    (error) => {
      console.error(`Service worker registration failed: ${error}`);
    },
  );
} else {
  console.error("Service workers are not supported.");
}

/* ### BroadcastChannel connection */
const bc = new BroadcastChannel('stortinget')

console.log('Then hello app module!')

/* ### Receiving messages */
bc.onmessage = (event) => {
  console.log('app.js receiving message:');
  console.log(event);
}

const button = document.querySelector('button');
button.addEventListener("click", (event) => {
  bc.postMessage('Klikk fra app.js')
})
