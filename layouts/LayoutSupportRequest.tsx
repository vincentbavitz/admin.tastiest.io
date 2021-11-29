import React from 'react';
import { LayoutDefaultProps } from './LayoutDefault';
import LayoutWrapper from './LayoutWrapper';

export default function LayoutSupportRequest({
  router,
  pageProps,
  children: Component,
}: LayoutDefaultProps) {
  return (
    <LayoutWrapper router={router} pageProps={pageProps}>
      <div
        style={{ minWidth: '700px' }}
        className="absolute inset-0 flex h-full overflow-auto bg-gray-100"
      >
        <div style={{ height: '100%' }} className="relative w-full">
          <Component {...pageProps} />
        </div>
      </div>
    </LayoutWrapper>
  );
}
