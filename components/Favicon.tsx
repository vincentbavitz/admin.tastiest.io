import React, { FC } from 'react';

/** To be placed inside `next/head` component only. */
const Favicon: FC = () => {
  return (
    <>
      <link
        rel="android-chrome"
        sizes="192x192"
        href="/android-chrome-192x192.png"
      />
      <link
        rel="android-chrome"
        sizes="512x512"
        href="/android-chrome-512x512.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="icon" type="image/ico" sizes="48x48" href="./favicon.ico" />
    </>
  );
};

export default Favicon;
