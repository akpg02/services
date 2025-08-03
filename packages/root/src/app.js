// root/container/src/App.jsx
import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';

const ShopApp = lazy(() => import('shop/ShopApp'));
const PortfolioApp = lazy(() => import('portfolio/PortfolioApp'));
const BlogApp = lazy(() => import('blog/BlogApp'));
const CalendarApp = lazy(() => import('calendar/CalendarApp'));
const AuthApp = lazy(() => import('auth/AuthApp'));

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsSignedIn(false);
  };
  // Todo: implement user state via Redux

  return (
    <>
      <Suspense fallback={<div>Loading root…</div>}>
        <Routes>
          <Route
            element={
              <Layout isSignedIn={isSignedIn} onSignOut={handleLogout} />
            }
          >
            <Route index element={<div>Root start page</div>} />
            <Route
              path="portfolio/*"
              element={<PortfolioApp isStandalone={false} />}
            />
            <Route
              path="shop/*"
              element={<ShopApp isSignedIn={isSignedIn} isStandalone={false} />}
            />
            <Route
              path="blog/*"
              element={<BlogApp isSignedIn={isSignedIn} isStandalone={false} />}
            />
            <Route
              path="calendar/*"
              element={
                <CalendarApp isSignedIn={isSignedIn} isStandalone={false} />
              }
            />
            <Route
              path="auth/*"
              element={
                <AuthApp
                  onSignIn={() => setIsSignedIn(true)}
                  isSignedIn={isSignedIn}
                  isStandalone={false}
                />
              }
            />
            <Route path="*" element={<h2>404: Page not found</h2>} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
