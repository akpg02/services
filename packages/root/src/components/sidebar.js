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
    <aside className="w-64 flex flex-col bg-gray-100 border-r border-r-gray-200">
      <Link to="/" className="p-4 flex justify-center">
        <div className="text-center p-4">
          <img src={logo} alt="Logo" className="mx-auto h-18 w-auto" />
          <p className="text-md text-gray-700 mt-2">Grace Akpan</p>
          <p className="text-xs text-gray-600">Web Developer</p>
        </div>
      </Link>
      <nav className="flex-1 px-15 py-4 overflow-y-auto flex flex-col">
        <div className="flex flex-col space-y-2 mb-4">
          {navItems.map(({ path, label, onClick }) =>
            onClick ? (
              <button
                key={path}
                onClick={onClick}
                className="w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {label}
              </button>
            ) : (
              <Link
                key={path}
                to={path}
                className="block text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                {label}
              </Link>
            )
          )}
        </div>
        <h4 className="text-xs font-semibold uppercase mb-2">Other Apps</h4>
        <div className="space-y-2 mb-2">
          {featured.map((a) => (
            <Link
              key={a.path}
              to={a.path}
              className="block text-sm text-gray-700 hover:text-blue-600"
            >
              {a.label}
            </Link>
          ))}
        </div>
        {more.length > 0 && (
          <Collapsible label={`More Apps (${more.length})`}>
            {more.map((a) => (
              <Link
                key={a.path}
                to={a.path}
                className="block text-sm text-gray-700 hover:text-blue-600 mb-1"
              >
                {a.label}
              </Link>
            ))}
          </Collapsible>
        )}
      </nav>
    </aside>
  );
}
