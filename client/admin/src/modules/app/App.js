import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import {StyleSheet, css} from 'aphrodite/no-important';
import './App.css';
import Header from '../header/AppHeader';
import SideBar from '../sideBar/SideBar';

const styles = StyleSheet.create({
	wrapper: {
		minHeight: '100vh',
		marginTop: '85px'
	},
});

const routes = [
	{ path: '/tours',
		exact: true,
		main: () => <h2>Tours</h2>
	},
	{ path: '/pages',
		main: () => <h2>Pages</h2>
	}
];

const App =() => {
    return (
      <div className="App">
        <Header />
        <Router>
          <div className={css(styles.wrapper)}>
            <div className="container">
              <div className="row">
                <div className="">
                  <SideBar />
                </div>
                <div className="">
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
            </div>
          </div>
        </Router>
      </div>
    );
};

export default App;
