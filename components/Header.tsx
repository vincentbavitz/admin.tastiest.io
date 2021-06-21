import { BrandIcon } from '@tastiest-io/tastiest-icons';
import Link from 'next/link';
import React, { useState } from 'react';
import { HeaderAvatar } from './HeaderAvatar';

interface HeaderProps {
  blank?: boolean;
}

export default function Header({ blank }: HeaderProps) {
  const [query, setQuery] = useState<string>();

  const search = () => {
    return null;
  };

  return (
    <div className="flex items-center w-full px-6 py-4 space-between">
      <div className="flex items-center flex-grow space-x-6">
        <Link href="/">
          <a>
            <BrandIcon className="w-40 fill-current text-primary" />
          </a>
        </Link>

        {/* {!blank && (
          <div style={{ maxWidth: '300px' }} className="flex-grow">
            <Input
              color="neutral"
              value={query}
              onValueChange={setQuery}
              suffix={
                <SearchIcon
                  className="h-8 text-gray-400 cursor-pointer fill-current"
                  onClick={search}
                />
              }
            />
          </div>
        )} */}
      </div>

      {!blank && <HeaderAvatar />}
    </div>
  );
}
