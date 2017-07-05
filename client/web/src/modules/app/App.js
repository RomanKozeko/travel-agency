import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contacts">contacts</Link></li>
        <li><Link to="/tours">tours</Link></li>
        <li><Link to="/tour/max">tour max</Link></li>
      </ul>

      <ul>
        <li><Link to="/en-en/">Home</Link></li>
        <li><Link to="contacts">contacts</Link></li>
        <li><Link to="tours">tours</Link></li>
        <li><Link to="tour/max">tour max</Link></li>
      </ul>

      <hr/>
      <Route exact path="/" component={Home}/>
      <Route path="/contacts" component={Contacts}/>
      <Route path="/tours" component={ToursContainer}/>
      <Route path="/tour/:id" component={Tour}/>

      <Route exact path="/en-en" component={Home}/>
      <Route path="/en-en/contacts" component={Contacts}/>
      <Route path="/en-en/tours" component={ToursContainer}/>
      <Route path="/en-en/tour/:id" component={Tour}/>

    </div>
  )


export default App;