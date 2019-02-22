import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import fbConfig from "./config/firebase"
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

const store = createStore(reducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reactReduxFirebase(fbConfig, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}),
    reduxFirestore(fbConfig) // redux bindings for firestore
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,document.getElementById("root")
);
registerServiceWorker();