import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Route } from 'react-router-dom';
import Home from './Home';
import Tour from '../tours/Tour';
import Page from '../pages/Page';
import Hotel from '../hotels/Hotel';
import Showplace from '../showplaces/Showplace';
import Footer from './Footer';
import { getLangPref } from '../../services/utils';
import Head from '../ui-elements/Head';

const styles = StyleSheet.create({
  wrapper: {
    flex: '1 0 auto;',
  },
});

let App = ({ languagePrefix }) => {
  const prefix = languagePrefix ? languagePrefix : getLangPref();
  const urlPrefix = prefix === 'ru' || !prefix ? '' : `/${prefix}`;
  const routes = [
    {
      path: `${urlPrefix || '/'}`,
      exact: true,
      component: Home,
    },
    {
      path: `${urlPrefix}/pages/:id`,
      exact: true,
      component: Page,
    },
    {
      path: `${urlPrefix}/tours/:id`,
      exact: true,
      component: Tour,
    },
    {
      path: `${urlPrefix}/hotels/:url`,
      exact: true,
      component: Hotel,
    },
    {
      path: `${urlPrefix}/showplaces/:url`,
      exact: true,
      component: Showplace,
    },
  ];
  return (
    <>
      <div className={css(styles.wrapper)}>
        <Head
          title={window.TA.content.appTitle}
          metaDescription={window.TA.content.appDescription}
        />
        <div className={css(styles.content)}>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
