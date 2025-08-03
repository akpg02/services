import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Layout from './component/layout';

const Projects = lazy(() => import('projects/ProjectsApp'));
const About = lazy(() => import('about/AboutApp'));
const Contact = lazy(() => import('contact/ContactApp'));
const Challenges = lazy(() => import('challenges/ChallengesApp'));

const prefix = location.pathname.startsWith('/portfolio') ? '/portfolio' : '';

export default function App() {
  return (
    <>
      <Suspense fallback={<div>Loading Portfolio…</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Portfolio homepage</div>} />
            <Route path="projects" element={<Projects />} />
            <Route path="about" element={<About />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="contact" element={<Contact />} />
            <Route element={<div>Portfolio page....</div>}></Route>
            <Route path="*" element={<h2>Portfolio not found</h2>} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
