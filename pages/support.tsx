import { Button, Input, TextArea } from '@tastiest-io/tastiest-components';
import { CheckIcon } from '@tastiest-io/tastiest-icons';
import { IRestaurant } from '@tastiest-io/tastiest-utils';
import { useScreenSize } from 'hooks/useScreenSize';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { dlog } from 'utils/development';
import { METADATA } from '../constants';

interface Props {
  resaurant?: IRestaurant;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60,
  };
};

const Support: NextPage<Props> = () => {
  const { isDesktop } = useScreenSize();
  // const { makeSupportRequest } = useSupport();

  const [sendable, setSendable] = useState(false);
  const [hasSent, setHasSent] = useState(false);

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // const { user } = useAuth();
  // const { userData } = useUserData(user);

  const submit = async () => {
    // const { success, errors } = await makeSupportRequest(
    //   name,
    //   subject,
    //   message,
    // );

    // if (success) {
    //   setHasSent(true);
    //   setSendable(false);
    // }

    dlog('support ➡️ errors:');
  };

  // Update sendable status
  useEffect(() => {
    if (name.length && subject.length && message.length) {
      setSendable(true);
    } else {
      setSendable(false);
    }
  }, [name, subject, message]);

  return (
    <>
      <Head>
        <title>Support - {METADATA.TITLE_SUFFIX}</title>
      </Head>

      <div style={{ height: '600px', width: '100%' }}>
        <p className="mb-2 text-lg font-somatic">Support</p>

        <form>
          <div className="flex flex-col mt-6 space-y-4">
            <div className="flex space-x-4">
              <div className="w-5/12">
                <Input
                  color="neutral"
                  placeholder="Name"
                  value={name}
                  onValueChange={setName}
                />
              </div>

              <div className="flex-grow">
                <Input
                  color="neutral"
                  placeholder="Subject"
                  value={subject}
                  onValueChange={setSubject}
                />
              </div>
            </div>
            <TextArea
              color="neutral"
              placeholder="Message"
              rows={10}
              value={message}
              onValueChange={setMessage}
            />
            <Button
              off={!sendable}
              onClick={submit}
              suffix={
                hasSent && !sendable ? (
                  <CheckIcon className="h-6 text-white fill-current" />
                ) : null
              }
            >
              {hasSent && !sendable ? 'Sent' : 'Send'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Support;
