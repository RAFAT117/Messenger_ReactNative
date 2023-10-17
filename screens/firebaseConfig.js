// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnuS5uqdOfXsw1WDOtlCIkRmNa4l5ppjI",
  authDomain: "reactnative-chatapp-534e6.firebaseapp.com",
  projectId: "reactnative-chatapp-534e6",
  storageBucket: "reactnative-chatapp-534e6.appspot.com",
  messagingSenderId: "258351602823",
  appId: "1:258351602823:web:5e7f5eacaddded528fec22",
  measurementId: "G-PVTEG21JSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  
  export default firebaseConfig;
  