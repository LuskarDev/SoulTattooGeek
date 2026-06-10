
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './ssr-dist/App.mjs';
try {
  const html = renderToString(React.createElement(App));
  console.log('SSR_OK', html.length);
} catch (e) {
  console.error('SSR_ERROR', e && e.stack || e);
  process.exit(1);
}
