import { InfoCard } from '@tastiest-io/tastiest-ui';
import clsx from 'clsx';
import PreregistersTable from 'components/tables/PreregistersTable';
import UsersTable from 'components/tables/UsersTable';
import { useScreenSize } from 'hooks/useScreenSize';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import nookies from 'nookies';
import React from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';
import { dlog } from 'utils/development';
import { firebaseAdmin } from 'utils/firebaseAdmin';
import { METADATA } from '../constants';
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

  const { isDesktop, isHuge } = useScreenSize();
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
        <div className="grid grid-cols-1 gap-2 mobile:grid-cols-2 tablet:gap-4 tablet:grid-cols-3">
          <div className="flex-1">
            <InfoCard
              color="primary"
              label="Total Revenue"
              compact={!isHuge}
              isLoading={!revenue}
              polyfillInfo={'£00.00'}
              info={revenue ? `£${revenue.toFixed(2)}` : ' '}
            />
          </div>

          <div className="flex-1">
            <InfoCard
              color="alt-2"
              label="Total Profit"
              compact={!isHuge}
              isLoading={!totalProfit}
              polyfillInfo={'£00.00'}
              info={totalProfit ? `£${totalProfit.toFixed(2)}` : ' '}
            />
          </div>

          <div style={{ minWidth: '200px' }} className={clsx('flex-1')}>
            <InfoCard
              color="alt-1"
              label="Owed to Restaurants"
              compact={!isHuge}
              isLoading={!owedToRestaurants}
              polyfillInfo={'£00.00'}
              info={
                owedToRestaurants
                  ? `£${Math.max(0, owedToRestaurants).toFixed(2)}`
                  : ' '
              }
            />
          </div>
        </div>

        <UsersTable />

        <PreregistersTable />
      </div>
    </>
  );
};

export default Index;
