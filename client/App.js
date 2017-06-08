import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

import Home from './Home'
import Contacts from './Contacts'
import Button from './button'

const App = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/contacts">Contacts </Link></li>
      <li><Link to="/contacts">Contacts </Link></li>
    </ul>
    <Button />
    <Button />
    <hr/>

    <Route exact path="/" component={Home}/>
    <Route path="/contacts" component={Contacts}/>
  </div>
);

export default App;