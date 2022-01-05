import { dlog } from '@tastiest-io/tastiest-utils';
import { AuthContext } from 'contexts/auth';
import { useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { Configuration } from 'swr/dist/types';

// prettier-ignore
const TASTIEST_BACKEND_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:4444'
    : 'https://api.tastiest.io';

const fetcher = async (url: string, token: string) => {
  if (!token) {
    dlog('useTastiestSWR ➡️ failed');
    return;
  }

  return fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  }).then(response => {
    return response.json();
  });
};

/**
 * Endpoint doesn't include the base path. Eg. /admin/users.
 */
export function useTastiestSWR<T>(
  endpoint: string,
  configuration?: Partial<Configuration<T>>,
) {
  const { adminUser } = useContext(AuthContext);
  const [token, setToken] = useState<string | null>(null);

  // Set token immediately.
  useEffect(() => {
    adminUser?.getIdToken().then(setToken);
  }, [adminUser, endpoint, configuration]);

  const path = useMemo(() => `${TASTIEST_BACKEND_URL}${endpoint}`, [endpoint]);
  const response = useSWR<T>([path, token], fetcher, configuration);

  return response;
}
