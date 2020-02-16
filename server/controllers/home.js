const path = require('path');
const fs = require('fs');

// const {StaticRouter} = require('react-router')
// const {StyleSheetServer} = require('aphrodite')
//
// const {default: configureStoreSSR} = require('../../dist/client/store/configureStoreSSR');
// const {default: App} = require('../../dist/client/modules/app/App')

/**
 * GET /
 * Home page.
 */

export const getLangPref = () => {
  if (window) {
    const pref = window.location.href.split('/')[3];
    if (pref.length > 2) {
      return 'ru';
    }
    return window.location.href.split('/')[3];
  }
};

module.exports = {
  index(req, res, next) {
    const prefix = req.originalUrl.split('/')[1];
    const filePath = path.join(__dirname, '../../client/web/build/index.html');
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
      if (err) {
        return res.status(404).end();
      }

      const context = {};
      // Create a new Redux store instance
      // const store = configureStoreSSR();
      // const {html, css} = StyleSheetServer.renderStatic(() => {
      //   return renderToString(<Provider store={store}>
      //     <StaticRouter
      //       location={req.url}
      //       context={context}
      //     >
      //       <App languagePrefix={prefix.length > 2 ? '' : prefix} />
      //     </StaticRouter>
      //   </Provider>);
      // });
      //
      // const defaultState = store.getState();
      // const app = {
      //   languagePrefix: prefix.length > 2 ? '' : prefix
      // };
      // const preloadedState = Object.assign(defaultState, app);
      const preloadedState = '';

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        res.redirect(301, context.url);
      } else {
        const withSsr = htmlData.replace(
          '{{SSR}}',
          `<style type="text/css" id="server-side-styles"></style>`
        );
        // const RenderedApp = withSsr.replace(
        //   '__PRELOADED_STATE__', `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
        //    StyleSheet.rehydrate(${JSON.stringify(css.renderedClassNames)}});`
        // );

        res.send(withSsr);
      }
    });
  },
};
