const path = require('path');
const fs = require('fs')
const ReactDOMServer = require('react-dom/server');
import { StaticRouter } from 'react-router'
import React from 'react';
import App from '../../client/web/src/modules/app/App';

/**
 * GET /
 * Home page.
 */

module.exports =  {
  index(req, res, next) {
    const filePath = path.join(__dirname, '../../client/web/build/index.html');
    fs.readFile(filePath, 'utf8', (err, htmlData)=>{
      if (err) {
        console.error('read err', err);
        return res.status(404).end()
      }

      const context = {};
      // Create a new Redux store instance
      //const store = createStore(counterApp)
      const markup = ReactDOMServer.renderToString(
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App />
        </StaticRouter>
      );

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        res.redirect(301, context.url)
      } else {
        const RenderedApp = htmlData.replace('{{SSR}}', markup);

        res.send(RenderedApp)
      }

    });
  }
};

