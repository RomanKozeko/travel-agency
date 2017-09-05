import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import {
  Route,
  Link
} from 'react-router-dom';

import Home from './Home'
import Contacts from './Contacts'
import ToursContainer from '../tours/ToursContainer';
import Tour from '../tours/Tour';
import HeaderContainer from '../header/HeaderContainer'
import Footer from './Footer'
import TransitionGroup from 'react-transition-group/TransitionGroup';
import AnimatedSwitch from '../animated/AnimatedSwitch';

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

const App = () => (
  <div>
    <div className={css(styles.wrapper)}>
      <HeaderContainer/>
      <div className="container">
        <Route
          render={({location}) => (
            <TransitionGroup component="main">
              <AnimatedSwitch
                key={location.key}
                location={location}
              >
                <Route exact path="/" component={Home}/>
                <Route
                  exact
                  path="/tours"
                  render={props => (
                    <ToursContainer {...props}  />
                  )}
                />
                <Route
                  path="/tour/:id"
                  render={props => (
                    <Tour {...props} />
                  )}
                />
                <Route
                  path="/contacts"
                  render={props => (
                    <Contacts {...props} />
                  )}
                />
              </AnimatedSwitch>
            </TransitionGroup>
          )}
        />
      </div>
    </div>
    <Footer/>
  </div>
);


export default App
