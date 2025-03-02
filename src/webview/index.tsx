import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { ConfigProvider } from 'antd';
const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ConfigProvider theme={{ hashed: false }}>
      <App></App>
    </ConfigProvider>
  </React.StrictMode>,
);
