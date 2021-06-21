import {
  FirestoreCollection,
  IGenericAsyncReturnType,
  IRestaurantData,
  RestaurantData,
  TRestaurantData,
} from '@tastiest-io/tastiest-utils';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { IState } from '../state/reducers';

export function useRestaurantData(restaurantUser: firebase.User) {
  const firestore = useFirestore();

  useFirestoreConnect([
    {
      collection: 'restaurants',
      doc: restaurantUser?.uid,
    },
  ]);

  const restaurantData: Partial<IRestaurantData> = useSelector(
    ({ firestore: { data } }: IState) =>
      data?.[FirestoreCollection.RESTAURANTS]?.[restaurantUser?.uid],
  );

  const setRestaurantData = async <T extends RestaurantData>(
    field: T,
    value: TRestaurantData<T>,
    onInvalidUser?: () => void,
  ): Promise<IGenericAsyncReturnType> => {
    if (!restaurantUser?.uid) {
      // No user signed in
      if (onInvalidUser) {
        onInvalidUser();
      }

      return {
        success: false,
        error: new Error('setRestaurantData Error: Invalid restaurant user'),
      };
    }

    try {
      await firestore
        .collection(FirestoreCollection.RESTAURANTS)
        .doc(restaurantUser.uid)
        .set(
          {
            [field]: value,
          },
          { merge: true },
        );

      return { success: true, error: null };
    } catch (e) {
      return {
        success: false,
        error: new Error(`setRestaurantData Error: ${e}`),
      };
    }
  };

  return { restaurantData, setRestaurantData };
}
