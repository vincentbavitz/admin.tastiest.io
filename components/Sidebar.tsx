import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import NAVIGATION from 'constants/navigation';
import { useScreenSize } from 'hooks/useScreenSize';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useToggle } from 'react-use';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
  const router = useRouter();

  const { isDesktop } = useScreenSize();
  const [collapsed, toggleCollapsed] = useToggle(!isDesktop);

  // Collapse on small screens
  useEffect(() => {
    if (!isDesktop) {
      toggleCollapsed(true);
    }
  }, [isDesktop]);

  // On small screens, the sidebar should be a drawer.
  const isDrawer = !isDesktop;

  return (
    <div style={{ minWidth: '3rem' }} className="relative">
      <div
        style={{
          boxShadow: 'inset 0px 20px 15px -20px rgba(0,0,0,0.08)',
        }}
        className={clsx(
          'flex flex-col justify-between h-full py-4 duration-300 bg-white border-r-2 border-gray-200',
          isDrawer && !collapsed ? 'absolute left-0 z-50' : 'relative',
        )}
      >
        <div
          onClick={() => toggleCollapsed()}
          className={clsx(
            'absolute right-0 z-50 bg-white flex items-center w-4 h-10',
            'border-t-2 border-b-2 border-r-2 border-gray-300 rounded-r-md',
            'transform translate-x-full top-3 cursor-pointer',
          )}
        >
          {collapsed ? (
            <RightOutlined className="text-sm text-gray-500" />
          ) : (
            <LeftOutlined className="text-sm text-gray-500" />
          )}
        </div>

        <div className="flex flex-col justify-start space-y-6">
          {NAVIGATION.SIDEBAR_ITEMS.filter(
            item => item.category === 'primary',
          ).map(item => (
            <SidebarItem
              key={item.page}
              collapsed={collapsed}
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
              collapsed={collapsed}
              selected={
                router.pathname.split('/')?.[1] === item.page.replace(/\//g, '')
              }
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
