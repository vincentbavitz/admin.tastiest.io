import nookies from 'nookies';
import React, { createContext, useEffect, useState } from 'react';
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

      const _token = await _adminUser.getIdToken();

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

  return (
    <AuthContext.Provider value={{ adminUser, token }}>
      {children}
    </AuthContext.Provider>
  );
}
