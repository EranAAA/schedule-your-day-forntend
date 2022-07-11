
export const notificationScheduled = async (title, body, tag, time) => {
   if (!'PushManager' in window) return console.log('Push supported on this browser, disable or hide UI.')
   if (!'showTrigger' in Notification.prototype) return console.log('Notification Triggers supported')
   if (!'serviceWorker' in navigator) return console.log('Service Worker supported on this browser, disable or hide UI.')

   try {
      const registration = await navigator.serviceWorker.register('/service-worker.js')
      console.log('Service worker successfully registered.')
      await registration.showNotification(
         title,
         {
            body,
            tag,
            showTrigger: new TimestampTrigger(time),
            icon: '../assets/imgs/logo.png',
            image: '../assets/imgs/logo.png',
            requireInteraction: true
         })
      return registration
   } catch (error) {
      console.error('Unable to register service worker.', error);
   }
}

export const notificationCanceled = async (tag) => {
   try {
      const registration = await navigator.serviceWorker.getRegistration();
      const notifications = await registration.getNotifications({
         tag,
         includeTriggered: true,
      });
      notifications.forEach((notification) => notification.close());
      return notifications
   } catch (error) {
      console.error('Unable to canceling a scheduled notification.', error);
   }

}
