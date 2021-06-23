/* eslint-disable react/display-name */
import { dlog, IUserDetails } from '@tastiest-io/tastiest-utils';
import Table from 'components/Table';
import moment from 'moment';
import { UserEvent } from 'pages/api/getCustomerEvents';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';

interface Props {
  userDetails: Partial<IUserDetails>;
}

export default function CustomerEventsTable(props: Props) {
  const { userDetails } = props;

  const { data: userEvents } = useSWR<UserEvent[]>(
    `${LocalEndpoint.GET_CUSTOMER_EVENTS}?email=${userDetails.email}`,
    {
      refreshInterval: 15000,
      initialData: null,
      refreshWhenHidden: true,
    },
  );

  dlog('CustomerEventsTable ➡️ userEvents:', userEvents);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  useEffect(() => {
    if (userEvents) {
      setIsInitialLoading(false);
    }
  }, [userEvents]);

  const columns = [
    {
      id: 'eventName',
      Header: 'Event',
      accessor: (row: UserEvent) => {
        return <p className="font-medium">{row.event_name}</p>;
      },
    },
    {
      id: 'timestamp',
      Header: 'Timerstamp',
      accessor: (row: UserEvent) => {
        return <p>{moment(row.timestamp * 1000).fromNow()}</p>;
      },
    },
    {
      id: 'orders',
      Header: 'Orders',
      accessor: (row: UserEvent) => <p>{33}</p>,
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

  const searchFunction = (query: string, data: UserEvent[]) => {
    // prettier-ignore
    const result = data.filter(userEvent => {
      return (
        userEvent.event_name?.toLowerCase().includes(query.toLowerCase()) 
      );
    });

    return result;
  };

  return (
    <div>
      <Table
        label="User Events"
        columns={columns}
        data={userEvents ?? []}
        noDataLabel="No events yet"
        // updateData={updateData}
        searchFunction={searchFunction}
        isLoadingInitialData={isInitialLoading}
      />
    </div>
  );
}
