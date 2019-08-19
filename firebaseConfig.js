import Firebase from 'firebase';
import { config } from 'firebase-functions';

const firebaseConfig = {
    apiKey: "AIzaSyAHeRZz3AEJ3FcdkvHXDyUknlCOROlR4V0",
    authDomain: "float-61301.firebaseapp.com",
    databaseURL: "https://float-61301.firebaseio.com",
    projectId: "float-61301",
    storageBucket: "float-61301.appspot.com",
    messagingSenderId: "551555637499",
    appId: "1:551555637499:web:500f3185871e08a9"
  };
let app = Firebase.initializeApp(config);
export const db = app.database();

