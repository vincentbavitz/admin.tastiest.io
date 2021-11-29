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
      <div className="grid grid-cols-12 gap-4">
        <div className="grid grid-cols-1 col-span-4 grid-rows-2 gap-4">
          <InfoCard
            color="primary"
            label="Total Bookings"
            compact={false}
            isLoading={!bookings?.length}
            info={bookings?.length}
            polyfillInfo={'0'}
          />
          <InfoCard
            color="secondary"
            label="YTD"
            compact={false}
            isLoading={!bookings?.length}
            info={bookings?.length}
            polyfillInfo={'0'}
          />
        </div>

        <div className="col-span-8">
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
