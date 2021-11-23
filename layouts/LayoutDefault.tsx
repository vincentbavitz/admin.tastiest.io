import React from 'react';
import { LayoutProps } from './LayoutHandler';
import LayoutWrapper from './LayoutWrapper';

interface LayoutDefaultProps extends LayoutProps {
  children: any;
}

export default function LayoutDefault({
  router,
  pageProps,
  children: Component,
}: LayoutDefaultProps) {
  return (
    <LayoutWrapper router={router} pageProps={pageProps}>
      <div
        style={{ minWidth: '700px' }}
        className="absolute inset-0 flex h-full px-8 py-6 overflow-auto bg-gray-100"
      >
        <div style={{ height: 'max-content' }} className="w-full">
          <Component {...pageProps} />
        </div>
      </div>
    </LayoutWrapper>
  );
}
