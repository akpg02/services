import React, { lazy, Suspense, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";

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

export default function ShopPage({ isSignedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <>
      <Suspense fallback={<div>Loading...Container</div>}>
        <Routes>
          <Route path="" element={<ShopLayout />}>
            <Route
              index
              element={<div>This will be the shop landing page.</div>}
            />
            <Route path="products" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route
              path="dashboard"
              element={
                isSignedIn ? (
                  <DashboardPage />
                ) : (
                  <Navigate to="/auth/login" replace />
                )
              }
            />
            <Route path="reviews" element={<ReviewsPage />} />
          </Route>
          <Route path="*" element={<h2>Shop page not found</h2>} />
        </Routes>
      </Suspense>
    </>
  );
}
