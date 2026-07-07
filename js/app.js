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
