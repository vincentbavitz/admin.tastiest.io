import { InfoCard } from '@tastiest-io/tastiest-ui';
import { Booking } from '@tastiest-io/tastiest-utils';
import CoversBarChart from 'components/charts/CoversBarChart';
import BookingsTable from 'components/tables/bookings/BookinigsTable';
import { NextPage } from 'next';
import nookies from 'nookies';
import React, { useState } from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';

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
  const [usingTestData, setUsingTestData] = useState(false);

  const { data: bookings } = useSWR<Booking[]>(
    `${LocalEndpoint.GET_BOOKINGS}?useTestData=${usingTestData}`,
    {
      refreshInterval: 5000,
      initialData: null,
      refreshWhenHidden: true,
      compare: (a, b) => JSON.stringify(a) === JSON.stringify(b),
    },
  );

  return (
    <div>
      <div className="flex justify-between gap-4 flex-wrap">
        <div
          style={{ maxWidth: '800px' }}
          className="flex flex-wrap flex-1 gap-4"
        >
          <div className="flex-1">
            <InfoCard
              color="primary"
              label="Total Bookings"
              compact={false}
              isLoading={!bookings?.length}
              info={bookings?.length}
              polyfillInfo={'0'}
            />
          </div>

          <div className="flex-1">
            <InfoCard
              color="secondary"
              label="YTD"
              compact={false}
              isLoading={!bookings?.length}
              info={bookings?.length}
              polyfillInfo={'0'}
            />
          </div>
        </div>

        <div
          style={{ maxWidth: '500px', minHeight: '200px' }}
          className="flex-1"
        >
          <CoversBarChart bookings={bookings} />
        </div>
      </div>

      <div className="pt-10">
        <BookingsTable bookings={bookings} />
      </div>
    </div>
  );
};

export default Bookings;
