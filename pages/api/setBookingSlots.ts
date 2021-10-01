import {
  DayOfWeek,
  RestaurantData,
  RestaurantDataApi,
} from '@tastiest-io/tastiest-utils';
import { OpenTimesArray } from 'components/restautants/BookingSlotsSelector/BookingSlotsContext';
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from 'utils/firebaseAdmin';

export interface SetBookingSlotsParams {
  restaurantId: string;
  openTimesArray: OpenTimesArray;
  seatingDuration: number;
}

/**
 * Sets the booking slots and open times for a restaurant
 * Requires the body parameters:
 *      `restaurantId: string`
 *      `openTimesArray: Array(7)<OpenTimesMetricDay>`
 *      `seatingDuration: number`
 */
export default async function setBookingSlots(
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
    openTimesArray = null,
    seatingDuration = null,
  } = body as SetBookingSlotsParams;

  if (!restaurantId || !openTimesArray || !seatingDuration) {
    response.json({
      success: false,
      error: 'Invalid parameters given.',
      data: null,
    });
  }

  try {
    const restaurantDataApi = new RestaurantDataApi(
      firebaseAdmin,
      restaurantId,
    );

    const openTimes = {
      [DayOfWeek.SUNDAY]: openTimesArray[DayOfWeek.SUNDAY],
      [DayOfWeek.MONDAY]: openTimesArray[DayOfWeek.MONDAY],
      [DayOfWeek.TUESDAY]: openTimesArray[DayOfWeek.TUESDAY],
      [DayOfWeek.WEDNESDAY]: openTimesArray[DayOfWeek.WEDNESDAY],
      [DayOfWeek.THURSDAY]: openTimesArray[DayOfWeek.THURSDAY],
      [DayOfWeek.FRIDAY]: openTimesArray[DayOfWeek.FRIDAY],
      [DayOfWeek.SATURDAY]: openTimesArray[DayOfWeek.SATURDAY],
    };

    await restaurantDataApi.setRestaurantData(RestaurantData.METRICS, {
      seatingDuration,
      openTimes,
    });

    response.json({ success: true, error: null, data: null });
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
