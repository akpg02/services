// root/container/src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";

const ShopApp = lazy(() => import("shop/ShopApp"));
const PortfolioApp = lazy(() => import("portfolio/PortfolioApp"));
const BlogApp = lazy(() => import("blog/BlogApp"));

export default function App() {
  return (
    <>
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to="/shop" replace style={{ marginRight: 10 }} reloadDocument>
          Shop
        </Link>
        <Link to="/portfolio" replace reloadDocument>
          Portfolio
        </Link>
        <Link to="/blog" replace reloadDocument>
          Blog
        </Link>
      </nav>

      <Suspense fallback={<div>Loading root…</div>}>
        <Routes>
          <Route index element={<div>Root home</div>} />
          <Route path="shop/*" element={<ShopApp />} />
          <Route path="portfolio/*" element={<PortfolioApp />} />
          <Route path="blog/*" element={<BlogApp />} />
          <Route path="*" element={<h2>404: Page not found</h2>} />
        </Routes>
      </Suspense>
    </>
  );
}
