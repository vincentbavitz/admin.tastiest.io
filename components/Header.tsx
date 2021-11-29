import { titleCase } from '@tastiest-io/tastiest-utils';
import { NextRouter } from 'next/router';
import React, { useState } from 'react';
import { HeaderAvatar } from './HeaderAvatar';

export const HEADER_HEIGHT_REM = 2.5;

interface HeaderProps {
  router?: NextRouter;
}

/**
 * The header as shown in the dashboard.
 * Do not get this confued with the login page header.
 */
export default function Header(props: HeaderProps) {
  const { router } = props;

  const [query, setQuery] = useState<string>();

  const search = () => {
    return null;
  };

  const pageLabel = titleCase(
    router.asPath.split('/').filter(s => Boolean(s.length))[0],
  );

  return (
    <div
      style={{ height: `${HEADER_HEIGHT_REM}rem` }}
      className="flex items-center w-full px-6 space-between"
    >
      <div className="flex items-center flex-grow space-x-6">
        <div className="text-lg font-medium">{pageLabel}</div>

        {/* <div style={{ maxWidth: '300px' }} className="flex-grow">
          <Input
            size="small"
            color="neutral"
            value={query}
            onValueChange={setQuery}
            className="bg-gray-100"
            suffix={
              <SearchOutlined
                className="text-gray-400 cursor-pointer fill-current"
                onClick={search}
              />
            }
          />
        </div> */}
      </div>

      <HeaderAvatar size={6} />
    </div>
  );
}
