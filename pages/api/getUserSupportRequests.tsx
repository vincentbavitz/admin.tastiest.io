import {
  FirestoreCollection,
  UserSupportRequest,
} from '@tastiest-io/tastiest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'utils/firebaseAdmin';

/**
 * Gets support requests from users in Firestore
 * Intended to be used exclusively with useSWR
 */
export default async function getUserSupportRequests(
  request: NextApiRequest,
  response: NextApiResponse<UserSupportRequest[]>,
) {
  // Only allow GET
  if (request.method !== 'GET') {
    response.status(405).end();
    return;
  }

  const limit = Number(request?.query?.limit ?? 100);

  try {
    const query = await db(FirestoreCollection.SUPPORT_USERS);

    const supportItemsSnapshot = await query
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    const supportItems: UserSupportRequest[] = [];
    supportItemsSnapshot.forEach(doc =>
      supportItems.push({ ...doc.data(), id: doc.id } as UserSupportRequest),
    );

    if (!supportItems?.length) {
      response.json([]);
      return;
    }

    response.json(supportItems);
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
