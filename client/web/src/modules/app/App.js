import React, {Component, Fragment} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { connect } from 'react-redux';
import {
  Route,
  Link
} from 'react-router-dom';
import Home from './Home'
import Contacts from './Contacts';
import ToursPage from '../tours/ToursPage';
import Tour from '../tours/Tour';
import Page from '../pages/Page';
import HeaderContainer from '../header/HeaderContainer';
import Footer from './Footer';
import { getLangPref } from '../../services/utils'

const styles = StyleSheet.create({
  wrapper: {
	  flex: '1 0 auto;'
  },
});

let App = ({languagePrefix}) => {
  const prefix = languagePrefix ? languagePrefix : getLangPref();
  const urlPrefix = prefix === 'ru' || !prefix ? '' : `/${prefix}`;
  const routes = [
    {
      path: `${urlPrefix || '/'}`,
      exact: true,
      main: () => <Home />
    },
    {
      path: `${urlPrefix}/pages/:id`,
      exact: true,
      main: () => <Page />
    },
    {
      path: `${urlPrefix}/tours`,
      exact: true,
      main: () => <ToursPage />
    },
    {
      path: `${urlPrefix}/tours/:id`,
      exact: true,
      main: () => <Tour />
    },
    {
      path: `${urlPrefix}/contacts`,
      exact: true,
      main: () => <Contacts />
    }
  ];
  return ([
      <div className={css(styles.wrapper)}>
        <HeaderContainer/>
        <div className={css(styles.content)}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>,
      <Footer/>
	  ]
  );
};

export default App;
