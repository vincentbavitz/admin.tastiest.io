import InfoCard from 'components/InfoCard';
import UsersTable from 'components/tables/homeCustomersTable/UsersTable';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import nookies from 'nookies';
import React, { useContext } from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';
import { dlog } from 'utils/development';
import { firebaseAdmin } from 'utils/firebaseAdmin';
import { METADATA } from '../constants';
import { ScreenContext } from '../contexts/screen';
import { GetDashboardMetricsResponse } from './api/getDashboardMetrics';

interface Props {
  adminUserId?: string;
}

export const getServerSideProps = async context => {
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

  // Admin details
  const token = await firebaseAdmin.auth().verifyIdToken(cookieToken);
  const adminUserId = token.uid;
  const adminEmail = token.email;

  // If no user, redirect to login
  if (!adminUserId) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      adminUserId,
      adminEmail,
    },
  };
};

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { adminUserId, adminEmail } = props;

  const { data: dashboardMetrics } = useSWR<GetDashboardMetricsResponse>(
    `${LocalEndpoint.GET_DASHBOARD_METRICS}?adminUserId=${adminUserId}&adminEmail=${adminEmail}`,
    {
      refreshInterval: 15000,
      initialData: null,
      refreshWhenHidden: true,
    },
  );

  const {
    totalProfit = null,
    charges = null,
    revenue = null,
    owedToRestaurants = null,
  } = dashboardMetrics ?? {};

  const { isDesktop } = useContext(ScreenContext);
  dlog('index ➡️ charges:', charges);
  dlog('index ➡️ revenue:', revenue);

  return (
    <>
      <Head>
        <title>{METADATA.TITLE_SUFFIX}</title>
        <meta
          property="og:title"
          content="Tastiest food no matter where you are"
          key="title"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>

      <div className="flex flex-col h-full space-y-8">
        {/* <Introduction
          payoutTotal={payoutTotal}
          restaurantName={restaurantDetails?.name}
        /> */}

        <div className="flex space-x-4">
          {/* <div style={{ maxWidth: '400px' }} className="w-7/12">
            <TimelineBarChart restaurantId={''} />
          </div> */}
          <div style={{ maxWidth: '300px' }} className="flex-1">
            <InfoCard
              color="primary"
              label="Total Revenue"
              info={revenue ? `£${revenue.toFixed(2)}` : ' '}
            />
          </div>

          <div style={{ maxWidth: '300px' }} className="flex-1">
            <InfoCard
              color="primary-2"
              label="Total Profit"
              info={totalProfit ? `£${totalProfit.toFixed(2)}` : ' '}
            />
          </div>

          <div
            style={{ minWidth: '250px', maxWidth: '350px' }}
            className="flex-1"
          >
            <InfoCard
              color="alt-1"
              label="Owed to Restaurants"
              info={
                owedToRestaurants ? `£${owedToRestaurants.toFixed(2)}` : ' '
              }
            />
          </div>
        </div>

        <UsersTable />
      </div>
    </>
  );
};

export default Index;
