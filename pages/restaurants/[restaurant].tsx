// Get cutomer events
// Get IDs like this https://a.klaviyo.com/api/v2/people/search?email=vincent@bavitz.org&api_key=pk_9709c4e5fd47f4c60483f956eff6d00ddf
// https://a.klaviyo.com/api/v1/person/01F7GJRAW02J07TMDVKYZ7Y5PS/metrics/timeline?api_key=pk_9709c4e5fd47f4c60483f956eff6d00ddf&count=100&sort=desc

import { InfoCard } from '@tastiest-io/tastiest-ui';
import { RestaurantDataApi } from '@tastiest-io/tastiest-utils';
import BookingSlotsBlock from 'components/blocks/BookingSlotsBlock';
import QuietTimesBlock from 'components/blocks/QuietTimesBlock';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import nookies from 'nookies';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { firebaseAdmin } from 'utils/firebaseAdmin';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>,
) => {
  // Ensure user is authenticated
  const cookieToken = nookies.get(context)?.token;

  // If no user, redirect to login
  if (!cookieToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const restaurantId = String(context.params.restaurant);
  if (!restaurantId?.length) {
    return {
      redirect: {
        destination: `/restaurants`,
        permanent: false,
      },
    };
  }

  const restaurantDataApi = new RestaurantDataApi(firebaseAdmin, restaurantId);
  const restaurantData = await restaurantDataApi.getRestaurantData();

  if (!restaurantData) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return { props: { restaurantData } };
};

function Restaurant(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { restaurantData } = props;

  return (
    <div>
      <div className="text-xl font-somatic">Restaurants</div>

      <div className="flex pb-10 space-x-4">
        <InfoCard
          color="primary"
          label="Total Earned"
          compact={true}
          isLoading={false}
          polyfillInfo={'£00.00'}
          info={`£`}
        />

        <InfoCard
          color="primary"
          label="Total Revenue"
          compact={true}
          isLoading={false}
          polyfillInfo={'£00.00'}
          info={`£`}
        />

        <InfoCard
          color="alt-1"
          label="Followers"
          compact={true}
          isLoading={false}
          polyfillInfo={'£00.00'}
          info={restaurantData.metrics?.followers?.length ?? 0}
        />

        {/* <CustomerProfileSection profile={profile} /> */}
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <BookingSlotsBlock restaurantData={restaurantData} />
        </div>

        <div className="flex-1">
          <QuietTimesBlock restaurantData={restaurantData} />
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
