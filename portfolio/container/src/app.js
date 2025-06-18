import React, { Suspense, lazy } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";

const Projects = lazy(() => import("projects/ProjectsApp"));
const About = lazy(() => import("about/AboutApp"));
const Contact = lazy(() => import("contact/ContactApp"));

function PortfolioLayout() {
  const prefix = window.location.pathname.startsWith("/portfolio")
    ? "/portfolio"
    : "";
  return (
    <>
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to={`${prefix}/projects`} style={{ marginRight: 10 }}>
          Projects
        </Link>
        <Link to={`${prefix}/about`} style={{ marginRight: 10 }}>
          About
        </Link>
        <Link to={`${prefix}/contact`}>Contact</Link>
      </nav>
      <Outlet />
    </>
  );
}
export default function App() {
  return (
    <>
      <Suspense fallback={<div>Loading Portfolio…</div>}>
        <Routes>
          <Route path="" element={<PortfolioLayout />}>
            <Route index element={<div>Portfolio landing page</div>} />
            <Route path="projects" element={<Projects />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<h2>Portfolio not found</h2>} />
        </Routes>
      </Suspense>
    </>
  );
}
