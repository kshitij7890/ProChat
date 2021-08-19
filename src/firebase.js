import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyAeLdGeCV70WHiZ2DMAZktDBRg6FFY5SLA",
    authDomain: "prochat-27d24.firebaseapp.com",
    projectId: "prochat-27d24",
    storageBucket: "prochat-27d24.appspot.com",
    messagingSenderId: "312661930988",
    appId: "1:312661930988:web:c5e0d9da814e9c23dc86c9"
  }).auth();