import classNames from 'classnames';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { ISidebarItem } from './Sidebar';

export interface Props extends ISidebarItem {
  selected?: boolean;
  collapsed?: boolean;
}

export default function SidebarItem(props: Props) {
  const { label, page, selected, collapsed } = props;

  const InnerContent = () => (
    <Link href={page}>
      <a
        className={clsx(
          'flex items-center space-x-2 font-medium',
          collapsed && 'justify-center',
        )}
      >
        <props.icon
          className={classNames(
            selected && 'text-primary',
            'h-6 stroke-current w-6 text-xl fill-current',
          )}
        />

        {!collapsed && (
          <p className={classNames(selected && 'text-primary')}>{label}</p>
        )}
      </a>
    </Link>
  );

  return (
    <div
      className={clsx(
        'text-gray-400 duration-150 hover:text-primary',
        collapsed ? 'px-3' : 'px-4',
      )}
    >
      <InnerContent />
    </div>
  );
}
