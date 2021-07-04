/* eslint-disable react/display-name */
import { TastiestInternalError } from '@tastiest-io/tastiest-utils';
import Table from 'components/Table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';

type UserDataRow = { id: string; row: TastiestInternalError };

const AccordianElement = ({ row }: UserDataRow) => {
  const properties: string | Record<string, unknown> = row.properties;
  // try {
  //   properties = JSON.parse(row.properties);
  // } catch {
  //   properties = String(row.properties);
  // }

  return (
    <div style={{ maxWidth: '400px' }} className="break-words">
      {typeof properties === 'string' ? (
        <>{properties}</>
      ) : (
        <table>
          <tbody>
            <tr>
              {Object.entries(properties).map(([key, value]) => (
                <>
                  <td>{key}</td>
                  <td>{JSON.stringify(value)}</td>
                </>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default function ErrorsTable() {
  const { data: internalErrors } = useSWR<TastiestInternalError[]>(
    `${LocalEndpoint.GET_INTERNAL_ERRORS}`,
    {
      refreshInterval: 20000,
      initialData: null,
      refreshWhenHidden: true,
      compare: (a, b) => JSON.stringify(a) === JSON.stringify(b),
    },
  );

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (internalErrors) {
      setIsInitialLoading(false);
    }
  }, [internalErrors]);

  const columns = [
    {
      id: 'code',
      Header: 'Error Code',
      accessor: (row: TastiestInternalError) => {
        return (
          <div className="flex items-center justify-start">
            <span className="p-2 mt-1 text-sm font-medium rounded-md bg-aux-orange bg-opacity-20">
              {row.code}
            </span>
          </div>
        );
      },
    },
    {
      id: 'message',
      Header: 'Message',
      accessor: (row: TastiestInternalError) => {
        return (
          <div className="">
            <p className="font-medium">{row.message}</p>
            <p className="text-sm opacity-50">{row.originFile}</p>
          </div>
        );
      },
    },
    {
      id: 'timestamp',
      Header: 'Time',
      accessor: (row: TastiestInternalError) => (
        <div>
          <p>{moment(row.timestamp).local().fromNow()}</p>
          <p className="text-sm opacity-50">
            {moment(row.timestamp).local().format('hh:mm:ss DD/MM/YYYY')}
          </p>
        </div>
      ),
    },
  ];

  const searchFunction = (query: string, data: TastiestInternalError[]) => {
    return data.filter(internalError => {
      return (
        internalError.code.toLowerCase().includes(query.toLowerCase()) ||
        internalError.message.toLowerCase().includes(query.toLowerCase()) ||
        internalError.originFile.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  return (
    <div>
      <Table
        label="Internal Errors"
        columns={columns}
        data={internalErrors ?? []}
        noDataLabel="No internal errors"
        searchFunction={searchFunction}
        rowAccordianElement={AccordianElement}
        isLoadingInitialData={isInitialLoading}
      />
    </div>
  );
}
