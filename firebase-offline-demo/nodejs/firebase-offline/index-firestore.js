var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://first-firestore.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
let firestore = admin.firestore();

let data = {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA'
};

// Add a new document in collection "cities" with ID 'LA'
let setDoc = firestore.collection('cities').doc('LA').set(data).then(() => {
    console.log('document update successfully', JSON.stringify(data));
}).catch((error) => {
    console.log(error)
});

/*
(node:21993) UnhandledPromiseRejectionWarning: FetchError: request to https://www.googleapis.com/oauth2/v4/token failed, reason: getaddrinfo EAI_AGAIN www.googleapis.com
    at ClientRequest.<anonymous> (/home/prateekk/firebase-offline/node_modules/node-fetch/lib/index.js:1455:11)
    at ClientRequest.emit (events.js:196:13)
    at TLSSocket.socketErrorListener (_http_client.js:402:9)
    at TLSSocket.emit (events.js:196:13)
    at emitErrorNT (internal/streams/destroy.js:91:8)
    at emitErrorAndCloseNT (internal/streams/destroy.js:59:3)
    at processTicksAndRejections (internal/process/task_queues.js:83:17)
(node:21993) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:21993) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
Error: Deadline exceeded
    at Http2CallStream.<anonymous> (/home/prateekk/firebase-offline/node_modules/@grpc/grpc-js/build/src/client.js:96:45)
    at Http2CallStream.emit (events.js:201:15)
    at /home/prateekk/firebase-offline/node_modules/@grpc/grpc-js/build/src/call-stream.js:71:22
    at processTicksAndRejections (internal/process/task_queues.js:81:9) {
  code: 4,
  details: 'Deadline exceeded',
  metadata: Metadata { options: undefined, internalRepr: Map {} }
}
(node:21993) PromiseRejectionHandledWarning: Promise rejection was handled asynchronously (rejection id: 1)

*/
