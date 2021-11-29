import {
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Tooltip } from '@tastiest-io/tastiest-ui';
import { Booking } from '@tastiest-io/tastiest-utils';
import React from 'react';

interface BookingsTableAccordianProps {
  id: string;
  row: Booking;
}

const BookingsTableAccordian = ({ row }: BookingsTableAccordianProps) => {
  return (
    <div
      style={{ minHeight: '2.5rem' }}
      className="flex flex-col w-full pb-2 text-sm bg-gray-100 rounded-md"
    >
      <div className="flex justify-between h-10 px-4 bg-gray-200 rounded-t-md">
        <div className="flex items-center justify-start w-full space-x-4">
          <Tooltip placement="top-start" content="Update user">
            <EditOutlined onClick={() => null} className="text-xl text-black" />
          </Tooltip>

          <Tooltip placement="top-start" content="Reward">
            <TrophyOutlined
              onClick={() => null}
              className="text-xl text-yellow-600"
            />
          </Tooltip>
        </div>

        <div className="flex items-center justify-end w-full space-x-4">
          <Tooltip placement="top-start" content="Ban user">
            <StopOutlined
              onClick={() => null}
              className="text-xl text-yellow-600"
            />
          </Tooltip>

          <Tooltip placement="top-start" content="Delete user">
            <DeleteOutlined
              onClick={() => null}
              className="text-xl text-red-500 "
            />
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col px-3 pt-2 space-x-0 space-y-4 tablet:space-x-5 tablet:flex-row">
        <table className="flex-1">
          <tbody>
            <tr>
              <td>User ID</td>
              <td className="text-right">{}</td>
            </tr>

            <tr>
              <td>Email</td>
              <td className="text-right">{}</td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td className="text-right"></td>
            </tr>
            <tr>
              <td>Birthday</td>
              <td className="text-right"></td>
            </tr>
            <tr>
              <td>Location</td>
              <td className="text-right"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTableAccordian;
