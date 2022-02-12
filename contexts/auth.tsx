import {
  FIREBASE,
  FirebaseAuthError,
  postFetch,
} from '@tastiest-io/tastiest-utils';
import DebouncePromise from 'awesome-debounce-promise';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { GetAuthTokenParams, GetAuthTokenReturn } from 'pages/api/getAuthToken';
import React, { createContext, useEffect, useState } from 'react';
import { LocalEndpoint } from 'types/api';
import { dlog } from 'utils/development';
import { firebaseClient } from '../utils/firebaseClient';

interface AuthContextParams {
  adminUser: firebaseClient.User | null;
  token: string | null;
}

// Example taken from  https://github1s.com/colinhacks/next-firebase-ssr/blob/HEAD/auth.tsx
export const AuthContext = createContext<AuthContextParams>({
  adminUser: null,
  token: null,
});

export function AuthProvider({ children }: any) {
  const router = useRouter();

  // Undefined while loading, null if not logged in
  const [adminUser, setAdminUser] = useState<
    firebaseClient.User | null | undefined
  >(undefined);

  // User Token for authentication middleware.
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nookies = nookies;
    }

    return firebaseClient.auth().onIdTokenChanged(async _adminUser => {
      dlog(`Token changed!`);

      if (!_adminUser) {
        dlog(`No token found...`);

        nookies.destroy(null, 'token');
        nookies.set(null, 'token', '', { path: '/' });
        setAdminUser(null);
        setToken(null);

        return;
      }

      const _token = await _adminUser.getIdToken(true);

      nookies.destroy(null, 'token');
      nookies.set(null, 'token', _token, { path: '/' });
      setAdminUser(_adminUser);
      setToken(_token);

      dlog(`Updating token...`, _token);
    });
  }, []);

  // Force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      dlog(`Refreshing token...`);
      const _adminUser = firebaseClient.auth().currentUser;

      if (_adminUser) {
        await _adminUser.getIdToken(true);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  const [error, _setError] = useState<string>(null);

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

      setToken(token);
      return firebaseClient.auth().signInWithCustomToken(token);
    }, 2000);

    try {
      // Retry on fail
      let credential: firebaseClient.auth.UserCredential;
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
      await firebaseClient.auth().signOut();
      setToken(null);

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

  return (
    <AuthContext.Provider
      value={{ adminUser, token, signIn, signOut, isSignedIn, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}
