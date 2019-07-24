var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://first-firestore.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var usersRef = db.ref("users");
usersRef.set({
    alanisawesome: {
        date_of_birth: "June 23, 1912",
        full_name: "Alan Turing"
    },
    gracehop: {
        date_of_birth: "December 9, 1906",
        full_name: "Grace Hopper"
    }
}).then(() => {
    console.log('document update successfully');
});

var ref = db.ref("users");
ref.once("value", function (snapshot) {
    console.log(snapshot.val());
});

/*
{ alanisawesome: { date_of_birth: 'June 23, 1912', full_name: 'Alan Turing' },
  gracehop:
   { date_of_birth: 'December 9, 1906', full_name: 'Grace Hopper' } }
[2019-07-24T13:05:22.868Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:05:23.494Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:05:24.280Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:05:24.730Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:05:25.695Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:05:26.550Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:05:27.556Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:05:29.290Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:05:35.223Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:05:35.600Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:05:37.399Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:05:49.517Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:05:53.366Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:06:03.895Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:06:28.948Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
[2019-07-24T13:06:30.023Z]  @firebase/database: FIREBASE WARNING: {"code":"app/invalid-credential","message":"Credential implementation provided to initializeApp() via the \"credential\" property failed to fetch a valid Google OAuth2 access token with the following error: \"Error fetching access token: Error while making request: getaddrinfo EAI_AGAIN accounts.google.com accounts.google.com:443. Error code: EAI_AGAIN\"."} 
document update successfully
*/
