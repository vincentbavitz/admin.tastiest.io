import {
  DayOfWeek,
  RestaurantDataApi,
  RestaurantDataKey,
} from '@tastiest-io/tastiest-utils';
import { OpenTimesArray } from 'components/restautants/BookingSlotsSelector/BookingSlotsContext';
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from 'utils/firebaseAdmin';

export type GetBookingSlotsReturn = {
  openTimes: OpenTimesArray;
  seatingDuration: number;
};

/**
 * Gets the booking slots of a restaurant.
 * Requires the parameter `restaurantId`
 *
 * Intended to be used exclusively with useSWR
 */
export default async function getBookingSlots(
  request: NextApiRequest,
  response: NextApiResponse<GetBookingSlotsReturn>,
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
      seatingDuration,
      openTimes: openTimesObject,
    } = await restaurantDataApi.getRestaurantField(RestaurantDataKey.METRICS);

    if (!openTimesObject && !seatingDuration) {
      response.status(400).end();
      return;
    }

    const openTimes: OpenTimesArray = [
      openTimesObject[DayOfWeek.SUNDAY],
      openTimesObject[DayOfWeek.MONDAY],
      openTimesObject[DayOfWeek.TUESDAY],
      openTimesObject[DayOfWeek.WEDNESDAY],
      openTimesObject[DayOfWeek.THURSDAY],
      openTimesObject[DayOfWeek.FRIDAY],
      openTimesObject[DayOfWeek.SATURDAY],
    ];

    response.json({ openTimes, seatingDuration });
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
