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

  // Dropdown accordian Element for each row (optional)
  rowAccordianElement?: React.FC<{ id: string; row: any }>;

  leftAlignedColumns?: number[];

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
    rowAccordianElement,
    leftAlignedColumns = [0],
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

  // Used for Accordian Element
  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <div className="relative">
      <div className="flex items-center justify-between w-full mb-2">
        {label && <div className="pr-4 text-xl font-somatic">{label}</div>}
        <div style={{ width: '300px' }} className="">
          <Input
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
        className={clsx(
          'w-full pb-6 overflow-x-auto bg-white rounded-xl',
          rowAccordianElement ? 'pl-8 pr-4' : 'px-6',
        )}
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
                    className="flex flex-col border-t border-border-gray-300"
                  >
                    <div className="relative flex w-full">
                      {row.cells.map((cell, j) => {
                        return (
                          <td
                            key={uuid()}
                            {...cell.getCellProps()}
                            className={clsx(
                              'flex items-center',
                              !leftAlignedColumns.some(c => c === j) &&
                                'text-center justify-center',
                            )}
                          >
                            <div>
                              <div className="py-2 pr-2 overflow-x-hidden whitespace-nowrap">
                                {cell.render('Cell', { ...cell })}
                              </div>
                            </div>
                          </td>
                        );
                      })}

                      {rowAccordianElement && (
                        <div
                          onClick={() =>
                            expandedRow ===
                            setExpandedRow(
                              expandedRow === row.id ? null : row.id,
                            )
                          }
                          className="absolute left-0 flex items-center h-full px-2 py-2 -ml-6 text-gray-300 cursor-pointer hover:text-gray-500"
                        >
                          <TriangleIcon
                            className={clsx(
                              'w-2 duration-200 transform fill-current',
                              expandedRow === row.id
                                ? '-rotate-90'
                                : 'rotate-90',
                            )}
                          />
                        </div>
                      )}
                    </div>

                    {rowAccordianElement && expandedRow === row.id && (
                      <div className="pb-3">
                        <props.rowAccordianElement
                          id={row.id}
                          row={row.original}
                        />
                      </div>
                    )}
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
