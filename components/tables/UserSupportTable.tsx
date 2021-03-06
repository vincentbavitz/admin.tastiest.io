/* eslint-disable react/display-name */
import { TriangleIcon } from '@tastiest-io/tastiest-icons';
import { Popover, Select, Table } from '@tastiest-io/tastiest-ui';
import {
  dlog,
  useHorusSWR,
  UserSupportRequest,
} from '@tastiest-io/tastiest-utils';
import clsx from 'clsx';
import { AuthContext } from 'contexts/auth';
import moment from 'moment';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

type ResolvedStatus = 'all' | 'resolved' | 'unresolved';
type Priority = 'all' | 'critical' | 'high' | 'normal' | 'low';

export default function UserSupportTable() {
  const { token } = useContext(AuthContext);
  const [filteredResults, setFilteredResults] = useState(null);

  const { data: supportItems } = useHorusSWR<UserSupportRequest[]>(
    '/support/users',
    token,
    {
      refreshInterval: 200000,
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
      accessor: (row: UserSupportRequest) => {
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
      accessor: (row: UserSupportRequest) => {
        return (
          <div className={clsx(row.seen && 'opacity-50')}>
            {row.userId ? (
              <Link href={`/customers/${row.userId}`}>
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
      accessor: (row: UserSupportRequest) => {
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
      accessor: (row: UserSupportRequest) => {
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
      accessor: (row: UserSupportRequest) => {
        return <div>{moment(row.createdAt).local().fromNow()}</div>;
      },
    },
  ];

  const searchFunction = (query: string, data: UserSupportRequest[]) => {
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
  const applyStatusFilter = (status: ResolvedStatus) => {
    dlog('SupportTable ?????? status:', status);

    if (status === 'all') {
      setFilteredResults(null);
      return;
    }

    const filtered = supportItems.filter(item => {
      return item.resolved === (status === 'resolved');
    });

    setFilteredResults(filtered);
  };

  const applyPriorityFilter = (priority: Priority) => {
    dlog('SupportTable ?????? priority:', priority);

    if (priority === 'all') {
      setFilteredResults(null);
      return;
    }

    const filtered = supportItems.filter(item => {
      return item.priority === priority;
    });

    setFilteredResults(filtered);
  };

  return (
    <div>
      <div className="flex w-full justify-end">
        <Popover>
          <Popover.Trigger>
            <div className="flex items-center mb-1 text-lg cursor-pointer">
              Filters
              <TriangleIcon
                className={clsx(
                  'h-2 ml-2 duration-150 transform fill-current text-gray-400',
                  'rotate-90',
                )}
              />
            </div>
          </Popover.Trigger>

          <Popover.Panel>
            <div className="flex items-center justify-end w-full px-3 pt-2 pb-3 mb-4 space-x-6 bg-white rounded-md">
              <div className="w-40">
                <div className="font-medium">Status</div>
                <Select
                  size="small"
                  onSelect={value => applyStatusFilter(value as ResolvedStatus)}
                >
                  <Select.Option id="all" value="All" />
                  <Select.Option id="unresolved" value="Unresolved" />
                  <Select.Option id="resolved" value="Resolved" />
                </Select>
              </div>

              <div className="w-40">
                <div className="font-medium">Priority</div>
                <Select
                  size="small"
                  onSelect={value => applyPriorityFilter(value as Priority)}
                >
                  <Select.Option id="all" value="All" />
                  <Select.Option id="critical" value="Critical" />
                  <Select.Option id="high" value="High" />
                  <Select.Option id="normal" value="Normal" />
                  <Select.Option id="low" value="Low" />
                </Select>
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>

      <Table
        label="User Support Requests"
        columns={columns}
        data={filteredResults ?? supportItems ?? []}
        noDataLabel="No support requests"
        searchFunction={searchFunction}
        leftAlignedColumns={[0, 1, 2]}
        isLoadingInitialData={isInitialLoading}
        paginateInterval={6}
      />
    </div>
  );
}
