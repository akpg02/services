import React, { lazy, Suspense } from "react";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";

const ProductsPage = lazy(() => import("products/ProductsApp"));
const CartPage = lazy(() => import("cart/CartApp"));
const DashboardPage = lazy(() => import("dashboard/DashboardApp"));
const ReviewsPage = lazy(() => import("reviews/ReviewsApp"));

function ShopLayout() {
  const prefix = window.location.pathname.startsWith("/shop") ? "/shop" : "";
  return (
    <>
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to={`${prefix}/products`} style={{ marginRight: 10 }}>
          Products
        </Link>
        <Link to={`${prefix}/cart`} style={{ marginRight: 10 }}>
          Cart
        </Link>
        <Link to={`${prefix}/dashboard`} style={{ marginRight: 10 }}>
          Dashboard
        </Link>
        <Link to={`${prefix}/reviews`}>Reviews</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default function ShopPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...Container</div>}>
        <Routes>
          <Route element={<ShopLayout />}>
            <Route index element={<Navigate to="products" replace />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
          </Route>
          <Route path="*" element={<h2>Shop page not found</h2>} />
        </Routes>
      </Suspense>
    </>
  );
}
