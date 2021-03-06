import {
  DayOfWeek,
  RestaurantDataApi,
  RestaurantDataKey,
} from '@tastiest-io/tastiest-utils';
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

    const {
      quietTimes: quietTimesObject,
    } = await restaurantDataApi.getRestaurantField(RestaurantDataKey.METRICS);

    if (!quietTimesObject) {
      response.status(400).end();
      return;
    }

    const quietTimes: QuietTimesArray = [
      quietTimesObject[DayOfWeek.SUNDAY],
      quietTimesObject[DayOfWeek.MONDAY],
      quietTimesObject[DayOfWeek.TUESDAY],
      quietTimesObject[DayOfWeek.WEDNESDAY],
      quietTimesObject[DayOfWeek.THURSDAY],
      quietTimesObject[DayOfWeek.FRIDAY],
      quietTimesObject[DayOfWeek.SATURDAY],
    ];

    response.json(quietTimes);
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
