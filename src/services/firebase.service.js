
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
   apiKey: "AIzaSyAp7-9uhBHa_nUd1wKOe6HMHyXuzEceg94",
   authDomain: "scheduleyourday-3b616.firebaseapp.com",
   projectId: "scheduleyourday-3b616",
   storageBucket: "scheduleyourday-3b616.appspot.com",
   messagingSenderId: "1066725164973",
   appId: "1:1066725164973:web:d47130ca645b4183fac324",
   measurementId: "G-RFVGEP2VNX"
};

export const app = initializeApp(firebaseConfig);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();

export const featchToken = () => {

   return getToken(messaging, { vapidKey: 'BH1OfEzCFbnqWVIiV2hFjZ_JIh2hxWNpiYvfWnMYOqQkBFn3LF8rBzpDWoq1XXgtPqu5vbRK2uLsyKhCZUsM-34' }).then((currentToken) => {
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
   let key = 'AAAA-F3GR60:APA91bGg3Zelp6usSHfY4vv8lgFWUTZ5l8XWTz1DQmR3QGwjceJY26mPfddDe8qYMRIRFJ39EvbINeKd3Q_al2_IANEqf8RZFVCNH2u82yfrPzMt8O7XkdArIOul-1vICqBzW-EAyJ3q'
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
