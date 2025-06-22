import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
// import Header from '../components/Header';

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate authentication logic
    console.log({ email, password });
    navigate("/");
  };
  const prefix = window.location.pathname.startsWith("/auth") ? "/auth" : "";
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
            Login
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to={`${prefix}/register`}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
