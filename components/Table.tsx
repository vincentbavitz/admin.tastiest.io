import { LoadingOutlined } from '@ant-design/icons';
import { Input } from '@tastiest-io/tastiest-components';
import { SearchIcon, TriangleIcon } from '@tastiest-io/tastiest-icons';
import clsx from 'clsx';
import { isUndefined } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useFlexLayout, useSortBy, useTable } from 'react-table';
import { v4 as uuid } from 'uuid';

interface TableProps {
  label?: string;
  columns: any[];
  data: any[];

  noDataLabel?: string;
  isLoadingInitialData?: boolean;

  // Describes how data is filtered on search
  searchFunction?: (query: string, data: any[]) => any[];

  // Update data example given here
  // https://react-table.tanstack.com/docs/examples/editable-data
  updateData?: (
    value: any | any[],
    rowIndex: number,
    columnId: string | number,
  ) => void;
}

export type TableColumn = {
  // Required by react-table
  Header: string;
  accessor: string;

  // Additional
  bold?: boolean;
}[];

export default function Table(props: TableProps) {
  const {
    columns,
    data = [],
    label,
    noDataLabel = 'No Data',
    updateData = null,
    isLoadingInitialData = false,
    searchFunction = () => null,
  } = props;

  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const updateSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.length) {
      setFilteredData(data);
      return;
    }

    setFilteredData(searchFunction(query, data) ?? []);
  };

  // Set initial data for the table in the case that default useState value fails
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      updateData,
      data: filteredData,
    },
    useSortBy,
    useFlexLayout,
  );

  console.log('Table ➡️ getTablePr5ops:', getTableProps());
  console.log('Table ➡️ headerGroups:', headerGroups);
  console.log('Table ➡️ rows:', rows);

  const leftAlignedColumns = [0];

  return (
    <div className="relative">
      <div className="flex items-center justify-between w-full">
        {label && <div className="mb-2 text-lg font-somatic">{label}</div>}
        <div style={{ width: '300px' }} className="">
          <Input
            size="small"
            color="neutral"
            className="bg-white"
            value={searchQuery}
            onValueChange={updateSearch}
            suffix={<SearchIcon className="w-5 text-gray-400 fill-current" />}
          />
        </div>
      </div>

      <div
        style={{ maxWidth: '100%' }}
        className="w-full px-6 pb-6 overflow-x-auto bg-white rounded-xl"
      >
        {data.length > 0 && (
          <table className="w-full" {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr key={uuid()} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <th
                      key={uuid()}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={clsx(
                        'py-4 text-sm text-gray-600 opacity-75 font-normal select-none whitespace-nowrap',
                      )}
                    >
                      <div className="flex items-center pr-2 text-center">
                        <p
                          className={clsx(
                            !isUndefined(leftAlignedColumns.find(n => n === i))
                              ? 'text-left'
                              : 'text-center',
                            'w-full font-medium',
                          )}
                        >
                          {column.render('Header')}
                        </p>
                        <span>
                          {column.isSorted ? (
                            <TriangleIcon
                              className={clsx(
                                'h-2 ml-2 duration-150 transform fill-current text-gray-400',
                                column.isSortedDesc
                                  ? 'rotate-90'
                                  : '-rotate-90',
                              )}
                            />
                          ) : (
                            ''
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                i;
                prepareRow(row);
                return (
                  <tr
                    key={uuid()}
                    {...row.getRowProps()}
                    className="border-t border-gray-300"
                  >
                    {row.cells.map((cell, j) => {
                      return (
                        <td
                          key={uuid()}
                          {...cell.getCellProps()}
                          className={clsx(j !== 0 && 'text-center')}
                        >
                          <div className="py-2 pr-2 overflow-x-hidden whitespace-nowrap">
                            {cell.render('Cell', { ...cell })}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Loading and no-data states */}
        {(!data?.length || data.length === 0) && (
          <div className="flex items-center justify-center h-32">
            {isLoadingInitialData ? (
              <LoadingOutlined className="text-4xl fill-current text-primary" />
            ) : (
              <p className="text-lg">{noDataLabel}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
