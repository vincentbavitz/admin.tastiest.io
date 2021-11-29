import {
  Booking,
  dlog,
  FirestoreCollection,
} from '@tastiest-io/tastiest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'utils/firebaseAdmin';

/**
 * Gets all bookings from Firestore
 * Intended to be used exclusively with useSWR
 */
export default async function getBookings(
  request: NextApiRequest,
  response: NextApiResponse<Booking[]>,
) {
  // Only allow GET
  if (request.method !== 'GET') {
    response.status(405).end();
    return;
  }

  const useTestData = String(request.query.useTestData) === 'true';
  dlog('getBookings ➡️ useTestData:', useTestData);

  // Timestamp to start at (for pagination)
  const startAt = Number(request?.query?.startAt ?? Number.MAX_SAFE_INTEGER);
  const limit = Number(request?.query?.limit ?? 100);

  try {
    const query = await db(FirestoreCollection.BOOKINGS);

    dlog('getBookings ➡️ useTestData:', useTestData);

    const bookingsSnapshot = await query
      .where('isTest', '==', useTestData)
      .orderBy('paidAt', 'desc')
      .startAt(startAt)
      .limit(limit)
      .get();

    const bookings: Booking[] = [];
    bookingsSnapshot.forEach(doc => {
      const booking = doc.data() as Booking;
      if (!booking.isTest) {
        bookings.push(booking);
      }
    });

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
