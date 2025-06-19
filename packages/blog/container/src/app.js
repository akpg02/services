import React, { Suspense, lazy } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";

const Author = lazy(() => import("author/AuthorApp"));
const Categories = lazy(() => import("categories/CategoriesApp"));
const Comments = lazy(() => import("comments/CommentsApp"));
const Newsletters = lazy(() => import("newsletters/NewslettersApp"));
const Post = lazy(() => import("post/PostApp"));
const Posts = lazy(() => import("posts/PostsApp"));
const Related = lazy(() => import("related/RelatedApp"));
const Search = lazy(() => import("search/SearchApp"));
const Social = lazy(() => import("social/SocialApp"));

function BlogLayout() {
  const prefix = window.location.pathname.startsWith("/blog") ? "/blog" : "";
  return (
    <>
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to={`${prefix}/categories`} style={{ marginRight: 10 }}>
          categories
        </Link>
        <Link to={`${prefix}/comments`} style={{ marginRight: 10 }}>
          comments
        </Link>
        <Link to={`${prefix}/post`} style={{ marginRight: 10 }}>
          post
        </Link>
        <Link to={`${prefix}/posts`} style={{ marginRight: 10 }}>
          posts
        </Link>
        <Link to={`${prefix}/related`} style={{ marginRight: 10 }}>
          related
        </Link>
        <Link to={`${prefix}/search`} style={{ marginRight: 10 }}>
          search
        </Link>
        <Link to={`${prefix}/social`} style={{ marginRight: 10 }}>
          social
        </Link>
        <Link to={`${prefix}/newsletters`}>newsletters</Link>
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
          <Route path="" element={<BlogLayout />}>
            <Route index element={<div>Blog landing page</div>} />
            <Route path="author" element={<Author />} />
            <Route path="categories" element={<Categories />} />
            <Route path="comments" element={<Comments />} />
            <Route path="newsletters" element={<Newsletters />} />
            <Route path="post" element={<Post />} />
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
