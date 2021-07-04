/* eslint-disable react/display-name */
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  StopOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Tooltip } from '@tastiest-io/tastiest-components';
import { dlog, IUserData } from '@tastiest-io/tastiest-utils';
import Table from 'components/Table';
import moment from 'moment';
import Link from 'next/link';
import { TastiestCustomerProfile } from 'pages/api/getCustomerProfile';
import { UserRecord } from 'pages/api/getUsers';
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

type UserDataRow = { id: string; row: IUserData };

const AccordianElement = ({ id, row }: UserDataRow) => {
  const { data: profile, error } = useSWR<TastiestCustomerProfile>(
    `${LocalEndpoint.GET_CUSTOMER_PROFILE}?email=${row.details.email}`,
    {
      refreshInterval: 30000,
      initialData: null,
      refreshWhenHidden: true,
    },
  );

  dlog('UsersTable ➡️ error:', error);

  return (
    <div
      style={{ minHeight: '2.5rem' }}
      className="flex flex-col w-full px-2 py-2 text-sm bg-gray-100 rounded-md"
    >
      <div className="flex justify-between h-10 px-2 mb-2 bg-gray-200 rounded-md">
        <div className="flex items-center justify-start w-full space-x-4">
          <Tooltip placement="top-left" content="View user profile">
            <Link href={profile ? `/customers/${profile?.userId}` : '#'}>
              <a>
                <EyeOutlined className="text-xl text-alt-1" />
              </a>
            </Link>
          </Tooltip>

          <Tooltip placement="top-left" content="Update user">
            <EditOutlined onClick={() => null} className="text-xl text-alt-1" />
          </Tooltip>

          <Tooltip placement="top-left" content="Reward">
            <TrophyOutlined
              onClick={() => null}
              className="text-xl text-yellow-600"
            />
          </Tooltip>
        </div>

        <div className="flex items-center justify-end w-full space-x-4">
          <Tooltip placement="top-right" content="Ban user">
            <StopOutlined
              onClick={() => null}
              className="text-xl text-yellow-600"
            />
          </Tooltip>

          <Tooltip placement="top-right" content="Delete user">
            <DeleteOutlined
              onClick={() => null}
              className="text-xl text-red-500 "
            />
          </Tooltip>
        </div>
      </div>

      {profile ? (
        <div className="px-1">
          <table style={{ minWidth: '300px' }} className="w-1/2">
            <tbody>
              {profile.userId && (
                <tr>
                  <td>User ID</td>
                  <td className="text-right">{profile?.userId}</td>
                </tr>
              )}

              <tr>
                <td>Email</td>
                <td className="text-right">{profile?.email}</td>
              </tr>

              {profile?.userData?.details?.mobile && (
                <tr>
                  <td>Mobile</td>
                  <td className="text-right">
                    {profile?.userData.details.mobile}
                  </td>
                </tr>
              )}

              {profile?.userData?.details?.birthday && (
                <tr>
                  <td>Birthday</td>
                  <td className="text-right">
                    {profile?.userData.details.birthday.day}/
                    {profile?.userData.details.birthday.month}/
                    {profile?.userData.details.birthday.year}
                  </td>
                </tr>
              )}

              {profile?.city && (
                <tr>
                  <td>Location</td>
                  <td className="text-right">
                    {profile?.city}
                    {profile?.country ? ', ' + profile?.country : ''}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          {error ? (
            <p className="pt-1">No user profile generated yet.</p>
          ) : (
            <LoadingOutlined className="text-xl fill-current text-primary" />
          )}
        </div>
      )}
    </div>
  );
};

export default function UsersTable() {
  const { data: users } = useSWR<IUserData[]>(`${LocalEndpoint.GET_USERS}`, {
    refreshInterval: 30000,
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
      width: '200',
      accessor: (row: UserRecord) => {
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
      accessor: (row: IUserData) => {
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
      accessor: (row: IUserData) => (
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
      accessor: (row: IUserData) => (
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
        rowAccordianElement={AccordianElement}
        searchFunction={searchFunction}
        isLoadingInitialData={isInitialLoading}
      />
    </div>
  );
}
