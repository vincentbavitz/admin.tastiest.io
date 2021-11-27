import { NextPage } from 'next';
import nookies from 'nookies';
import React from 'react';

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

const StatisticsPage: NextPage = () => {
  return <div>Running Costs.auth().</div>;
};

export default StatisticsPage;
