import NAVIGATION from 'constants/navigation';
import { useRouter } from 'next/router';
import React from 'react';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
  const router = useRouter();

  console.log('Sidebar ➡️ router.pathname:', router.pathname);

  return (
    <div className="flex flex-col h-full py-4 space-y-6 border-r-2 border-gray-200">
      {NAVIGATION.SIDEBAR_ITEMS.map(item => (
        <SidebarItem
          key={item.page}
          selected={router.pathname === item.page}
          {...item}
        />
      ))}
    </div>
  );
}
