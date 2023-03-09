/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Provider } from './Provider/Provider';
import { Router } from 'solid-start/islands/server-router';


const root = document.getElementById('root');

render(() =>
  <Provider>
    <App />
  </Provider>
  , root);
