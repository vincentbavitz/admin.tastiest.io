import { BrandIcon, LogoIcon } from '@tastiest-io/tastiest-icons';
import { useScreenSize } from 'hooks/useScreenSize';
import Link from 'next/link';
import React from 'react';
import { HeaderAvatar } from './HeaderAvatar';

interface Props {
  blank?: boolean;
}

export default function Header({ blank }: Props) {
  const { isDesktop } = useScreenSize();

  return (
    <div className="flex items-center w-full px-6 py-4 space-between">
      <div className="flex items-center flex-grow space-x-6">
        <Link href="/">
          <a>
            {isDesktop ? (
              <BrandIcon className="fill-current w-36 text-primary" />
            ) : (
              <LogoIcon className="w-8 fill-current text-primary" />
            )}
          </a>
        </Link>
      </div>

      {!blank && <HeaderAvatar />}
    </div>
  );
}
