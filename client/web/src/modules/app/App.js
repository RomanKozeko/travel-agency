import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group'

import {
  Route,
  Link
} from 'react-router-dom';

import Home from './Home'
import Contacts from './Contacts'
import ToursContainer from '../tours/ToursContainer';
import Tour from '../tours/Tour';
import HeaderContainer from '../header/HeaderContainer'
import TransitionGroup from 'react-transition-group/TransitionGroup';
import AnimatedSwitch from '../animated/AnimatedSwitch';

console.log(CSSTransitionGroup);


const App = () => (
    <div>
      <HeaderContainer />

      <Route
        render={({ location }) => (
          <TransitionGroup component="main">
            <AnimatedSwitch
              key={location.key}
              location={location}
            >
              <Route exact path="/" component={Home} />
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
  );


export default App
