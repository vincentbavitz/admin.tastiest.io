import React from 'react';
import { LayoutProps } from './LayoutHandler';
import LayoutWrapper from './LayoutWrapper';

export interface LayoutDefaultProps extends LayoutProps {
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
        className="absolute inset-0 flex h-full bg-gray-100"
      >
        <div className="relative w-full px-8 pt-6 pb-12 overflow-auto">
          <Component {...pageProps} />
        </div>
      </div>
    </LayoutWrapper>
  );
}
