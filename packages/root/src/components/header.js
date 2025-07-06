// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const remoteNavs = {
  portfolio: () => import('portfolio/nav'),
  blog: () => import('blog/nav'),
  shop: () => import('shop/nav'),
  calendar: () => import('calendar/nav'),
};

export default function Header({ isSignedIn, onSignOut }) {
  const [subNavItems, setSubNavItems] = useState([]);
  const location = useLocation();
  const cacheRef = useRef({});

  const primaryNav = [
    { path: '/', label: 'Home' },
    ...(isSignedIn
      ? [{ path: '/auth/logout', label: 'Logout', onClick: onSignOut }]
      : [{ path: '/auth/login', label: 'Login' }]),
  ];

  useEffect(() => {
    const section = location.pathname.split('/')[1];
    const loadNav = remoteNavs[section];

    if (loadNav) {
      if (cacheRef.current[section]) {
        setSubNavItems(cacheRef.current[section]);
      } else {
        loadNav()
          .then((mod) => {
            const items = mod.default || [];
            cacheRef.current[section] = items;
            setSubNavItems(items);
          })
          .catch((err) => {
            console.error(`Error loading ${section} nav: `, err);
            setSubNavItems([]);
          });
      }
    } else {
      setSubNavItems([]);
    }
  }, [location.pathname]);
  return (
    <header>
      <nav style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
        {primaryNav.map((item) =>
          item.onClick ? (
            <button
              key={item.path}
              onClick={item.onClick}
              style={{
                marginRight: 12,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          ) : (
            <Link key={item.path} to={item.path} style={{ marginRight: 12 }}>
              {item.label}
            </Link>
          )
        )}
      </nav>
      {subNavItems.length > 0 && (
        <nav
          style={{
            padding: 8,
            borderBottom: '1px solid #ccc',
            background: '#f9f9f9',
          }}
        >
          {subNavItems.map((item) => (
            <Link key={item.path} to={item.path} style={{ marginRight: 12 }}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
