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

class App extends Component {
  componentDidMount() {

    const pathname = window.location.pathname.split('/')[1];
    if (pathname === 'en_EN' || pathname === 'ru_RU') {
      this.props.setLanguage(pathname);
    }
  }
  render() {
    const linksPrefix = this.props.linksPrefix
    const links = [
      {
        link: `/${linksPrefix}/`,
        title: 'Home'
      },
      {
        link: 'tours',
        title: 'Tours'
      },
      {
        link: 'tour/max',
        title: 'Tours max'
      },
      {
        link: 'contacts',
        title: 'Contacts'
      }
    ]
    return (
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
          {links.map((item, i) => (
            <li key={i}><Link to={item.link}>{item.title}</Link></li>
            ))
          }
        </ul>
        <hr/>

        <Route exact path="/" component={Home}/>
        <Route path="/contacts" component={Contacts}/>
        <Route path="/tours" component={ToursContainer}/>
        <Route path="/tour/:id" component={Tour}/>

        <Route exact path="/en" component={Home}/>
        <Route path="/en/contacts" component={Contacts}/>
        <Route path="/en/tours" component={ToursContainer}/>
        <Route path="/en/tour/:id" component={Tour}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    linksPrefix: state.app.languagePrefix
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (prefix) => {
      dispatch({
        type: 'SET_LANGUAGE_PREFIX',
        prefix
      })
    }
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;