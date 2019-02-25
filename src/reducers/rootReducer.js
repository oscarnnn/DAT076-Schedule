import { firestoreReducer } from 'redux-firestore';
import { combineReducers } from 'redux';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
  event: eventReducer,
  firestore: firestoreReducer
})

export default rootReducer;
