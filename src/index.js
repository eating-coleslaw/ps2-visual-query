import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';

/* =========================
    TEMPORARY TESTING CALL
=========================== */

import { test } from './planetside/queryUrlParsing/queryUrlParser';
test();

/* ========================*/


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
