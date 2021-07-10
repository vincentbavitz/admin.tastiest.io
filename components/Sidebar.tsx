import {
  LeftOutlined,
  RightOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {
  CalendarIcon,
  CutleryIcon,
  GagueIcon,
  HomeIcon,
  MessageIcon,
  SupportIcon,
  TrendingIcon,
  UserIcon,
} from '@tastiest-io/tastiest-icons';
import clsx from 'clsx';
import { useScreenSize } from 'hooks/useScreenSize';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useMemo } from 'react';
import { useToggle } from 'react-use';
import SidebarItem from './SidebarItem';

export interface ISidebarItem {
  icon: FC<any>;
  label: string;
  page: string;
  category: 'primary' | 'secondary';
  counter?: number;
}

enum SidebarItemKey {
  HOME = 'HOME',
  BOOKINGS = 'BOOKINGS',
  CUSTOMERS = 'CUSTOMERS',
  RESTAURANTS = 'RESTAURANTS',
  SUPPORT = 'SUPPORT',
  STATISTICS = 'STATISTICS',
  INFLUENCERS = 'INFLUENCERS',
  SEO = 'SEO',
  ADS = 'ADS',
  ERRORS = 'ERRORS',
}

export default function Sidebar() {
  const router = useRouter();

  const { isDesktop } = useScreenSize();
  const [collapsed, toggleCollapsed] = useToggle(!isDesktop);

  const supportCounter = 0;
  const errorCounter = 0;
  const bookingCounter = 0;

  const sidebarItems: { [id: string]: ISidebarItem } = useMemo(
    () => ({
      [SidebarItemKey.HOME]: {
        label: 'Home',
        page: '/',
        icon: HomeIcon,
        category: 'primary',
      },
      [SidebarItemKey.BOOKINGS]: {
        label: 'Bookings',
        page: '/bookings',
        icon: CalendarIcon,
        category: 'primary',
      },
      [SidebarItemKey.CUSTOMERS]: {
        label: 'Customers',
        page: '/customers',
        icon: UserIcon,
        category: 'primary',
      },
      [SidebarItemKey.RESTAURANTS]: {
        label: 'Restaurants',
        page: '/restaurants',
        icon: CutleryIcon,
        category: 'primary',
      },
      [SidebarItemKey.SUPPORT]: {
        label: 'Support',
        page: '/support',
        icon: SupportIcon,
        category: 'primary',
      },
      [SidebarItemKey.STATISTICS]: {
        label: 'Statistics',
        page: '/statistics',
        icon: GagueIcon,
        category: 'secondary',
      },
      [SidebarItemKey.INFLUENCERS]: {
        label: 'Influencers',
        page: '/influencers',
        icon: UserIcon,
        category: 'secondary',
      },
      [SidebarItemKey.SEO]: {
        label: 'SEO',
        page: '/seo',
        icon: MessageIcon,
        category: 'secondary',
      },
      [SidebarItemKey.ADS]: {
        label: 'Ads',
        page: '/ads',
        icon: TrendingIcon,
        category: 'secondary',
      },
      [SidebarItemKey.ERRORS]: {
        label: 'Errors',
        page: '/errors',
        icon: WarningOutlined,
        category: 'secondary',
      },
    }),
    [supportCounter, errorCounter, bookingCounter],
  );

  // Collapse on small screens
  useEffect(() => {
    if (!isDesktop) {
      toggleCollapsed(true);
    }
  }, [isDesktop]);

  // On small screens, the sidebar should be a drawer.
  const isDrawer = !isDesktop;

  return (
    <div style={{ minWidth: isDrawer ? '3rem' : 'auto' }} className="relative">
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
          {Object.values(sidebarItems)
            .filter(item => item.category === 'primary')
            .map(item => (
              <SidebarItem
                key={item.page}
                collapsed={collapsed}
                selected={
                  router.pathname.split('/')?.[1] ===
                  item.page.replace(/\//g, '')
                }
                {...item}
              />
            ))}
        </div>

        <div className="flex flex-col justify-end space-y-6">
          {Object.values(sidebarItems)
            .filter(item => item.category === 'secondary')
            .map(item => (
              <SidebarItem
                key={item.page}
                collapsed={collapsed}
                selected={
                  router.pathname.split('/')?.[1] ===
                  item.page.replace(/\//g, '')
                }
                {...item}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
