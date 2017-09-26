import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { connect } from 'react-redux';
import {
  Route,
  Link
} from 'react-router-dom';

import Home from './Home'
import Contacts from './Contacts';
import ToursContainer from '../tours/ToursContainer';
import Tour from '../tours/Tour';
import Page from '../pages/Page';
import HeaderContainer from '../header/HeaderContainer';
import Footer from './Footer';
import { getLangPref } from '../../services/utils'

const styles = StyleSheet.create({
  wrapper: {
    minHeight: '100vh',
    ':after': {
      display: 'block',
      content: '""',
      height: '424px'
    },
    marginBottom: '-424px;'
  },
});

const prefix = getLangPref();
const urlPrefix = prefix === 'ru' ? '' : `/${prefix}`;
const routes = [
  {
    path: `${urlPrefix}`,
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
    main: () => <ToursContainer />
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

let App = () => (
  <div>
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
    </div>
    <Footer/>
  </div>
);


export default App;
