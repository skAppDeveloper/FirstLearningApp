import firebase from "firebase";

import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCY5IulIgU3y16mv8ZeVmbEUMKlACL2Wr4",
  authDomain: "rnprojects-48661.firebaseapp.com",
  projectId: "rnprojects-48661",
  storageBucket: "rnprojects-48661.appspot.com",
  messagingSenderId: "1082415383574",
  appId: "1:1082415383574:web:4ccf32ddd9df8ada4a2137",
  measurementId: "G-XL4158PTX0",
};
if (firebase.apps.length > 0 === false) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
