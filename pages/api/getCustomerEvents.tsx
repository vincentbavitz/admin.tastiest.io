import { NextApiRequest, NextApiResponse } from 'next';

export type UserEvent = {
  id: string;
  statistic_id: string;
  timestamp: number;
  datetime: string;
  event_name: string;
  event_properties: any;
  object: string;
  person: any;
  uuid: string;
};

/**
 * Gets the recent events from a customer
 * Requires the query parameter `email` which is the user's
 * email address in Firestore.
 *
 * Intended to be used exclusively with useSWR
 */
export default async function getCustomerEvents(
  request: NextApiRequest,
  response: NextApiResponse<UserEvent[]>,
) {
  // Only allow GET
  if (request.method !== 'GET') {
    response.status(405).end();
    return;
  }

  const email = String(request.query.email);
  if (!email?.length) {
    response.status(400).statusMessage = `Email not given`;
    response.end();
    return;
  }

  try {
    // Get user information from Klaviyo
    const klaviyoSearchUrl = `https://a.klaviyo.com/api/v2/people/search?email=${email}&api_key=${process.env.KLAVIYO_PRIVATE_KEY}`;
    const searchResponse = await fetch(klaviyoSearchUrl);
    const { id: klaviyoPersonId } = await searchResponse.json();

    const eventsResponse = await fetch(
      `https://a.klaviyo.com/api/v1/person/${klaviyoPersonId}/metrics/timeline?api_key=${process.env.KLAVIYO_PRIVATE_KEY}&count=100&sort=desc`,
    );

    const data = await eventsResponse.json();
    const userEvents = data?.data ?? [];

    response.json(userEvents);
    return;
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
