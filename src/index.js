import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Since App.js is inside src/
import './renderer/styles/index.css'; // Correct path to styles
import { initializeIcons } from '@fluentui/react';

// Initialize Fluent UI icons
initializeIcons();

// Remove the Electron remote check - it's not needed here
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);