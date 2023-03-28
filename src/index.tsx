import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

(window as any).API_URL = 'https://www.googleapis.com/books/v1/volumes';
(window as any).API_KEY = 'AIzaSyAKG7rsiCbCck4qjsRJmpZz2s3QN7AznVE';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
