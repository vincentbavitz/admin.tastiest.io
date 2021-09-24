import { RestaurantData, RestaurantDataApi } from '@tastiest-io/tastiest-utils';
import { OpenTimesArray } from 'components/restautants/BookingSlotsSelector/BookingSlotsContext';
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from 'utils/firebaseAdmin';

/**
 * Gets the open times of a restaurant.
 * Requires the parameter `restaurantId`
 *
 * Intended to be used exclusively with useSWR
 */
export default async function getOpenTimes(
  request: NextApiRequest,
  response: NextApiResponse<OpenTimesArray>,
) {
  // Only allow GET
  if (request.method !== 'GET') {
    response.status(405).end();
    return;
  }

  if (!request.query.restaurantId) {
    response.status(405).end();
    return;
  }

  try {
    const restaurantDataApi = new RestaurantDataApi(
      firebaseAdmin,
      String(request.query.restaurantId),
    );

    const { openTimes } = await restaurantDataApi.getRestaurantField(
      RestaurantData.METRICS,
    );

    if (!openTimes) {
      response.json(null);
      return;
    }

    return openTimes;
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
