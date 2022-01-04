import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { createContext, useEffect, useState } from 'react';
import { dlog } from 'utils/development';
import { firebaseClient } from '../utils/firebaseClient';

// Example taken from  https://github1s.com/colinhacks/next-firebase-ssr/blob/HEAD/auth.tsx
export const AuthContext = createContext<{
  adminUser: firebaseClient.User | null;
}>({
  adminUser: null,
});

export function AuthProvider({ children }: any) {
  const router = useRouter();

  // Undefined while loading, null if not logged in
  const [adminUser, setAdminUser] = useState<
    firebaseClient.User | null | undefined
  >(undefined);

  // Break default layout for certain pages
  const pagesWithoutAuth = [/^\/login/];
  const onNoAuthPage = pagesWithoutAuth.some(page =>
    page.test(router.pathname),
  );

  // Redirects based upon login state
  useEffect(() => {
    dlog('auth ➡️ adminUser:', adminUser);

    const isLoginPage = /^\/login/.test(router.pathname);
    // Logged in and on /login, redirect
    if (adminUser !== null && isLoginPage) {
      router.replace('/');
    }

    // Not logged in and not on a no auth page, redirect
    if (adminUser === null && !onNoAuthPage) {
      router.replace('/login');
    }
  }, [router.pathname, adminUser]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nookies = nookies;
    }

    return firebaseClient.auth().onIdTokenChanged(async _adminUser => {
      dlog(`token changed!`);
      if (!_adminUser) {
        dlog(`no token found...`);
        setAdminUser(null);
        nookies.destroy(null, 'token');
        nookies.set(null, 'token', '', { path: '/' });
        return;
      }

      const token = await _adminUser.getIdToken();
      dlog(`updating token...`, token);

      setAdminUser(_adminUser);
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, { path: '/' });
    });
  }, []);

  // Force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      dlog(`refreshing token...`);
      const _adminUser = firebaseClient.auth().currentUser;
      if (_adminUser) await _adminUser.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ adminUser }}>
      {children}
    </AuthContext.Provider>
  );
}
