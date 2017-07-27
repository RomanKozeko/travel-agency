import React from 'react';
import './App.css';
import {
	Route
} from 'react-router-dom'
import Header from '../header/AppHeader'

const Pages = () => <h3>Pages</h3>
const Tours = () => <h3>Tours</h3>

const App =({ match }) => {
    return (
      <div className="App">
        <Header />
        <div className="App-body">
          <h1>Admin</h1>
          ololo

          <Route path='/pages' component={Pages}/>
          <Route path='/tours' component={Tours}/>
          <Route exact path={match.url} render={() => (
            <h3>Please select a smth.</h3>
          )}/>
        </div>
      </div>
    );
}

export default App;
