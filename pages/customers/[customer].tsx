// Get cutomer events
// Get IDs like this https://a.klaviyo.com/api/v2/people/search?email=vincent@bavitz.org&api_key=pk_9709c4e5fd47f4c60483f956eff6d00ddf
// https://a.klaviyo.com/api/v1/person/01F7GJRAW02J07TMDVKYZ7Y5PS/metrics/timeline?api_key=pk_9709c4e5fd47f4c60483f956eff6d00ddf&count=100&sort=desc

import { UserData, UserDataApi } from '@tastiest-io/tastiest-utils';
import { CustomerProfileSection } from 'components/CustomerProfileSection';
import InfoCard from 'components/InfoCard';
import CustomerEventsTable from 'components/tables/CustomerEventsTable';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import nookies from 'nookies';
import { TastiestCustomerProfile } from 'pages/api/getCustomerProfile';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';
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

  const userId = String(context.params.customer);
  if (!userId?.length) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  const userDataApi = new UserDataApi(firebaseAdmin, userId);
  const userDetails = await userDataApi.getUserData(UserData.DETAILS);

  if (!userDetails) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return { props: { userDetails } };
};

function Customer(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { userDetails } = props;

  const { data: profile } = useSWR<TastiestCustomerProfile>(
    `${LocalEndpoint.GET_CUSTOMER_PROFILE}?email=${userDetails.email}`,
    {
      refreshInterval: 60000,
      initialData: null,
      refreshWhenHidden: true,
    },
  );

  return (
    <div>
      <div className="flex pb-10 space-x-10">
        <div className="flex-grow">
          <h3 className="pb-4 text-xl font-semibold">
            <span className="">
              {userDetails?.firstName ?? userDetails.email}
            </span>
            {"'s "}
            Profile
          </h3>

          <InfoCard
            color="primary"
            label="Total Spent"
            info={`£${profile?.userData?.metrics?.totalSpent ?? 0}`}
          />
        </div>

        <CustomerProfileSection profile={profile} />
      </div>

      <CustomerEventsTable userDetails={userDetails} />
    </div>
  );
}

export default Customer;
