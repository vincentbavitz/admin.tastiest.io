import {
  FirestoreCollection,
  FunctionsResponse,
  IBooking,
} from '@tastiest-io/tastiest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from 'utils/firebaseAdmin';

export type UpdateBookingReturn = FunctionsResponse<{
  booking: IBooking | null;
}>;

/**
 * Requires `bookingId` as a parameter.
 * This can only be obtained client side on article page.
 *
 * Optionally takes one or more of these parameters...
 *  ```
 *    hasArrived: string;
 *    hasCancelled: string;
 *    bookingDate: number | null;
 *  ```
 *
 * Returns updated booking object on success
 */
export default async function updateBooking(
  request: NextApiRequest,
  response: NextApiResponse<UpdateBookingReturn>,
) {
  // Only allow POST
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  // Get body as JSON or raw
  let body;
  try {
    body = JSON.parse(request.body);
  } catch (e) {
    body = request.body;
  }

  const {
    bookingId = null,
    hasArrived = null,
    hasCancelled = null,
    bookingDate = null,
  } = body;

  // Booking ID is required
  if (!bookingId || !bookingId.length) {
    response.json({
      success: false,
      data: { booking: null },
      error: 'No booking ID provided',
    });
    return;
  }

  try {
    // Fetch the booking from Firestore
    const doc = await firebaseAdmin
      .firestore()
      .collection(FirestoreCollection.BOOKINGS)
      .doc(bookingId)
      .get();

    const booking = doc.data() as IBooking;

    // Does the booking exist?
    if (!booking) {
      response.json({
        success: false,
        data: { booking: null },
        error: 'Booking does not exist',
      });
      return;
    }

    // Start updating
    const updatedBooking: IBooking = {
      ...booking,
    };

    // Adding hasArrived to booking
    if (typeof hasArrived === 'boolean') {
      updatedBooking.hasArrived = hasArrived;
    }

    // Adding hasCancelled to booking
    if (typeof hasCancelled === 'boolean') {
      updatedBooking.hasCancelled = hasCancelled;
      updatedBooking.cancelledAt = updatedBooking.hasCancelled
        ? Date.now()
        : null;
    }

    // Adding hasCancelled to booking
    if (typeof bookingDate === 'number') {
      updatedBooking.bookingDate = bookingDate;
    }

    // Sync with Firestore
    await firebaseAdmin
      .firestore()
      .collection(FirestoreCollection.BOOKINGS)
      .doc(bookingId)
      .set(updatedBooking, { merge: true });

    response.json({
      success: true,
      data: { booking: updatedBooking },
      error: null,
    });
  } catch (error) {
    response.json({
      success: false,
      data: { booking: null },
      error,
    });
    return;
  }
}
