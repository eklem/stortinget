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

/* ### BroadcastChannel connections */
const broadcastMetaAppSw = new BroadcastChannel('meta_app_serviceworker')
const broadcastMetaSwApp = new BroadcastChannel('meta_serviceworker_app')
const broadcastQueryAppSw = new BroadcastChannel('query_app_serviceworker')
const broadcastResultSwApp = new BroadcastChannel('result_serviceworke_app')

console.log('Then hello app module!')

/* ### Receiving messages */
broadcastMetaSwApp.onmessage = (event) => {
  console.log('app.js receiving message:');
  console.log(event.data);
}

const button = document.querySelector('button');
button.addEventListener("click", (event) => {
  broadcastMetaAppSw.postMessage('Klikk fra app.js')
})
