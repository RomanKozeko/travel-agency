import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from 'react-snapshot';
import thunk from 'redux-thunk'
import api from './middleware/api'

import App from './modules/app/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './rootReducer';

import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(api, thunk)
));


// ReactDOM.render(
//   render(
//   <Provider store={store}>
//     <Router>
//       <App/>
//     </Router>
//   </Provider>,
//   document.getElementById('root'))
// );

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
