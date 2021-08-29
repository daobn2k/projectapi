import firebase from 'firebase/app';
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyD4YsssN-23bNU-CkN3kBBvrUfg4bhq2KE",
    authDomain: "web-app-chat-93f52.firebaseapp.com",
    projectId: "web-app-chat-93f52",
    storageBucket: "web-app-chat-93f52.appspot.com",
    messagingSenderId: "696982863797",
    appId: "1:696982863797:web:54b5877a5f17804039e3fc",
    measurementId: "G-110DW9TPZB"
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export {storage,firebase as default }