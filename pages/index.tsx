import InfoCard from 'components/InfoCard';
import UsersTable from 'components/tables/homeCustomersTable/UsersTable';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import nookies from 'nookies';
import React, { useContext } from 'react';
import { dlog } from 'utils/development';
import { firebaseAdmin } from 'utils/firebaseAdmin';
import { METADATA } from '../constants';
import { ScreenContext } from '../contexts/screen';

interface Props {
  adminUserId?: string;
}

export const getServerSideProps = async context => {
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

  dlog('index ➡️ cookieToken:', cookieToken);
  const token = await firebaseAdmin.auth().verifyIdToken(cookieToken);

  // Admin details
  const adminUserId = token.uid;
  const adminEmail = token.email;

  // If no user, redirect to login
  if (!adminUserId) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const data = [];

  return {
    props: {
      adminUserId,
      adminEmail,
    },
  };
};

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { adminUserId } = props;

  const { isDesktop } = useContext(ScreenContext);

  return (
    <>
      <Head>
        <title>{METADATA.TITLE_SUFFIX}</title>
        <meta
          property="og:title"
          content="Tastiest food no matter where you are"
          key="title"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>

      <div className="flex flex-col h-full space-y-8">
        {/* <Introduction
          payoutTotal={payoutTotal}
          restaurantName={restaurantDetails?.name}
        /> */}

        <div className="grid w-full grid-cols-2 gap-4 tablet:grid-cols-3">
          {/* <div style={{ maxWidth: '400px' }} className="w-7/12">
            <TimelineBarChart restaurantId={''} />
          </div> */}
          <div style={{ maxWidth: '300px' }} className="flex-1">
            <InfoCard
              color="primary"
              label="Total Revenue"
              info={`£${(3194).toFixed(2)}`}
            />
          </div>

          <div style={{ maxWidth: '300px' }} className="flex-1">
            <InfoCard
              color="primary-2"
              label="Total Profit"
              info={`£${(133).toFixed(2)}`}
            />
          </div>

          <div style={{ maxWidth: '300px' }} className="flex-1">
            <InfoCard
              color="alt-1"
              label="Owed to Restaurants"
              info={`£${(194).toFixed(2)}`}
            />
          </div>
        </div>

        <UsersTable />
      </div>
    </>
  );
};

interface IntroductionProps {
  restaurantName: string;
  payoutTotal: number;
}

const Introduction = ({ restaurantName, payoutTotal }: IntroductionProps) => (
  <div className="flex items-center justify-between text-gray-500">
    <div>
      <h2 className="text-xl font-medium text-black font-somatic">
        {restaurantName}
      </h2>
      <p className="">Welcome to your dashboard</p>
    </div>

    <div className="text-right">
      <p className="text-sm">Total Payout</p>
      <p className="text-lg font-medium tracking-wider text-black font-somatic">
        <span className="-mt-px font-roboto">£</span>
        {payoutTotal ?? 0}
      </p>
    </div>
  </div>
);

export default Index;
