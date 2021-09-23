import {
  DayOfWeek,
  RestaurantData,
  RestaurantDataApi,
} from '@tastiest-io/tastiest-utils';
import { QuietTimesArray } from 'components/restautants/QuietTimesSelector/QuietTimesContext';
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from 'utils/firebaseAdmin';

export interface SetQuietTimesParams {
  restaurantId: string;
  quietTimesArray: QuietTimesArray;
}

/**
 * Sets the quiet times for a restaurant
 * Requires the body parameters:
 *      `restaurantId: string`
 *      `quietTimesArray: Array(7)<QuietTimesMetricDay>`
 */
export default async function setQuietTimes(
  request: NextApiRequest,
  response: NextApiResponse,
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
    restaurantId = null,
    quietTimesArray = null,
  } = body as SetQuietTimesParams;

  if (!restaurantId || !quietTimesArray) {
    response.json({
      success: false,
      error: '`restaurantId` not given',
      data: null,
    });
  }

  try {
    const restaurantDataApi = new RestaurantDataApi(
      firebaseAdmin,
      restaurantId,
    );

    const quietTimes = {
      [DayOfWeek.SUNDAY]: quietTimesArray[DayOfWeek.SUNDAY],
      [DayOfWeek.MONDAY]: quietTimesArray[DayOfWeek.MONDAY],
      [DayOfWeek.TUESDAY]: quietTimesArray[DayOfWeek.TUESDAY],
      [DayOfWeek.WEDNESDAY]: quietTimesArray[DayOfWeek.WEDNESDAY],
      [DayOfWeek.THURSDAY]: quietTimesArray[DayOfWeek.THURSDAY],
      [DayOfWeek.FRIDAY]: quietTimesArray[DayOfWeek.FRIDAY],
      [DayOfWeek.SATURDAY]: quietTimesArray[DayOfWeek.SATURDAY],
    };

    await restaurantDataApi.setRestaurantData(RestaurantData.METRICS, {
      quietTimes,
    });

    response.json({ success: true, error: null, data: null });
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
