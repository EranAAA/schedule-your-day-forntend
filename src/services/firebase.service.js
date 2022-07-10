
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
   apiKey: "apiKey",
   authDomain: "authDomain",
   projectId: "projectId",
   storageBucket: "storageBucket",
   messagingSenderId: "messagingSenderId",
   appId: "appId",
   measurementId: "measurementId"
};

export const app = initializeApp(firebaseConfig);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();

export const featchToken = () => {

   return getToken(messaging, { vapidKey: 'vapidKey' }).then((currentToken) => {
      if (currentToken) {
         return currentToken
      } else {
         console.log('No registration token available. Request permission to generate one.');
      }
   }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
   });
}

export const sendNotification = async (myToken) => {
   let key = 'service key'
   let to = myToken
   let notification = {
      'title': 'Portugal vs. Denmark',
      'body': '5 to 1',
      'icon': 'firebase-logo.png',
      'click_action': 'http://localhost:8081'
   };

   try {
      const config = {
         method: 'post',
         url: 'https://fcm.googleapis.com/fcm/send',
         data: JSON.stringify({ 'notification': notification, 'to': to }),
         headers: { 'Authorization': 'key=' + key, 'Content-Type': 'application/json'}
     }
     let res = await axios(config)
      console.log('Succesfully Sent', res);
   } catch (error) {
      console.error(error);
   }
}
