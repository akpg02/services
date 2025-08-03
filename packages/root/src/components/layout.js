// src/components/Layout.jsx
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';

export default function Layout({ isSignedIn, onSignOut }) {
  return (
    <div className="app-container">
      <button
        className="sidebar-toggle"
        onClick={() => {
          const sb = document.querySelector('.sidebar');
          sb.classList.toggle('open');
        }}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
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
