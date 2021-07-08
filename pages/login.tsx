import { LoadingOutlined } from '@ant-design/icons';
import { Button, Input } from '@tastiest-io/tastiest-components';
import clsx from 'clsx';
import Header from 'components/Header';
import { useAuth } from 'hooks/useAuth';
import { useScreenSize } from 'hooks/useScreenSize';
import { NextPage } from 'next';
import Head from 'next/head';
import nookies from 'nookies';
import { ChefIllustration } from 'public/assets/illustrations';
import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import { firebaseAdmin } from 'utils/firebaseAdmin';
import { METADATA } from '../constants';

export const getServerSideProps = async context => {
  // Is user already signed in?
  const cookieToken = nookies.get(context)?.token;

  // If user signed in, redirect to dashboard
  if (cookieToken) {
    const token = await firebaseAdmin.auth().verifyIdToken(cookieToken);
    const adminUserId = token.uid;

    if (adminUserId) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};

const LogIn: NextPage = () => {
  const { isDesktop } = useScreenSize();

  const { signIn, error: authError } = useAuth();
  const { height } = useWindowSize();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Sign In - {METADATA.TITLE_SUFFIX}</title>
      </Head>

      <div
        style={{ height: '100vh' }}
        className="relative w-full overflow-hidden"
      >
        <div
          className={clsx(
            'flex flex-col h-full mt-32 space-y-10 items-center',
            isDesktop && height < 850 && '-ml-64',
          )}
        >
          <div className="w-full text-center">
            <h1 className="text-4xl bg-white font-somatic text-primary">
              Tastiest Admin Panel
            </h1>

            <h2 className="text-xl">Please sign in below</h2>
          </div>
          <div
            className={clsx(
              'flex flex-col p-10 space-y-4 border-2 border-primary rounded-xl',
              isDesktop && height < 850 && 'w-auto',
            )}
          >
            <div className="w-64">
              <Input
                value={email}
                onValueChange={setEmail}
                label={'Admin Email'}
              />
            </div>
            <div className="w-64">
              <Input
                value={password}
                onValueChange={setPassword}
                type="password"
                label={'Password'}
              />
            </div>

            <Button
              wide
              onClick={submit}
              prefix={loading ? <LoadingOutlined /> : null}
            >
              Sign In
            </Button>
          </div>
          <h3 className="text-2xl font-medium text-center text-secondary font-somatic">
            {METADATA.TAGLINE}
          </h3>
        </div>

        <div className="absolute top-0 w-full">
          <Header blank />
        </div>

        {isDesktop && (
          <div className="absolute bottom-0 right-0 pointer-events-none">
            <div
              style={{
                width: '25rem',
                height: '40rem',
                boxShadow: 'inset 25px 25px 33px -33px rgba(0,0,0,0.33)',
              }}
              className="transform translate-x-1/2 translate-y-1/2 rounded-full bg-primary "
            ></div>
            <ChefIllustration className="absolute bottom-0 right-0 w-64 transform" />
          </div>
        )}
      </div>
    </>
  );
};

export default LogIn;
