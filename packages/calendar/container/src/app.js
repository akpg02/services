import React, { Suspense, lazy } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";

const Admin = lazy(() => import("admin/AdminApp"));
const Analytics = lazy(() => import("analytics/AnalyticsApp"));
const Availability = lazy(() => import("availability/AvailabilityApp"));
const Collaboration = lazy(() => import("collaboration/CollaborationApp"));
const EventCreation = lazy(() => import("post/EventCreationApp"));
const Posts = lazy(() => import("posts/PostsApp"));
const Related = lazy(() => import("related/RelatedApp"));
const Search = lazy(() => import("search/SearchApp"));
const Social = lazy(() => import("social/SocialApp"));

function CalendarLayout() {
  const prefix = window.location.pathname.startsWith("/blog") ? "/blog" : "";
  return (
    <>
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to={`${prefix}/admin`} style={{ marginRight: 10 }}>
          Admin
        </Link>
        <Link to={`${prefix}/analytics`} style={{ marginRight: 10 }}>
          Analytics
        </Link>
        <Link to={`${prefix}/post`} style={{ marginRight: 10 }}>
          Post
        </Link>
        <Link to={`${prefix}/posts`} style={{ marginRight: 10 }}>
          Posts
        </Link>
        <Link to={`${prefix}/related`} style={{ marginRight: 10 }}>
          Related
        </Link>
        <Link to={`${prefix}/search`} style={{ marginRight: 10 }}>
          Search
        </Link>
        <Link to={`${prefix}/social`} style={{ marginRight: 10 }}>
          Social
        </Link>
        <Link to={`${prefix}/newsletters`}>Newsletters</Link>
      </nav>
      <Outlet />
    </>
  );
}
export default function App() {
  return (
    <>
      <Suspense fallback={<div>Loading Blog…</div>}>
        <Routes>
          <Route path="" element={<CalendarLayout />}>
            <Route index element={<div>Blog landing page</div>} />
            <Route path="author" element={<Admin />} />
            <Route path="categories" element={<Analytics />} />
            <Route path="comments" element={<Availability />} />
            <Route path="newsletters" element={<Collaboration />} />
            <Route path="post" element={<EventCreation />} />
            <Route path="posts" element={<Posts />} />
            <Route path="related" element={<Related />} />
            <Route path="search" element={<Search />} />
            <Route path="social" element={<Social />} />
          </Route>
          <Route path="*" element={<h2>Blog page not found</h2>} />
        </Routes>
      </Suspense>
    </>
  );
}
