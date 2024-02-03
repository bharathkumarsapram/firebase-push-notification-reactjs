import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';
const firebaseConfig = {
	apiKey: 'AIzaSyC5wPP9vgjdin94-AgbIeuivySv2-NI5zg',
	authDomain: 'global-impulse-392611.firebaseapp.com',
	projectId: 'global-impulse-392611',
	storageBucket: 'global-impulse-392611.appspot.com',
	messagingSenderId: '540241565639',
	appId: '1:540241565639:web:6cab3ba5ba5e8b71a4abe2',
	measurementId: 'G-4M6EYP9Z56',
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	// Customize notification here
	const notificationTitle = 'Background Message Title';
	const notificationOptions = {
		body: 'Background Message body.',
		icon: '/firebase-logo.png',
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
