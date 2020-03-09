import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/fn/array/';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { fetchLanguages, fetchSettings } from './services/apiHelper';
import { getLangPref, getLangUrlPref } from './services/utils';
import App from './modules/app/App';
import Header from './modules/header/Header';
import ScrollToTop from './modules/ui-elements/ScrollToTop';
import registerServiceWorker from './registerServiceWorker';
import { fetchMenu } from './modules/menu/menuReducer';
import { fetchContacts } from './modules/header/headerReducer';
import './index.css';

async function preloadData() {
  const languages = await fetchLanguages();

  const prefix = getLangPref();
  const urlPrefix = getLangUrlPref(languages, prefix);
  const { items: settings } = await fetchSettings(urlPrefix);
  const preloadedState = {
    app: {
      languages: {
        prefix,
        urlPrefix,
        defaultLang: 'ru',
        allIds: [],
        byIds: {},
        isFetching: false,
        items: languages,
      },
    },
  };
  window.TA =
    settings[0].content === undefined
      ? { content: {}, currencies: [] }
      : settings[0];

  const store = configureStore(preloadedState);
  store.dispatch(fetchContacts());
  store.dispatch(fetchMenu());

  return store;
}

preloadData().then(store => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <Header />
          <App />
        </ScrollToTop>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
});

registerServiceWorker();
