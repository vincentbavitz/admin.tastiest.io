/* eslint-disable react/display-name */
import { Select } from '@tastiest-io/tastiest-components';
import { TriangleIcon } from '@tastiest-io/tastiest-icons';
import { IUserSupportRequest } from '@tastiest-io/tastiest-utils';
import clsx from 'clsx';
import Table from 'components/Table';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useToggle } from 'react-use';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';

type ResolvedStatus = 'all' | 'resolved' | 'unresolved';

export default function SupportTable() {
  const [filteredResults, setFilteredResults] = useState(null);
  const { data: supportItems } = useSWR<IUserSupportRequest[]>(
    LocalEndpoint.GET_USER_SUPPORT_REQUESTS,
    {
      refreshInterval: 30000,
      initialData: null,
      refreshWhenHidden: true,
    },
  );

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (supportItems) {
      setIsInitialLoading(false);
    }
  }, [supportItems]);

  const columns = [
    {
      id: 'priority',
      Header: 'Priority',
      width: '120',
      accessor: (row: IUserSupportRequest) => {
        return (
          <div
            className={clsx(
              'py-px px-2 rounded-md text-center uppercase bg-opacity-25 w-20 text-sm',
              row.priority === 'critical' && 'bg-danger',
              row.priority === 'high' && 'bg-yellow-500',
              row.priority === 'normal' && 'bg-blue-500',
              row.priority === 'low' && 'bg-gray-200',
              row.seen && 'opacity-50',
            )}
          >
            {row.priority}
          </div>
        );
      },
    },
    {
      id: 'userName',
      Header: 'Name',
      width: '120',
      accessor: (row: IUserSupportRequest) => {
        return (
          <div className={clsx(row.seen && 'opacity-50')}>
            {row.userId ? (
              <Link href={row.userId}>
                <a
                  className={clsx(
                    'flex flex-col font-medium hover:underline cursor-pointer',
                  )}
                >
                  {row.name}
                </a>
              </Link>
            ) : (
              <div className={'flex flex-col'}>{row.name}</div>
            )}
          </div>
        );
      },
    },
    {
      id: 'lastMessage',
      Header: 'Request',
      width: 300,
      accessor: (row: IUserSupportRequest) => {
        return (
          <div className="overflow-hidden cursor-pointer hover:underline">
            {row.seen ? (
              <div className="font-medium opacity-50">
                {row.conversation[0].message}
              </div>
            ) : (
              <Link href={`/support/${row.id}`}>
                <a className="font-medium">{row.conversation[0].message}</a>
              </Link>
            )}
          </div>
        );
      },
    },
    {
      id: 'type',
      Header: 'Type',
      width: 150,
      accessor: (row: IUserSupportRequest) => {
        return (
          <div className="w-20 px-2 py-px text-sm text-center uppercase bg-opacity-25 rounded-md bg-secondary-2">
            {row.type}
          </div>
        );
      },
    },
    {
      id: 'createdAt',
      Header: 'Time',
      width: '150',
      accessor: (row: IUserSupportRequest) => {
        return <div>{moment(row.createdAt).local().fromNow()}</div>;
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

  const searchFunction = (query: string, data: IUserSupportRequest[]) => {
    // prettier-ignore
    const result = data.filter(supportItem => {       
        return (
          supportItem.name?.toLowerCase().includes(query.toLowerCase()) ||
          supportItem.email?.toLowerCase().includes(query.toLowerCase()) || 
          supportItem.conversation?.[0]?.message?.toLowerCase().includes(query.toLowerCase())
        );
      });

    return result;
  };

  // Managing filters
  const [filtersOpen, toggleFiltersOpen] = useToggle(false);
  const applyStatusFilter = (status: ResolvedStatus) => {
    if (status === 'all') {
      setFilteredResults(null);
      return;
    }

    const filtered = supportItems.filter(item => {
      return item.resolved === (status === 'resolved');
    });

    setFilteredResults(filtered);
  };

  return (
    <div>
      <div className="flex items-center justify-end mb-1 text-lg">
        Filters{' '}
        <span
          onClick={() => toggleFiltersOpen()}
          className="h-full px-1 cursor-pointer"
        >
          <TriangleIcon
            className={clsx(
              'h-2 ml-2 duration-150 transform fill-current text-gray-400',
              filtersOpen ? '-rotate-90' : 'rotate-90',
            )}
          />
        </span>
      </div>

      {filtersOpen && (
        <div className="flex items-center justify-end w-full px-3 pt-2 pb-3 mb-4 space-x-6 bg-white rounded-md">
          <div className="w-40">
            <div className="font-medium">Status</div>
            <Select
              size="small"
              onChange={value => applyStatusFilter(value as ResolvedStatus)}
            >
              <option value="all">All</option>
              <option value="unresolved" selected>
                Unresolved
              </option>
              <option value="resolved">Resolved</option>
            </Select>
          </div>

          <div className="w-40">
            <div className="font-medium">Type</div>
            <Select size="small" onChange={() => null}>
              <option>All</option>
              <option>Critical</option>
              <option>High</option>
              <option>Normal</option>
              <option>Low</option>
            </Select>
          </div>

          <div className="w-40">
            <div className="font-medium">From</div>
            <Select size="small" onChange={() => null}>
              <option value={'all'}>All</option>
              <option value={'users'}>Users</option>
              <option value={'restaurants'}>Restaurants</option>
            </Select>
          </div>
        </div>
      )}

      <Table
        label="Support Requests"
        columns={columns}
        data={filteredResults ?? supportItems ?? []}
        noDataLabel="No support requests"
        searchFunction={searchFunction}
        leftAlignedColumns={[0, 1, 2]}
        isLoadingInitialData={isInitialLoading}
      />
    </div>
  );
}
