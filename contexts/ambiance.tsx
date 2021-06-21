import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import {
  ReactReduxFirebaseProvider,
  ReactReduxFirebaseProviderProps,
} from 'react-redux-firebase';
import { createStore } from 'redux';
import { createFirestoreInstance } from 'redux-firestore';
import { rootReducer } from 'state/reducers';
import { firebaseClient } from 'utils/firebaseClient';
import { FIREBASE } from '../constants';

// The AMBIANCE provider of Tastiest
// Includes location management, Firestore and Redux connectivity,
// as well as Tracking with Segment
export const AmbianceContext = React.createContext(undefined);

const store = createStore(rootReducer);
const rrfProps: ReactReduxFirebaseProviderProps = {
  firebase: firebaseClient,
  config: FIREBASE.RRF_CONFIG,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const AmbianceProvider = ({ children }) => {
  return (
    <StoreProvider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {children}
      </ReactReduxFirebaseProvider>
    </StoreProvider>
  );
};

export default AmbianceProvider;
