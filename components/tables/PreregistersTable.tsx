/* eslint-disable react/display-name */
import { Table } from '@tastiest-io/tastiest-ui';
import { DateTime } from 'luxon';
import { Preregister } from 'pages/api/getPreregisters';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const MS_IN_TEN_MINUTES = 1000 * 60 * 10;

export default function PreregistersTable() {
  const { data: unsorted } = useSWR('/api/getPreregisters', {
    refreshInterval: 120000,
    initialData: null,
    refreshWhenHidden: true,
  });

  const preregisters =
    unsorted?.sort(
      (a: Preregister, b: Preregister) => b.position - a.position,
    ) ?? [];

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (preregisters) {
      setIsInitialLoading(false);
    }
  }, [preregisters]);

  const columns = [
    {
      id: 'email',
      Header: 'Email',
      width: '200',
      accessor: (row: Preregister) => {
        return <div className="font-medium">{row.email}</div>;
      },
    },
    {
      id: 'date',
      Header: 'Date',
      width: 80,
      accessor: (row: Preregister) => (
        <div className="font-mono">
          {(row as any).timestamp
            ? DateTime.fromMillis((row as any).timestamp).toFormat('DDDD')
            : null}
        </div>
      ),
    },
    {
      id: 'position',
      Header: 'Position',
      width: 80,
      accessor: (row: Preregister) => (
        <div className="font-mono">
          {Intl.NumberFormat().format(row.position)}
        </div>
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

  const searchFunction = (query: string, data: Preregister[]) => {
    // prettier-ignore
    const result = data.filter(preregister => {
      return (
        preregister.email?.toLowerCase().includes(query.toLowerCase()) ||
        preregister.ref?.toLowerCase().includes(query.toLowerCase())
      );
    });

    return result;
  };

  return (
    <div className="text-xs mobile:text-base">
      <Table
        label="Preregisters"
        columns={columns}
        data={preregisters ?? []}
        noDataLabel="No preregisters yet"
        searchFunction={searchFunction}
        isLoadingInitialData={isInitialLoading}
        paginateInterval={20}
      />
    </div>
  );
}
