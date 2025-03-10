import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { HeroUIProvider } from '@heroui/react';

/** polyfill 兼容hbuilderX的Chrome90浏览器!! */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// 消息监听
import messageListener from './utils/messageListener';

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

messageListener.start();
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <HeroUIProvider>
      <App></App>
    </HeroUIProvider>
  </React.StrictMode>,
);
