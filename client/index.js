import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootSaga from './modules/tours/sagas';
import App from './modules/app/App';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);
registerServiceWorker();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./modules/app/App', () => {
    const NextApp = require('./modules/app/App').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <Router>
            <NextApp />
          </Router>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}