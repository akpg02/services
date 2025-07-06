import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';

export default function Layout({ isSignedIn, onSignOut }) {
  return (
    <>
      <Header isSignedIn={isSignedIn} onSignOut={onSignOut} />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
