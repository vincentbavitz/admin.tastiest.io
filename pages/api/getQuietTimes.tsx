import { RestaurantData, RestaurantDataApi } from '@tastiest-io/tastiest-utils';
import { QuietTimesArray } from 'components/restautants/QuietTimesSelector/QuietTimesContext';
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from 'utils/firebaseAdmin';

/**
 * Gets the quiet times of a restaurant.
 * Requires the parameter `restaurantId`
 *
 * Intended to be used exclusively with useSWR
 */
export default async function getQuietTimes(
  request: NextApiRequest,
  response: NextApiResponse<QuietTimesArray>,
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

    const { quietTimes } = await restaurantDataApi.getRestaurantField(
      RestaurantData.METRICS,
    );

    if (!quietTimes) {
      response.json(null);
      return;
    }

    return quietTimes;
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
