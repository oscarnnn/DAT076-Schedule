import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { FirebaseConfig } from "../config/dev.js";

firebase.initializeApp(FirebaseConfig);

export default firebase;