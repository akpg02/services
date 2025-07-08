import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';

export default function Layout({ isSignedIn, onSignOut }) {
  return (
    <div className="flex h-screen">
      <Sidebar isSignedIn={isSignedIn} onSignOut={onSignOut} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
