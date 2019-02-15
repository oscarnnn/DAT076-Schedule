import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { FirebaseConfig } from "../config/dev.js";

firebase.initializeApp(FirebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;