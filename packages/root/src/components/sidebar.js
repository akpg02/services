import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Collapsible from './collapsible';
import logo from '../assets/logos/computing.png';

const remoteNavs = {
  portfolio: () => import('portfolio/nav'),
  blog: () => import('blog/nav'),
  shop: () => import('shop/nav'),
  calendar: () => import('calendar/nav'),
};

const staticApps = [
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/blog', label: 'Blog' },
  { path: '/shop', label: 'E-Shop' },
  { path: '/calendar', label: 'Calendar' },
];
const FEATURED_COUNT = 5;

export default function Sidebar({ isSignedIn, onSignOut }) {
  const [navItems, setNavItems] = useState([]);
  const location = useLocation();
  const cache = useRef({});

  useEffect(() => {
    // HIGHLIGHTED CHANGE: Treat '/' as 'portfolio' for default nav
    const sectionKey = location.pathname.split('/')[1] || 'portfolio';
    const loader = remoteNavs[sectionKey];

    if (loader) {
      // HIGHLIGHTED CHANGE: Load and cache section-specific nav
      if (cache.current[sectionKey]) {
        setNavItems(cache.current[sectionKey]);
      } else {
        loader()
          .then((m) => {
            const items = m.default || [];
            cache.current[sectionKey] = items;
            setNavItems(items);
          })
          .catch(() => {
            // If loading portfolio fails, clear navItems
            if (sectionKey === 'portfolio') setNavItems([]);
          });
      }
    } else {
      // HIGHLIGHTED CHANGE: Fallback always uses portfolio manifest
      if (cache.current.portfolio) {
        setNavItems(cache.current.portfolio);
      } else {
        remoteNavs
          .portfolio()
          .then((m) => (cache.current.portfolio = m.default || []))
          .then(() => setNavItems(cache.current.portfolio))
          .catch(() => setNavItems([]));
      }
    }
  }, [location.pathname]);

  // build Other Apps list
  const current = `/${location.pathname.split('/')[1] || 'portfolio'}`;
  const others = staticApps.filter((a) => a.path !== current);
  const featured = others.slice(0, FEATURED_COUNT);
  const more = others.slice(FEATURED_COUNT);

  return (
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
          <div className="nav-group-title">Navigation</div>
          {navItems.map(({ path, label, onClick }) =>
            onClick ? (
              <button
                key={path}
                onClick={onClick}
                className="collapsible-toggle"
              >
                {label}
              </button>
            ) : (
              <Link key={path} to={path} className="collapsible-toggle">
                {label}
              </Link>
            )
          )}
        </div>

        <div className="nav-group">
          <div className="nav-group-title">Other Apps</div>
          {featured.map((a) => (
            <Link key={a.path} to={a.path}>
              {a.label}
            </Link>
          ))}
          {more.length > 0 && (
            <Collapsible label={`More Apps (${more.length})`}>
              {more.map((a) => (
                <Link key={a.path} to={a.path}>
                  {a.label}
                </Link>
              ))}
            </Collapsible>
          )}
        </div>
      </nav>
    </aside>
  );
}
