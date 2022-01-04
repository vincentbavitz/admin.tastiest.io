import { SendOutlined } from '@ant-design/icons';
import {
  dlog,
  RestaurantSupportRequest,
  SupportMessage,
  SupportMessageDirection,
  titleCase,
  UserSupportRequest,
} from '@tastiest-io/tastiest-utils';
import clsx from 'clsx';
import { AuthContext } from 'contexts/auth';
import { DateTime } from 'luxon';
import React, { useContext, useEffect, useRef, useState } from 'react';

interface Props {
  request: UserSupportRequest | RestaurantSupportRequest;
}

export default function SupportChatScreen({ request }: Props) {
  const { conversation } = request;
  const messages = conversation.sort((a, b) => a.timestamp - b.timestamp);

  // Set token for API requests to api.tastiest.io
  const { adminUser } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  useEffect(() => {
    adminUser?.getIdToken().then(setToken);
  }, [adminUser]);

  const container = useRef<HTMLDivElement>(null);
  const [composeMessage, setComposeMessage] = useState<string | null>(null);

  const [isSending, setIsSending] = useState(false);

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

  const sendMessage = async () => {
    const name = 'Tastiest Support';
    const message = composeRef.current.value.replace('/\r?\n/g', '<br/>');

    dlog('SupportChatScreen ➡️ token:', token);
    dlog('SupportChatScreen ➡️ request.id:', request.id);
    dlog('SupportChatScreen ➡️ message:', message);

    // await fetch('https://api.tastiest.io/support/users/reply', {
    await fetch('http://localhost:4444/support/users/reply', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: request.id,
        name,
        message,
      }),
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div
        ref={container}
        style={{ boxShadow: '0 15px 10px -15px rgba(0, 0, 0, 0.15) inset' }}
        className="flex flex-col w-full h-full p-4 overflow-y-auto bg-dark"
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            isFinalMessage={index === messages.length - 1}
          />
        ))}
      </div>

      <div className="flex gap-2 items-end bg-white w-full">
        <textarea
          wrap="physical"
          ref={composeRef}
          value={composeMessage}
          placeholder="Write a reply..."
          onKeyPress={handleEnterKeyPress}
          onChange={handleComposeMessageChange}
          className="flex-grow text-base pl-4 pr-2 py-4 outline-none resize-none"
          style={{
            lineHeight: `${composeLineHeight}px`,
          }}
        />
        <div
          style={{ maxHeight: '55px' }}
          className="flex items-center justify-center w-12 h-full cursor-pointer duration-300 text-gray-500 hover:text-secondary"
        >
          <SendOutlined onClick={sendMessage} className="text-xl" />
        </div>
      </div>
    </div>
  );
}

interface ChatMessageProps {
  message: SupportMessage;
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
