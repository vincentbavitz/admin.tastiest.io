import {
  DownOutlined,
  ExportOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, AvatarProps, Dropdown } from '@tastiest-io/tastiest-ui';
import { titleCase } from '@tastiest-io/tastiest-utils';
import { useAuth } from 'hooks/useAuth';
import React from 'react';

export function HeaderAvatar(props: Pick<AvatarProps, 'size'>) {
  const { size = 8 } = props;

  const { adminUser, signOut } = useAuth();
  const initial = adminUser?.email?.[0]?.toUpperCase();

  const name = titleCase(adminUser?.email?.split('@')[0]);

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div className="flex cursor-pointer items-center space-x-2 text-gray-800">
          <Avatar initial={initial ?? 'T'} size={size} />

          <p>{name}</p>
          <DownOutlined className="text-xs text-gray-400" />
        </div>
      </Dropdown.Trigger>

      <Dropdown.Item icon={<SettingOutlined />} href={'/settings'}>
        Preferences
      </Dropdown.Item>

      <Dropdown.Divider />

      <Dropdown.Item
        icon={<ExportOutlined />}
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Dropdown.Item>
    </Dropdown>
  );
}
