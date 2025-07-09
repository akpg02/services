// src/components/Layout.jsx
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ isSignedIn, onSignOut }) {
  return (
    <div className="app-container">
      <Sidebar isSignedIn={isSignedIn} onSignOut={onSignOut} />

      <div className="content-container">
        <Header
          isSignedIn={isSignedIn}
          onSignOut={onSignOut}
          className="page-header"
        />

        <main className="main-content">
          <Suspense
            fallback={<div className="loading-fallback">Loading...</div>}
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
