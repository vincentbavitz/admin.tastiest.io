/* eslint-disable react/display-name */
import { dlog, IUserData } from '@tastiest-io/tastiest-utils';
import Table from 'components/Table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';

enum EditableBookingFields {
  BOOKING_DATE = 'bookingDate',
  HAS_ARRIVED = 'hasArrived',
  HAS_CANCELLED = 'hasCancelled',
}

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

export default function UsersTable() {
  const { data: users } = useSWR<IUserData[]>(`${LocalEndpoint.GET_USERS}`, {
    refreshInterval: 5000,
    initialData: null,
    refreshWhenHidden: true,
  });

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (users) {
      setIsInitialLoading(false);
    }
  }, [users]);

  dlog('UsersTable ➡️ users:', users);

  const columns = [
    {
      id: 'userName',
      Header: 'Name',
      accessor: (row: IUserData) => {
        return (
          <p className="font-medium">
            {row.details.firstName +
              (row?.details?.lastName ? ' ' + row.details.lastName : '')}
          </p>
        );
      },
    },
    {
      id: 'lastActive',
      Header: 'Last Active',
      accessor: (row: IUserData) => {
        return (
          <p>
            {moment(Date.now() - 435602)
              .local()
              .fromNow()}
          </p>
        );
      },
    },
    {
      id: 'orders',
      Header: 'Orders',
      accessor: (row: IUserData) => <p>{33}</p>,
    },
    {
      id: 'totalSpent',
      Header: 'Total Spent',
      accessor: (row: IUserData) => (
        <p className="font-medium">£{Number(33)?.toFixed(2)}</p>
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

  const searchFunction = (query: string, data: IUserData[]) => {
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
    <div>
      <Table
        label="Users"
        columns={columns}
        data={users ?? []}
        noDataLabel="No users yet"
        // updateData={updateData}
        searchFunction={searchFunction}
        isLoadingInitialData={isInitialLoading}
      />
    </div>
  );
}
