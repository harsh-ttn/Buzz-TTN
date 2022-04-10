// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD30hJ_ofmgIFowqL1ftezVNRP1yLRcALs",
  authDomain: "buzz-app-ttn.firebaseapp.com",
  projectId: "buzz-app-ttn",
  storageBucket: "buzz-app-ttn.appspot.com",
  messagingSenderId: "88491495560",
  appId: "1:88491495560:web:660cee6ec1c4e95f68cf3d",
  measurementId: "G-Y6FCXL54BP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);