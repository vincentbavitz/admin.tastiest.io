import { dlog } from '@tastiest-io/tastiest-utils';
import Layout from 'components/Layout';
import AmbianceProvider from 'contexts/ambiance';
import 'firebase/auth';
import 'firebase/firestore'; // <- needed if using firestore
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { METADATA } from '../constants';
import { AuthProvider } from '../contexts/auth';
import ScreenProvider from '../contexts/screen';
import '../styles/style.scss';

// interface Props extends AppProps {
//   restaurantData: IRestaurant;
// }

function App(props: AppProps) {
  const { Component, pageProps } = props;
  dlog('_app ➡️ props:', props);

  return (
    <AuthProvider>
      <AmbianceProvider>
        <ScreenProvider>
          <Head>
            <title>{METADATA.TITLE_SUFFIX}</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1"
            ></meta>
          </Head>

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ScreenProvider>
      </AmbianceProvider>
    </AuthProvider>
  );
}

// App.getInitialProps = async context => {
//   // Get user ID from cookie.
//   const cookieToken = nookies.get(context)?.token;
//   // const restaurantDataApi = new RestaurantDataApi(firebaseAdmin);
//   // const { restaurantId } = await restaurantDataApi.initFromCookieToken(
//   // cookieToken,
//   // );

//   // // If no user, redirect to login
//   // if (!restaurantId) {
//   //   return {
//   //     redirect: {
//   //       destination: '/login',
//   //       permanent: false,
//   //     },
//   //   };
//   // }

//   // const restaurantData = await restaurantDataApi.getRestaurantField(
//   //   RestaurantData.DETAILS,
//   // );

//   // dlog('_app ➡️ context:', context);

//   dlog('_app ➡️   cookieToken:', cookieToken);

//   return {
//     restaurantData: Math.random() * 1000,
//   };
// };

export default App;
