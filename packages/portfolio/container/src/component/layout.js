// src/components/Layout.jsx
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

export default function Layout({ prefix, isStandalone = true }) {
  return (
    <>
      <div>
        {isStandalone && <Sidebar prefix={prefix} />}
        <div>
          <main>
            <Suspense
              fallback={<div className="loading-fallback">Loading...</div>}
            >
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}
