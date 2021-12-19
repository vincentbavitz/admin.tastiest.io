import { Button, Input } from '@tastiest-io/tastiest-ui';
import clsx from 'clsx';
import Header from 'components/Header';
import { useAuth } from 'hooks/useAuth';
import { Layouts } from 'layouts/LayoutHandler';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
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

const LogIn = () => {
  const router = useRouter();

  const { signIn, error: authError } = useAuth();
  const { height } = useWindowSize();

  // Pre-fetch dashboard
  useEffect(() => {
    router.prefetch('/');
  }, []);

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
          style={{ zIndex: -1, maxWidth: '900px' }}
          className="absolute bottom-0 w-full"
        >
          <img src="/assets/illustrations/hero.svg" />
        </div>

        <div
          className={clsx(
            'flex flex-col z-10 h-full mt-32  space-y-10 items-center',
          )}
        >
          <div className="w-full text-center">
            <h1 className="text-4xl bg-white font-primary text-primary">
              Tastiest Admin Panel
            </h1>

            <h2 className="text-xl">Please sign in below</h2>
          </div>
          <div
            className={clsx(
              'flex flex-col p-10 space-y-4 filter drop-shadow-xl glass rounded-md',
              'w-auto',
            )}
          >
            <div className="w-64">
              <Input
                label={'Admin Email'}
                value={email}
                onValueChange={setEmail}
              />
            </div>
            <div className="w-64">
              <Input
                label={'Password'}
                value={password}
                onValueChange={setPassword}
                type="password"
              />
            </div>

            <Button wide onClick={submit} loading={loading}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

LogIn.layout = Layouts.AUTH;
export default LogIn;
