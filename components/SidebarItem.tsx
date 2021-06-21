import classNames from 'classnames';
import { ISidebarItem } from 'constants/navigation';
import Link from 'next/link';
import React from 'react';

export interface Props extends ISidebarItem {
  selected?: boolean;
}

export default function SidebarItem(props: Props) {
  const { label, page, selected } = props;

  return (
    <div className="px-6 text-gray-400 duration-150 hover:text-primary">
      <Link href={page}>
        <a className="flex items-center space-x-2 font-medium">
          <props.icon
            className={classNames(
              selected && 'text-primary',
              'h-6 stroke-current fill-current',
            )}
          />
          <p className={classNames(selected && 'text-primary')}>{label}</p>
        </a>
      </Link>
    </div>
  );
}
