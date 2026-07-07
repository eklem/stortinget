console.log('First try to regirster service worker:')

/* ### Service worker registration */
if ("serviceWorker" in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register("/stortinget/js/service-worker.js", { scope: "/stortinget/" }).then(
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
const broadcastMeta = new BroadcastChannel('meta_app_serviceworker')

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

const button = document.querySelector('button');
button.addEventListener("click", (event) => {
  console.log('App.js trying to send message to service worker after click')
  broadcastMeta.postMessage('Klikk fra app.js')
})
