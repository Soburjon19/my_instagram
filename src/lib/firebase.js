import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import "firebase/compat/storage";

const config = {
  apiKey: "AIzaSyDu9OSGxh2qUa18_gQBTHg464q1MCn6t4Y",
  authDomain: "insta-9de9c.firebaseapp.com",
  projectId: "insta-9de9c",
  storageBucket: "insta-9de9c.appspot.com",
  messagingSenderId: "126030738936",
  appId: "1:126030738936:web:aa9c6dc8ddb3d59730920d",
  measurementId: "G-TTKNZYB5N1"
}

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export const storage = firebase.storage();
export { firebase, FieldValue };
