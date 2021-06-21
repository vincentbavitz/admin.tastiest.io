import {
  FirestoreCollection,
  IRestaurantSupportRequest,
  ISupportMessage,
  SupportMessageDirection,
} from '@tastiest-io/tastiest-utils';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { IState } from '../state/reducers';
import { useAuth } from './useAuth';
import { useRestaurantData } from './useRestaurantData';

export enum SupportRequestGenerationError {
  NO_NAME = 'NO_NAME',
  NO_EMAIL = 'NO_EMAIL',
  NO_SUBJECT = 'NO_SUBJECT',
  NO_MESSAGE = 'NO_MESSAGE',
  NOT_SIGNED_IN = 'NOT_SIGNED_IN',
  FIRESTORE_ERROR = 'FIRESTORE_ERROR',
}

export function useSupport() {
  const { restaurantUser, isSignedIn } = useAuth();
  const { restaurantData } = useRestaurantData(restaurantUser);
  const firestore = useFirestore();

  useFirestoreConnect([
    {
      collection: FirestoreCollection.SUPPORT_RESTAURANTS,
    },
  ]);

  const supportRequests: Partial<IRestaurantSupportRequest> = useSelector(
    ({ firestore: { data } }: IState) =>
      data?.[FirestoreCollection.SUPPORT_RESTAURANTS],
  );

  const makeSupportRequest = async (
    name: string,
    subject: string,
    message: string,
  ): Promise<{ success: boolean; errors: SupportRequestGenerationError[] }> => {
    const errors: SupportRequestGenerationError[] = [];

    if (!isSignedIn) errors.push(SupportRequestGenerationError.NOT_SIGNED_IN);
    if (!name?.length) errors.push(SupportRequestGenerationError.NO_NAME);
    if (!subject?.length) errors.push(SupportRequestGenerationError.NO_SUBJECT);
    if (!message?.length) errors.push(SupportRequestGenerationError.NO_MESSAGE);

    if (errors.length) {
      return { success: false, errors };
    }

    const initialMessage: ISupportMessage = {
      name,
      message,
      timestamp: Date.now(),
      direction: SupportMessageDirection.RESTAURANT_TO_SUPPORT,
      hasOpened: false,
      recipientHasOpened: false,
    };

    const supportRequest: IRestaurantSupportRequest = {
      restaurantId: restaurantUser.uid,
      email: restaurantUser.email,
      name,
      subject,
      conversation: [initialMessage],
      // TODO POST MVP: MAKE THE FOLLOWING FILL OUT WITH A FIREBASE
      // FUNCTION --> for security
      seen: false,
      resolved: false,
      priority: 'normal',
      createdAt: Date.now(),
      updatedAt: null,
    };

    try {
      await firestore
        .collection(FirestoreCollection.SUPPORT_RESTAURANTS)
        .add(supportRequest);

      return { success: true, errors: [] };
    } catch (_) {
      return {
        success: false,
        errors: [SupportRequestGenerationError.FIRESTORE_ERROR],
      };
    }
  };

  return { supportRequests, makeSupportRequest };
}
