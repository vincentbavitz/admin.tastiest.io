import { LoadingOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { adminUser } = useAuth();

  // Break default layout for certain pages
  const pagesWithoutDefaultLayout = [
    /^\/login/,
    /^\/merchant-terms-and-conditions/,
  ];

  const { pathname } = useRouter();
  const shouldBreakLayout = pagesWithoutDefaultLayout.some(page =>
    page.test(pathname),
  );

  if (shouldBreakLayout) {
    return <>{children}</>;
  }

  // Show loading when redirecting to /login
  if (!adminUser) {
    return (
      <div
        className={clsx(
          'fixed inset-0 duration-150 flex items-center justify-center bg-white',
        )}
      >
        <LoadingOutlined className="text-6xl fill-current text-primary" />
      </div>
    );
  }

  return (
    <div
      style={{ height: '100vh' }}
      className="relative flex flex-col overflow-hidden font-roboto"
    >
      <Header />

      <div className="flex h-full">
        <Sidebar />

        <div className="relative flex-grow w-full">
          <div
            style={{ minWidth: '700px' }}
            className="absolute inset-0 flex h-full px-8 py-6 overflow-auto bg-gray-100"
          >
            <div style={{ height: 'max-content' }} className="w-full ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
