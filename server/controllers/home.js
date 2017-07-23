const path = require('path');
const fs = require('fs')
const ReactDOMServer = require('react-dom/server');
import {StaticRouter} from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import App from '../../client/web/src/modules/app/App';
import configureStoreSSR from '../../client/web/src/store/configureStoreSSR';

/**
 * GET /
 * Home page.
 */

module.exports = {
  index(req, res, next) {
    const filePath = path.join(__dirname, '../../client/web/build/index.html');
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
      if (err) {
        console.error('read err', err);
        return res.status(404).end()
      }

      const context = {};
      // Create a new Redux store instance
      const store = configureStoreSSR();
      const markup = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}
          >
            <App />
          </StaticRouter>
        </Provider>
      );

      console.log(markup);

      const preloadedState = store.getState();

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        res.redirect(301, context.url)
      } else {
        const withSsr = htmlData.replace('{{SSR}}', markup);
        const RenderedApp = withSsr.replace('__PRELOADED_STATE__', `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`);

        res.send(RenderedApp)
      }

    });
  }
};

