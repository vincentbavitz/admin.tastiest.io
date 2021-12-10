import { WarningOutlined } from '@ant-design/icons';
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
import { Sidebar } from '@tastiest-io/tastiest-ui';
import Header, { HEADER_HEIGHT_REM } from 'components/Header';
import React from 'react';
import { LayoutProps } from './LayoutHandler';

interface LayoutWrapperProps extends LayoutProps {
  children: any;
}

export default function LayoutWrapper({
  router,
  pageProps,
  children,
}: LayoutWrapperProps) {
  return (
    <div
      style={{ height: '100vh' }}
      className="relative flex flex-col overflow-hidden font-secondary"
    >
      {/* Modals (inside portal) */}
      <div id="modal-root" className="absolute"></div>

      <div className="flex h-full">
        <Sidebar compact router={router}>
          <Sidebar.Item label="Home" page="/" icon={HomeIcon} float="top" />
          <Sidebar.Item
            label="Bookings"
            page="/bookings"
            icon={CalendarIcon}
            float="top"
          />
          <Sidebar.Item
            label="Customers"
            page="/customers"
            icon={UserIcon}
            float="top"
          />
          <Sidebar.Item
            label="Restaurants"
            page="/restaurants"
            icon={CutleryIcon}
            float="top"
          />
          <Sidebar.Item
            label="Support"
            page="/support"
            icon={SupportIcon}
            float="top"
          />
          <Sidebar.Item
            label="Statistics"
            page="/statistics"
            icon={GagueIcon}
            float="bottom"
          />
          <Sidebar.Item
            label="Influencers"
            page="/influencers"
            icon={UserIcon}
            float="bottom"
          />
          <Sidebar.Item
            label="SEO"
            page="/seo"
            icon={MessageIcon}
            float="bottom"
          />
          <Sidebar.Item
            label="Ads"
            page="/ads"
            icon={TrendingIcon}
            float="bottom"
          />
          <Sidebar.Item
            label="Errors"
            page="/errors"
            icon={WarningOutlined}
            float="bottom"
          />
        </Sidebar>

        <div className="relative flex-grow w-full">
          <Header />

          <div
            style={{ height: `calc(100vh - ${HEADER_HEIGHT_REM}rem)` }}
            className="relative"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
