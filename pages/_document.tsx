import Favicon from 'components/Favicon';
import Fonts from 'components/Fonts';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class CustomDocument extends Document<any> {
  render() {
    return (
      <Html lang="en">
        <Head>
          {this.props?.styleTags}

          <Fonts />
          <Favicon />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
