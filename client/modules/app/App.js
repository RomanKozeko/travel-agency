import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

import Home from './Home'
import Contacts from './Contacts'
import ToursContainer from '../tours/ToursContainer';
import Button from '../ui-elements/button'

const App = () => (
  <div>
    <ul>
      <li><Link to="/">Home 12</Link></li>
      <li><Link to="/tours">Tours </Link></li>
      <li><Link to="/contacts">Contacts </Link></li>
    </ul>
    <hr/>

    <Route exact path="/" component={Home}/>
    <Route path="/contacts" component={Contacts}/>
    <Route path="/tours" component={ToursContainer}/>
  </div>
);

export default App;