/* eslint-disable react/display-name */
import { Table } from '@tastiest-io/tastiest-ui';
import { dlog, IUserDetails } from '@tastiest-io/tastiest-utils';
import moment from 'moment';
import { UserEvent } from 'pages/api/getCustomerEvents';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';

interface Props {
  userDetails: Partial<IUserDetails>;
}

const AccordianElement = ({ row }: { row: UserEvent }) => {
  dlog('CustomerEventsTable ➡️ row?.event_properties:', row?.event_properties);
  return (
    <div
      style={{ minHeight: '2.5rem' }}
      className="flex flex-col w-full px-3 py-2 text-sm bg-gray-100 rounded-md"
    >
      <h4 className="text-base font-medium">Properties</h4>
      <table style={{ minWidth: '300px' }} className="w-full">
        <tbody>
          {Object.entries(row.event_properties).map(([property, value]) => {
            // Try to resolve object to avoid [object: Object]
            let resolvedValue = '';
            try {
              resolvedValue = JSON.stringify(value as any);
            } catch {
              resolvedValue = String(value);
            }

            return value ? (
              <tr key={property}>
                <td>{property}</td>
                <td className="text-right break-all">{resolvedValue}</td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
    </div>
  );
};

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
      Header: 'Time',
      accessor: (row: UserEvent) => {
        return <p>{moment(row.timestamp * 1000).fromNow()}</p>;
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
        rowAccordianElement={AccordianElement}
        // updateData={updateData}
        searchFunction={searchFunction}
        isLoadingInitialData={isInitialLoading}
      />
    </div>
  );
}
