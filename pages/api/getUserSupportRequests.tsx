import { FirestoreCollection, IBooking } from '@tastiest-io/tastiest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from 'utils/firebaseAdmin';

/**
 * Gets support requests from users in Firestore
 * Intended to be used exclusively with useSWR
 */
export default async function getUserSupportRequests(
  request: NextApiRequest,
  response: NextApiResponse<IBooking[]>,
) {
  // Only allow GET
  if (request.method !== 'GET') {
    response.status(405).end();
    return;
  }

  const limit = Number(request?.query?.limit ?? 100);

  try {
    const query = await firebaseAdmin
      .firestore()
      .collection(FirestoreCollection.SUPPORT_USERS);

    const bookingsSnapshot = await query
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();

    const bookings: IBooking[] = [];
    bookingsSnapshot.forEach(doc => bookings.push(doc.data() as IBooking));

    if (!bookings?.length) {
      response.json([]);
      return;
    }

    response.json(bookings);
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
