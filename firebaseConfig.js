rimport { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAqKID7sjCKfckEDiGOLPEp5b2i0N7wv_o',
  authDomain: 'digibank-f63d0.firebaseapp.com',
  projectId: 'digibank-f63d0',
  storageBucket: 'digibank-f63d0.appspot.com',
  messagingSenderId: '415340726884',
  appId: '1:415340726884:web:f5dad6c46be19e033d2d71',
  measurementId: 'G-KWYW33RP5P',
};


const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
