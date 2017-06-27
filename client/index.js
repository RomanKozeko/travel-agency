import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/app/App';
import { AppContainer } from 'react-hot-loader'
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux';

import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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