/* eslint-disable react/display-name */
import { Table } from '@tastiest-io/tastiest-ui';
import { dlog, useHorusSWR, UserData } from '@tastiest-io/tastiest-utils';
import { AuthContext } from 'contexts/auth';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import UserTableAccordian from './UserTableAccordian';

const MS_IN_TEN_MINUTES = 1000 * 60 * 10;

export default function MembersTable() {
  const { token } = useContext(AuthContext);
  const { data: members } = useHorusSWR<any>(
    '/admin/accounts?role=admin',
    token,
    {
      refreshInterval: 120000,
      initialData: null,
    },
  );

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (members) {
      setIsInitialLoading(false);
    }
  }, [members]);

  dlog('MembersTable ➡️ users:', members);

  const columns = [
    {
      id: 'name',
      Header: 'Name',
      width: '200',
      accessor: (row: any) => {
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
      id: 'accessLevel',
      Header: 'Access level',
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
        label="Members"
        columns={columns}
        data={members ?? []}
        noDataLabel="No members yet"
        searchFunction={searchFunction}
        isLoadingInitialData={isInitialLoading}
        rowAccordianElement={UserTableAccordian}
        paginateInterval={8}
      />
    </div>
  );
}
