// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header({ isSignedIn, onSignOut }) {
  const handleLogout = () => {
    if (isSignedIn && onSignOut) {
      onSignOut();
    }
  };
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo / Home link */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyApp
        </Link>
        <div>
          <Link
            to="/shop"
            className="text-lg font-bold text-slate-600  hover:text-blue-700 transition"
            replace
            style={{ marginRight: 10 }}
            reloadDocument
          >
            Shop
          </Link>
          <Link
            to="/portfolio"
            className="text-lg font-bold text-slate-600  hover:text-blue-700 transition"
            replace
            style={{ marginRight: 10 }}
            reloadDocument
          >
            Portfolio
          </Link>
          <Link
            to="/blog"
            className="text-lg font-bold text-slate-600  hover:text-blue-700 transition"
            replace
            style={{ marginRight: 10 }}
            reloadDocument
          >
            Blog
          </Link>
          <Link
            to="/calendar"
            className="text-lg font-bold text-slate-600  hover:text-blue-700 transition"
            replace
            reloadDocument
          >
            Calendar
          </Link>
        </div>
        <div>
          <Link
            to={isSignedIn ? "/" : "/auth/login"}
            onClick={handleLogout}
            className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            {isSignedIn ? "LOGOUT" : "LOGIN"}
          </Link>
        </div>
      </div>
    </header>
  );
}
