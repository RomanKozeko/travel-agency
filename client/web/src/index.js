import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/fn/array/';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { fetchLanguages, fetchSettings } from './services/apiHelper';
import { getLangPref, getLangUrlPref } from './services/utils';
import App from './modules/app/App';
import ScrollToTop from './modules/ui-elements/ScrollToTop';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// Grab the state from a global variable injected into the server-generated HTML
// const preloadedState = window.__PRELOADED_STATE__ || {};

// Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE_;

var store;

fetchLanguages()
  .then(res => {
    const prefix = getLangPref();
    const urlPrefix = getLangUrlPref(res, prefix);
    const preloadedState = {
      app: {
        languages: {
          prefix,
          urlPrefix,
          defaultLang: 'ru',
          allIds: [],
          byIds: {},
          isFetching: false,
          items: res,
        },
      },
    };

    store = configureStore(preloadedState);

    return fetchSettings(urlPrefix);
  })
  .then(({ items }) => {
    window.TA =
      items[0].content === undefined
        ? { content: {}, currencies: [] }
        : items[0];

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  });
  
registerServiceWorker();
