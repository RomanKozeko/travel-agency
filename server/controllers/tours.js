const path = require('path');
const fs = require('fs')
const ToursQueries = require('../models/queries/tours');
const config = require('../config/index');

// const ReactDOMServer = require('react-dom/server');
// import {StaticRouter} from 'react-router';
// import {Provider} from 'react-redux';
// import React, { Component } from 'react';
// import App from '../../client/web/src/modules/app/App';
// import {defaultState} from '../../client/web/src/modules/tours/toursReducer';
// import {Schemas} from '../../client/web/src/middleware/callApi';
// import {normalize} from 'normalizr'
// import configureStoreSSR from '../../client/web/src/store/configureStoreSSR';

/**
 * GET /tours
 * Tours page.
 */

module.exports = {
  index(req, res, next) {
    const filePath = path.join(__dirname, '../../client/web/build/index.html');
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
      if (err) {
        console.error('read err', err);
        return res.status(404).end()
      }
      const offset = +req.query.page * config.itemsPerPageLimit;

      ToursQueries.getAllWithPagination(offset, config.itemsPerPageLimit)
        .then(result => {
          const byIds = {};
          const obj = {
            count: 9,
            limit: 2,
            offset: 0,
            tours: result[0]
          };
          const normalizedTours = normalize(obj, Schemas.TOURS);

          for (const key in normalizedTours.entities.tours) {
            if (normalizedTours.entities.tours.hasOwnProperty(key) && !byIds.hasOwnProperty(key)) {
              byIds[key] = normalizedTours.entities.tours[key]._doc
            }
          }

          const tours = {
            byIds,
            allIds: normalizedTours.result.tours,
            pages: {
              0: normalizedTours.result.tours
            }
          };

          const preloadState = Object.assign(defaultState, tours);

          const context = {};
          // Create a new Redux store instance
          const store = configureStoreSSR({preloadState});

          // const markup = ReactDOMServer.renderToString(
          //   <Provider store={store}>
          //     <StaticRouter
          //       location={req.url}
          //       context={context}
          //     >
          //       <App/>
          //     </StaticRouter>
          //   </Provider>
          // );

          const markup = '';

          const preloadedState = store.getState();

          if (context.url) {
            // Somewhere a `<Redirect>` was rendered
            res.redirect(301, context.url)
          } else {
            const withSsr = htmlData.replace('{{SSR}}', markup);
            const RenderedApp = withSsr.replace('__PRELOADED_STATE__', `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`);

            res.send(RenderedApp)
          }
        })
        .catch(next);

    });
  }
};

