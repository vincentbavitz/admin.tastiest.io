import {
  FirestoreCollection,
  IUserData,
  titleCase,
} from '@tastiest-io/tastiest-utils';
import { IAddress } from '@tastiest-io/tastiest-utils/dist/types/geography';
import DeviceDetector from 'device-detector-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'utils/firebaseAdmin';

interface KlaviyoProfile {
  object: string;
  id: string;
  $address1: string;
  $address2: string;
  $city: string;
  $country: string;
  $latitude: number;
  $longitude: number;
  $region: string;
  $zip: string;
  $email: string;
  $first_name: string;
  $last_name: string;
  $organization: string;
  $title: string;
  $phone_number: string;
  $timezone: string;
  $id: string;
  userId?: string;
  anonymousId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  created: string;
  updated: string;

  context?: { userAgent?: string };
}

export interface TastiestCustomerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  region: string;
  city: string;
  country: string;
  timezone: string;
  postalCode: string;
  address: IAddress;

  created: string;
  updated: string;

  userId: string;
  anonymousId: string;
  device: string; // eg, Smartphone
  platform: string; // eg. Android 6.0 - Chrome

  // From Firebase
  userData: IUserData;
}

/**
 * Gets the profile of a customer
 * Requires the query parameter `email` which is the user's
 * email address in Firestore.
 *
 * Intended to be used exclusively with useSWR
 */
export default async function getCustomerProfile(
  request: NextApiRequest,
  response: NextApiResponse<TastiestCustomerProfile>,
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

    const klaviyoProfileUrl = `https://a.klaviyo.com/api/v1/person/${klaviyoPersonId}?api_key=${process.env.KLAVIYO_PRIVATE_KEY}`;
    const profileResponse = await fetch(klaviyoProfileUrl);
    const klaviyoProfile = (await profileResponse.json()) as KlaviyoProfile;

    const deviceDetector = new DeviceDetector();
    const parsedDevice = klaviyoProfile.context?.userAgent
      ? deviceDetector.parse(klaviyoProfile.context.userAgent)
      : null;

    const device = titleCase(parsedDevice?.device?.type);
    const platform = parsedDevice
      ? `${parsedDevice?.os?.name} ${parsedDevice?.os?.version} - ${parsedDevice.client?.name}`
      : '';

    // Get supplementary information from Firebase
    const userDataRef = await db(FirestoreCollection.USERS)
      .where('details.email', '==', email)
      .get();

    const userData = (await userDataRef.docs[0]?.data()) as IUserData;

    const profile: TastiestCustomerProfile = {
      userId: userDataRef.docs[0]?.id ?? klaviyoProfile.userId,
      anonymousId: klaviyoProfile.anonymousId,
      platform,
      device,

      firstName:
        klaviyoProfile.$first_name ??
        klaviyoProfile.first_name ??
        klaviyoProfile.firstName,
      lastName:
        klaviyoProfile.$last_name ??
        klaviyoProfile.last_name ??
        klaviyoProfile.lastName,
      email:
        userData.details.email ?? klaviyoProfile.$email ?? klaviyoProfile.email,
      phoneNumber: klaviyoProfile.$phone_number,
      region: klaviyoProfile.$region,
      city: klaviyoProfile.$city,
      country: klaviyoProfile.$country,
      timezone: klaviyoProfile.$timezone,
      address: {
        lat: klaviyoProfile.$latitude,
        lon: klaviyoProfile.$longitude,
        address:
          (klaviyoProfile.$address1 ?? '') + (klaviyoProfile.$address2 ?? ''),
      },
      postalCode: klaviyoProfile.$zip,
      created: klaviyoProfile.created,
      updated: klaviyoProfile.updated,

      // From Firebase
      userData,
    };

    response.json(profile);
    return;
  } catch (error) {
    response.status(400).statusMessage = `Error: ${error}`;
    response.end();
    return;
  }
}
