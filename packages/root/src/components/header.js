import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ isSignedIn, onSignOut }) {
  return (
    <div>
      <header className="flex justify-end p-4 border-b border-gray-200  ">
        {isSignedIn ? (
          <button
            onClick={onSignOut}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/auth/login"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>
        )}
      </header>
    </div>
  );
}
