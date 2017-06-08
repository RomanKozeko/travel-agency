import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

import Home from './Home'
import Contacts from './Contacts'

const App = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/contacts">Contacts </Link></li>
    </ul>

    <hr/>

    <Route exact path="/" component={Home}/>
    <Route path="/contacts" component={Contacts}/>
  </div>
);

export default App;