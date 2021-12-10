// Get cutomer events
// Get IDs like this https://a.klaviyo.com/api/v2/people/search?email=vincent@bavitz.org&api_key=pk_9709c4e5fd47f4c60483f956eff6d00ddf
// https://a.klaviyo.com/api/v1/person/01F7GJRAW02J07TMDVKYZ7Y5PS/metrics/timeline?api_key=pk_9709c4e5fd47f4c60483f956eff6d00ddf&count=100&sort=desc

import { InfoCard } from '@tastiest-io/tastiest-ui';
import { UserDataApi } from '@tastiest-io/tastiest-utils';
import { CustomerProfileSection } from 'components/CustomerProfileSection';
import CustomerEventsTable from 'components/tables/CustomerEventsTable';
import { useScreenSize } from 'hooks/useScreenSize';
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

  return { props: {} };
};

function Customer() {
  return <div>Customers</div>;
}

export default Customer;
