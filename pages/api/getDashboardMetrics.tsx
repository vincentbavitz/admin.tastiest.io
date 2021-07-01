import { transformPriceFromStripe } from '@tastiest-io/tastiest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

export interface GetDashboardMetricsResponse {
  totalProfit: number;
  revenue: number;
  charges: Stripe.Charge[];
  owedToRestaurants: number;
}

/**
 * Gets the profile of a customer
 * Requires the query parameters
 *   `adminUserId` which is the user's email address in Firestore.
 *   `adminEmail` which is associated with the above.
 *
 * Intended to be used exclusively with useSWR
 */
export default async function getDashboardMetrics(
  request: NextApiRequest,
  response: NextApiResponse<GetDashboardMetricsResponse>,
) {
  // Only allow GET
  if (request.method !== 'GET') {
    response.status(405).end();
    return;
  }

  const adminUserId = String(request.query.adminUserId);
  const adminEmail = String(request.query.adminEmail);

  if (!adminUserId?.length || !adminEmail?.length) {
    response.status(406).end();
    return;
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_LIVE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });

    const connectAccounts = (await stripe.accounts.list())?.data;
    const connectAccountIds = connectAccounts
      .map(account => account.id)
      .filter(account => Boolean(account));

    const owedToRestaurantsEach = await Promise.all(
      connectAccountIds.map(async stripeAccount => {
        const balance = await stripe.balance.retrieve({
          stripeAccount,
        });

        const pendingBalance = transformPriceFromStripe(
          balance?.pending.reduce((a, b) => a + b?.amount ?? 0, 0) +
            balance?.available.reduce((a, b) => a + b?.amount ?? 0, 0),
        );

        return pendingBalance;
      }),
    );

    const owedToRestaurants = owedToRestaurantsEach.reduce((a, b) => a + b, 0);

    // All payouts are in GBP
    const payouts = (await stripe.payouts.list())?.data;
    const totalProfit = transformPriceFromStripe(
      payouts
        .filter(payout => payout.livemode)
        .reduce((a, b) => a + b.amount, 0),
    );

    const charges = (await stripe.charges.list())?.data;
    const completeCharges = charges
      .filter(charge => charge.livemode && charge.paid)
      .map(charge => charge.amount);

    const revenue = completeCharges.reduce(
      (a, b) => a + transformPriceFromStripe(b),
      0,
    );

    response.json({
      totalProfit,
      charges,
      revenue,
      owedToRestaurants,
    });
    return;
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
