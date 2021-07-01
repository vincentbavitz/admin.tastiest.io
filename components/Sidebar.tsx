import NAVIGATION from 'constants/navigation';
import { useRouter } from 'next/router';
import React from 'react';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
  const router = useRouter();

  console.log('Sidebar ➡️ router.pathname:', router.pathname);

  return (
    <div className="flex flex-col justify-between h-full py-4 border-r-2 border-gray-200">
      <div className="flex flex-col justify-start space-y-6">
        {NAVIGATION.SIDEBAR_ITEMS.filter(
          item => item.category === 'primary',
        ).map(item => (
          <SidebarItem
            key={item.page}
            selected={
              router.pathname.split('/')?.[1] === item.page.replace(/\//g, '')
            }
            {...item}
          />
        ))}
      </div>

      <div className="flex flex-col justify-end space-y-6">
        {NAVIGATION.SIDEBAR_ITEMS.filter(
          item => item.category === 'secondary',
        ).map(item => (
          <SidebarItem
            key={item.page}
            selected={
              router.pathname.split('/')?.[1] === item.page.replace(/\//g, '')
            }
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
