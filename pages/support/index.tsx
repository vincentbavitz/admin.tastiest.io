import { RestaurantData } from '@tastiest-io/tastiest-utils';
import RestaurantSupportTable from 'components/tables/RestaurantSupportTable';
import UserSupportTable from 'components/tables/UserSupportTable';
import { useScreenSize } from 'hooks/useScreenSize';
import { NextPage } from 'next';
import Head from 'next/head';
import nookies from 'nookies';
import React from 'react';
import { METADATA } from '../../constants';

interface Props {
  resaurant?: RestaurantData;
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

  return { props: {} };
};

const Support: NextPage<Props> = () => {
  const { isDesktop } = useScreenSize();

  return (
    <>
      <Head>
        <title>Support - {METADATA.TITLE_SUFFIX}</title>
      </Head>

      <div className="flex flex-col space-y-12 mt-6">
        <UserSupportTable />

        <RestaurantSupportTable />
      </div>
    </>
  );
};

export default Support;
