// src/components/Sidebar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logos/computing.png';
import navItemsData from '../nav';

/**
 * Sidebar for Portfolio microfrontend.
 * Links adapt both root-mounted and isolated contexts.
 */
export default function Sidebar({ isSignedIn, onSignOut }) {
  const [navItems, setNavItems] = useState([]);
  const location = useLocation();
  const cache = useRef(null);

  // Determine base path: when mounted at '/portfolio', links are used as-is;
  // when isolated, prefix '/portfolio' for root navigation
  const basePath = location.pathname.startsWith('/portfolio')
    ? '/portfolio'
    : '';

  useEffect(() => {
    // Load static nav array
    if (!cache.current) {
      cache.current = navItemsData;
      setNavItems(navItemsData);
    } else {
      setNavItems(cache.current);
    }
  }, []);

  return (
    <>
      <aside className="sidebar">
        <Link key="/" to="/">
          <div className="sidebar-logo">
            <img src={logo} alt="Logo" />
            <p>Grace Akpan</p>
            <p>Web Developer</p>
          </div>
        </Link>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <div className="nav-group-title">Portfolio</div>
            {navItems.map(({ path, label, onClick }) => {
              const to = `${basePath}${path.replace(/^\/portfolio/, '')}`;
              return onClick ? (
                <button
                  key={to}
                  onClick={onClick}
                  className="collapsible-toggle"
                >
                  {label}
                </button>
              ) : (
                <Link key={to} to={to} className="collapsible-toggle">
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
