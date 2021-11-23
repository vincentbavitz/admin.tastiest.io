import { Dropdown } from '@tastiest-io/tastiest-ui';
import classNames from 'classnames';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export interface AvatarProps {
  // Size is in the same units as Tailwind units
  size?: 8 | 10 | 12 | 16 | 20;
}

export function HeaderAvatar(props: AvatarProps) {
  const { size = '8' } = props;

  const { adminUser, signOut } = useAuth();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const initial = adminUser.email[0].toUpperCase();

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [router.pathname]);

  const onAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Trigger>
          <div
            className={classNames(
              'relative flex justify-center items-center rounded-full cursor-pointer duration-300 bg-opacity-75 hover:bg-opacity-100',
              'bg-primary',
              `h-${size} w-${size}`,
            )}
          >
            <div
              className="flex items-center justify-center w-full h-full"
              onClick={onAvatarClick}
            >
              <div className="flex items-center justify-center w-full h-full text-xl text-white font-somatic">
                {initial}
              </div>
            </div>
          </div>
        </Dropdown.Trigger>

        {/* {dropdownItems.map(item => (
          <Dropdown.Item id={item.id} key={item.id} href={item.href}>
            {item.name}
          </Dropdown.Item>
        ))} */}

        <Dropdown.Divider />

        <Dropdown.Item key={'sign-out'} onClick={signOut}>
          Sign Out
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}
