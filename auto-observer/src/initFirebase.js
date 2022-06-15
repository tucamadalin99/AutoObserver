import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: "618857207937",
  appId: process.env.REACT_APP_ID,
  measurementId: "G-FJERQXLFC5"
};

const app = firebase.initializeApp(config);
const messaging = getMessaging(app);

export function initFirebaseMessaging() {
  Notification.requestPermission().then((permission) => {
    console.log("Notifications accepted!", permission);
    
      getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
            console.log(currentToken, 'token');
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
        }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
        });
      }).then(token => console.log(token))
      .catch(err => console.log('Error: ' + err));
}

export const onMessageListener = () => {
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('payload', payload);
      resolve(payload);
     });
  });
}

export { firebase };