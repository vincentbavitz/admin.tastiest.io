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
    return;
  }

  return fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  }).then(response => response.json());
};

/**
 * Endpoint doesn't include the base path. Eg. /admin/users.
 */
export function useTastiestSWR<T>(
  endpoint: string,
  configuration: Partial<Configuration<T>>,
) {
  const { adminUser } = useContext(AuthContext);
  const [token, setToken] = useState<string | null>(null);

  // Set token immediately.
  useEffect(() => {
    adminUser?.getIdToken().then(setToken);
  }, [endpoint, configuration]);

  const path = useMemo(() => `${TASTIEST_BACKEND_URL}${endpoint}`, [endpoint]);

  dlog('useTastiestSWR ➡️ path:', path);
  const response = useSWR<T>(
    token ? [path, token] : null,
    fetcher,
    configuration,
  );

  dlog('useTastiestSWR ➡️ response:', response);

  return response;
}
