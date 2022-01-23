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
import { useAuth } from 'hooks/useAuth';
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
  // Automatically re-route to /login if they're not logged in.
  const { isSignedIn } = useAuth();
  if (isSignedIn === false) {
    router.replace('/login');
    return null;
  }

  if (!isSignedIn) {
    return null;
  }

  // Get Admin Panel metrics and when something changes, useNotifier.

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
            float="top"
            icon={CalendarIcon}
            // notifications={{ amount: 50, urgency: 'high' }}
          />
          <Sidebar.Item
            label="Customers"
            page="/customers"
            float="top"
            icon={UserIcon}
            // notifications={{ amount: 1, urgency: 'medium' }}
          />
          <Sidebar.Item
            label="Restaurants"
            page="/restaurants"
            float="top"
            icon={CutleryIcon}
          />
          <Sidebar.Item
            label="Support"
            page="/support"
            float="top"
            icon={SupportIcon}
          />
          <Sidebar.Item
            label="Statistics"
            page="/statistics"
            float="bottom"
            icon={GagueIcon}
          />
          <Sidebar.Item
            label="Influencers"
            page="/influencers"
            float="bottom"
            icon={UserIcon}
          />
          <Sidebar.Item
            label="SEO"
            page="/seo"
            float="bottom"
            icon={MessageIcon}
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
            float="bottom"
            icon={WarningOutlined}
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
