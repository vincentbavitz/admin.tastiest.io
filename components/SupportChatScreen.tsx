import { SendOutlined } from '@ant-design/icons';
import {
  IRestaurantSupportRequest,
  ISupportMessage,
  IUserSupportRequest,
  SupportMessageDirection,
  titleCase,
} from '@tastiest-io/tastiest-utils';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  request: IUserSupportRequest | IRestaurantSupportRequest;
}

export default function SupportChatScreen({ request }: Props) {
  const { conversation } = request;
  const messages = conversation.sort((a, b) => a.timestamp - b.timestamp);

  const container = useRef<HTMLDivElement>(null);
  const [composeMessage, setComposeMessage] = useState<string | null>(null);

  // Adjust chatbox size with text content.
  const composeRef = useRef<HTMLTextAreaElement>(null);
  const composeMaxRows = 10;
  const composeLineHeight = 20;
  useEffect(() => {
    const composeMaxHeight = composeMaxRows * composeLineHeight;
    composeRef.current.style.height = '1px';
    composeRef.current.style.height = `${Math.min(
      composeMaxHeight,
      composeRef.current.scrollHeight,
    )}px`;
  }, [composeMessage]);

  const handleComposeMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComposeMessage(event.target.value);
  };

  /** Send on Enter is actually a bit too sensitive. */
  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    event;
  };

  // On new message, scroll into view
  useEffect(() => {
    container.current.scroll({
      top: container.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const sendMessage = () => {
    container;
  };

  return (
    <div className="flex flex-col w-full">
      <div
        ref={container}
        style={{ boxShadow: '0 15px 10px -15px rgba(0, 0, 0, 0.15) inset' }}
        className="flex flex-col w-full h-full p-4 overflow-y-auto bg-dark"
      >
        {[
          ...messages,
          ...messages,
          ...messages,
          ...messages,
          ...messages,
          ...messages,
        ].map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            isFinalMessage={index === messages.length - 1}
          />
        ))}
      </div>

      <div className="flex gap-2 items-end bg-white w-full">
        <textarea
          ref={composeRef}
          value={composeMessage}
          placeholder="Write a reply..."
          onKeyPress={handleEnterKeyPress}
          onChange={handleComposeMessageChange}
          className="flex-grow text-lg pl-4 pr-2 py-4 outline-none resize-none"
          style={{
            lineHeight: `${composeLineHeight}px`,
          }}
        />
        <div
          style={{ maxHeight: '55px' }}
          className="flex items-center justify-center w-12 h-full cursor-pointer duration-300 text-gray-500 hover:text-secondary"
        >
          <SendOutlined className="text-xl" />
        </div>
      </div>
    </div>
  );
}

interface ChatMessageProps {
  message: ISupportMessage;
  isFinalMessage: boolean;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { message, isFinalMessage } = props;

  const direction =
    message.direction === SupportMessageDirection.USER_TO_SUPPORT ||
    message.direction === SupportMessageDirection.RESTAURANT_TO_SUPPORT
      ? 'from'
      : 'to';

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
            'rounded-md px-3 py-2 w-64 flex flex-col',
            direction === 'to' && 'bg-blue-200',
            direction === 'from' && 'bg-gray-200',
          )}
        >
          <div className="font-medium text-primary">
            {titleCase(message.name)}
          </div>
          <div>{message.message}</div>
          <div className="text-xs text-right opacity-75 whitespace-nowrap">
            {DateTime.fromMillis(message.timestamp).toFormat('HH:MM')}
          </div>
        </div>

        {isFinalMessage && direction === 'to' && message.recipientHasOpened && (
          <div className="text-sm italic text-right opacity-50">Seen</div>
        )}
      </div>
    </div>
  );
};
