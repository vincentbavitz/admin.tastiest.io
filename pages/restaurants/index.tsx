import { Button, InfoCard } from '@tastiest-io/tastiest-components';
import { PlusIcon } from '@tastiest-io/tastiest-icons';
import { useScreenSize } from 'hooks/useScreenSize';
import Link from 'next/link';
import React from 'react';

function Restaurants() {
  const { isDesktop } = useScreenSize();

  return (
    <div>
      <div className="flex items-center justify-between w-full pb-4">
        <span className="text-xl font-somatic">Restaurants</span>
        <Link href="/restaurants/create">
          <a>
            <Button color="neutral" type="outline">
              <PlusIcon className="w-5 mr-2 fill-current" /> New
            </Button>
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <InfoCard
          color="primary-2"
          label="Restaurants"
          compact={!isDesktop}
          info={`39`}
        />
        <InfoCard
          color="primary-2"
          label="Restaurants"
          compact={!isDesktop}
          info={`£${3}`}
        />
        <InfoCard
          color="primary-2"
          label="Restaurants"
          compact={!isDesktop}
          info={`£${3}`}
        />
      </div>
    </div>
  );
}

export default Restaurants;
