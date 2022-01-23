import {
  dlog,
  FirebaseAuthError,
  postFetch,
} from '@tastiest-io/tastiest-utils';
import DebouncePromise from 'awesome-debounce-promise';
import firebaseApp from 'firebase/app';
import { useRouter } from 'next/router';
import { GetAuthTokenParams, GetAuthTokenReturn } from 'pages/api/getAuthToken';
import { useContext, useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { LocalEndpoint } from 'types/api';
import { FIREBASE } from '../constants';
import { AuthContext } from '../contexts/auth';

export const useAuth = () => {
  const firebase = useFirebase();
  const router = useRouter();
  const [error, _setError] = useState<string>(null);

  const { adminUser } = useContext(AuthContext);

  // Convert firebase error code to Tastiest auth error message
  const setError = (e: { code: string; message: string }) => {
    const error =
      FIREBASE.ERROR_MESSAGES[e?.code] ??
      FIREBASE.ERROR_MESSAGES[FirebaseAuthError.OTHER];

    _setError(error);
  };

  const signIn = async (email: string, password: string) => {
    _setError(null);
    if (!email?.length || !password?.length) {
      return;
    }

    const attemptSignIn = DebouncePromise(async () => {
      const {
        data: { token },
        error,
      } = await postFetch<GetAuthTokenParams, GetAuthTokenReturn>(
        LocalEndpoint.GET_AUTH_TOKEN,
        {
          email,
          password,
        },
      );

      dlog('useAuth ➡️ error:', error);

      return firebase.auth().signInWithCustomToken(token);
    }, 2000);

    try {
      // Retry on fail
      let credential: firebaseApp.auth.UserCredential;
      let i = 0;
      while (!credential && i < FIREBASE.MAX_LOGIN_ATTEMPTS) {
        credential = await attemptSignIn();

        if (credential) {
          router.push('/');
        }
        i++;
      }

      return credential;
    } catch (error) {
      console.log('error', error);
      setError(error);
    }

    return false;
  };

  // If redirectTo is given, will redirect there after sign out.
  // Else, the page will simply reload.
  const signOut = async (redirectTo?: string) => {
    _setError(null);

    try {
      await firebase.auth().signOut();

      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.reload();
      }
    } catch (error) {
      setError(error);
    }
  };

  // Null if the user information has not been loaded yet. else boolean
  const isSignedIn = adminUser === undefined ? null : Boolean(adminUser?.uid);

  return {
    adminUser,
    signIn,
    signOut,
    isSignedIn,
    error,
  };
};
