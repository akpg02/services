import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ isSignedIn, onSignOut }) {
  return (
    <header className="site-header">
      {isSignedIn ? (
        <button onClick={onSignOut} className="header-button">
          Logout
        </button>
      ) : (
        <Link to="/auth/login" className="header-link">
          Login
        </Link>
      )}
    </header>
  );
}
