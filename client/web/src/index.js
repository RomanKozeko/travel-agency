import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'

import App from './modules/app/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
