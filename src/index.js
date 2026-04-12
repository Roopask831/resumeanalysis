import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';

// This is the entry point of the entire React app.
// ReactDOM.createRoot() finds the <div id="root"> in public/index.html
// and mounts our App component inside it.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
