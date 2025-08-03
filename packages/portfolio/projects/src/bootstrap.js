import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const root = createRoot(document.getElementById('projects_root'));
root.render(<App />);
