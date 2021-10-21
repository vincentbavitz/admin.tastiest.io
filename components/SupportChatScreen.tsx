import {
  dlog,
  IRestaurantSupportRequest,
  IUserSupportRequest,
  SupportMessageDirection,
  titleCase,
} from '@tastiest-io/tastiest-utils';
import clsx from 'clsx';
import moment from 'moment';
import React from 'react';

interface Props {
  request: IUserSupportRequest | IRestaurantSupportRequest;
}

export default function SupportChatScreen({ request }: Props) {
  const { conversation } = request;
  const messages = conversation.sort((a, b) => a.timestamp - b.timestamp);

  dlog('SupportChatScreen ➡️ messages:', messages);

  return (
    <div className="flex flex-col w-full h-full p-4 overflow-y-auto bg-white rounded-lg">
      {[
        ...messages,
        ...messages,
        ...messages,
        ...messages,
        ...messages,
        ...messages,
        ...messages,
        ...messages,
      ].map((message, index) => {
        const direction =
          message.direction === SupportMessageDirection.USER_TO_SUPPORT ||
          message.direction === SupportMessageDirection.RESTAURANT_TO_SUPPORT
            ? 'from'
            : 'to';

        const isLastMessage = index === messages.length - 1;

        return (
          <div
            key={message.timestamp}
            className={clsx(
              'flex w-full',
              direction === 'to' && 'justify-end',
              direction === 'from' && 'justify-start',
            )}
          >
            <div>
              <div
                className={clsx(
                  'rounded-md px-4 py-2 w-64 flex flex-col',
                  direction === 'to' && 'bg-secondary-2',
                  direction === 'from' && 'bg-gray-200',
                )}
              >
                <div className="font-medium text-primary">
                  {titleCase(message.name)}
                </div>
                <div>{message.message}</div>
                <div className="text-sm text-right opacity-75 whitespace-nowrap">
                  {moment(message.timestamp).format('HH MM')}
                </div>
              </div>

              {isLastMessage &&
                direction === 'to' &&
                message.recipientHasOpened && (
                  <div className="text-sm italic text-right opacity-50">
                    Seen
                  </div>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
