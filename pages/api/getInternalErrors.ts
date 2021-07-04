import {
  FirestoreCollection,
  TastiestInternalError,
} from '@tastiest-io/tastiest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from 'utils/firebaseAdmin';

/**
 * Gets all internal errors from Firestore
 * Intended to be used exclusively with useSWR
 */
export default async function getInternalErrors(
  request: NextApiRequest,
  response: NextApiResponse<TastiestInternalError[]>,
) {
  // Only allow GET
  if (request.method !== 'GET') {
    response.status(405).end();
    return;
  }

  // Timestamp to start at (for pagination)
  const startAt = Number(request?.query?.startAt ?? Number.MAX_SAFE_INTEGER);
  const limit = Number(request?.query?.limit ?? 100);

  try {
    const query = await firebaseAdmin
      .firestore()
      .collection(FirestoreCollection.ERRORS);

    const internalErrorsSnapshot = await query
      .orderBy('timestamp', 'desc')
      .startAt(startAt)
      .limit(limit)
      .get();

    const internalErrors: TastiestInternalError[] = [];
    internalErrorsSnapshot.forEach(doc =>
      internalErrors.push(doc.data() as TastiestInternalError),
    );

    if (!internalErrors?.length) {
      response.json([]);
      return;
    }

    response.json(internalErrors);
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
