import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.875rem',
          borderRadius: '10px',
        },
        success: { iconTheme: { primary: '#2d6e18', secondary: 'white' } },
      }}
    />
    <App />
  </React.StrictMode>
);