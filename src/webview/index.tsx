import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { HeroUIProvider } from '@heroui/react';
const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <HeroUIProvider>
      <App></App>
    </HeroUIProvider>
  </React.StrictMode>,
);
