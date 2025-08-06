import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

/**
 * Main entry point for the Vite React application
 * This renders the App component into the root element
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
