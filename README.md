# Firebase Push Notification Integration in React.js

#### Table of Contents

-   Introduction
-   Prerequisites
-   Integration Steps
-   Testing
-   Resources

#### Introduction

Push notifications are alerts that are "pushed" to a user's device by apps, even when those apps aren't open. In the case of web push notifications, the web app receives messages pushed to it from a server at any time. This includes when the application is active or inactive or not open in the browser and when the browser is inactive. Firebase Cloud Messaging is a cross-platform messaging solution that lets you reliably send these messages at no cost.

In this doc, we are going to be walking through how to set up Firebase Cloud Messaging to receive web push notifications in your React.js app.

#### Prerequisites

-   Node.js and npm installed on your machine.
-   A Firebase project set up at Firebase Console.
-   Firebase configuration added to your React.js project.

#### Integration Steps

##Step 1: Install Firebase SDK

```
$ npm install firebase
```

##Step 2: Set Up Firebase in Your React App

-   Initialize Firebase in your React app. Create a firebase.js file in your project with the following content

```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'VAPID KEY' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};
```

Replace the placeholder values with your actual Firebase project configuration

##Step 3: Request Permission and Get Token

-   In your main React component, request notification permission and get the device token

```
import logo from './logo.svg';
import './App.css';
import { requestForToken, messaging } from './firebase';
import { onMessage } from 'firebase/messaging';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    requestForToken();

    onMessage(messaging, (payload) => {
      console.log("payload", payload)

    });
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

##Step 4: Handle Incoming Messages

-   Handle incoming messages in your app. Modify the firebase.js file to include the message handler

```
onMessage(messaging, (payload) => {
    console.log("payload", payload)

});
```

##Step 5: Handle background notification

-   Create firebase-messaging-sw.js file in your public directory

```
// Scripts for firebase and firebase messaging
import { initializeApp } from "firebase/app";
import { getMessaging,onBackgroundMessage } from 'firebase/messaging-sw';

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
};

const fireApp = initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = messaging(fireApp);

onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
});
```

### Testing

-   your project dashboard, scroll to the Cloud Messaging section.
-   Under the Notifications tab, click on the New notification button
-   Fill in the information for Notification title and Notification text
-   Under the Device preview section, click on Send test message
-   In the popup that opens, enter the client token that is logged in the console as the FCM registration token and press the + button
-   Make sure that the FCM token is checked and click on Test. You could also decide to fill in the entire Compose notification section and press the Review button at the bottom of the page to have it sent to multiple target apps.

## Note: To see a notification banner when notifications are received in the background, make sure to turn on the feature for your browser under your system's notification settings

### Conclusion

You have successfully integrated Firebase Cloud Messaging for push notifications in your React.js application. This POC provides a basic implementation, and you can extend it based on your application's requirements.
Note: Ensure to handle security aspects and customize the notification handling based on your application's needs. For production, consider implementing proper error handling, notification customization, and handling different scenarios (foreground/background).

### Resources

-   https://www.audreyhal.com/blog/push-notifications-with-firebase-in-react

