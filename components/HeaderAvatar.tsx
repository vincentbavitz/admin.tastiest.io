import { Dropdown, DropdownItem } from '@tastiest-io/tastiest-components';
import classNames from 'classnames';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface IProfileDropdownItems {
  id: string;
  name: string;
  isSelected?: boolean;
  onClick: () => void;
}

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

  const dropdownItems: Array<IProfileDropdownItems> = [
    {
      id: 'restaurants',
      name: 'Restaurants',
      onClick: () => router.push('/restaurants'),
      isSelected: false,
    },
  ];

  const onAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
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

      <Dropdown
        isOpen={isDropdownOpen}
        style="outline"
        onClickAway={() => setIsDropdownOpen(false)}
        pull="left"
      >
        {dropdownItems.map(item => (
          <DropdownItem
            style="outline"
            key={item.id}
            id={item.id}
            onSelect={item.onClick}
            selected={item.isSelected}
          >
            {item.name}
          </DropdownItem>
        ))}

        <div className="pt-1 border-t border-gray-200">
          <DropdownItem
            style="outline"
            id={'sign-out'}
            onSelect={() => {
              signOut();
              setIsDropdownOpen(false);
            }}
            selected={false}
          >
            Sign Out
          </DropdownItem>
        </div>
      </Dropdown>
    </div>
  );
}
