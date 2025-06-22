import React, { Suspense, lazy } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";

export default function Auth() {
  return (
    <Suspense fallback={<div>Loading auth…</div>}>
      <Routes>
        <Route index path={`/login`} element={<Login />} />
        <Route path={`/register`} element={<Register />} />
        <Route path="*" element={<h2>404: Page not found</h2>} />
      </Routes>
    </Suspense>
  );
}
