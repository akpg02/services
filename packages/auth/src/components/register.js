import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate signup logic
    console.log({ name, email, password });
    navigate("/login");
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
            Sign Up
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-400"
              placeholder="Your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-400"
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
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Create Account
          </button>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to={`${prefix}/login`}
              className="text-green-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
