// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { VAPID, firebaseConfig } from '../config/constant';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const App = initializeApp(firebaseConfig);

export const messaging = getMessaging(App);
console.log(messaging);

export const requestForToken = async () => {
	const notification = await Notification.requestPermission();
	console.log(notification);
	console.log('sdsdsds', VAPID);
	if (notification === 'granted') {
		const currentToken = await getToken(messaging, { vapidKey: VAPID });
		console.log('currentToken', currentToken);
	}
};
