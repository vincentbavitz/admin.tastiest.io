import { FirestoreCollection, IUserData } from '@tastiest-io/tastiest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'utils/firebaseAdmin';

export type UserRecord = IUserData & { id: string };

/**
 * Gets all users from Firestore
 * Requires the query parameter `adminUserId` and `token` from
 * Firebase for authenticaton.
 *
 * Intended to be used exclusively with useSWR
 */
export default async function getUsers(
  request: NextApiRequest,
  response: NextApiResponse<IUserData[]>,
) {
  // Only allow GET
  if (request.method !== 'GET') {
    response.status(405).end();
    return;
  }

  const limit = Number(request?.query?.limit ?? 100);

  try {
    const query = await db(FirestoreCollection.USERS);

    const usersSnapshot = await query
      // .orderBy('paidAt', 'desc')
      // .startAt(startAt)
      .limit(limit)
      .get();

    const users: UserRecord[] = [];
    usersSnapshot.forEach(doc =>
      users.push({ id: doc.id, ...doc.data() } as UserRecord),
    );

    if (!users?.length) {
      response.json([]);
      return;
    }

    response.json(users);
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
