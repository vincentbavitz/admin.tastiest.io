import BookingsTable from 'components/tables/BookinigsTable';
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

const Bookings: NextPage = () => {
  return (
    <div>
      <BookingsTable />
    </div>
  );
};

export default Bookings;
