/* eslint-disable react/display-name */
import { Table } from '@tastiest-io/tastiest-ui';
import { dlog, IRestaurantData } from '@tastiest-io/tastiest-utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';

const MS_IN_TEN_MINUTES = 1000 * 60 * 10;

// Update any field in the current booking
// instantly using mutate SWR
// async function setBookingField<T>(
//   field: EditableBookingFields,
//   value: T,
//   bookings: IBooking[],
//   rowIndex: number,
// ) {
//   const booking = bookings[rowIndex];
//   if (!booking) {
//     console.log('Booking not found');
//     return;
//   }

//   // Can't modify a cancelled booking
//   if (booking.hasCancelled) {
//     console.log("Can't modify a cancelled booking");
//     return;
//   }

//   const updatedBookUsersTableings = bookings.map((row, index) =>
//     index === rowIndex
//       ? {
//           ...booking,
//           [field]: value,
//         }
//       : row,
//   );

//   // Update booking server side
//   await postFetch<any, IBooking>(LocalEndpoint.UPDATE_BOOKING, {
//     bookingId: booking.orderId,
//     [field]: value,
//   });

//   mutate(
//     `${LocalEndpoint.GET_BOOKINGS}?restaurantId=${booking.restaurantId}`,
//     updatedBookings,
//     false,
//   );
// }

export default function RestaurantsTable() {
  const { data: restaurants } = useSWR<IRestaurantData[]>(
    `${LocalEndpoint.GET_RESTAURANTS}`,
    {
      refreshInterval: 30000,
      initialData: null,
      refreshWhenHidden: true,
    },
  );

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (restaurants) {
      setIsInitialLoading(false);
    }
  }, [restaurants]);

  dlog('UsersTable ➡️ restaurants:', restaurants);

  const columns = [
    {
      id: 'name',
      Header: 'Name',
      width: '200',
      accessor: (row: IRestaurantData) => {
        return (
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <Link href={`/restaurants/${row?.details?.id}`}>
                <a className="font-medium hover:underline">
                  {row?.details?.name}
                </a>
              </Link>
            </div>
            {/* <Link href={`/customers/${row.id}`}>
              <a className="text-sm opacity-75">{row.details.email}</a>
            </Link> */}
          </div>
        );
      },
    },
    {
      id: 'followers',
      Header: 'Followers',
      width: 80,
      accessor: (row: IRestaurantData) => {
        const numFollowers = row?.metrics?.followers?.length;

        return (
          <p>
            {numFollowers ? (
              numFollowers
            ) : (
              <span className="opacity-50">0</span>
            )}
          </p>
        );
      },
    },
    {
      id: 'totalCovers',
      Header: 'Total Covers',
      width: 80,
      accessor: (row: IRestaurantData) => (
        <p className="">
          {row?.bookings?.totalCovers > 0 ? (
            <>row?.bookings?.totalCovers</>
          ) : (
            <span className="opacity-50">0</span>
          )}
        </p>
      ),
    },
    {
      id: 'avgBooking',
      Header: 'Avg. Booking',
      width: 95,
      accessor: (row: IRestaurantData) => {
        return <p>£0.00</p>;
      },
    },
  ];

  // Update data depending on the column
  // const updateData = React.useMemo(
  //   () => (value: any, rowIndex: number, columnId: EditableBookingFields) => {
  //     console.log(`Updating '${columnId}' field on booking to ${value}`);
  //     setBookingField(columnId, value, bookings, rowIndex);
  //   },
  //   [bookings],
  // );

  const searchFunction = (query: string, data: IRestaurantData[]) => {
    // prettier-ignore
    const result = data.filter(restaurantData => {
      return (
        restaurantData.details?.name?.toLowerCase().includes(query.toLowerCase()) ||
        restaurantData.details?.id?.toLowerCase().includes(query.toLowerCase())
      );
    });

    return result;
  };

  return (
    <div className="text-xs mobile:text-base">
      <Table
        label="Restaurants"
        columns={columns}
        data={restaurants ?? []}
        noDataLabel="No restaurants yet"
        searchFunction={searchFunction}
        isLoadingInitialData={isInitialLoading}
        paginateInterval={5}
      />
    </div>
  );
}
