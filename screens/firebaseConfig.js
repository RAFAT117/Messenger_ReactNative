import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

  
  export default firebaseConfig;
  