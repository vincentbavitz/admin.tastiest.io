import {
  RestaurantCommissionStructure,
  RestaurantDataApi,
  RestaurantDataKey,
} from '@tastiest-io/tastiest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from 'utils/firebaseAdmin';

export interface SetRestaurantCommissionParams {
  restaurantId: string;
  commission: RestaurantCommissionStructure;
}

/**
 * Sets the commission % for a restaurant.
 * Requires the body parameters:
 *      `restaurantId: string`
 *      `commission: RestaurantCommissionStructure`
 */
export default async function setRestaurantCommission(
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
    commission = null,
  } = body as SetRestaurantCommissionParams;

  if (!restaurantId || !commission) {
    response.json({
      success: false,
      error: '`restaurantId` or `commission` not given',
      data: null,
    });
    return;
  }

  try {
    const restaurantDataApi = new RestaurantDataApi(
      firebaseAdmin,
      restaurantId,
    );

    if (
      typeof commission.defaultRestaurantCut !== 'number' ||
      typeof commission.followersRestaurantCut !== 'number' ||
      commission.defaultRestaurantCut > 100 ||
      commission.defaultRestaurantCut < 0 ||
      commission.followersRestaurantCut > 100 ||
      commission.followersRestaurantCut > 100
    ) {
      response.json({
        success: false,
        error: `Invlaid commission values. Please use numbers between 0 and 100.`,
        data: null,
      });
      return;
    }

    await restaurantDataApi.setRestaurantData(RestaurantDataKey.FINANCIAL, {
      commission,
    });

    response.json({ success: true, error: null, data: null });
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
