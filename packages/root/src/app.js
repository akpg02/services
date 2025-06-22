// root/container/src/App.jsx
import React, { Suspense, lazy, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/header";

const ShopApp = lazy(() => import("shop/ShopApp"));
const PortfolioApp = lazy(() => import("portfolio/PortfolioApp"));
const BlogApp = lazy(() => import("blog/BlogApp"));
const AuthApp = lazy(() => import("auth/AuthApp"));

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  // Todo: implement user state via Redux

  return (
    <>
      <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
      <Suspense fallback={<div>Loading root…</div>}>
        <Routes>
          <Route index element={<div>Root home</div>} />
          <Route path="shop/*" element={<ShopApp isSignedIn={isSignedIn} />} />
          <Route path="portfolio/*" element={<PortfolioApp />} />
          <Route path="blog/*" element={<BlogApp />} />
          <Route
            path="auth/*"
            element={
              <AuthApp
                onSignIn={() => setIsSignedIn(true)}
                isSignedIn={isSignedIn}
              />
            }
          />
          <Route path="*" element={<h2>404: Page not found</h2>} />
        </Routes>
      </Suspense>
    </>
  );
}
