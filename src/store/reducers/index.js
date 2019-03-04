import authReducer from './authReducer';
import eventReducer from './eventReducer';
import adminReducer from './adminReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import userReducer from './userReducer';

const reducers = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  event: eventReducer,
  admin: adminReducer,
  user: userReducer
});

export default reducers
