import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCQmg07SqUwnRJy9mgr25bvG2V7n8zn5hY",
  authDomain: "agm-eventeer.firebaseapp.com",
  databaseURL: "https://agm-eventeer.firebaseio.com",
  projectId: "agm-eventeer",
  storageBucket: "agm-eventeer.appspot.com",
  messagingSenderId: "104866882557",
  appId: "1:104866882557:web:1b18d2f58ed65c67f9af94",
  measurementId: "G-5S0KER31QV"
});


const db = firebase.firestore(firebaseApp); // Initialize firestore
const auth = firebase.auth(firebaseApp); // Initialize firebase auth

db.enablePersistence({ synchronizeTabs: true });

console.log('firebase init');

export { firebase, firebaseApp, auth, db };
