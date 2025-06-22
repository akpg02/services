import React, { Suspense, lazy } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";

export default function Auth({ onSignIn }) {
  return (
    <Suspense fallback={<div>Loading auth…</div>}>
      <Routes>
        <Route index path={`/login`} element={<Login onSignIn={onSignIn} />} />
        <Route path={`/register`} element={<Register onSignIn={onSignIn} />} />
        <Route path="*" element={<h2>404: Page not found</h2>} />
      </Routes>
    </Suspense>
  );
}
