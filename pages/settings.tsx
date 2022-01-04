import PageHeader from 'components/PageHeader';
import MembersTable from 'components/tables/MembersTable';
import { NextPage } from 'next';
import nookies from 'nookies';
import React from 'react';

export const getServerSideProps = async context => {
  // Ensure user is authenticated
  const cookieToken = nookies.get(context)?.token;

  // If no user, redirect to login
  if (!cookieToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

const SettingsPage: NextPage = () => {
  return (
    <div>
      <PageHeader label="Settings">sdfasljkh</PageHeader>
      ALL ADMIN USERS AND CREATE USER ADMIN
      <MembersTable />
    </div>
  );
};

export default SettingsPage;
