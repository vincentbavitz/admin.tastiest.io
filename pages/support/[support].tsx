import { Select } from '@tastiest-io/tastiest-ui';
import {
  dlog,
  FirestoreCollection,
  IRestaurantSupportRequest,
  IUserSupportRequest,
} from '@tastiest-io/tastiest-utils';
import SupportChatScreen from 'components/SupportChatScreen';
import { useScreenSize } from 'hooks/useScreenSize';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import nookies from 'nookies';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { db } from 'utils/firebaseAdmin';

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

  const supportRequestId = String(context.params.support);
  if (!supportRequestId?.length) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  // Attempts to find user support request
  const userRequestSnapshot = await db(FirestoreCollection.SUPPORT_USERS)
    .doc(supportRequestId)
    .get();

  const restaurantRequestSnapshot = await db(
    FirestoreCollection.SUPPORT_RESTAURANTS,
  )
    .doc(supportRequestId)
    .get();

  if (!userRequestSnapshot.exists && !restaurantRequestSnapshot.exists) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  const origin = restaurantRequestSnapshot.exists ? 'restaurant' : 'user';

  const request = restaurantRequestSnapshot.exists
    ? (restaurantRequestSnapshot.data() as IRestaurantSupportRequest)
    : (userRequestSnapshot.data() as IUserSupportRequest);

  return { props: { origin, request } };
};

function SupportRequest(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { origin, request } = props;
  const { isDesktop } = useScreenSize();

  const tastiestSupportEmails = [
    'hello@tastiest.io',
    'support@tastiest.io',
    'sales@tastiest.io',
  ];

  dlog('[support] ➡️ request:', request);

  // Set seen to true!

  return (
    <div className="flex flex-col h-full">
      <h3 className="pb-4 text-xl font-semibold">
        Support Request <span className="pl-1 opacity-25">{request.id}</span>
      </h3>

      <div className="flex flex-grow space-x-6 overflow-y-auto">
        <SupportChatScreen request={request} />

        <div
          style={{ height: 'min-content' }}
          className="p-4 bg-white rounded-lg whitespace-nowrap"
        >
          Mark Resolved (toggle)
        </div>
      </div>

      <div className="">
        <div>Reply As</div>
        <Select size="small" onChange={() => null}>
          {tastiestSupportEmails.map(email => (
            <option key={email} value={email}>
              {email}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default SupportRequest;
