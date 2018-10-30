import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import OfflinePluginRuntime from 'offline-plugin/runtime';

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install();
}

(() => {
  const mountNode = document.getElementById('app');
  ReactDOM.render(<App />, mountNode);
})();
