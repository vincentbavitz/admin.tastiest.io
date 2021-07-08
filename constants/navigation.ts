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
import { FC } from 'react';

export interface ISidebarItem {
  icon: FC<any>;
  label: string;
  page: string;
  category: 'primary' | 'secondary';
}

const SIDEBAR_ITEMS: ISidebarItem[] = [
  { label: 'Home', page: '/', icon: HomeIcon, category: 'primary' },
  {
    label: 'Bookings',
    page: '/bookings',
    icon: CalendarIcon,
    category: 'primary',
  },
  {
    label: 'Customers',
    page: '/customers',
    icon: UserIcon,
    category: 'primary',
  },
  {
    label: 'Restaurants',
    page: '/restaurants',
    icon: CutleryIcon,
    category: 'primary',
  },
  {
    label: 'Support',
    page: '/support',
    icon: SupportIcon,
    category: 'primary',
  },
  {
    label: 'Statistics',
    page: '/statistics',
    icon: GagueIcon,
    category: 'secondary',
  },
  {
    label: 'Influencers',
    page: '/influencers',
    icon: UserIcon,
    category: 'secondary',
  },
  {
    label: 'SEO',
    page: '/seo',
    icon: MessageIcon,
    category: 'secondary',
  },
  { label: 'Ads', page: '/ads', icon: TrendingIcon, category: 'secondary' },
  {
    label: 'Errors',
    page: '/errors',
    icon: WarningOutlined,
    category: 'secondary',
  },
];

const NAVIGATION = {
  SIDEBAR_ITEMS,
};

export default NAVIGATION;
