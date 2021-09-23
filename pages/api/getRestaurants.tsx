import {
  FirestoreCollection,
  IRestaurantData,
} from '@tastiest-io/tastiest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'utils/firebaseAdmin';

/**
 * Gets all restaurants from Firestore
 * Requires the query parameter `adminUserId` and `token` from
 * Firebase for authenticaton.
 *
 * Intended to be used exclusively with useSWR
 */
export default async function getRestaurants(
  request: NextApiRequest,
  response: NextApiResponse<IRestaurantData[]>,
) {
  // Only allow GET
  if (request.method !== 'GET') {
    response.status(405).end();
    return;
  }

  const limit = Number(request?.query?.limit ?? 100);

  try {
    const query = await db(FirestoreCollection.RESTAURANTS);
    const restaurantsSnapshot = await query.limit(limit).get();

    const restaurants: IRestaurantData[] = [];
    restaurantsSnapshot.forEach(doc => {
      const data = doc.data() as IRestaurantData;
      if (!data?.details?.id) {
        return;
      }

      restaurants.push(data);
    });

    if (!restaurants?.length) {
      response.json([]);
      return;
    }

    response.json(restaurants);
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
