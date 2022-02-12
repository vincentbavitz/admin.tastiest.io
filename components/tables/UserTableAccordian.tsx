import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  StopOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { CheckIcon } from '@tastiest-io/tastiest-icons';
import { TextArea, Tooltip } from '@tastiest-io/tastiest-ui';
import { useHorusSWR, UserData } from '@tastiest-io/tastiest-utils';
import { useAuth } from 'hooks/useAuth';
import Link from 'next/link';
import { TastiestCustomerProfile } from 'pages/api/getCustomerProfile';
import React, { useState } from 'react';
import { LocalEndpoint } from 'types/api';
import { dlog } from 'utils/development';

interface UserTableAccordianProps {
  id: string;
  row: UserData;
}

const UserTableAccordian = ({ row }: UserTableAccordianProps) => {
  const { token } = useAuth();

  const { data: profile, error } = useHorusSWR<TastiestCustomerProfile>(
    `${LocalEndpoint.GET_CUSTOMER_PROFILE}?email=${row.details.email}`,
    {
      refreshInterval: 30000,
      initialData: null,
      refreshWhenHidden: true,
    },
  );

  dlog('UsersTable ➡️ error:', error);

  const [userNotesEditing, setUserNotesEditing] = useState(false);

  return (
    <div
      style={{ minHeight: '2.5rem' }}
      className="flex flex-col w-full pb-2 text-sm bg-gray-100 rounded-md"
    >
      <div className="flex justify-between h-10 px-4 bg-gray-200 rounded-t-md">
        <div className="flex items-center justify-start w-full space-x-4">
          <Tooltip placement="top-start" content="View user profile">
            <Link href={profile ? `/customers/${profile?.userId}` : '#'}>
              <a>
                <EyeOutlined className="text-xl text-black" />
              </a>
            </Link>
          </Tooltip>

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
              <td className="text-right">{profile?.userId}</td>
            </tr>

            <tr>
              <td>Email</td>
              <td className="text-right">{profile?.email}</td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td className="text-right">
                {profile?.userData?.details?.mobile}
              </td>
            </tr>
            <tr>
              <td>Birthday</td>
              <td className="text-right">
                {profile?.userData?.details?.birthday?.day}/
                {profile?.userData?.details?.birthday?.month}/
                {profile?.userData?.details?.birthday?.year}
              </td>
            </tr>
            <tr>
              <td>Location</td>
              <td className="text-right">
                {profile?.city}
                {profile?.country ? ', ' + profile?.country : ''}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between pr-1">
            <p className="text-base">User Notes</p>

            {userNotesEditing ? (
              <CheckIcon
                onClick={() => setUserNotesEditing(false)}
                className="w-3 pb-1 cursor-pointer text-gray-500"
              />
            ) : (
              <EditOutlined
                onClick={() => setUserNotesEditing(true)}
                className="pb-1 text-base cursor-pointer text-gray-500"
              />
            )}
          </div>

          {userNotesEditing ? (
            <div style={{ minHeight: '50px' }} className="flex-grow">
              <TextArea size="small" />
            </div>
          ) : (
            <div
              style={{ minHeight: '50px' }}
              className="flex-grow p-2 break-all border-2 rounded-md border-secondary"
            >
              {/* {profile.userData?.metrics?.notes ?? ''} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTableAccordian;
