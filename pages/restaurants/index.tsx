import { PlusIcon } from '@tastiest-io/tastiest-icons';
import { Button, InfoCard } from '@tastiest-io/tastiest-ui';
import EmailTemplatesTable from 'components/tables/EmailTemplatesTable';
import RestaurantsTable from 'components/tables/RestaurantsTable';
import { useScreenSize } from 'hooks/useScreenSize';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import nookies from 'nookies';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>,
) => {
  // Ensure user is authenticated
  const cookieToken = nookies.get(context)?.token;

  // If no user, redirect to login
  if (!cookieToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

function Restaurants() {
  const { isDesktop } = useScreenSize();

  return (
    <div>
      <div className="flex items-center justify-between w-full pb-4">
        <span className="text-xl font-somatic">Restaurants</span>
        <Link href="/restaurants/create">
          <a>
            <Button color="light" prefix={<PlusIcon className="w-4" />}>
              New
            </Button>
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <InfoCard
          color="primary"
          label="Restaurants"
          compact={!isDesktop}
          info={`39`}
        />
        <InfoCard
          color="secondary"
          label="Restaurants"
          compact={!isDesktop}
          info={`£${3}`}
        />
        <InfoCard
          color="alt-2"
          label="Restaurants"
          compact={!isDesktop}
          info={`£${3}`}
        />
      </div>

      <div className="flex flex-col space-y-10 pt-10">
        <RestaurantsTable />

        <EmailTemplatesTable />
      </div>
    </div>
  );
}

export default Restaurants;
