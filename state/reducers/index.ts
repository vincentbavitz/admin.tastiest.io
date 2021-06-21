import 'firebase/firestore'; // <- needed if using firestore
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; // <- needed if using firestore
import { INavigation } from 'state/navigation';
import { IFirestore } from '../../constants/firebase';
import { navigationReducer } from './navigation';

export interface IState {
  navigation: INavigation;
  firestore: IFirestore;
}

export const rootReducer = combineReducers({
  navigation: navigationReducer,

  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});
