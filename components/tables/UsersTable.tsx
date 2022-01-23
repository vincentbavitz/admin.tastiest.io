/* eslint-disable react/display-name */
import { Table } from '@tastiest-io/tastiest-ui';
import { useHorusSWR, UserData } from '@tastiest-io/tastiest-utils';
import { AuthContext } from 'contexts/auth';
import moment from 'moment';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import UserTableAccordian from './UserTableAccordian';

const MS_IN_TEN_MINUTES = 1000 * 60 * 10;

// Update any field in the current booking
// instantly using mutate SWR
// async function setBookingField<T>(
//   field: EditableBookingFields,
//   value: T,
//   bookings: Booking[],
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
//   await postFetch<any, Booking>(LocalEndpoint.UPDATE_BOOKING, {
//     bookingId: booking.orderId,
//     [field]: value,
//   });

//   mutate(
//     `${LocalEndpoint.GET_BOOKINGS}?restaurantId=${booking.restaurantId}`,
//     updatedBookings,
//     false,
//   );
// }

export default function UsersTable() {
  const { token } = useContext(AuthContext);
  const { data: users } = useHorusSWR('/users', token, {
    refreshInterval: 120000,
    initialData: null,
    refreshWhenHidden: true,
  });

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (users) {
      setIsInitialLoading(false);
    }
  }, [users]);

  const columns = [
    {
      id: 'userName',
      Header: 'Name',
      width: '200',
      accessor: (row: UserData & { id: string }) => {
        return (
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              {Date.now() - row.details.lastActive < MS_IN_TEN_MINUTES && (
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              )}
              <Link href={`/customers/${row.id}`}>
                <a className="font-medium hover:underline">
                  {row.details.firstName +
                    (row?.details?.lastName ? ' ' + row.details.lastName : '')}
                </a>
              </Link>
            </div>
            <Link href={`/customers/${row.id}`}>
              <a className="text-sm opacity-75">{row.details.email}</a>
            </Link>
          </div>
        );
      },
    },
    {
      id: 'lastActive',
      Header: 'Last Active',
      maxWidth: 100,
      accessor: (row: UserData) => {
        return (
          <p className="text-sm opacity-75">
            {row.details.lastActive ? (
              moment(row.details.lastActive).local().fromNow()
            ) : (
              <span className="opacity-50">—</span>
            )}
          </p>
        );
      },
    },
    {
      id: 'orders',
      Header: 'Orders',
      width: 80,
      accessor: (row: UserData) => (
        <p>
          {row.metrics?.totalBookings ? (
            row.metrics.totalBookings
          ) : (
            <span className="opacity-50">0</span>
          )}
        </p>
      ),
    },
    {
      id: 'totalSpent',
      Header: 'Total Spent',
      width: 80,
      accessor: (row: UserData) => (
        <p className="">
          {row.metrics?.totalSpent?.['GBP'] > 0 ? (
            <>£{Number(row.metrics?.totalSpent?.['GBP'] ?? 0)?.toFixed(2)}</>
          ) : (
            <span className="opacity-50"> £{(0).toFixed(2)}</span>
          )}
        </p>
      ),
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

  const searchFunction = (query: string, data: UserData[]) => {
    // prettier-ignore
    const result = data.filter(userData => {
      const fullName = userData.details?.firstName + (userData.details?.lastName ? ' ' + userData.details.lastName : '');
      
      return (
        fullName?.toLowerCase().includes(query.toLowerCase()) ||
        userData.details?.email?.toLowerCase().includes(query.toLowerCase())
      );
    });

    return result;
  };

  return (
    <div className="text-xs mobile:text-base">
      <Table
        label="Users"
        columns={columns}
        data={users ?? []}
        noDataLabel="No users yet"
        searchFunction={searchFunction}
        isLoadingInitialData={isInitialLoading}
        rowAccordianElement={UserTableAccordian}
        paginateInterval={8}
      />
    </div>
  );
}
