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

ReactDOM.render(
  <AppContainer>
    <Router>
      <App/>
    </Router>
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
        <Router>
          <NextApp/>
        </Router>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}