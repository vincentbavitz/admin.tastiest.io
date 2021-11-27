import 'firebase/firestore'; // <- needed if using firestore
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; // <- needed if using firestore
import { IFirestore } from '../../constants/firebase';

export interface IState {
  firestore: IFirestore;
}

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});
