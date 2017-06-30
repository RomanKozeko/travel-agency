import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  Route,
  Link
} from 'react-router-dom';

import Home from './Home'
import Contacts from './Contacts'
import ToursContainer from '../tours/ToursContainer';
import Tour from '../tours/Tour';
import Button from '../ui-elements/button'

const App = () => (
  <div>
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload..
      </p>
    </div>

    <ul>
      <li><Link to="/">Home 12s</Link></li>
      <li><Link to="/tours">Tours </Link></li>
      <li><Link to="/tour/max">Tours max</Link></li>
      <li><Link to="/contacts">Contacts </Link></li>
    </ul>
    <hr/>

    <Route exact path="/" component={Home}/>
    <Route path="/contacts" component={Contacts}/>
    <Route path="/tours" component={ToursContainer}/>
    <Route path="/tour/:id" component={Tour}/>
  </div>
);

export default App;