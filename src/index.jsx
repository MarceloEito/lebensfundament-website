import React from 'react';
import ReactDOM from 'react-dom/client';
// Montserrat is bundled with the site (no requests to Google), Latin
// subset only: 300–700 plus italics for the intro texts
import '@fontsource/montserrat/latin-300.css';
import '@fontsource/montserrat/latin-400.css';
import '@fontsource/montserrat/latin-500.css';
import '@fontsource/montserrat/latin-600.css';
import '@fontsource/montserrat/latin-700.css';
import '@fontsource/montserrat/latin-300-italic.css';
import '@fontsource/montserrat/latin-400-italic.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
