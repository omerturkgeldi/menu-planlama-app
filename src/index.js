import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './assets/boxicons/css/boxicons.min.css'
import store from './stores'
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
