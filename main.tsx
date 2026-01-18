import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('main.tsx loading - DOM root element:', document.getElementById('root'));

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="color: red; padding: 20px;">ERROR: Root element not found</div>';
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    console.log('React app mounted successfully');
  } catch (error) {
    console.error('Failed to render React app:', error);
    rootElement.innerHTML = `<div style="color: red; padding: 20px;">ERROR: ${(error as any).message}</div>`;
  }
}
