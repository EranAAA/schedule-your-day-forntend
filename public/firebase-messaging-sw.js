importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
   apiKey: "apiKey",
   authDomain: "authDomain",
   projectId: "projectId",
   storageBucket: "storageBucket",
   messagingSenderId: "messagingSenderId",
   appId: "appId",
   measurementId: "measurementId"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
   // console.log('[firebase-messaging-sw.js] Received background message ', payload);
   const notificationTitle = 'Background Message Title';
   const notificationOptions = {
      title: payload.title,
      body: payload.body,
      icon: '/logo.png'
   };

   self.registration.showNotification(notificationTitle,
      notificationOptions);
});
