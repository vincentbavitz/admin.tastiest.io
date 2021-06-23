// Get cutomer events
// Get IDs like this https://a.klaviyo.com/api/v2/people/search?email=vincent@bavitz.org&api_key=pk_9709c4e5fd47f4c60483f956eff6d00ddf
// https://a.klaviyo.com/api/v1/person/01F7GJRAW02J07TMDVKYZ7Y5PS/metrics/timeline?api_key=pk_9709c4e5fd47f4c60483f956eff6d00ddf&count=100&sort=desc

import { UserData, UserDataApi } from '@tastiest-io/tastiest-utils';
import CustomerEventsTable from 'components/tables/CustomerEventsTable';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';
import { firebaseAdmin } from 'utils/firebaseAdmin';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>,
) => {
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

  const { data: userEvents } = useSWR(LocalEndpoint.GET_CUSTOMER_EVENTS, {
    refreshInterval: 5000,
    initialData: null,
    refreshWhenHidden: true,
  });

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  useEffect(() => {
    if (userEvents) {
      setIsInitialLoading(false);
    }
  }, [userEvents]);

  return (
    <div>
      <h3 className="text-lg">
        <span className="text-xl font-semibold">User:</span>{' '}
        {props.userDetails.email}
      </h3>

      <CustomerEventsTable userDetails={userDetails} />
    </div>
  );
}

export default Customer;
