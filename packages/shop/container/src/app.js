import React, { lazy, Suspense, useEffect } from 'react';
import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useNavigate,
} from 'react-router-dom';

const ProductsPage = lazy(() => import('products/ProductsApp'));
const CartPage = lazy(() => import('cart/CartApp'));
const DashboardPage = lazy(() => import('dashboard/DashboardApp'));
const ReviewsPage = lazy(() => import('reviews/ReviewsApp'));
const ChatPage = lazy(() => import('chat/ChatApp'));
const CheckoutPage = lazy(() => import('checkout/CheckoutApp'));
const OrdersPage = lazy(() => import('orders/OrdersApp'));
const ProductPage = lazy(() => import('product/ProductApp'));
const PaymentsPage = lazy(() => import('payments/PaymentsApp'));
const SearchPage = lazy(() => import('search/SearchApp'));
const WishlistPage = lazy(() => import('wishlist/WishlistApp'));
const RecommendationsPage = lazy(() =>
  import('recommendations/RecommendationsApp')
);

function ShopLayout() {
  const prefix = window.location.pathname.startsWith('/shop') ? '/shop' : '';
  return (
    <>
      <nav style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
        <Link to={`${prefix}/products`} style={{ marginRight: 10 }}>
          Products
        </Link>
        <Link to={`${prefix}/cart`} style={{ marginRight: 10 }}>
          Cart
        </Link>
        <Link to={`${prefix}/chat`} style={{ marginRight: 10 }}>
          Chat
        </Link>
        <Link to={`${prefix}/checkout`} style={{ marginRight: 10 }}>
          Checkout
        </Link>
        <Link to={`${prefix}/orders`} style={{ marginRight: 10 }}>
          Orders
        </Link>
        <Link to={`${prefix}/payments`} style={{ marginRight: 10 }}>
          Payments
        </Link>
        <Link to={`${prefix}/product`} style={{ marginRight: 10 }}>
          Product
        </Link>
        <Link to={`${prefix}/recommendations`} style={{ marginRight: 10 }}>
          Recommendations
        </Link>
        <Link to={`${prefix}/search`} style={{ marginRight: 10 }}>
          Search
        </Link>
        <Link to={`${prefix}/wishlist`} style={{ marginRight: 10 }}>
          Wishlist
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

/*
isSignedIn ? (
 <DashboardPage />) : (
<Navigate to="/auth/login" replace />) */

export default function ShopPage({ isSignedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  return (
    <>
      <Suspense fallback={<div>Loading...Container</div>}>
        <Routes>
          <Route path="/*" element={<ShopLayout />}>
            <Route
              index
              element={<div>This will be the shop landing page.</div>}
            />
            <Route path="products" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
          </Route>
          <Route path="*" element={<h2>Shop page not found</h2>} />
        </Routes>
      </Suspense>
    </>
  );
}
