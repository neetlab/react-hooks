import React from 'react';
import ReactDOM from 'react-dom';
import { Todos } from './components/Todos';

(() => {
  const mountNode = document.getElementById('app');
  ReactDOM.render(<Todos />, mountNode);
})();
