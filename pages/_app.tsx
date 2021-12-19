import { dlog } from '@tastiest-io/tastiest-utils';
import AmbianceProvider from 'contexts/ambiance';
import 'firebase/auth';
import 'firebase/firestore'; // <- needed if using firestore
import { ScreenProvider } from 'hooks/useScreenSize';
import LayoutHandler from 'layouts/LayoutHandler';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { METADATA } from '../constants';
import { AuthProvider } from '../contexts/auth';
import '../styles/style.scss';

function App(props: AppProps) {
  const { Component, router, pageProps } = props;
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

          <LayoutHandler router={router} pageProps={pageProps}>
            {Component}
          </LayoutHandler>
        </ScreenProvider>
      </AmbianceProvider>
    </AuthProvider>
  );
}

export default App;
